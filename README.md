# CodeMate: Public Discord AI Assistant

CodeMate is a high-performance, public AI assistant designed for seamless integration within any Discord server or direct messaging environment. It provides intelligent, context-aware responses by leveraging modern Large Language Models (LLMs) combined with sophisticated memory management and retrieval systems.

## Key Features

- **Public Accessibility**: The bot is designed for universal deployment. It functions across all Discord servers and private messages without requiring administrative setup or complicated channel whitelisting.
- **Contextual Memory**: Utilizes a rolling conversation summary stored in a Supabase backend to maintain context over long discussions, ensuring coherent and relevant assistance.
- **Document & File Support**: Automatically extracts text from attached PDF and TXT files, allowing the bot to answer questions based on the content of your documents.
- **Vision Capabilities**: Processes image attachments using advanced vision models, enabling the assistant to "see" and describe images or answer questions about their content.
- **Retrieval-Augmented Generation (RAG)**: Integrates a vector database for document-based retrieval, allowing the assistant to ground its answers in specific knowledge bases or uploaded documents.
- **Unrestricted Interaction**: Configured to provide comprehensive answers across a wide range of topics, acting as a versatile knowledge companion.

## System Architecture

The project consists of a streamlined backend architecture centered around performance and reliability.

### Core Components

1.  **Discord Interface (Python)**: Built with discord.py, the bot manages real-time interactions and message processing.
2.  **Intelligence Layer (Groq & Llama)**: Powered by Llama 3 models via Groq for ultra-fast, high-quality response generation.
3.  **Data Layer (Supabase)**:
    - **PostgreSQL**: Stores conversation states and summaries.
    - **pgvector**: Manages document embeddings for RAG retrieval.

## Interaction Model

The bot follows a direct and responsive interaction pattern:

- **Servers**: Responds to all messages in the channels it has access to, allowing for continuous participation in team discussions.
- **Direct Messages**: Provides private, one-on-one assistance directly to users.

## Local Development

### Prerequisites

- Python 3.8+
- Supabase Project (with pgvector enabled)
- Groq API Key
- Discord Bot Token

### Installation

1.  Navigate to the bot directory:
    ```bash
    cd backend/bot
    ```

2.  Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3.  Configure environment variables in a .env file:
    - DISCORD_TOKEN
    - SUPABASE_URL
    - SUPABASE_SERVICE_KEY
    - LLM_API_KEY

4.  Execute the bot:
    ```bash
    python bot.py
    ```

## Conclusion

CodeMate represents a robust approach to deploying AI within collaborative platforms. By prioritizing accessibility and intelligence, it serves as a powerful utility for teams and individuals seeking immediate, contextually-aware information.