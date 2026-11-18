"""Build the standalone Cursor + MadCap Flare training guide PDF.

Run from the repository root:
    python projects/cursor-flare-workflow/build_pdf.py
"""

from html import escape
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents

HERE = Path(__file__).resolve().parent
OUTPUT = HERE / "Cursor-MadCap-Flare-Training-Guide.pdf"
WIDTH, HEIGHT = A4
MARGIN = 46
CONTENT_WIDTH = WIDTH - MARGIN * 2
NAVY = colors.HexColor("#163044")
TEAL = colors.HexColor("#087E8B")
INK = colors.HexColor("#22343F")
GRAY = colors.HexColor("#536873")
PALE = colors.HexColor("#F1F5F7")
LINE = colors.HexColor("#CFDCE2")
FONT = "Helvetica"
MONO = "Courier"
mono_path = Path("C:/Windows/Fonts/consola.ttf")
if mono_path.is_file():
    pdfmetrics.registerFont(TTFont("Consolas", str(mono_path)))
    MONO = "Consolas"
FENCE = chr(96) * 3

SECTIONS = [
    ("README.md", "1. Workflow guide: Cursor and MadCap Flare"),
    ("multi-source-prompts.md", "2. Prompt playbook for multi-source inputs"),
    ("madcap-flare-rules.mdc", "3. Cursor rule file for MadCap Flare"),
]
ANCHORS = {
    (HERE / name).resolve(): f"section-{index}"
    for index, (name, _) in enumerate(SECTIONS)
}

styles = {
    "body": ParagraphStyle(
        "Body",
        fontName=FONT,
        fontSize=10.2,
        leading=13.5,
        textColor=INK,
        spaceAfter=6,
        allowWidows=0,
        allowOrphans=0,
    ),
    "h1": ParagraphStyle(
        "H1",
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=NAVY,
        spaceAfter=10,
        keepWithNext=True,
    ),
    "h2": ParagraphStyle(
        "H2",
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=NAVY,
        spaceBefore=8,
        spaceAfter=5,
        keepWithNext=True,
    ),
    "h3": ParagraphStyle(
        "H3",
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=TEAL,
        spaceBefore=7,
        spaceAfter=4,
        keepWithNext=True,
    ),
    "cell": ParagraphStyle(
        "Cell",
        fontName=FONT,
        fontSize=9.0,
        leading=11.5,
        textColor=INK,
        spaceAfter=0,
    ),
    "table_head": ParagraphStyle(
        "TableHead",
        fontName="Helvetica-Bold",
        fontSize=9.0,
        leading=11.5,
        textColor=colors.white,
    ),
    "code": ParagraphStyle(
        "Code",
        fontName=MONO,
        fontSize=8.8,
        leading=10.8,
        textColor=INK,
        spaceAfter=0,
    ),
    "small": ParagraphStyle(
        "Small",
        fontName=FONT,
        fontSize=9,
        leading=12,
        textColor=GRAY,
        spaceAfter=8,
    ),
    "title": ParagraphStyle(
        "Title",
        fontName="Helvetica-Bold",
        fontSize=28,
        leading=33,
        textColor=NAVY,
        spaceAfter=12,
    ),
    "subtitle": ParagraphStyle(
        "Subtitle",
        fontName=FONT,
        fontSize=15,
        leading=20,
        textColor=TEAL,
        spaceAfter=14,
    ),
}
styles["list"] = ParagraphStyle(
    "List",
    parent=styles["body"],
    leftIndent=15,
    firstLineIndent=-15,
    spaceAfter=4,
)


