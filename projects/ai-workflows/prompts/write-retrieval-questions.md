# Write retrieval test questions

**Purpose:** Produce questions a reader might ask, for testing how well a search or retrieval system finds answers.  
**Input:** One topic and the audience.  
**Output:** Questions in the reader's own words, each with the exact phrase in the topic that answers it.

## Prompt

```text
Read the topic below. Write 8 questions a {audience} might type into
a search box. Use everyday wording. Do not copy phrases from the topic.
Include at least two questions that use a different word from the
topic for the same idea, such as "undo" where the topic says "roll back".

For each question, quote the shortest exact phrase from the topic
that answers it. If the topic does not answer a question, write
"NOT ANSWERED" instead of a phrase.

Topic:
{topic}
```

## Failures to look for

- Questions that reuse the topic's exact wording, which make the test too easy.
- A quoted phrase that is not in the topic.
- Questions the topic cannot answer, which are useful as content-gap findings.

## Human review

Verify every quoted phrase by searching the topic for it. Have someone who did not write the topic read the questions and remove any that feel unnatural. Questions marked "NOT ANSWERED" become candidate content gaps.
