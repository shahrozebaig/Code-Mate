import httpx
import os

GROQ_API_KEY = os.getenv("LLM_API_KEY")

async def embed_text(text: str):
    payload = {
        "model": "text-embedding-3-small",
        "input": text
    }

    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(
                "https://api.groq.com/openai/v1/embeddings",
                json=payload,
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"}
            )
            return res.json()["data"][0]["embedding"]

        except Exception:
            # 🔹 Graceful fallback when embeddings are unsupported (Groq limitation)
            return None
