import httpx
import re
import urllib.parse
async def search_youtube_video(query: str) -> str:
    """
    Searches YouTube for the given query and returns the first video link found.
    Uses a simple regex search on the search results page.
    """
    try:
        query_fixed = f"{query} official -shorts"
        encoded_query = urllib.parse.quote(query_fixed)
        search_url = f"https://www.youtube.com/results?search_query={encoded_query}&sp=EgIQAQ%253D%253D"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(search_url, headers=headers)
            if response.status_code == 200:
                match = re.search(r"\"videoRenderer\":\{\"videoId\":\"([a-zA-Z0-9_-]{11})\"", response.text)
                if match:
                    video_id = match.group(1)
                    return f"https://www.youtube.com/watch?v={video_id}"
                match = re.search(r"\"/watch\?v=([a-zA-Z0-9_-]{11})\"", response.text)
                if match:
                    video_id = match.group(1)
                    return f"https://www.youtube.com/watch?v={video_id}"
    except Exception as e:
        print(f"YouTube Search Error: {e}")
    return None