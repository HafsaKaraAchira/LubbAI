import openai
import google.generativeai as genai
from config import OPENAI_API_KEY, OPENAI_CHAT_MODEL, \
                   GEMINI_API_KEY, GEMINI_CHAT_MODEL


# Configure OpenAI
openai.api_key = OPENAI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)


def summarise_with_openai(text: str) -> str:
    """
    Summarize text using OpenAI Chat API.
    """
    response = openai.chat.completions.create(
        model=OPENAI_CHAT_MODEL,
        messages=[
            {"role": "system", "content": "Summarize the following text in a clear and concise way."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content.strip()


def summarise_with_gemini(text: str, model: str = GEMINI_CHAT_MODEL) -> str:
    """
    Summarize text using Gemini chat model.
    """
    gen_model = genai.GenerativeModel(model)
    prompt = "Summarize the following text in a clear and concise way:\n\n" + text
    response = gen_model.generate_content(prompt)
    return response.text.strip()


def summarise_text(text: str, model: str = GEMINI_CHAT_MODEL) -> str:
    """
    Wrapper to select which summarization strategy to use based on the model.
    """
    if model in [OPENAI_CHAT_MODEL]:
        return summarise_with_openai(text)
    elif model in [GEMINI_CHAT_MODEL]:
        return summarise_with_gemini(text, model)
    else:
        raise ValueError(f"Unknown summarization model: {model}")
