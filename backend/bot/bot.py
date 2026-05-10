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
from services.image_gen_service import generate_image_url
from services.youtube_service import search_youtube_video
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
        if message.author.bot:
            return
        is_dm = isinstance(message.channel, discord.DMChannel)
        if not is_dm and not bot.user.mentioned_in(message):
            return
        clean_content = message.content
        if bot.user.mentioned_in(message):
            clean_content = clean_content.replace(f'<@!{bot.user.id}>', '').replace(f'<@{bot.user.id}>', '').strip()
        print("📩 MESSAGE RECEIVED:", clean_content)
        print("📍 CHANNEL ID:", message.channel.id)
        if clean_content == "!clear":
            supabase_service.update_conversation_summary("")
            await message.reply("🧠 Memory cleared!")
            return
        print("🧠 FETCHING MEMORY")
        memory = supabase_service.get_conversation_summary()

        print("📎 CHECKING ATTACHMENTS")
        doc_text, image_url = await process_attachments(message.attachments)

        query_embedding = await embed_text(clean_content)
        knowledge = retrieve_knowledge(query_embedding) or "None"

        # Construct System Prompt
        system_instructions = [
            "You are CodeMate, a helpful and accurate AI assistant.",
            "Provide clear, direct answers to the user's questions.",
            "For technical terms like RAG or LLM, use their Artificial Intelligence definitions.",
            "Use the provided context to stay accurate. Avoid making up information.",
            "",
            "SPECIAL COMMANDS:",
            "1. IMAGE_GEN: Start with 'IMAGE_GEN: {prompt}' if asked for an image.",
            "2. VIDEO_LINK: Start with 'VIDEO_LINK: {query}' if asked for a video.",
        ]

        if memory:
            system_instructions.append(f"\nCONVERSATION SUMMARY (MEMORY):\n{memory}")
        
        if knowledge and knowledge != "None":
            system_instructions.append(f"\nDOCUMENT KNOWLEDGE (RAG):\n{knowledge[:2000]}")

        full_system_prompt = "\n".join(system_instructions)

        # Construct User Prompt
        user_prompt = clean_content
        if doc_text:
            user_prompt = f"ATTACHED DOCUMENT CONTENT:\n{doc_text[:3000]}\n\nUSER QUESTION: {clean_content}"

        print("🚀 CALLING LLM...")
        response = await call_llm(user_prompt, system_prompt=full_system_prompt, image_url=image_url)
        print("🤖 LLM RESPONSE:", response)
        if response.startswith("IMAGE_GEN:"):
            try:
                lines = response.split("\n")
                img_prompt = lines[0].replace("IMAGE_GEN:", "").strip()
                caption = "\n".join(lines[1:]).strip() if len(lines) > 1 else "🎨 Here is your generated image:"
                img_url = generate_image_url(img_prompt)
                embed = discord.Embed(
                    title="Image Generated", 
                    description=f"**Prompt:** {img_prompt}",
                    color=discord.Color.random()
                )
                embed.set_image(url=img_url)
                embed.set_footer(text="Powered by Pollinations.ai")
                await message.reply(content=caption, embed=embed)
                return
            except Exception as e:
                print(f"Image Gen Error: {e}")
        if response.startswith("VIDEO_LINK:"):
            try:
                lines = response.split("\n")
                video_query = lines[0].replace("VIDEO_LINK:", "").strip()
                caption = "\n".join(lines[1:]).strip() if len(lines) > 1 else "✅ Found the video for you:"
                video_url = await search_youtube_video(video_query)
                if video_url:
                    await message.reply(f"{caption}\n{video_url}")
                else:
                    await message.reply("I searched YouTube but couldn't find a matching video link. Please try again with a different query!")
                return
            except Exception as e:
                print(f"Video Search Error: {e}")
        chunks = split_message(response)
        await message.reply(chunks[0])
        for chunk in chunks[1:]:
            await message.channel.send(chunk)
        new_summary = update_summary(memory, clean_content, response)
        supabase_service.update_conversation_summary(new_summary)
        print("✅ MESSAGE SENT")
    except Exception as e:
        print("🔥 ERROR OCCURRED")
        traceback.print_exc()
        await message.reply("Internal error occurred.")
    await bot.process_commands(message)
bot.run(DISCORD_TOKEN)