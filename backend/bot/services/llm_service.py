import httpx
import os
GROQ_API_KEY = os.getenv("LLM_API_KEY")
GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"
async def call_llm(user_prompt: str, system_prompt: str = "You are a helpful assistant.", image_url: str = None) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    model = "llama-3.1-70b-versatile" # Upgrading to a larger model for better reasoning if available
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    if image_url:
        model = "llama-3.2-11b-vision-preview" # Using a standard vision model name
        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_prompt},
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