# Prompt playbook for MadCap Flare and multi-source inputs

Use these prompts in Cursor when turning Jira tickets, Confluence specs, Microsoft Teams transcripts, SME emails, demo videos, and QA environment checks into MadCap Flare topics.

## 1. Epic-to-documentation gap analysis (Jira + Confluence + Flare TOC)

**When to use:** At sprint planning or feature kickoff to identify which Flare topics and snippets need updates.

```text
Compare the Jira epic and Confluence specification below against
@Project/TOCs/Online-Help.fltoc and the matching topics in @Content/.

Produce a documentation plan with four sections:
1. Existing Flare topics (.htm) and snippets (.flsnp) to update.
2. New topics required and where they belong in the TOC.
3. Reusable variables (.flvar) or snippets to use instead of copying text.
4. Open questions for the PM or engineer where the spec or ticket is silent.

Do not edit any files yet.

Source material:
{paste Jira epic, child stories, and Confluence spec excerpt}
```

## 2. Extract verified facts from Teams transcripts, emails, and demo video notes

**When to use:** After a feature walkthrough or SME email thread, before drafting XML in Flare.

```text
Read the raw notes below from the Teams meeting transcript, SME email
thread, and demo video timestamps.

Extract a structured fact sheet with:
1. User roles and permissions mentioned.
2. Exact UI navigation paths and button or field labels shown in the demo.
3. Preconditions, limits, defaults, and error messages stated by the SME.
4. Contradictions between the older Confluence spec and the newer demo or
   email thread.
5. Unanswered questions that still need QA check or SME confirmation.

Do not invent steps that were not demonstrated or stated.

Raw inputs:
{paste transcript excerpt, email thread, and video timestamp notes}
```

## 3. Draft or update a MadCap Flare topic (.htm)

**When to use:** When drafting a new procedure or updating an existing `.htm` topic after gathering sources.

```text
Update @Content/Topics/{target-topic.htm} using the structural pattern in
@Content/Topics/{exemplar-topic.htm} and the rules in
@.cursor/rules/madcap-flare.mdc.

Apply only the verified facts below.
- Preserve all existing MadCap:conditions, MadCap:variable, MadCap:xref,
  and MadCap:snippetBlock tags.
- Use third-person role-based voice (the administrator, the operator).
- Do not use long dashes or semicolons.
- Where a UI label or limit is not yet verified in QA, insert an XHTML
  comment <!-- TODO SME: ... --> and list it in the final summary.

Verified facts:
{paste the reviewed fact sheet and QA observations}
```

## 4. Reconcile draft topic against the QA environment

**When to use:** When the feature reaches the QA build and you inspect the live screen.

```text
Compare @Content/Topics/{target-topic.htm} against these QA environment
observations:

{paste exact QA field names, button labels, menu path, and behavior}

1. Update any drifted UI labels, navigation paths, or step sequences in
   the .htm file so they match the QA build.
2. List any differences between the Confluence spec and the QA build so I
   can log a Jira bug or confirm with the PM.
3. Recommend which steps need a new screenshot or callout update.
```

## 5. Draft customer-facing release notes from Jira fix versions

**When to use:** Before release cut to turn Jira tickets into customer-facing release notes.

```text
Read the Jira issues below for release {version}. Draft the release notes
topic in @Content/Release-Notes/Release-{version}.htm.

Group entries under:
- New features
- Enhancements
- Fixed issues
- Known issues

Rules:
- State what changed for the operator or administrator and what action is
  required.
- Omit internal Jira keys, branch names, and engineering refactoring items.
- Flag any ticket whose customer impact is unclear as an SME question.

Jira issues:
{paste exported Jira list or fetched MCP issue summaries}
```
