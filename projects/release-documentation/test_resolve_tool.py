"""Regression tests for the executable-lookup migration."""

import os
from pathlib import Path
import sys
import tempfile
import unittest

from resolve_tool import resolve_tool


class ResolveToolTests(unittest.TestCase):
    def test_existing_executable(self):
        result = resolve_tool(sys.executable)
        self.assertTrue(os.path.samefile(result, sys.executable))

    def test_missing_executable(self):
        with tempfile.TemporaryDirectory() as directory:
            missing = str(Path(directory) / "missing-tool-93a1")
            with self.assertRaises(FileNotFoundError):
                resolve_tool(missing)


if __name__ == "__main__":
    unittest.main()
