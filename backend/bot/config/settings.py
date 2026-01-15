import os
from dotenv import load_dotenv

load_dotenv()

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

LLM_API_KEY = os.getenv("LLM_API_KEY")

MAX_CONTEXT_CHARS = 4000
RAG_TOP_K = 5
