# Restructure a page into topic types

**Purpose:** Split a long mixed page into concept, task, and reference topics.  
**Input:** The full page text and the target topic types.  
**Output:** A proposed split with a title and source range for each topic, and a list of content that does not fit anywhere.

## Prompt

```text
Below is a documentation page. Propose how to split it into
DITA-style topics of type concept, task, and reference.

For each proposed topic give:
- a title (a verb phrase for tasks, a noun phrase otherwise)
- the type
- the first and last sentence of the text that belongs to it
- what the reader wants to know when they open it

Do not rewrite the text. Do not drop any sentence. List any text
that does not fit a single topic under "Unplaced content".

Page:
{page}
```

## Failures to look for

- Sentences dropped or merged without being reported.
- A task topic that contains background paragraphs.
- A reference topic that still contains steps.
- Titles that repeat each other.

## Human review

Check that the union of the proposed topics covers the original text. Decide the final map myself. The model proposes boundaries, and the writer owns the information architecture.
