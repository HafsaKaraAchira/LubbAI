import sys
import time
import openai
from config import OPENAI_API_KEY, OPENAI_EMBEDDING_MODEL, \
                GEMINI_API_KEY, GEMINI_EMBEDDING_MODEL, GEMINI_EMBEDDING_ALT_MODEL_1, GEMINI_EMBEDDING_ALT_MODEL_2, \
                GEMINI_RPM_LIMIT

try:
    import google.generativeai as genai
except ImportError:
    genai = None  # Gemini support requires google-generativeai package

openai.api_key = OPENAI_API_KEY
if genai and GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def get_openai_embeddings(texts: list[str]) -> list[list[float]]:
    response = openai.embeddings.create(
        model=OPENAI_EMBEDDING_MODEL,
        input=texts
    )
    return [r.embedding for r in response.data]

# def get_gemini_embeddings(texts: list[str]) -> list[list[float]]:
#     if not genai:
#         raise ImportError("google-generativeai is not installed.\
#                             Please install it for Gemini support.")
#     model = genai.GenerativeModel(GEMINI_EMBEDDING_MODEL)
#     # TODO: Replace this with actual Gemini embedding API usage
#     # response = model.embed_content(contents=texts)
#     # return [r['embedding'] for r in response['data']]
#     raise NotImplementedError("Gemini embedding API integration required.")

def get_gemini_embeddings(texts: list[str], model: str = GEMINI_EMBEDDING_ALT_MODEL_1) -> list[list[float]]:
    """
    Embed `texts` in RPM-sized batches, sleeping between each batch,
    and ensure there’s always one slot left for the final query embedding.
    """
    if not genai:
        raise ImportError("google-generativeai is not installed.")
    genai.configure(api_key=GEMINI_API_KEY)

    embeddings = []
    total = len(texts)

    for idx, chunk in enumerate(texts, start=1):
        # 1) Embed the chunk
        resp = genai.embed_content(model=model, content=chunk)
        embeddings.append(resp["embedding"])
        print(f"[{idx}/{total}] chunk embedded", file=sys.stderr)

        # 2) After every full batch of RPM_LIMIT chunks, sleep 60s
        #    unless this is the final chunk AND it’s the last operation before the query.
        if idx % GEMINI_RPM_LIMIT == 0:
            if idx < total:
                # More chunks remain—safe to sleep now
                print(f"→ Processed {idx}, sleeping 60s before next batch",file=sys.stderr)
                time.sleep(60)
            else:
                # Exactly hit at the end of chunks: need to sleep before query
                print("→ Final chunk landed on RPM boundary; sleeping 60s to reserve slot for query",file=sys.stderr)
                time.sleep(60)

    return embeddings

def get_embeddings(texts: list[str], model: str = GEMINI_EMBEDDING_ALT_MODEL_1) -> list[list[float]]:
    if model in [GEMINI_EMBEDDING_MODEL, GEMINI_EMBEDDING_ALT_MODEL_1, GEMINI_EMBEDDING_ALT_MODEL_2]:
        return get_gemini_embeddings(texts, model)
    elif model in [OPENAI_EMBEDDING_MODEL]:
        return get_openai_embeddings(texts)
    else:
        raise ValueError(f"Unknown embedding model: {model}")

def embed_query(query: str, model: str = GEMINI_EMBEDDING_ALT_MODEL_1) -> list[float]:
    return get_embeddings([query], model)[0]
