import { NextResponse } from 'next/server';

import {GoogleGenAI} from '@google/genai';
import { list } from '@vercel/blob';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
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
}

export async function POST(request: Request) {
  const { examData } = await request.json();

  // Here you can save the exam data to your database
  console.log('Received exam data:', examData);
}