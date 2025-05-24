import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import { list } from '@vercel/blob';
import { JWTPayload, withAuth } from '@/utils/api-middleware';
import { generateBlockcertSinglePackage, generateBlockcertsV3, mensisIssuer } from '@/utils/certificates/certificates';
import { Badge, RecipientData } from '@/types/blockcerts';
import { getPublicAddress } from '@/utils/starknet-wallet';
import { getTotalMintableNFTs, mintNFT } from '@/utils/starknet-contracts';
import { Session } from '@/types/session';
import { Certificate } from '@/types/certificate';
import { NFTMetadata } from '@/types/nft';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PIN = process.env.PASSWORD_PK ?? "";

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
    // Generate the blockcert package
    const { blockcertPackage, txHash, nft_id } = await generateBlockcertPackage(user, session, score);

    const nft_metadata: NFTMetadata = {
      name: session.theme,
      description: session.theme,
      image: "https://marketplace.canva.com/EAGPQFRI-qU/1/0/1600w/canva-certificado-diploma-de-reconocimiento-profesional-moderno-verde-y-blanco--y6SjD9IvOc.jpg",
      attributes: [{ trait_type: "score", value: score.toString() }]
    };

    const certificate: Certificate = {
      nft_id: nft_id.toString(),
      nft_metadata: nft_metadata,
      image: "https://marketplace.canva.com/EAGPQFRI-qU/1/0/1600w/canva-certificado-diploma-de-reconocimiento-profesional-moderno-verde-y-blanco--y6SjD9IvOc.jpg",
      user_id: user.sub as number,
      date: session.date_time ?? new Date().toISOString(),
      score,
      session_id: session.room_id,
      theme: session.theme,
      nft_transaction: txHash,
      certificate_metadata: blockcertPackage,
    };

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

  const publicAddress = getPublicAddress(user.user_metadata?.private_key ?? "", PIN);
  console.log("publicAddress", publicAddress)
  const blockcertsV3 = generateBlockcertsV3(recipient, mensisIssuer, badge);
  const txHash = await mintNFT(publicAddress, score, totalMintableNFTs + BigInt(1));

  const blockcertPackage = generateBlockcertSinglePackage(blockcertsV3, txHash);

  return { blockcertPackage, txHash, nft_id: totalMintableNFTs + BigInt(1) };
}