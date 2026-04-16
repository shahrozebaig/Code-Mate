import httpx
import os
GROQ_API_KEY = os.getenv("LLM_API_KEY")
GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"
async def call_llm(prompt: str, image_url: str = None) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    model = "llama-3.1-8b-instant"
    messages = [{"role": "user", "content": prompt}]

    if image_url:
        model = "meta-llama/llama-4-scout-17b-16e-instruct"
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ]
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 1024,
    }
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(GROQ_ENDPOINT, json=payload, headers=headers)
        if response.status_code != 200:
            raise Exception(f"GROQ ERROR: {response.text}")
        data = response.json()
        return data["choices"][0]["message"]["content"]