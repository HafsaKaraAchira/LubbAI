# core/pdf_loader.py

import PyPDF2

def extract_text_from_pdf(path):
    with open(path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        return '\n'.join(page.extract_text() for page in reader.pages)
