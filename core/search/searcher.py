from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from embeddings.embedder import embed_query

def semantic_search(query: str, chunks: list[str], chunk_vectors: list[list[float]], k=3):
    query_vector = embed_query(query)
    similarities = cosine_similarity([query_vector], chunk_vectors)[0]
    top_indices = np.argsort(similarities)[-k:][::-1]
    return [(chunks[i], similarities[i]) for i in top_indices]
