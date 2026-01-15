from config.settings import MAX_CONTEXT_CHARS


def update_summary(old: str, user: str, bot: str) -> str:
    new_summary = f"{old}\nUser: {user}\nBot: {bot}\n"
    return new_summary[-MAX_CONTEXT_CHARS:]
