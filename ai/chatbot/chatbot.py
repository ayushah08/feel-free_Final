from hugchat import hugchat

# from Model.prediction import predict_emotion
# from app import row_text

# promt = f'I feel {}, what can i do'

def generate_advice(text: str, emotion: str):

    prompt = f"""
    "{text}"
   i feel {emotion}.
    what can i do and suggest some yoga
    """

    user_input = prompt.lower()
    chatbot = hugchat.ChatBot(cookie_path="chatbot\cookies.json")
    id = chatbot.new_conversation()
    chatbot.change_conversation(id)
    response = chatbot.chat(user_input)
    return response



