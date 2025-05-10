import re
from typing import List, Set
from collections import Counter

PAGE_NUMBER_PATTERNS = [
    r'^\s*\d+\s*$',                  # 1, 23
    r'^\s*-\s*\d+\s*-\s*$',        # -1-, -23-
    r'^\s*Page\s*\d+\s*$',          # Page 1
    r'^\s*PAGE\s*\d+\s*$',          # PAGE 1
    r'^\s*\d+\s*/\s*\d+\s*$',     # 1/12
    r'^\s*Page\s*\d+\s*/\s*\d+\s*$', # Page 1/12
    r'^\s*\d+\s*$'                   # 1, 2, 3 (again, for safety)
]

def is_page_number(line: str) -> bool:
    # Use re.search to match page number patterns anywhere in the line
    return any(re.search(pat, line.strip(), re.I) for pat in PAGE_NUMBER_PATTERNS)

def find_repeated_lines_in_scope(pages: List[str], n_top=5, n_bottom=5, min_freq=0.1):
    """
    Find repeated lines in the top/bottom N lines of each page and repeated page number lines.
    Returns sets of repeated header lines, footer lines, and page number lines.
    """
    n_pages = len(pages)
    top_lines, bottom_lines, page_number_lines = [], [], []
    for page in pages:
        lines = [l.strip() for l in page.splitlines() if l.strip()]
        top_lines.extend(lines[:n_top])
        bottom_lines.extend(lines[-n_bottom:])
        page_number_lines.extend([l for l in lines[-n_bottom:] if is_page_number(l)])
    top_counts = Counter(top_lines)
    bottom_counts = Counter(bottom_lines)
    page_number_counts = Counter(page_number_lines)
    top_repeated = {line for line, count in top_counts.items() if count >= int(min_freq * n_pages)}
    bottom_repeated = {line for line, count in bottom_counts.items() if count >= int(min_freq * n_pages)}
    repeated_page_numbers = {line for line, count in page_number_counts.items() if count >= int(min_freq * n_pages)}
    return top_repeated, bottom_repeated, repeated_page_numbers

def is_chapter_header(line: str) -> bool:
    # Detect chapter headers like 'CHAPTER 1', 'Chapter 2', etc.
    return bool(re.search(r'^\s*chapter\s*\d+', line, re.I))

def remove_headers_footers_page_numbers(pages: List[str], n_top=1, n_bottom=1, window=4, min_local_repeats=2) -> List[str]:
    """
    Removes headers, footers, page numbers, and chapter headers from each page.
    - Any line matching a page number or chapter header pattern is removed.
    - Optionally, repeated headers/footers can be removed as before.
    Args:
        pages: List of page texts (each as a string)
        n_top: Number of top lines to consider as header candidates
        n_bottom: Number of bottom lines to consider as footer/page number candidates
        window: Number of pages to consider in local window (e.g., 4)
        min_local_repeats: Minimum local repeats to consider a line a header/footer (default 2)
    Returns:
    """
    cleaned_pages = []
    num_pages = len(pages)
    split_pages = [page.splitlines() for page in pages]

    for idx, lines in enumerate(split_pages):
        start = 0
        end = len(lines)

        # Remove headers (top N lines): repeated or chapter header, or page number (pattern match only)
        for i in range(min(n_top, end)):
            line = lines[i].strip()
            # Remove if page number pattern (no repetition check)
            if is_page_number(line):
                start += 1
                continue
            # Remove if repeated or chapter header
            count = 0
            for j in range(max(0, idx - window // 2), min(num_pages, idx + window // 2 + 1)):
                if j == idx:
                    continue
                other_lines = split_pages[j]
                if len(other_lines) > i and other_lines[i].strip() == line:
                    count += 1
            if (line and count >= min_local_repeats - 1): # or is_chapter_header(line):
                start += 1
            else:
                break

        # Remove footers (bottom N lines): repeated or page number (pattern match only)
        new_end = end
        for i in range(1, min(n_bottom, end - start) + 1):
            line = lines[-i].strip()
            # Remove if page number pattern (no repetition check)
            if is_page_number(line):
                new_end -= 1
                continue
            # Remove if repeated
            count = 0
            for j in range(max(0, idx - window // 2), min(num_pages, idx + window // 2 + 1)):
                if j == idx:
                    continue
                other_lines = split_pages[j]
                if len(other_lines) >= i and other_lines[-i].strip() == line:
                    count += 1
            if line and count >= min_local_repeats - 1:
                new_end -= 1
            else:
                break

        cleaned = [l for l in lines[start:new_end]]
        cleaned_pages.append('\n'.join(cleaned))
    # print(cleaned_pages[1])
    return cleaned_pages

def clean_text(text: str) -> str:
    """
    Cleans extracted text:
    - Removes excessive whitespace
    - Normalizes newlines and spaces
    """
    cleaned_text = re.sub(r'\s+', ' ', text)
    cleaned_text = re.sub(r'\s+\n', '\n', cleaned_text)
    cleaned_text = re.sub(r'\n{2,}', '\n', cleaned_text)
    cleaned_text = re.sub(r'[ \t]+', ' ', cleaned_text)
    return cleaned_text.strip()


# '''
#     lines = text.splitlines()
#     line_counts = {}
#     for line in lines:
#         line_counts[line] = line_counts.get(line, 0) + 1
#     # Remove lines that appear on >70% of pages (heuristic)
#     threshold = max(2, int(0.7 * (len(lines) / 40)))
#     frequent_lines = {line for line, count in line_counts.items() if count > threshold and line.strip()}
#     cleaned_lines = [line for line in lines if line.strip() and line not in frequent_lines]
#     cleaned_text = "\n".join(cleaned_lines)
#     # Normalize whitespace and newlines
#     cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
# '''