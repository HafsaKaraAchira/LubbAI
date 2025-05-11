import os

from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

# Gemini API key and parameters for embeddings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_EMBEDDING_MODEL = os.getenv("GEMINI_EMBEDDING_MODEL", "gemini-embedding-exp-03-07")
GEMINI_EMBEDDING_ALT_MODEL_1 = os.getenv("GEMINI_EMBEDDING_ALT_MODEL_1", "models/text-embedding-004")
GEMINI_EMBEDDING_ALT_MODEL_2 = os.getenv("GEMINI_EMBEDDING_ALT_MODEL_2", "models/embedding-001")
GEMINI_CHAT_MODEL = os.getenv("GEMINI_CHAT_MODEL", "models/gemini-1.5-flash")
# GEMINI_EMBEDDING_MODEL = os.getenv("GEMINI_EMBEDDING_MODEL", "models/embedding-001")
# GEMINI_CHAT_MODEL = os.getenv("GEMINI_CHAT_MODEL", "models/chat")

# OPEN AI API key and parameters for embeddings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_EMBEDDING_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-ada-002")
OPENAI_CHAT_MODEL = os.getenv("OPENAI_CHAT_MODEL", "gpt-3.5-turbo")

# MAX CHUNK TOKENS FOR EMBEDDING
MAX_CHUNK_TOKENS = 500

# TOP K RESULTS FOR SIMILARITY SEARCH
TOP_K_RESULTS = 3

# GEMINI RPM LIMIT
GEMINI_RPM_LIMIT = int(os.getenv("GEMINI_RPM_LIMIT", 15))

