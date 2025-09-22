from fastapi import FastAPI, File, UploadFile
from whisper_handler import transcribe_audio_or_video
from ocr_handler import extract_text_from_pdf, extract_text_from_image
import os

app = FastAPI()

@app.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    file_ext = file.filename.split('.')[-1].lower()
    contents = await file.read()
    path = f"/tmp/{file.filename}"

    with open(path, "wb") as f:
        f.write(contents)

    if file_ext in ['mp3', 'wav', 'mp4', 'mkv']:
        result = transcribe_audio_or_video(path)
    elif file_ext == 'pdf':
        result = extract_text_from_pdf(path)
    elif file_ext in ['png', 'jpg', 'jpeg']:
        result = extract_text_from_image(path)
    else:
        result = {"error": "Unsupported file type"}

    os.remove(path)
    return {"text": result}
