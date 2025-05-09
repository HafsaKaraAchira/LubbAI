# core/text_chunker.py

import re
from typing import List

# Optional: for sentence splitting
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

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
    sentences = sent_tokenize(text)
    chunks = []
    current_chunk = []
    word_count = 0
    i = 0
    while i < len(sentences):
        sentence = sentences[i]
        words_in_sentence = len(sentence.split())
        i += chunk_size
    return chunks

def split_by_paragraphs(text: str, chunk_size: int = 3, overlap: int = 0) -> List[str]:
    # Tolerant: split on single or multiple newlines
    paragraphs = re.split(r'(?:\n\s*){1,}', text)
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

# Strategy dispatcher
def split_text(text: str, mode: str = "word", chunk_size: int = 300, overlap: int = 0) -> List[str]:
    """
    Strategy dispatcher: choose the chunking method.
    """
    if mode == "word":
        return split_by_words(text, chunk_size, overlap)
    elif mode == "sentence":
        return split_by_sentences(text, chunk_size, overlap)
    elif mode == "paragraph":
        return split_by_paragraphs(text, chunk_size, overlap)
    else:
        raise ValueError(f"Unsupported chunking mode: {mode}")
