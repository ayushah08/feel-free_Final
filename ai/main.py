from fastapi import FastAPI, HTTPException , UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from Schemas import TextRequest, EmotionResponse , SpeechTextResponse
import pandas as pd
from model.model_loader import load_model
from model.chatbot import generate_advice



app = FastAPI(
    title="AI-4 Emotion Detection Service",
    description="Hackathon Emotion Prediction API using Custom ML Model",
    version="1.0"
)

# Enable CORS (Important for Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "Emotion AI Service Running",
        "message": "Ready to predict emotions"
    }


@app.post("/predict", response_model=EmotionResponse)
def predict_emotion(request: TextRequest):

    try:
        # 1️⃣ Validate empty input
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        # 2️⃣ Load model ONLY ONCE
        model = load_model()

        # 3️⃣ Get prediction from model
        result = model(request.text)

        # If using HuggingFace pipeline
        if isinstance(result, list):
            emotion_label = result[0]["label"]
            confidence = float(result[0]["score"])

        # If using sklearn model
        else:
            emotion_label = result
            if hasattr(model, "predict_proba"):
                probabilities = model.predict_proba([request.text])[0]
                confidence = float(max(probabilities))
            else:
                confidence = 0.95

        # 4️⃣ Generate advice using clean emotion label
        advise = generate_advice(emotion_label, request.text)

        # 5️⃣ Return CLEAN response (NO str())
        return EmotionResponse(
            emotion=emotion_label,
            confidence=round(confidence, 4),
            suggestion=advise
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import speech_recognition as sr

@app.get("/live-mic")
def live_microphone():

    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak now...")
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        return {"detected_text": text}
    except:
        return {"error": "Could not understand audio"}