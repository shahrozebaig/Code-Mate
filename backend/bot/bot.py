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
        if doc_text:
            print("📄 DOCUMENT TEXT EXTRACTED")
            truncated_doc = doc_text[:3000] + "..." if len(doc_text) > 3000 else doc_text
            user_msg = f"{clean_content}\n\nATTACHED DOCUMENT CONTENT (TRUNCATED):\n{truncated_doc}"
        else:
            user_msg = clean_content
        prompt_parts = []
        if image_url:
            prompt_parts.append("CRITICAL: Analyzing the attached image is your top priority. Ignore any unrelated conversation history below and answer based on the visual content.")
        if doc_text:
            prompt_parts.append(f"The user has provided a document (see 'ATTACHED DOCUMENT CONTENT' in the user message).")
        prompt_parts.append(f"USER REQUEST: {clean_content}")
        prompt_parts.append("\nINSTRUCTIONS: Answer the request directly. Use your general knowledge for everything else. Never apologize for missing memory.")
        prompt_parts.append("If the user wants you to create, generate, or draw an image, your response MUST start with 'IMAGE_GEN: {description of the image}' followed by a brief confirmation.")
        prompt_parts.append("If the user asks for a video, music, or song, your response MUST start with 'VIDEO_LINK: {search query}'. For the search query, prioritize official or most popular versions (e.g., add 'official music video' or 'original'). After that, provide ONLY a single short sentence like 'Enjoy!' or 'Here is the official video:'. NEVER include tips or mention 'Picture-in-Picture'.")
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