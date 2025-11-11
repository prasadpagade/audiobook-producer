from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from openai import OpenAI
import edge_tts
import aiofiles
import os
import uuid

# ----------------------------------------------------
# Load environment and initialize OpenAI client
# ----------------------------------------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("❌ Missing OPENAI_API_KEY in .env file")

client = OpenAI(api_key=OPENAI_API_KEY)

# ----------------------------------------------------
# FastAPI app setup
# ----------------------------------------------------
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://audiobook-producer.vercel.app",
        "https://audiobook-producer-git-main-prasads-projects-9efa731b.vercel.app",
        "https://audiobook-producer-19wdv8nwg-prasads-projects-9efa731b.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Directory for generated audio
os.makedirs("temp_audio", exist_ok=True)

PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL")


def build_public_url(request: Request, file_path: str) -> str:
    """
    Returns an absolute URL for files served by this FastAPI app.
    Uses PUBLIC_BASE_URL when provided, otherwise falls back to the inbound request.
    """
    base = PUBLIC_BASE_URL.rstrip("/") if PUBLIC_BASE_URL else str(request.base_url).rstrip("/")
    return f"{base}/{file_path.lstrip('/')}"

# ----------------------------------------------------
# Emotion Detection Endpoint
# ----------------------------------------------------
@app.post("/detect-emotion")
async def detect_emotion(text: str = Form(...)):
    """
    Detects emotional tone of input text using GPT.
    Returns emotion label and recommended voice.
    """
    try:
        prompt = f"""
        You are an expert emotion classifier for audiobook narration.
        Choose ONE emotion that matches the text below.
        Options: ["calm", "sad", "happy", "excited", "dramatic", "suspenseful", "neutral"].

        Text: \"\"\"{text}\"\"\"
        Respond with only one word from the list.
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )

        emotion = response.choices[0].message.content.strip().lower()

        # Map emotion → voice
        voice_map = {
            "calm": "en-US-AriaNeural",
            "sad": "en-US-JennyNeural",
            "happy": "en-US-GuyNeural",
            "excited": "en-US-DavisNeural",
            "dramatic": "en-US-AvaNeural",
            "suspenseful": "en-US-ChristopherNeural",
            "neutral": "en-US-JennyNeural",
        }

        voice = voice_map.get(emotion, "en-US-JennyNeural")

        return {"emotion": emotion, "voice": voice}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# ----------------------------------------------------
# Generate Audiobook Clip (Text or File)
# ----------------------------------------------------
@app.post("/generate")
async def generate(
    request: Request,
    file: UploadFile = File(None),
    text: str = Form(None),
    target_emotion: str = Form(None)
):
    """
    Accepts:
      - text input OR .txt file
    Performs emotion detection → selects TTS voice → generates MP3.
    """
    try:
        # Load and normalize input
        content = ""
        if file:
            async with aiofiles.open(file.filename, "wb") as f:
                content_bytes = await file.read()
                await f.write(content_bytes)
            content = content_bytes.decode("utf-8", errors="ignore")
        elif text:
            content = text.strip()
        else:
            return JSONResponse(status_code=400, content={"detail": "No text or file provided."})

        # Truncate for demo
        content = content[:500]

        allowed_emotions = {
            "calm", "sad", "happy", "excited", "dramatic", "suspenseful", "neutral"
        }

        if target_emotion and target_emotion.lower() in allowed_emotions:
            emotion = target_emotion.lower()
        else:
            # ----- Emotion detection -----
            prompt = f"""
            You are an expert emotion classifier for audiobook narration.
            Choose ONE emotion that matches the text below.
            Options: ["calm", "sad", "happy", "excited", "dramatic", "suspenseful", "neutral"].

            Text: \"\"\"{content}\"\"\"
            Respond with only one word from the list.
            """
            emotion_response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
            )

            emotion = emotion_response.choices[0].message.content.strip().lower()
            if emotion not in allowed_emotions:
                emotion = "neutral"

        voice_map = {
            "calm": "en-US-AriaNeural",
            "sad": "en-US-JennyNeural",
            "happy": "en-US-GuyNeural",
            "excited": "en-US-DavisNeural",
            "dramatic": "en-US-AvaNeural",
            "suspenseful": "en-US-ChristopherNeural",
            "neutral": "en-US-JennyNeural",
        }
        voice = voice_map.get(emotion, "en-US-JennyNeural")

        # ----- Generate Audio -----
        file_id = str(uuid.uuid4())
        output_path = f"temp_audio/{file_id}.mp3"

        communicate = edge_tts.Communicate(content, voice)
        await communicate.save(output_path)

        # ✅ Properly mounted static path (for working playback)
        audio_url = build_public_url(request, f"temp_audio/{file_id}.mp3")

        return {
            "message": "Audio generated successfully.",
            "emotion": emotion,
            "voice": voice,
            "audio_url": audio_url,
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

# ----------------------------------------------------
# Static file mount (don’t override with a route!)
# ----------------------------------------------------
app.mount("/temp_audio", StaticFiles(directory="temp_audio"), name="temp_audio")

# ----------------------------------------------------
# Root endpoint (for health check)
# ----------------------------------------------------
@app.get("/")
async def root():
    return {"status": "✅ FastAPI backend live with working audio + emotion detection"}