def inline(text, source):
    tokens = []

    def protect(html):
        tokens.append(html)
        return f"\x01{len(tokens) - 1}\x02"

    def link(match):
        label, target = match.groups()
        parsed = urlsplit(target)
        label_html = escape(label)
        if parsed.scheme in {"https", "http", "mailto"}:
            url_escaped = escape(target, quote=True)
            return protect(
                f'<link href="{url_escaped}" color="#087E8B">'
                f"{label_html}</link>"
            )
        local = (source.parent / unquote(parsed.path)).resolve()
        if local in ANCHORS:
            return protect(
                f'<link href="#{ANCHORS[local]}" color="#087E8B">'
                f"{label_html}</link>"
            )
        return protect(label_html)

    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, text)
    text = re.sub(
        chr(96) + r"([^" + chr(96) + r"]+)" + chr(96),
        lambda m: protect(
            f'<font name="{MONO}" size="8.8">{escape(m.group(1))}</font>'
        ),
        text,
    )
    text = escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    for index, html in enumerate(tokens):
        text = text.replace(f"\x01{index}\x02", html)
    return text


def paragraph(text, source, kind="body"):
    return Paragraph(inline(text, source), styles[kind])


def code_block(code, language):
    max_width = CONTENT_WIDTH - 20
    wrapped_lines = []
    for line in code.splitlines():
        while stringWidth(line, MONO, styles["code"].fontSize) > max_width:
            wrapped_lines.append(line[:82])
            line = "  " + line[82:]
        wrapped_lines.append(line)
    code_flow = Preformatted("\n".join(wrapped_lines), styles["code"])
    table = Table([[code_flow]], colWidths=[CONTENT_WIDTH], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return [table, Spacer(1, 8)]


def markdown_table(lines, source):
    rows = [
        [cell.strip() for cell in line.strip().strip("|").split("|")]
        for line in lines
    ]
    rows = [
        row for row in rows if not all(re.fullmatch(r":?-+:?", c) for c in row)
    ]
    count = len(rows[0])
    if count == 3:
        widths = [
            CONTENT_WIDTH * 0.24,
            CONTENT_WIDTH * 0.36,
            CONTENT_WIDTH * 0.40,
        ]
    elif count == 4:
        widths = [
            CONTENT_WIDTH * 0.24,
            CONTENT_WIDTH * 0.23,
            CONTENT_WIDTH * 0.25,
            CONTENT_WIDTH * 0.28,
        ]
    else:
        widths = [CONTENT_WIDTH / count] * count
    data = []
    for index, row in enumerate(rows):
        style = styles["table_head" if index == 0 else "cell"]
        data.append([Paragraph(inline(cell, source), style) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PALE]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
                ("LINEBELOW", (0, 1), (-1, -1), 0.3, LINE),
            ]
        )
    )
    return [table, Spacer(1, 8)]


def read_markdown(filename, toc_title):
    source = HERE / filename
    raw = source.read_text(encoding="utf-8")
    if raw.startswith("---\n"):
        parts = raw.split("---\n", 2)
        if len(parts) == 3:
            raw = parts[2]
    lines = raw.splitlines()
    result = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue
        if line == "<!-- pagebreak -->":
            result.append(PageBreak())
            index += 1
            continue
        if line.startswith(FENCE):
            language = line[3:]
            code = []
            index += 1
            while index < len(lines) and not lines[index].startswith(FENCE):
                code.append(lines[index])
                index += 1
            if language != "mermaid":
                result.extend(code_block("\n".join(code), language))
            index += 1
            continue
        if line.startswith("|"):
            group = []
            while index < len(lines) and lines[index].startswith("|"):
                group.append(lines[index])
                index += 1
            result.extend(markdown_table(group, source))
            continue
        heading = re.match(r"^(#{1,3}) (.+)", line)
        if heading:
            level = len(heading.group(1))
            title = heading.group(2)
            p = paragraph(title, source, f"h{level}")
            if level == 1:
                p.toc_entry = (toc_title, ANCHORS[source.resolve()])
            result.append(p)
            index += 1
            continue
        item = re.match(r"^(-|\d+\.) (.+)", line)
        if item:
            prefix = "-" if item.group(1) == "-" else item.group(1)
            result.append(
                paragraph(prefix + "  " + item.group(2), source, "list")
            )
            index += 1
            continue
        group = [line]
        index += 1
        while (
            index < len(lines)
            and lines[index].strip()
            and not re.match(r"^(#|\||- |\d+\. |<!--)", lines[index])
            and not lines[index].startswith(FENCE)
        ):
            group.append(lines[index])
            index += 1
        text = ""
        for number, part in enumerate(group):
            text += part.strip()
            if number < len(group) - 1:
                text += "\x03" if part.endswith("  ") else " "
        html = inline(text, source).replace("\x03", "<br/>")
        result.append(Paragraph(html, styles["body"]))
    return result


