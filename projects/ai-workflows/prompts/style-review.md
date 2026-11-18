# Review a topic against the style guide

**Purpose:** Get a first pass of style findings before human review.  
**Input:** The topic text and the relevant style rules, pasted in full.  
**Output:** A list of findings, each with the quoted text and the rule it breaks.

## Prompt

```text
Review the topic below against the style rules below.

For each finding give:
- the exact quoted text
- the rule it breaks
- a suggested replacement

Report only what the rules cover. Do not comment on technical
accuracy. If you are not sure a rule applies, say so instead of
reporting it.

Style rules:
{rules}

Topic:
{topic}
```

## Failures to look for

- A finding whose quoted text is not in the topic.
- Rules invented by the model.
- A suggested replacement that changes the technical meaning.
- Silence on rules that clearly apply. Check this by working through the [style checklist](../style-checklist.md) on the same text.

## Human review

Accept only findings where the quote appears in the source. Reject any replacement that alters a command, a value, or a warning.
