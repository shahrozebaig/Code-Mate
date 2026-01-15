def is_channel_allowed(channel_id: int, allowed_channels: list[str]) -> bool:
    return str(channel_id) in allowed_channels
