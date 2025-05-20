#!/usr/bin/python
#!/usr/bin/python3
from pathlib import Path
from dotenv import load_dotenv
from livekit.agents import JobContext, WorkerOptions, cli
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import deepgram
import datetime
import os
import aiohttp
import json

load_dotenv(dotenv_path=Path(__file__).parent / '.env')

# Configure LiveKit to use secure WebSocket
os.environ['LIVEKIT_WS_URL'] = os.environ.get('LIVEKIT_WS_URL', '').replace('ws://', 'wss://')

async def entrypoint(ctx: JobContext):
    transcriptions = []
    transcriptions_dir = Path("transcriptions")
    user_speech_dir = Path("user_speech")
    transcriptions_dir.mkdir(exist_ok=True)
    user_speech_dir.mkdir(exist_ok=True)
    
    # Send transcript to API
    async def send_transcript():
        async with aiohttp.ClientSession() as session:
            try:
                await session.post(
                    os.environ.get('MENSIS_MENTOR_CERT_URL', 'https://localhost:3000/api/transcript'),
                    json={
                        "transcripts": transcriptions,
                        "room": ctx.room.name
                    },
                    headers={"Content-Type": "application/json"},
                    ssl=False
                )
            except Exception as e:
                print(f"Error sending transcript: {e}")
        
    async def write_transcript():
        # Run the async function
        print(f"Transcript for {ctx.room.name} send to node server")
        await send_transcript()

        filename = transcriptions_dir / f"transcript_{ctx.room.name}.txt"
        with open(filename, 'a') as f:
            for entry in transcriptions:
                f.write(entry + '\n')
        
        print(f"Transcript for {ctx.room.name} saved to {filename}")
        
    ctx.add_shutdown_callback(write_transcript)

    await ctx.connect()
    session = AgentSession()
    
    @session.on("user_input_transcribed")
    def on_transcript(transcript):
        if transcript.is_final:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            filename = user_speech_dir / f"user_speech_log_{ctx.room.name}.txt"
            log_entry = f"[{timestamp} - {ctx.proc.pid}]: {transcript.transcript}"
            transcriptions.append(log_entry)
            
            
            with open(filename, "a") as f:
                f.write(log_entry + '\n')
    
    await session.start(
        agent=Agent(
            instructions="You are a helpful assistant that transcribes user speech to text.",
            stt=deepgram.STT()
        ),
        room=ctx.room
    )

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
