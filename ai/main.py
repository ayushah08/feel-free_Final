from fastapi import FastAPI, HTTPException , UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from shcemas import TextRequest, EmotionResponse , SpeechTextResponse
import pandas as pd
from model_loader import load_model
from chatbot.chatbot import generate_advice
import speech_recognition as sr
import shutil
import os

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
        # Validate empty input
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        input_df = pd.DataFrame({
        "Clean_Text": [request.text]
        })
        

        prediction = load_model().predict(input_df)[0]

        if hasattr(load_model, "predict_proba"):
            probabilities = load_model.predict_proba([request.text])[0]
            confidence = float(max(probabilities))
        else:
            confidence = 0.95  # fallback

        advise = generate_advice(prediction,request.text)
        
        return EmotionResponse(
            emotion=str(prediction),
            confidence=round(confidence, 4),
            suggestion=str(advise)
            
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