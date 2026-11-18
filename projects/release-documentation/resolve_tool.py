"""Resolve an executable without importing distutils."""

from shutil import which


def resolve_tool(command: str) -> str:
    """Return the executable path, or raise FileNotFoundError."""
    resolved = which(command)
    if resolved is None:
        raise FileNotFoundError(f"Executable not found: {command}")
    return resolved
