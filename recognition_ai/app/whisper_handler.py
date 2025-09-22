import whisper
import subprocess

model = whisper.load_model("base")

def transcribe_audio_or_video(file_path):
    if file_path.endswith((".mp4", ".mkv")):
        audio_path = file_path.rsplit(".", 1)[0] + ".mp3"
        subprocess.run(["ffmpeg", "-i", file_path, audio_path])
        file_path = audio_path

    result = model.transcribe(file_path)
    return result["text"]