class TrainingDoc(BaseDocTemplate):
    def afterFlowable(self, flowable):
        entry = getattr(flowable, "toc_entry", None)
        if entry:
            title, anchor = entry
            self.canv.bookmarkPage(anchor)
            self.canv.addOutlineEntry(title, anchor, level=0)
            self.notify("TOCEntry", (0, title, self.page, anchor))


def page_chrome(canvas, doc):
    canvas.saveState()
    canvas.setTitle("Cursor + MadCap Flare Training Guide - Sriraj Guttapalyam")
    canvas.setAuthor("Sriraj Guttapalyam")
    canvas.setSubject(
        "Training guide for technical writers using Cursor and MadCap Flare"
    )
    if doc.page == 1:
        canvas.bookmarkPage("cover")
        canvas.setFillColor(TEAL)
        canvas.rect(0, HEIGHT - 14, WIDTH, 14, fill=1, stroke=0)
    else:
        canvas.setFillColor(GRAY)
        canvas.setFont(FONT, 8)
        canvas.drawString(
            MARGIN, HEIGHT - 31, "CURSOR + MADCAP FLARE TRAINING GUIDE"
        )
        canvas.drawRightString(
            WIDTH - MARGIN, HEIGHT - 31, "SRIRAJ GUTTAPALYAM"
        )
        canvas.setStrokeColor(LINE)
        canvas.line(MARGIN, HEIGHT - 38, WIDTH - MARGIN, HEIGHT - 38)
    canvas.setStrokeColor(LINE)
    canvas.line(MARGIN, 38, WIDTH - MARGIN, 38)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(GRAY)
    canvas.drawString(
        MARGIN, 24, "Technical Writer Training Guide | October 2026"
    )
    canvas.drawRightString(WIDTH - MARGIN, 24, str(doc.page))
    canvas.restoreState()


def build():
    doc = TrainingDoc(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=50,
        bottomMargin=48,
        title="Accelerate MadCap Flare authoring with Cursor",
        author="Sriraj Guttapalyam",
    )
    frame = Frame(
        MARGIN,
        48,
        CONTENT_WIDTH,
        HEIGHT - 98,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates(
        PageTemplate(id="training", frames=frame, onPage=page_chrome)
    )
    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(
            "Contents",
            fontName=FONT,
            fontSize=10.5,
            leading=16,
            textColor=INK,
            spaceBefore=6,
            leftIndent=0,
            firstLineIndent=0,
        )
    ]
    toc.dotsMinLevel = 0
    story = [
        Spacer(1, 24),
        Paragraph(
            "Accelerate MadCap Flare<br/>authoring with Cursor",
            styles["title"],
        ),
        Paragraph(
            "Training guide for technical writers working with multi-source "
            "engineering inputs",
            styles["subtitle"],
        ),
        Paragraph(
            "How to turn scattered inputs from Jira, Confluence, Microsoft "
            "Teams meetings, SME emails, demo videos, demo software, and "
            "live QA environments into verified MadCap Flare XHTML topics, "
            "snippets, and release notes.",
            styles["body"],
        ),
        Spacer(1, 10),
        Paragraph("In this training guide", styles["h2"]),
        toc,
        Spacer(1, 24),
        Paragraph(
            "Author: Sriraj Guttapalyam | Senior Technical Writer",
            styles["small"],
        ),
    ]
    for filename, title in SECTIONS:
        story.append(PageBreak())
        story.extend(read_markdown(filename, title))
    doc.multiBuild(story)
    print(f"Built: {OUTPUT}")


if __name__ == "__main__":
    build()
