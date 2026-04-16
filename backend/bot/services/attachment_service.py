import httpx
import PyPDF2
import io
async def process_attachments(attachments):
    text_content = ""
    image_url = None
    for att in attachments:
        if any(att.filename.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp"]):
            image_url = att.url
            continue
        if att.filename.lower().endswith(".pdf"):
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(att.url)
                    pdf_file = io.BytesIO(response.content)
                    reader = PyPDF2.PdfReader(pdf_file)
                    for page in reader.pages:
                        text_content += page.extract_text() + "\n"
            except Exception as e:
                print(f"Error processing PDF: {e}")
            continue
        if att.filename.lower().endswith(".txt"):
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(att.url)
                    text_content += response.text + "\n"
            except Exception as e:
                print(f"Error processing TXT: {e}")
            continue
    return text_content.strip(), image_url