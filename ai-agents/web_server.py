#!/usr/bin/python3
from aiohttp import web
from pathlib import Path
import asyncio

async def health_check(request):
    return web.Response(text="Server is running")

async def get_transcript(request):
    try:
        room_name = request.match_info.get('room_name')
        print(f"Received request for room: {room_name}")
        
        if not room_name:
            print("Error: Room name is required")
            return web.Response(status=400, text="Room name is required")
        
        transcriptions_dir = Path("transcriptions")
        filename = transcriptions_dir / f"transcript_{room_name}.txt"
        print(f"Looking for file: {filename}")
        
        if not filename.exists():
            print(f"Error: File not found for room {room_name}")
            return web.Response(status=404, text="No transcriptions found for this room")
        
        try:
            with open(filename, 'r') as f:
                content = f.read()
            print(f"Successfully read transcript for room {room_name}")
            return web.Response(text=content, content_type='text/plain')
        except Exception as e:
            print(f"Error reading file: {str(e)}")
            return web.Response(status=500, text=f"Error reading transcript: {str(e)}")
            
    except Exception as e:
        print(f"Unexpected error in get_transcript: {str(e)}")
        return web.Response(status=500, text=f"Internal server error: {str(e)}")

async def init_app():
    app = web.Application()
    app.router.add_get('/transcript/{room_name}', get_transcript)
    app.router.add_get('/health', health_check)
    return app

if __name__ == '__main__':
    app = asyncio.run(init_app())
    web.run_app(app, host='0.0.0.0', port=8081) 