# **Discord Copilot — Admin‑Controlled AI Agent**

---

## **Project Overview**

Discord Copilot is a **controlled, production‑oriented AI assistant designed specifically for Discord servers**. Unlike generic chatbots that respond to everything and behave unpredictably, this project focuses on **admin authority, reliability, and clean user experience**.

The system is built around the idea that **AI should assist teams without disrupting them**. Administrators define exactly how the AI behaves — including its tone, scope, and rules — through a web dashboard, while team members interact with the bot naturally inside Discord.

The bot does not act autonomously or spam conversations. Instead, it responds **only when explicitly mentioned** and **only in channels approved by the admin**. This makes it suitable for real‑world team environments where clarity and control matter.

At its core, Discord Copilot demonstrates how modern LLMs can be safely integrated into collaborative tools by combining:

* Centralized admin control
* Context‑aware AI responses
* Secure backend configuration
* Optional knowledge augmentation

The result is a **scalable, extensible, and reviewer‑ready AI system** that mirrors how AI assistants should function in professional software teams.

---

## **What This Project Does**

* Provides a **Discord bot** that assists teams with software‑related questions
* Gives admins a **web interface** to control the AI’s system instructions
* Restricts bot responses to **explicitly allowed Discord channels**
* Uses **conversation memory** to maintain context
* Supports **mention‑only activation** to avoid channel spam
* Includes an **optional RAG architecture** for future document‑based knowledge

---

## **Why This Project Is Useful**

In real development teams, AI bots often create noise, hallucinate answers, or behave unpredictably. Discord Copilot solves these problems by:

* Keeping AI behavior **strictly admin‑defined**
* Avoiding unsolicited replies in busy channels
* Ensuring responses stay within **software‑related scope**
* Allowing real‑time behavior updates **without redeploying the bot**

This makes the bot suitable for:

* Engineering teams
* Internal support channels
* Technical discussion servers
* Controlled AI experimentation

---

## **System Architecture**

The project is divided into three main parts:

### **1. Admin Web Console**

* Built with **React + Tailwind CSS**
* Allows admins to:

  * Define system instructions (AI personality & rules)
  * Manage allowed Discord channel IDs
  * View and reset conversation memory
* Authenticated using **Supabase Auth**

### **2. Backend & Configuration Layer**

* Powered by **Supabase (PostgreSQL)**
* Stores:

  * Admin system instructions
  * Channel allow‑lists
  * Conversation summary (rolling memory)
* Designed for **live configuration updates**

### **3. Discord Bot (Python)**

* Built using **discord.py**
* Runs continuously as an online service
* Responsibilities:

  * Listens for messages where it is mentioned
  * Verifies channel allow‑list
  * Fetches admin configuration
  * Builds AI prompt with memory and rules
  * Sends responses back to Discord

---

## **AI Response Flow**

1. A user mentions the bot in an allowed channel
2. The bot validates the channel and mention
3. Admin system instructions are fetched from Supabase
4. Conversation memory is retrieved
5. (Optional) Relevant knowledge is retrieved via RAG
6. The AI prompt is constructed
7. The LLM generates a response
8. The response is posted to Discord
9. Conversation memory is updated

This flow ensures **contextual, controlled, and predictable responses**.

---

## **Mention‑Only Interaction Design**

To maintain a professional user experience, the bot responds **only when explicitly mentioned**:

```
@DisBot how do we deploy the bot?
```

This prevents:

* Channel spam
* Accidental triggers
* Disruption of normal team conversations

This design choice significantly improves real‑world usability.

---

## **Optional RAG (Retrieval‑Augmented Generation)**

The project includes an **optional RAG architecture** that can be enabled when needed.

* Supports document chunk storage using **pgvector**
* Uses vector similarity search for relevant context
* Gracefully degrades when no documents or embeddings are available

This allows the system to evolve from a prompt‑based assistant into a **knowledge‑aware AI** without changing core bot logic.

---

## **Deployment Strategy**

* **Discord Bot**: Deployed as a long‑running Python service (e.g., Render)
* **Admin Dashboard**: Deployed as a frontend web app (e.g., Vercel)
* **Backend**: Supabase (managed PostgreSQL + Auth)

The bot runs **24/7**, independent of local machines.

---

## **How to Run the Project Locally**

Follow these steps to run both the backend (Discord bot) and frontend (Admin Dashboard) locally.

### **1. Backend (Discord Bot)**

```bash
# Go to backend directory
cd backend/bot

# Install dependencies
pip install -r requirements.txt

# Set environment variables (.env or system variables)
# DISCORD_TOKEN
# SUPABASE_URL
# SUPABASE_SERVICE_KEY
# LLM_API_KEY

# Run the bot
python bot.py
```

Once running, you should see:

```
✅ BOT READY: DisBot#XXXX
```

---

### **2. Frontend (Admin Dashboard)**

```bash
# Go to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at:

```
http://localhost:5173
```

---

## **Key Design Principles**

* **Admin control first**
* **No unsolicited AI responses**
* **Graceful failure handling**
* **Production‑safe defaults**
* **Clear separation of concerns**

---

## **Current Capabilities**

* Admin‑controlled AI behavior
* Multi‑server Discord support
* Channel‑level access control
* Conversation memory
* Optional knowledge retrieval
* Live configuration updates

---

## **Conclusion**

Discord Copilot demonstrates how an AI agent can be integrated into real team workflows **without sacrificing control, clarity, or reliability**. The system is intentionally designed to be extensible, safe, and production‑ready while remaining simple to operate and understand.

This project showcases thoughtful system design, effective AI integration, and strong attention to user experience.