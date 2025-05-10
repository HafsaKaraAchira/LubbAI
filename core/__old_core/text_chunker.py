# core/text_chunker.py

import re
from typing import List
import spacy

# Load multilingual spaCy model globally (loads once)
try:
    nlp = spacy.load("xx_sent_ud_sm")
except OSError:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "xx_sent_ud_sm"])
    nlp = spacy.load("xx_sent_ud_sm")

# clean text function
def clean_text(text: str) -> str:
    """
    Clean and normalize spacing in the text.
    """
    return re.sub(r'\s+', ' ', text).strip()

# Strategy dispatcher
def split_by_words(text: str, chunk_size: int = 300, overlap: int = 0) -> List[str]:
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

def split_by_sentences(text: str, chunk_size: int = 300, overlap: int = 0) -> List[str]:
    """
    Split text into chunks by sentences, each chunk <= chunk_size words.
    Overlap is by number of sentences (no more than specified), and both constraints are enforced.
    """
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]
    chunks = []
    n = len(sentences)
    i = 0
    while i < n:
        current_chunk = []
        word_count = 0
        j = i
        # Add sentences until adding another would exceed chunk_size words
        while j < n and word_count + len(sentences[j].split()) <= chunk_size:
            current_chunk.append(sentences[j])
            word_count += len(sentences[j].split())
            j += 1
        if current_chunk:
            chunks.append(' '.join(current_chunk))
        # For next chunk, start with last `overlap` sentences of current chunk (if any)
        if overlap > 0 and current_chunk:
            # Find how many sentences in the current chunk
            num_sent = len(current_chunk)
            # If the chunk is smaller than overlap, just move forward (no duplicate chunks)
            if num_sent > overlap:
                i = j - overlap
            else:
                i = j
        else:
            i = j
    return chunks
    return chunks

def split_by_paragraphs(text: str, chunk_size: int = 3, overlap: int = 0) -> List[str]:
    """
    Split text into chunks by paragraphs, up to chunk_size paragraphs per chunk.
    """
    paragraphs = re.split(r'(?:\n\s*){1,}', text)  # split on 2+ newlines
    paragraphs = [p.strip() for p in paragraphs if p.strip()]
    chunks = []
    i = 0
    while i < len(paragraphs):
        chunk = paragraphs[i:i + chunk_size]
        chunks.append('\n'.join(chunk))
        if overlap > 0:
            i += chunk_size - overlap
        else:
            i += chunk_size
    return chunks

def chunk_text(text: str, mode: str = "sentence", chunk_size: int = 300, overlap: int = 0) -> list:
    """
    Flexible chunking dispatcher. Mode can be 'sentence', 'paragraph', or 'word'.
    """
    if mode == "word":
        return split_by_words(text, chunk_size, overlap)
    elif mode == "sentence":
        return split_by_sentences(text, chunk_size, overlap)
    elif mode == "paragraph":
        return split_by_paragraphs(text, chunk_size, overlap)
    else:
        raise ValueError(f"Unsupported chunking mode: {mode}")
