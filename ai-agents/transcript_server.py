#!/usr/bin/python
#!/usr/bin/python3
from fastapi import FastAPI, HTTPException
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

app = FastAPI()


class ExamRequest(BaseModel):
    room_id: str

@app.get("/transcript/{room_id}")
async def get_transcript(room_id: str):
    transcript_path = Path("transcriptions") / f"transcript_{room_id}.txt"
    if not transcript_path.exists():
        raise HTTPException(status_code=404, detail="Transcript not found")

    try:
        with open(transcript_path, 'r') as f:
            lines = f.readlines()

        # Parse each line into a string
        transcriptions = []
        for line in lines:
            if line.strip():
                transcriptions.append(line)

        return {"room_id": room_id, "transcriptions": transcriptions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 