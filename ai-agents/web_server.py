#!/usr/bin/python3
from aiohttp import web
from pathlib import Path
import asyncio
import imgkit
import base64
from io import BytesIO
from PIL import Image
import json
from datetime import datetime

async def health_check(request):
    return web.Response(text="Server is running")

def generate_certificate_html(certificate, user_name):
    return f"""
    <div style="width: 760px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 32px rgba(30,41,59,0.08); padding: 48px 56px; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; position: relative; border: 2px solid #7B61FF;">
        <div style="border-top: 8px solid #38bdf8; border-radius: 8px 8px 0 0; width: 100%; margin-bottom: 32px;"></div>
        <h1 style="text-align: center; font-size: 38px; letter-spacing: 2px; font-weight: 700; color: #2A1A67; margin-bottom: 0;">CERTIFICATE</h1>
        <h2 style="text-align: center; font-size: 20px; font-weight: 500; color: #3DDC97; margin: 0 0 8px 0; letter-spacing: 1px;">OF COMPLETION</h2>
        <p style="text-align: center; font-size: 16px; color: #475569; margin-bottom: 32px;">This certificate is presented to</p>
        <div style="text-align: center; margin-bottom: 16px;">
            <span style="font-size: 32px; font-weight: bold; color: #7B61FF; font-family: 'Brush Script MT', cursive, Arial; border-bottom: 2px solid #7B61FF; padding: 10px 30px;">{user_name}</span>
        </div>
        <div style="text-align: center; font-size: 18px; color: #475569; margin-bottom: 24px;">
            has successfully completed the <span style="color: #2A1A67; font-weight: 600;">{certificate['theme']}</span> course<br/>
            with a grade of <span style="color: #2AB77A; font-weight: bold;">{certificate['score']}%</span>
        </div>
        <div style="text-align: center; font-size: 14px; color: #64748b; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
            This certificate is issued by MentorCertAI to recognize outstanding achievement and commitment to learning.
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 48px;">
            <div style="text-align: left;">
                <div style="font-size: 14px; color: #64748b;">Date Issued</div>
                <div style="font-size: 16px; font-weight: 500; color: #1e293b; border-bottom: 1px solid #cbd5e1; width: 120px; padding-bottom: 10px;">{datetime.fromisoformat(certificate['date']).strftime('%Y-%m-%d')}</div>
            </div>
            <div style="text-align: center; flex: 1;"></div>
            <div style="text-align: right;">
                <div style="font-size: 14px; color: #64748b;">Certificate ID</div>
                <div style="font-size: 16px; font-weight: 500; color: #1e293b; border-bottom: 1px solid #cbd5e1; width: 120px; padding-bottom: 10px;">{certificate['id']}</div>
            </div>
        </div>
        <div style="border-bottom: 8px solid #3DDC97; border-radius: 0 0 8px 8px; width: 100%; margin-top: 40px;"></div>
    </div>
    """

async def generate_certificate(request):
    try:
        data = await request.json()
        certificate = data.get('certificate')
        user_name = data.get('userName')

        if not certificate or not user_name:
            return web.Response(status=400, text="Certificate data and user name are required")

        html = generate_certificate_html(certificate, user_name)
        
        # Configure imgkit options
        options = {
            'format': 'png',
            'encoding': 'UTF-8',
            'width': 760,
            'quality': 100,
            'enable-local-file-access': None
        }

        # Generate image
        img_bytes = imgkit.from_string(html, False, options=options)
        
        # Compress image
        img = Image.open(BytesIO(img_bytes))
        output = BytesIO()
        img.save(output, format='PNG', optimize=True, quality=60)
        compressed_bytes = output.getvalue()

        # Convert to base64
        base64_image = base64.b64encode(compressed_bytes).decode('utf-8')
        print(f"Certificate generated successfully")
        return web.Response(text=f"data:image/png;base64,{base64_image}")

    except Exception as e:
        print(f"Error generating certificate: {str(e)}")
        return web.Response(status=500, text=f"Error generating certificate: {str(e)}")

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
    app.router.add_post('/certificate/generate', generate_certificate)
    return app

if __name__ == '__main__':
    app = asyncio.run(init_app())
    web.run_app(app, host='0.0.0.0', port=8081) 