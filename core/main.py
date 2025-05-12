import sys
import json
from loader.pdf_loader import extract_text
from preprocessing.cleaner import clean_text
from preprocessing.chunker import chunk_text
from embeddings.embedder import get_embeddings
from search.searcher import semantic_search
from summariser.summarise import summarise_text
from config import TOP_K_RESULTS

global_mode = "sentence"
global_chunk_size = 70
global_overlap = 1



def print_json(data):
    print(json.dumps(data, ensure_ascii=False))

def handle_pdf_query(pdf_path, user_query, operation="search"):
    raw_text = extract_text(pdf_path)
    cleaned = clean_text(raw_text)    
    
    # search operation
    if operation == "search":
        chunks = chunk_text(cleaned, mode=global_mode, chunk_size=global_chunk_size, overlap=global_overlap)
        chunk_vectors = get_embeddings(chunks)
        results = semantic_search(user_query, chunks, chunk_vectors, TOP_K_RESULTS)
        return results
    # summarise operation
    elif operation == "summarise":
       summary = summarise_text(cleaned)
       return {"summary": clean_text(summary)}
    else:
        raise ValueError(f"Unknown operation: {operation}")

def print_semantic_search_result(result):
    '''
    Print the result of the semantic_search function.
    '''
    for i, (chunk, score) in enumerate(result["results"]):
        print(f"\n[Match {i+1}] (Score: {score:.4f})\n{chunk}")

def print_summarise_result(result):
    '''
    Print the result of the summarise_text function.
    '''
    print("\n[Summary]:\n", result["summary"])

def print_result(result):
    '''
    Print the result of the handle_pdf_query function.
    '''
    for i , key in enumerate(result.keys()):
        print(f"\n--- {key} : {len(result[key])} items ---\n")
        if isinstance(result[key], list) and (isinstance(result[key][0], list) or isinstance(result[key][0], tuple)):
            for j, item in enumerate(result[key][:3]):
                print(f"\n--- {key} #{j+1} ---\n{item}\n")
        else:
            print(result[key])

# main function
def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py path/to/file.pdf [mode]")
        return

    pdf_path = sys.argv[1]

    operation = "search"
    if len(sys.argv) > 2:
        operation = sys.argv[2]

    if operation not in ["search", "summarise"]:
        print("Invalid operation. Use 'search' or 'summarise'.",file=sys.stderr)
        return

    user_query = ""
    if operation == "search":
        if len(sys.argv) > 3:
            user_query = sys.argv[3]
        # else:
        #     user_query = input("Enter your query: ")    
        if user_query == "":
            user_query = "What is the main idea of the document?"

    if len(sys.argv) > 4:
        global_mode = sys.argv[4]
    if len(sys.argv) > 5:
        global_chunk_size = sys.argv[5]
    if len(sys.argv) > 6:
        global_overlap = sys.argv[6]
    

    try:
        response = handle_pdf_query(pdf_path, user_query, operation)
        print(f"operation : {operation} completed successfully, lookup the response",file=sys.stderr)
        print_json(response)
    except Exception as e:
        print_json({"error": str(e)})
        sys.exit(1)

    # response = handle_pdf_query(pdf_path, user_query, operation)
    # print_result(response)
    # if operation == "search":
    #     print_semantic_search_result(response)
    # elif operation == "summarise":
    #     print_summarise_result(response)


# run the main function
if __name__ == "__main__":
    main()
    



    # print("\n--- Chunks ---\n")
    # for i, chunk_vector in enumerate(result["chunk_vectors"][:3]):
    #     print(f"\n--- Chunk {i+1} ---\n{chunk_vector}\n")
    # print("\n--- Query Vector ---\n")
    # print(result["query_vector"])


