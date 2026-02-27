from pydantic import BaseModel
from typing import Optional

class TextRequest(BaseModel):
    text: str

class EmotionResponse(BaseModel):
    emotion: str
    confidence: float
    suggestion: Optional[str] = None
    
class SpeechTextResponse(BaseModel):
    detected_text: str