import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

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

    return NextResponse.json({
      transcripts: transcriptData.transcripts
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
  try {
    const data = await request.json();
    if (!data.room) {
      return NextResponse.json(
        { success: false, message: 'Room name is required' },
        { status: 400 }
      );
    }

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString();
    const filename = `transcripts/${data.room}/${timestamp}.json`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Transcript saved successfully',
      url: blob.url
    });
  } catch (error) {
    console.error('Error saving transcript:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save transcript' },
      { status: 500 }
    );
  }
}
