"""Verify a GitHub webhook HMAC-SHA256 signature."""

import hashlib
import hmac


def verify_github_signature(
    payload_body: bytes,
    secret_token: str,
    signature_header: str | None,
) -> bool:
    """Return True if signature_header matches payload_body."""
    if not signature_header or not secret_token:
        return False
    if not signature_header.startswith("sha256="):
        return False
    expected_mac = hmac.new(
        secret_token.encode("utf-8"),
        msg=payload_body,
        digestmod=hashlib.sha256,
    )
    expected_signature = "sha256=" + expected_mac.hexdigest()
    return hmac.compare_digest(expected_signature, signature_header)
