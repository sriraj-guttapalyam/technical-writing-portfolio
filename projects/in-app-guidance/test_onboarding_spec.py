"""Validate the in-app guidance JSON specification and UX copy budgets."""

import json
from pathlib import Path
import unittest

SPEC_PATH = Path(__file__).resolve().parent / "onboarding-tour.json"
MAX_TITLE_CHARS = 52
MAX_BODY_CHARS = 150


class TestOnboardingSpec(unittest.TestCase):
    def setUp(self):
        self.spec = json.loads(SPEC_PATH.read_text(encoding="utf-8"))

    def test_guides_have_targeting_and_telemetry(self):
        guides = self.spec.get("guides", [])
        self.assertGreaterEqual(len(guides), 2)
        seen_guide_ids = set()
        for guide in guides:
            guide_id = guide["guideId"]
            self.assertNotIn(guide_id, seen_guide_ids)
            seen_guide_ids.add(guide_id)
            self.assertIn("requiredRole", guide["targeting"])
            self.assertIn("releaseFlag", guide)
            self.assertIn("dismissEvent", guide["telemetry"])

    def test_walkthrough_steps_follow_ux_copy_and_selector_rules(self):
        walkthrough = next(
            g for g in self.spec["guides"] if g["type"] == "walkthrough"
        )
        step_ids = set()
        for index, step in enumerate(walkthrough["steps"], start=1):
            step_id = step["stepId"].strip()
            self.assertEqual(step_id, step["stepId"], "Leading/trailing spaces in stepId")
            self.assertNotIn(step_id, step_ids)
            step_ids.add(step_id)
            self.assertEqual(step["stepNumber"], index)
            self.assertTrue(step["dismissible"])
            self.assertTrue(step["selector"].startswith("[data-tour-id="))
            self.assertLessEqual(len(step["title"]), MAX_TITLE_CHARS)
            self.assertLessEqual(len(step["body"]), MAX_BODY_CHARS)
            self.assertTrue(step["docsPath"].startswith("/docs/"))

    def test_banner_is_dismissible_and_concise(self):
        banner = next(g for g in self.spec["guides"] if g["type"] == "banner")
        note = banner["announcement"]
        self.assertTrue(note["dismissible"])
        self.assertLessEqual(len(note["title"]), MAX_TITLE_CHARS)
        self.assertLessEqual(len(note["body"]), MAX_BODY_CHARS)


if __name__ == "__main__":
    unittest.main()
