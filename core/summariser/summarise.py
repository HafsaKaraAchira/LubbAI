import openai
from config import OPENAI_API_KEY, CHAT_MODEL

openai.api_key = OPENAI_API_KEY

def summarise_text(text: str) -> str:
    response = openai.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": "Summarise the following in a concise way:"},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content.strip()
