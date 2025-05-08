# core/run_chunking.py

import sys
from pdf_loader import extract_text_from_pdf
from text_chunker import clean_text, split_text_into_chunks

def main():
    if len(sys.argv) != 2:
        print("Usage: python run_chunking.py path/to/file.pdf")
        return

    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)
    cleaned = clean_text(text)
    chunks = split_text_into_chunks(cleaned)

    for i, chunk in enumerate(chunks[:5]):
        print(f"\n--- Chunk {i+1} ---\n{chunk}")

if __name__ == "__main__":
    main()
