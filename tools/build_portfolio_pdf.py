"""Build the portfolio PDF from the reviewed Markdown sources.

Requires reportlab. Run from the repository root:
    python tools/build_portfolio_pdf.py
"""

from html import escape
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate,
    Paragraph, Preformatted, Spacer, Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "Technical Writing Portfolio Guide.pdf"
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

SOURCES = [
    ("README.md", "Professional profile"),
    ("PORTFOLIO_CONTENT_GUIDE.md", "Review map"),
    ("projects/ai-ready-content/README.md", "AI-ready content"),
    ("projects/ai-workflows/README.md", "AI workflows"),
    ("projects/cursor-flare-workflow/README.md", "Cursor + MadCap Flare"),
    ("projects/doc-architecture/README.md", "Information architecture"),
    ("projects/openapi-reference/README.md", "OpenAPI description"),
    ("projects/rbac-administration/README.md", "RBAC administration"),
    ("projects/cloud-user-guide/README.md", "Cloud operations"),
    ("projects/api-reference/README.md", "REST API reference"),
    ("projects/webhook-integration/README.md", "Webhook integration"),
    ("projects/grpc-architecture/README.md", "gRPC architecture"),
    ("projects/structured-authoring/README.md", "Structured authoring"),
    ("projects/docs-as-code/README.md", "Docs as code"),
    ("projects/release-documentation/README.md", "Release documentation"),
    ("projects/hardware-installation/README.md", "Hardware setup"),
    ("projects/release-notes/README.md", "Release notes"),
]
ANCHORS = {(ROOT / path).resolve(): f"section-{index}" for index, (path, _) in enumerate(SOURCES)}

styles = {
    "body": ParagraphStyle(
        "Body", fontName=FONT, fontSize=10.4, leading=13.6,
        textColor=INK, spaceAfter=6, allowWidows=0, allowOrphans=0,
    ),
    "h1": ParagraphStyle(
        "H1", fontName="Helvetica-Bold", fontSize=21, leading=25,
        textColor=NAVY, spaceAfter=12, keepWithNext=True,
    ),
    "h2": ParagraphStyle(
        "H2", fontName="Helvetica-Bold", fontSize=13, leading=17,
        textColor=NAVY, spaceBefore=8, spaceAfter=5, keepWithNext=True,
    ),
    "h3": ParagraphStyle(
        "H3", fontName="Helvetica-Bold", fontSize=11, leading=14,
        textColor=TEAL, spaceBefore=8, spaceAfter=5, keepWithNext=True,
    ),
    "cell": ParagraphStyle(
        "Cell", fontName=FONT, fontSize=9.2, leading=11.5,
        textColor=INK, spaceAfter=0,
    ),
    "table_head": ParagraphStyle(
        "TableHead", fontName="Helvetica-Bold", fontSize=9.2,
        leading=12, textColor=colors.white,
    ),
    "code": ParagraphStyle(
        "Code", fontName=MONO, fontSize=9.0, leading=11.0,
        textColor=INK, spaceAfter=0,
    ),
    "small": ParagraphStyle(
        "Small", fontName=FONT, fontSize=9, leading=12,
        textColor=GRAY, spaceAfter=8,
    ),
    "title": ParagraphStyle(
        "Title", fontName="Helvetica-Bold", fontSize=30, leading=34,
        textColor=NAVY, spaceAfter=10,
    ),
    "subtitle": ParagraphStyle(
        "Subtitle", fontName=FONT, fontSize=16, leading=21,
        textColor=TEAL, spaceAfter=10,
    ),
}
styles["list"] = ParagraphStyle(
    "List", parent=styles["body"], leftIndent=15, firstLineIndent=-15,
    spaceAfter=5,
)
styles["reference"] = ParagraphStyle(
    "Reference", parent=styles["small"], fontSize=9, leading=11.5,
    leftIndent=10, firstLineIndent=-10, spaceAfter=2,
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
            return protect(f'<link href="{escape(target, quote=True)}" color="#087E8B">{label_html}</link>')
        local = (source.parent / unquote(parsed.path)).resolve()
        if local == OUTPUT.resolve():
            return protect(f'<link href="#cover" color="#087E8B">{label_html}</link>')
        if local in ANCHORS:
            return protect(f'<link href="#{ANCHORS[local]}" color="#087E8B">{label_html}</link>')
        return protect(label_html)

    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, text)
    text = re.sub(
        chr(96) + r"([^" + chr(96) + r"]+)" + chr(96),
        lambda m: protect(f'<font name="{MONO}" size="9">{escape(m.group(1))}</font>'),
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
    for line in code.splitlines():
        if stringWidth(line, MONO, styles["code"].fontSize) > max_width:
            raise ValueError(f"Code line too wide ({language}): {line}")
    code_flow = Preformatted(code, styles["code"])
    table = Table([[code_flow]], colWidths=[CONTENT_WIDTH], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return [table, Spacer(1, 9)]


def markdown_table(lines, source):
    rows = [
        [cell.strip() for cell in line.strip().strip("|").split("|")]
        for line in lines
    ]
    rows = [row for row in rows if not all(re.fullmatch(r":?-+:?", c) for c in row)]
    count = len(rows[0])
    if count == 2:
        widths = [CONTENT_WIDTH * 0.29, CONTENT_WIDTH * 0.71]
    elif count == 3:
        widths = [CONTENT_WIDTH * 0.23, CONTENT_WIDTH * 0.22, CONTENT_WIDTH * 0.55]
        if rows[0][0] == "Topic":
            widths = [CONTENT_WIDTH * 0.15, CONTENT_WIDTH * 0.42, CONTENT_WIDTH * 0.43]
    else:
        widths = [CONTENT_WIDTH / count] * count
    data = []
    for index, row in enumerate(rows):
        style = styles["table_head" if index == 0 else "cell"]
        data.append([Paragraph(inline(cell, source), style) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PALE]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
        ("LINEBELOW", (0, 1), (-1, -1), 0.3, LINE),
    ]))
    return [table, Spacer(1, 9)]


