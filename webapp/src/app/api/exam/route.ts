import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import { list } from '@vercel/blob';
import { JWTPayload, withAuth } from '@/utils/api-middleware';
import { generateBlockcertSinglePackage, generateBlockcertsV3, mensisIssuer } from '@/utils/certificates/certificates';
import { Badge, RecipientData } from '@/types/blockcerts';
import { getTotalMintableNFTs, mintNFT } from '@/utils/starknet-contracts';
import { Session } from '@/types/session';
import { Certificate } from '@/types/certificate';
import { NFTMetadata } from '@/types/nft';
import { generateCertificateBase64Server } from '@/utils/certificate-image-server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const GET = (request: Request) => withAuth(request, async () => {
  try {
    // Get room ID from URL
    const url = new URL(request.url);
    const roomId = url.searchParams.get('room');

    if (!roomId) {
      return NextResponse.json(
        { success: false, message: 'Room ID is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_API_KEY!
    );

    const { data } = await supabase
      .from('sessions')
      .select('transcription')
      .eq('room_id', roomId)
      .single();

    if (data) {
      return NextResponse.json(data);
    }

    // List blobs with the room ID prefix
    const { blobs } = await list({ prefix: `transcripts/${roomId}` });

    if (blobs.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Transcript not found' },
        { status: 404 }
      );
    }

    // Get the latest transcript
    const latestTranscript = blobs[blobs.length - 1];
    const response = await fetch(latestTranscript.url);
    const transcriptData = await response.json();

    // Convert transcript data to conversation format
    const conversation = transcriptData.transcripts.map((entry: string) => {
      const match = entry.match(/\[(.*?)\s-\s\d+\]:\s(.*)/);
      if (!match) return null;

      const [, timestamp, message] = match;
      return `${timestamp}: ${message}`;
    }).join('\n');

    // Send conversation to Gemini for exam generation
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let geminiExam = '';
    const model = "gemini-2.0-flash-lite-001";

    const prompt =
      `You are an expert educator. Based on the following conversation, create a comprehensive exam that tests understanding of the discussed topics.
      Requirements:
        - Create only multiple choice and yes/no questions
        - Each multiple choice question should have 4 options
        - Include the correct answer for each question

      The response should be a with this format and omit everything else:
      [
        {{
          "type": "multiple_choice or yes_no",
          "question": "question text",
          "options": ["option 1", "option 2", "option 3", "option 4"],
          "answer": "correct answer"
        }},
        ...
      ]

      Conversation transcript:
      ${conversation}`

    try {
      const geminiResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      const responseText = geminiResponse.text?.replace(/```json\n|\n```/g, '') || '';
      geminiExam = JSON.parse(responseText);

    } catch (error) {
      console.error('Error generating exam:', error);
      throw new Error('Failed to generate exam');
    }

    return NextResponse.json({
      success: true,
      data: geminiExam
    });
  } catch (error) {
    console.error('Error reading transcript:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to read transcript' },
      { status: 500 }
    );
  }
})

export const POST = (request: Request) => withAuth(request, async (req, user) => {
  try {
    const { room_id, examData, score } = await req.json();

    if (!room_id) {
      return NextResponse.json(
        { success: false, message: 'Se requiere el ID de la sala' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_API_KEY!
    );

    // Verificar si ya existe un examen para este room_id
    const { data: existingExams, error: fetchError } = await supabase
      .from('user_at_session')
      .select(`
      room_id,
      exam,
      score,
      user_id,
      session:room_id (
        room_id,
        theme,
        transcription,
        owner_id,
        date_time
      )
      `)
      .eq('room_id', room_id)
      .eq('user_id', user.sub);

    if (fetchError) {
      console.error('Error específico de Supabase:', fetchError);
      return NextResponse.json(
        {
          success: false,
          message: 'Error al verificar el examen existente',
          error: fetchError.message
        },
        { status: 500 }
      );
    }

    const session: Session = existingExams[0].session[0] ?? existingExams[0].session;

    // Verificar si alguno de los registros ya tiene un examen
    const hasExistingExam = existingExams?.some(record => record.exam !== null);
    if (hasExistingExam) {
      return NextResponse.json(
        { success: false, message: 'Ya existe un examen para esta sala' },
        { status: 401 }
      );
    }

    // Actualizar todos los registros con el mismo room_id
    const { error: updateError } = await supabase
      .from('user_at_session')
      .update({ exam: examData, score: score })
      .eq('room_id', room_id);

    if (updateError) {
      console.error('Error de actualización:', updateError);
      return NextResponse.json(
        {
          success: false,
          message: 'Error al guardar el examen',
          error: updateError.message
        },
        { status: 500 }
      );
    }

    const certificate: Certificate = {
      user_id: user.sub as number,
      date: session.date_time ?? new Date().toISOString(),
      image: "",
      score,
      session_id: session.room_id,
      theme: session.theme
    };

    console.log("certificate", certificate)
    console.log("Generating certificate image")
    const image = await generateCertificateBase64Server(certificate, user.user_metadata?.full_name ?? "") as string;

    // Generate the blockcert package
    const { blockcertPackage, txHash, nft_id } = await generateBlockcertPackage(user, session, score);


    const nft_metadata: NFTMetadata = {
      name: session.theme,
      description: session.theme,
      image: image,
      attributes: [
        { trait_type: "Course", value: session.theme },
        { trait_type: "Grade", value: `${score.toString()}%` },
        { trait_type: "Date", value: session.date_time ? new Date(session.date_time).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) },
        { trait_type: "Student", value: user.user_metadata?.full_name ?? "" }
      ]
    };

    certificate.nft_id = nft_id.toString();
    certificate.nft_transaction = txHash;
    certificate.certificate_metadata = blockcertPackage;
    certificate.nft_metadata = nft_metadata;
    certificate.image = image;

    const { error } = await supabase
      .from('certificates')
      .insert([{
        ...certificate
      }])
      .select()
      .single();

    if (error) {
      console.error('Error al guardar el certificado:', error);
      return NextResponse.json(
        { success: false, message: 'Error al guardar el certificado' },
        { status: 500 }
      );
    }


    return NextResponse.json({
      success: true,
      message: 'Examen guardado exitosamente'
    });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
})

const generateBlockcertPackage = async (user: JWTPayload, session: Session, score: number) => {
  //Generate the blockcerts v3 certificate
  const recipient: RecipientData = {
    name: user.user_metadata?.full_name ?? "",
    email: user.email ?? "",
    issuedOn: session.date_time ?? new Date().toISOString(),
    course: session.theme,
    issuerId: mensisIssuer.ethPubKey,
  }

  const badge: Badge = {
    id: session.room_id,
    name: session.theme,
    description: session.theme,
    criteria: {
      narrative: `Successfully completed the course: ${session.theme} with a score of ${score}`
    },
    issuer: mensisIssuer.ethPubKey
  }

  const totalMintableNFTs = await getTotalMintableNFTs();
  console.log("totalMintableNFTs", totalMintableNFTs)

  console.log("user", user)
  console.log("publicAddress", user.user_metadata?.public_key)
  const blockcertsV3 = generateBlockcertsV3(recipient, mensisIssuer, badge);
  const txHash = user.user_metadata?.public_key ? await mintNFT(user.user_metadata?.public_key, score, totalMintableNFTs + BigInt(1)) : null;

  const blockcertPackage = generateBlockcertSinglePackage(blockcertsV3, txHash);

  return { blockcertPackage, txHash, nft_id: totalMintableNFTs + BigInt(1) };
}