from transformers import pipeline
import torch

generator = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    device=-1
)

def generate_advice(emotion: str, text : str):
    
    prompt = f"""
    A person says: "{text}"
    They are feeling {emotion}.
    Give short supportive and practical advice in 2 sentences.
    """

    result = generator(
        prompt,
        max_new_tokens=60,     # IMPORTANT ✅
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        return_full_text=False   # VERY IMPORTANT ✅
    )
    return result[0]["generated_text"]
