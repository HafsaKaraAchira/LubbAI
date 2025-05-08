# core/text_chunker.py

import re

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

def split_text_into_chunks(text, chunk_size=300):
    words = text.split()
    return [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
