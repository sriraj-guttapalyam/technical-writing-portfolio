"""Check the portfolio's local sources without network access."""

import ast
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FENCE = chr(96) * 3
EXCLUDED_PROJECT_DIRS = {
    "dogbench",
    "ai-documentation-mastery",
    "ai-ready-llms-txt-tutorial",
    "developer-documentation-masterclass",
    "markdown-for-technical-writers",
}


def blocks(text):
    """Return (language, content) pairs; reject an unclosed fence."""
    active = None
    lines = []
    result = []
    for line in text.splitlines():
        if line.startswith(FENCE):
            if active is None:
                active = line[3:].strip()
                lines = []
            else:
                result.append((active, "\n".join(lines)))
                active = None
        elif active is not None:
            lines.append(line)
    if active is not None:
        raise ValueError("Unclosed code fence")
    return result


def check_sources(root):
    errors = []
    project_readmes = [
        p for p in sorted(root.glob("projects/*/README.md"))
        if p.parent.name not in EXCLUDED_PROJECT_DIRS
    ]
    markdown = sorted(root.glob("*.md")) + project_readmes
    snippets = {}
    for path in markdown:
        label = path.relative_to(root).as_posix()
        text = path.read_text(encoding="utf-8")
        try:
            snippets[label] = blocks(text)
        except ValueError as exc:
            errors.append(f"{label}: {exc}")
            continue
        plain = re.sub(r"(?ms)^" + FENCE + r".*?^" + FENCE + r"\s*$", "", text)
        headings = re.findall(r"(?m)^(#{1,6})\s+(.+)$", plain)
        if sum(level == "#" for level, _ in headings) != 1:
            errors.append(f"{label}: expected one level-one heading")
        previous = 0
        for level, title in headings:
            if len(level) > previous + 1:
                errors.append(f"{label}: heading level skipped at {title}")
            previous = len(level)
        plain_no_inline = re.sub(r"`+[^`\n]*`+", "", plain)
        for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", plain_no_inline):
            parsed = urlsplit(target)
            if parsed.scheme or not parsed.path:
                continue
            resolved = (path.parent / unquote(parsed.path)).resolve()
            if not resolved.is_relative_to(root.resolve()):
                errors.append(f"{label}: link escapes repository: {target}")
            elif not resolved.exists():
                errors.append(f"{label}: missing link target: {target}")
        for language, code in snippets[label]:
            try:
                if language == "python":
                    ast.parse(code)
                elif language == "xml":
                    ET.fromstring(code)
                elif language == "json":
                    json.loads(code)
            except (SyntaxError, ET.ParseError, json.JSONDecodeError) as exc:
                errors.append(f"{label}: invalid {language} example: {exc}")
        for number, line in enumerate(text.splitlines(), 1):
            if line.startswith("+curl") or line.startswith("+  --"):
                errors.append(f"{label}:{number}: patch marker in sample")

    source = root / "projects/structured-authoring/source"
    trees = {}
    ids = set()
    for path in sorted(source.glob("*")):
        if path.suffix not in {".dita", ".ditamap"}:
            continue
        try:
            tree = ET.parse(path)
            trees[path.name] = tree
            for element in tree.iter():
                identifier = element.get("id")
                if identifier:
                    if identifier in ids:
                        errors.append(f"{path.name}: duplicate id {identifier}")
                    ids.add(identifier)
        except ET.ParseError as exc:
            errors.append(f"{path.name}: {exc}")

    map_tree = trees.get("rollout.ditamap")
    if map_tree is None:
        errors.append("Missing or invalid rollout.ditamap")
    else:
        keys = {
            key for element in map_tree.iter()
            for key in element.get("keys", "").split()
        }
        for element in map_tree.iter():
            href = element.get("href")
            if href and not (source / href).is_file():
                errors.append(f"rollout.ditamap: missing topic {href}")
        for name, tree in trees.items():
            for element in tree.iter():
                key = element.get("keyref")
                if key and key not in keys:
                    errors.append(f"{name}: undefined key {key}")

    synchronized = {
        "projects/docs-as-code/README.md": [
            ".github/workflows/docs-check.yml"
        ],
        "projects/structured-authoring/README.md": [
            "projects/structured-authoring/source/rollout.ditamap",
            "projects/structured-authoring/source/check-rollout.dita",
        ],
        "projects/webhook-integration/README.md": [
            "projects/webhook-integration/verify_signature.py",
        ],
        "projects/in-app-guidance/README.md": [
            "projects/in-app-guidance/onboarding-tour.json",
        ],
    }
    for document, paths in synchronized.items():
        contents = [code.strip() for _, code in snippets.get(document, [])]
        for relative in paths:
            path = root / relative
            if not path.is_file():
                errors.append(f"Missing source: {relative}")
            elif path.read_text(encoding="utf-8").strip() not in contents:
                errors.append(f"{document}: excerpt differs from {relative}")

    python_paths = sorted(root.glob("tools/*.py"))
    python_paths += [
        p for p in sorted(root.glob("projects/**/*.py"))
        if p.relative_to(root).parts[1] not in EXCLUDED_PROJECT_DIRS
    ]
    for path in python_paths:
        try:
            ast.parse(path.read_text(encoding="utf-8"))
        except SyntaxError as exc:
            errors.append(f"{path.relative_to(root)}: {exc}")
    return errors, len(markdown), len(trees)


def main():
    errors, document_count, xml_count = check_sources(ROOT)
    if errors:
        for error in errors:
            print(f"FAIL: {error}")
        return 1
    for test_dir in [
        "projects/release-documentation",
        "projects/webhook-integration",
        "projects/in-app-guidance",
    ]:
        result = subprocess.run(
            [
                sys.executable, "-B", "-m", "unittest", "discover",
                "-s", test_dir, "-p", "test_*.py",
            ],
            cwd=ROOT,
            check=False,
        )
        if result.returncode:
            return 1
    print(
        f"PASS: {document_count} Markdown documents; "
        f"{xml_count} DITA sources; Python syntax; synchronized excerpts."
    )
    print("PASS: migration and webhook verification unit tests.")
    print("Not checked: live systems, external links, DITA schema, or PDF layout.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
