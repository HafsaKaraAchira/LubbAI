# core/run_chunking.py

import sys
from pdf_loader import extract_text_from_pdf
from text_chunker import clean_text, chunk_text

def print_chunks(chunks):
    for i, chunk in enumerate(chunks[:5]):
        print(f"\n--- Chunk {i+1} ---\n{chunk}\n")

def main():
    if len(sys.argv) < 2:
        print("Usage: python run_chunking.py path/to/file.pdf [mode]",file=sys.stderr)
        return

    pdf_path = sys.argv[1]
    mode = sys.argv[2] if len(sys.argv) > 2 else "sentence"  # default mode
    chunk_size = 300
    overlap = 5  # adjust as needed

    text = extract_text_from_pdf(pdf_path)
    cleaned = clean_text(text)
    chunks = chunk_text(cleaned, mode=mode, chunk_size=chunk_size, overlap=overlap)

    print_chunks(chunks)

if __name__ == "__main__":
    main()
