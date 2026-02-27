from transformers import pipeline

def load_model():

    classifier = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base"
    )
    
    return classifier
