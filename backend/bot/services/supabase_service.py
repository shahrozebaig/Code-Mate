from supabase import create_client
from config.settings import SUPABASE_URL, SUPABASE_SERVICE_KEY

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


def get_admin_settings():
    res = supabase.table("admin_settings").select("*").single().execute()
    return res.data


def get_conversation_summary():
    res = supabase.table("conversation_state").select("*").single().execute()
    return res.data["summary"]


def update_conversation_summary(summary: str):
    supabase.table("conversation_state").update(
        {"summary": summary}
    ).eq("id", 1).execute()


def get_document_chunks(embedding):
    res = supabase.rpc(
        "match_documents",
        {"query_embedding": embedding, "match_count": 5},
    ).execute()
    return res.data
