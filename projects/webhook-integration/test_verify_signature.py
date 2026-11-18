import hashlib
import hmac
import unittest

from verify_signature import verify_github_signature


class VerifySignatureTests(unittest.TestCase):
    def setUp(self):
        self.secret = "webhook-test-secret-01"
        self.payload = b'{"action":"opened","issue":{"number":42}}'
        digest = hmac.new(
            self.secret.encode("utf-8"),
            msg=self.payload,
            digestmod=hashlib.sha256,
        ).hexdigest()
        self.valid_header = f"sha256={digest}"

    def test_valid_signature_returns_true(self):
        self.assertTrue(
            verify_github_signature(
                self.payload, self.secret, self.valid_header
            )
        )

    def test_tampered_payload_returns_false(self):
        tampered = b'{"action":"closed","issue":{"number":42}}'
        self.assertFalse(
            verify_github_signature(
                tampered, self.secret, self.valid_header
            )
        )

    def test_missing_or_malformed_header_returns_false(self):
        self.assertFalse(
            verify_github_signature(self.payload, self.secret, None)
        )
        self.assertFalse(
            verify_github_signature(self.payload, self.secret, "sha1=abc")
        )


if __name__ == "__main__":
    unittest.main()
