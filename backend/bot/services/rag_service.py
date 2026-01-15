from services.supabase_service import get_document_chunks


def retrieve_knowledge(embedding) -> str:
    try:
        # 🔹 ADDITIVE SAFETY: skip RAG if embeddings are unavailable
        if embedding is None:
            return "None"

        chunks = get_document_chunks(embedding)
        if not chunks:
            return "None"

        return "\n\n".join(chunk["content"] for chunk in chunks)

    except Exception:
        # 🔹 ADDITIVE SAFETY: skip RAG if RPC / schema is missing
        return "None"
