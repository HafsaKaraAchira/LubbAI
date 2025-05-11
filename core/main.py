import sys
from loader.pdf_loader import extract_text
from preprocessing.cleaner import clean_text
from preprocessing.chunker import chunk_text
from embeddings.embedder import get_embeddings, embed_query
from search.searcher import semantic_search
from summariser.summarise import summarise_text
from config import TOP_K_RESULTS

global_mode = "sentence"
global_chunk_size = 400
global_overlap = 3

def handle_pdf_query(pdf_path, user_query):
    raw_text = extract_text(pdf_path)
    cleaned = clean_text(raw_text)
    chunks = chunk_text(cleaned, mode=global_mode, chunk_size=global_chunk_size, overlap=global_overlap)    
    chunk_vectors = get_embeddings(chunks)
    query_vector = embed_query(user_query)

    # results = semantic_search(user_query, chunks, chunk_vectors, TOP_K_RESULTS)
    # combined = "\n".join([text for text, score in results])
    # summary = summarise_text(combined)
    # return {"results": results, "summary": summary}
    return {"chunks": chunks, "chunk_vectors": chunk_vectors, "query_vector": query_vector}

def print_result(result):
    '''
    Print the result of the handle_pdf_query function.
    '''
    for i , key in enumerate(result.keys()):
        print(f"\n--- {key} : {len(result[key])} items ---\n")
        if isinstance(result[key], list) and isinstance(result[key][0], list):
            for j, item in enumerate(result[key][:3]):
                print(f"\n--- {key} #{j+1} ---\n{item}\n")
        else:
            print(result[key])
        
    # print("\n--- Chunks ---\n")
    # for i, chunk_vector in enumerate(result["chunk_vectors"][:3]):
    #     print(f"\n--- Chunk {i+1} ---\n{chunk_vector}\n")
    # print("\n--- Query Vector ---\n")
    # print(result["query_vector"])


def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py path/to/file.pdf [mode]")
        return

    pdf_path = sys.argv[1]

    if len(sys.argv) > 2:
        global_mode = sys.argv[2]
    if len(sys.argv) > 3:
        global_chunk_size = sys.argv[3]
    if len(sys.argv) > 4:
        global_overlap = sys.argv[4]
    
    response = handle_pdf_query(pdf_path, "What is the main idea of the document?")
    # for i, (chunk, score) in enumerate(response["results"]):
    #     print(f"\n[Match {i+1}] (Score: {score:.4f})\n{chunk}")
    # print("\n[Summary]:\n", response["summary"])
    # print_result(response)


if __name__ == "__main__":
    main()
    
