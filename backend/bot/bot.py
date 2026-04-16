import discord
from discord.ext import commands
import traceback
from config.settings import DISCORD_TOKEN
from services import supabase_service
from services.llm_service import call_llm
from services.memory_service import update_summary
from services.embedding_service import embed_text
from services.rag_service import retrieve_knowledge
from services.attachment_service import process_attachments
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
bot = commands.Bot(command_prefix="!", intents=intents)
def split_message(text, limit=1900):
    return [text[i:i + limit] for i in range(0, len(text), limit)]
@bot.event
async def on_ready():
    print("✅ BOT READY:", bot.user)
@bot.event
async def on_message(message: discord.Message):
    try:
        print("📩 MESSAGE RECEIVED:", message.content)
        print("📍 CHANNEL ID:", message.channel.id)
        if message.content.strip() == "!clear":
            supabase_service.update_conversation_summary("")
            await message.reply("🧠 Memory cleared!")
            return
        if message.author.bot:
            print("⛔ Ignored bot message")
            return
        is_dm = isinstance(message.channel, discord.DMChannel)
        print("🧠 FETCHING MEMORY")
        memory = supabase_service.get_conversation_summary()
        print("📎 CHECKING ATTACHMENTS")
        doc_text, image_url = await process_attachments(message.attachments)
        query_embedding = await embed_text(message.content)
        knowledge = retrieve_knowledge(query_embedding) or "None"
        if doc_text:
            print("📄 DOCUMENT TEXT EXTRACTED")
            truncated_doc = doc_text[:3000] + "..." if len(doc_text) > 3000 else doc_text
            user_msg = f"{message.content}\n\nATTACHED DOCUMENT CONTENT (TRUNCATED):\n{truncated_doc}"
        else:
            user_msg = message.content
        prompt_parts = []
        if image_url:
            prompt_parts.append("CRITICAL: Analyzing the attached image is your top priority. Ignore any unrelated conversation history below and answer based on the visual content.")
        if doc_text:
            prompt_parts.append(f"The user has provided a document (see 'ATTACHED DOCUMENT CONTENT' in the user message).")
        prompt_parts.append(f"USER REQUEST: {message.content}")
        prompt_parts.append("\nINSTRUCTIONS: Answer the request directly. Use your general knowledge for everything else. Never apologize for missing memory.")
        if not image_url:
            short_memory = memory[:1500] if memory else ""
            if short_memory.strip():
                prompt_parts.append(f"\nRELEVANT CONTEXT (FOR REFERENCE ONLY):\n{short_memory}")
            if knowledge and knowledge != "None":
                short_knowledge = knowledge[:1500]
                prompt_parts.append(f"\nADDITIONAL KNOWLEDGE:\n{short_knowledge}")
        full_system_prompt = "\n\n".join(prompt_parts)
        print(f"📏 PROMPT LENGTH: {len(full_system_prompt)} chars")
        print("🚀 CALLING LLM...")
        response = await call_llm(full_system_prompt, image_url=image_url)
        print("🤖 LLM RESPONSE:", response)
        chunks = split_message(response)
        await message.reply(chunks[0])
        for chunk in chunks[1:]:
            await message.channel.send(chunk)
        new_summary = update_summary(memory, message.content, response)
        supabase_service.update_conversation_summary(new_summary)
        print("✅ MESSAGE SENT")
    except Exception as e:
        print("🔥 ERROR OCCURRED")
        traceback.print_exc()
        await message.reply("Internal error occurred.")
    await bot.process_commands(message)
bot.run(DISCORD_TOKEN)