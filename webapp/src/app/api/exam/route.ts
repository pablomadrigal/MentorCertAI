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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PYTHON_SERVER = process.env.NEXT_PUBLIC_LIVEKIT_AI_AGENT_URL;

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

    let image = "data:image/png;base64,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";

    // Generate the certificate image and blockcert package in parallel
    const [certificateImageData, blockcertData] = await Promise.all([
      fetch(`${PYTHON_SERVER}/certificate/generate`, {
        method: 'POST',
        body: JSON.stringify({
          certificate: {
            id: session.room_id,
            theme: session.theme,
            score: score,
            date: session.date_time ?? new Date().toISOString(),
          },
          userName: user.user_metadata?.full_name ?? ""
        })
      }).then(res => res.json()).catch(() => ({ image })),
      generateBlockcertPackage(user, session, score)
    ]);

    image = certificateImageData.image;
    const { blockcertPackage, txHash, nft_id } = blockcertData;

    const certificate: Certificate = {
      nft_id: nft_id.toString(),
      user_id: user.sub as number,
      date: session.date_time ?? new Date().toISOString(),
      image: "",
      score,
      session_id: session.room_id,
      theme: session.theme,
      nft_transaction: txHash,
      certificate_metadata: blockcertPackage,
    };

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

  console.log("publicAddress", user.user_metadata?.public_key)
  const blockcertsV3 = generateBlockcertsV3(recipient, mensisIssuer, badge);
  const txHash = user.user_metadata?.public_key ? await mintNFT(user.user_metadata?.public_key, score, totalMintableNFTs + BigInt(1)) : null;

  const blockcertPackage = generateBlockcertSinglePackage(blockcertsV3, txHash);

  return { blockcertPackage, txHash, nft_id: totalMintableNFTs + BigInt(1) };
}