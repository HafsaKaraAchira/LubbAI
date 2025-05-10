import fitz  # PyMuPDF
from preprocessing.cleaner import remove_headers_footers_page_numbers

def extract_text(pdf_path: str) -> str:
    """
    Extracts text from a PDF file using PyMuPDF (fitz), removes repeated headers/footers/page numbers per page, and returns the cleaned text.
    """
    doc = fitz.open(pdf_path)
    pages = [page.get_text() for page in doc]
    # print(pages[0])
    cleaned_pages = remove_headers_footers_page_numbers(pages)
    return "\n".join(cleaned_pages)
