import discord
from discord.ext import commands
import traceback

from config.settings import DISCORD_TOKEN
from config.prompts import BASE_PROMPT
from services.supabase_service import (
    get_admin_settings,
    get_conversation_summary,
    update_conversation_summary,
)
from services.llm_service import call_llm
from services.memory_service import update_summary
from utils.channel_guard import is_channel_allowed

# 🔹 RAG ADDITION (NO EXISTING CODE CHANGED)
from services.embedding_service import embed_text
from services.rag_service import retrieve_knowledge


intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True

bot = commands.Bot(command_prefix="!", intents=intents)


@bot.event
async def on_ready():
    print("✅ BOT READY:", bot.user)


@bot.event
async def on_message(message: discord.Message):
    try:
        print("📩 MESSAGE RECEIVED:", message.content)
        print("📍 CHANNEL ID:", message.channel.id)

        if message.author.bot:
            print("⛔ Ignored bot message")
            return

        # 🔹 NEW: respond only when mentioned
        if bot.user not in message.mentions:
            print("⛔ Bot not mentioned")
            return

        settings = get_admin_settings()
        print("⚙️ SETTINGS:", settings)

        allowed_channels = settings["allowlisted_channels"]
        print("✅ ALLOWED:", allowed_channels)

        if not is_channel_allowed(message.channel.id, allowed_channels):
            print("⛔ CHANNEL NOT ALLOWED")
            return

        print("🧠 FETCHING MEMORY")
        memory = get_conversation_summary()

        # 🔹 RAG ADDITION (SAFE FALLBACK)
        query_embedding = await embed_text(message.content)
        knowledge = retrieve_knowledge(query_embedding) or "None"

        prompt = BASE_PROMPT.format(
            system_prompt=settings["system_prompt"],
            memory=memory,
            knowledge=knowledge,
            user_message=message.content,
        )

        print("🚀 CALLING LLM...")
        response = await call_llm(prompt)
        print("🤖 LLM RESPONSE:", response)

        await message.reply(response)

        new_summary = update_summary(memory, message.content, response)
        update_conversation_summary(new_summary)

        print("✅ MESSAGE SENT")

    except Exception as e:
        print("🔥 ERROR OCCURRED")
        traceback.print_exc()
        await message.reply("Internal error occurred.")

    await bot.process_commands(message)


bot.run(DISCORD_TOKEN)
