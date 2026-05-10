from supabase import create_client
from config.settings import SUPABASE_URL, SUPABASE_SERVICE_KEY
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
def get_conversation_summary():
    try:
        res = supabase.table("conversation_state").select("summary").eq("id", 1).execute()
        if res.data and len(res.data) > 0:
            return res.data[0]["summary"]
        return ""
    except Exception as e:
        print(f"Error fetching memory: {e}")
        return ""

def update_conversation_summary(summary: str):
    try:
        supabase.table("conversation_state").upsert(
            {"id": 1, "summary": summary}
        ).execute()
    except Exception as e:
        print(f"Error updating memory: {e}")

def get_document_chunks(embedding):
    res = supabase.rpc(
        "match_documents",
        {"query_embedding": embedding, "match_count": 5},
    ).execute()
    return res.data