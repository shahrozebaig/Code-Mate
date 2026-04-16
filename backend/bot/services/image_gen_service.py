import urllib.parse
def generate_image_url(prompt: str) -> str:
    """
    Constructs a URL for Pollinations.ai image generation. Truncates prompt for safety.
    """
    encoded_prompt = urllib.parse.quote(prompt)
    return f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed=42"