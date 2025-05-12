# Core Tier

Python module that handles:
- PDF text extraction (`loader/`)  
- Text cleaning & chunking (`preprocessing/`)  
- Embeddings (`embeddings/`)  
- Semantic search (`search/`)  
- Summarization (`summariser/`)

## Requirements

- Python ≥3.8  
- Virtualenv

## Setup

```bash
cd core
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


## Configuration
Create a .env file in core/:

```bash
OPENAI_API_KEY=sk-...
OPENAI_EMBEDDING_MODEL=text-embedding-ada-002
OPENAI_CHAT_MODEL=gpt-3.5-turbo

GEMINI_API_KEY=...
GEMINI_EMBEDDING_MODEL=gemini-embedding-exp-03-07
GEMINI_CHAT_MODEL=models/gemini-1.5-flash
GEMINI_RPM_LIMIT=5
```

## Usage
The entry point is main.py:

```bash 
python main.py path/to/file.pdf [operation] [mode] [chunk_size] [overlap]
```

operation: operation to perform : search, summarize. default search

mode: chunking mode : by word or by sentence or by paragraph, default by sentence

chunk_size: max tokens per chunk (default 100)

overlap: tokens overlap between chunks (default 3)

For integration, the server calls:

```bash 
// search
python main.py path/to/file.pdf [search] "user query" [mode] [chunk_size] [overlap]
```

if no user query is provided, it will query the main ideas of the document
the query returns the top 3 most relevant chunks

```bash
// summarize
python main.py path/to/file.pdf summarize [mode] [chunk_size] [overlap]
```
