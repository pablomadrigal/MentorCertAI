import { NextResponse } from 'next/server';

import { GoogleGenerativeAI } from "@google/generative-ai";

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
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

    // Use environment variable or fallback to a secure default
    const transcriptsDir = process.env.TRANSCRIPTS_DIR || path.join(process.cwd(), '..', 'transcripts');
    const filePath = path.join(transcriptsDir, `${roomId}.json`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'Transcript not found' },
        { status: 404 }
      );
    }

    // Read and parse the transcript file
    const transcriptData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Convert transcript data to conversation format
    const conversation = transcriptData.transcripts.map((entry: string) => {
      const match = entry.match(/\[(.*?)\s-\s\d+\]:\s(.*)/);
      if (!match) return null;

      const [, timestamp, message] = match;
      return `${timestamp}: ${message}`;
    }).join('\n');

    // Send conversation to Gemini for exam generation
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    let geminiExam = '';

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-001" });
      const result = await model.generateContent(
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
      );
      const geminiResponse = await result.response;
      const responseText = geminiResponse.text().replace(/```json\n|\n```/g, '');
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
}

export async function POST(request: Request) {
  const { examData } = await request.json();

  // Here you can save the exam data to your database
  console.log('Received exam data:', examData);
}

export async function PUT(request: Request) {
  try {
    const { room_id, examData } = await request.json();

    if (!room_id) {
      return NextResponse.json(
        { success: false, message: 'Se requiere el ID de la sala' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Verificar si ya existe un examen para este room_id
    const { data: existingExams, error: fetchError } = await supabase
      .from('user_at_session')
      .select('exam')
      .eq('room_id', room_id);

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
      .update({ exam: examData })
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
}