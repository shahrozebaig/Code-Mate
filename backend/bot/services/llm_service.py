import httpx
import os

GROQ_API_KEY = os.getenv("LLM_API_KEY")
GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"


async def call_llm(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": "You are a helpful Discord copilot."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.3,
        "max_tokens": 512,
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(GROQ_ENDPOINT, json=payload, headers=headers)

        if response.status_code != 200:
            raise Exception(f"GROQ ERROR: {response.text}")

        data = response.json()
        return data["choices"][0]["message"]["content"]
