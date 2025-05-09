# core/pdf_loader.py

import pdfplumber
import re

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file using pdfplumber.
    Returns the concatenated text of all pages.
    """
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"
    return text

def clean_text(text):
    """
    Cleans extracted text:
    - Removes excessive whitespace
    - Removes common header/footer patterns (simple heuristic)
    - Normalizes newlines
    """
    # Remove repeated headers/footers: lines appearing on every page
    lines = text.splitlines()
    line_counts = {}
    for line in lines:
        line_counts[line] = line_counts.get(line, 0) + 1
    # Remove lines that appear on >70% of pages
    threshold = max(2, int(0.7 * (len(lines) / 40)))  # assuming ~40 lines per page
    frequent_lines = {line for line, count in line_counts.items() if count > threshold and line.strip()}
    cleaned_lines = [line for line in lines if line.strip() and line not in frequent_lines]
    cleaned_text = "\n".join(cleaned_lines)

    # Normalize whitespace and newlines
    cleaned_text = re.sub(r'\s+\n', '\n', cleaned_text)
    cleaned_text = re.sub(r'\n{1,}', '\n', cleaned_text)  # tolerate single or multiple newlines
    cleaned_text = re.sub(r'[ \t]+', ' ', cleaned_text)
    return cleaned_text.strip()
