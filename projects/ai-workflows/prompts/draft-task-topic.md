# Draft a task topic

**Purpose:** Turn SME notes or a spec excerpt into a first-draft procedure.  
**Input:** Source text pasted by the writer, the audience, and the task goal.  
**Output:** A draft topic and a separate list of open questions.

## Prompt

```text
You are helping a technical writer draft a task topic.

Audience: {audience}
Goal of the task: {goal}

Use only the source below. Do not add steps, UI labels, menu paths,
limits, permissions, or error messages that the source does not state.
If something the reader needs is missing, do not fill the gap.
Add it to a section called "Open questions for the SME".

Write:
1. A one-sentence purpose statement.
2. Prerequisites, only if the source names them.
3. Numbered steps, one action per step, active voice.
4. The expected result after the last step.
5. "Open questions for the SME".

Source:
{source}
```

## Failures to look for

- A step, label, or value that is not in the source.
- A prerequisite the model assumed from general knowledge.
- Two actions joined in one step.
- An expected result that promises more than the source supports.

## Human review

Compare every step and label with the source, line by line. Delete anything unsupported. Send the open questions to the SME. Run the commands if they can be run.
