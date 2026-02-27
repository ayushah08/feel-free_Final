import joblib


def load_model():

    model = joblib.load("model_training\emotion_model.pkl")
    
    return model