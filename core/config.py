import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or "your-openai-key-here"
EMBEDDING_MODEL = "text-embedding-3-small"
CHAT_MODEL = "gpt-3.5-turbo"
MAX_CHUNK_TOKENS = 500
TOP_K_RESULTS = 3