def read_markdown(relative, toc_title):
    source = ROOT / relative
    lines = source.read_text(encoding="utf-8").splitlines()
    result = []
    index = 0
    in_references = False
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
            if language != "mermaid":  # diagrams render on GitHub only
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
            in_references = title == "References"
            if relative == "README.md" and level == 1:
                title = "Professional profile"
            p = paragraph(title, source, f"h{level}")
            if level == 1:
                p.toc_entry = (toc_title, ANCHORS[source.resolve()])
            result.append(p)
            index += 1
            continue
        item = re.match(r"^(-|\d+\.) (.+)", line)
        if item:
            prefix = "-" if item.group(1) == "-" else item.group(1)
            kind = "reference" if in_references else "list"
            result.append(paragraph(prefix + "  " + item.group(2), source, kind))
            index += 1
            continue
        group = [line]
        index += 1
        while index < len(lines) and lines[index].strip() and not re.match(
            r"^(#|\||- |\d+\. |<!--)", lines[index]
        ) and not lines[index].startswith(FENCE):
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


class PortfolioDoc(BaseDocTemplate):
    def afterFlowable(self, flowable):
        entry = getattr(flowable, "toc_entry", None)
        if entry:
            title, anchor = entry
            self.canv.bookmarkPage(anchor)
            self.canv.addOutlineEntry(title, anchor, level=0)
            self.notify("TOCEntry", (0, title, self.page, anchor))


def page_chrome(canvas, doc):
    canvas.saveState()
    canvas.setTitle("Technical writing portfolio - Sriraj Guttapalyam")
    canvas.setAuthor("Sriraj Guttapalyam")
    canvas.setSubject("Professional profile and fifteen technical writing samples")
    canvas.setCreator("Portfolio document builder")
    if doc.page == 1:
        canvas.bookmarkPage("cover")
        canvas.setFillColor(TEAL)
        canvas.rect(0, HEIGHT - 14, WIDTH, 14, fill=1, stroke=0)
    else:
        canvas.setFillColor(GRAY)
        canvas.setFont(FONT, 8)
        canvas.drawString(MARGIN, HEIGHT - 31, "SRIRAJ GUTTAPALYAM")
        canvas.drawRightString(WIDTH - MARGIN, HEIGHT - 31, "TECHNICAL WRITING PORTFOLIO")
        canvas.setStrokeColor(LINE)
        canvas.line(MARGIN, HEIGHT - 38, WIDTH - MARGIN, HEIGHT - 38)
    canvas.setStrokeColor(LINE)
    canvas.line(MARGIN, 38, WIDTH - MARGIN, 38)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(GRAY)
    canvas.drawString(MARGIN, 24, "Portfolio edition | September 30, 2026")
    canvas.drawRightString(WIDTH - MARGIN, 24, str(doc.page))
    canvas.restoreState()


def build():
    doc = PortfolioDoc(
        str(OUTPUT), pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=50, bottomMargin=48,
        title="Technical writing portfolio",
        author="Sriraj Guttapalyam",
    )
    frame = Frame(
        MARGIN, 48, CONTENT_WIDTH, HEIGHT - 98,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    doc.addPageTemplates(PageTemplate(id="portfolio", frames=frame, onPage=page_chrome))
    toc = TableOfContents()
    toc.levelStyles = [ParagraphStyle(
        "Contents", fontName=FONT, fontSize=9.5, leading=11.0,
        textColor=INK, spaceBefore=1, spaceAfter=1, leftIndent=0, firstLineIndent=0,
    )]
    toc.dotsMinLevel = 0
    story = [
        Spacer(1, 2),
        Paragraph("Technical writing<br/>portfolio", styles["title"]),
        Paragraph("Sriraj Guttapalyam", styles["subtitle"]),
        Paragraph(
            "Senior technical writer | Cloud software, APIs, structured content, "
            "and operational documentation",
            styles["body"],
        ),
        Spacer(1, 2),
        Paragraph(
            "Fifteen complete samples show how I document a task, explain an interface, "
            "structure reusable content, and define a useful verification step. "
            "Each example identifies its scope and links to the product sources "
            "needed to check it.",
            styles["body"],
        ),
        Paragraph(
            "The samples use public technologies and are separate from employer "
            "deliverables. Companion code and DITA files are included in the "
            "portfolio folder.",
            styles["small"],
        ),
        Spacer(1, 4),
        Paragraph("In this guide", styles["h2"]),
        toc,
        Spacer(1, 6),
        paragraph(
            "[Email](mailto:Sriraj.guttapalyam@gmail.com) | "
            "[LinkedIn](https://www.linkedin.com/in/sriraj-guttapalyam) | "
            "Bengaluru, India",
            ROOT / "README.md",
            "small",
        ),
    ]
    for relative, title in SOURCES:
        story.append(PageBreak())
        story.extend(read_markdown(relative, title))
    doc.multiBuild(story)
    print(f"Built: {OUTPUT}")


if __name__ == "__main__":
    build()
