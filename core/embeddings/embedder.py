import openai
from config import OPENAI_API_KEY, EMBEDDING_MODEL

openai.api_key = OPENAI_API_KEY

def get_embeddings(texts: list[str]) -> list[list[float]]:
    response = openai.embeddings.create(
        model=EMBEDDING_MODEL,
        input=texts
    )
    return [r.embedding for r in response.data]

def embed_query(query: str) -> list[float]:
    return get_embeddings([query])[0]
