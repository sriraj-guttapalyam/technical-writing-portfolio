# Review map

A short guide to where each documentation skill shows up in this repository, and how each sample is checked.

## Four flagship samples

| Flagship | What to review | Validation evidence |
| --- | --- | --- |
| [API reference](projects/api-reference/README.md) | Parameters, pagination, nullable fields, error recovery, and client examples | Public GitHub endpoint, cited vendor references, and syntax-checked Python and JavaScript |
| [Webhook integration](projects/webhook-integration/README.md) | Security-first sequence, constant-time HMAC verification, and retry handling | Synchronized source helper and automated unit tests |
| [Docs as code](projects/docs-as-code/README.md) | Focused change workflow, automated checks, and review responsibilities | Repository checker, pull-request workflow, and Docusaurus production build |
| [AI documentation case study](projects/ai-ready-content/README.md) | Chunking rules, metadata, retrieval baseline, and stated limitations | Dated 27-question log, [AI workflow disclosure](projects/ai-workflows/README.md), and [authorship record](projects/portfolio-evidence/README.md) |

## Where to look for each skill

| Skill | Where it shows |
| --- | --- |
| Audience and scope | Every sample names its reader, task, and limits in the first lines. |
| Task design | [RBAC administration](projects/rbac-administration/README.md), [in-app guidance](projects/in-app-guidance/README.md), [cloud operations](projects/cloud-user-guide/README.md), and [hardware setup](projects/hardware-installation/README.md) put prerequisites before steps and verification after. |
| UX writing and in-app engagement | [Role-targeted MFA onboarding walkthrough, release banner, JSON spec, and completion analytics](projects/in-app-guidance/README.md). |
| API documentation | [API reference](projects/api-reference/README.md), [OpenAPI description](projects/openapi-reference/README.md), [webhook integration](projects/webhook-integration/README.md), and [gRPC architecture](projects/grpc-architecture/README.md). |
| Information architecture | [Doc set design](projects/doc-architecture/README.md) and the concept, task, and reference split in [structured authoring](projects/structured-authoring/README.md). |
| Content reuse | DITA keys in the structured-authoring map. Reuse rules in the architecture sample. |
| AI-ready content | [Chunking, metadata, and a hand-run retrieval test](projects/ai-ready-content/README.md), plus the root [`llms.txt`](llms.txt) index. |
| AI in the workflow | [Process, prompts, and agent rules](projects/ai-workflows/README.md), plus [Cursor + MadCap Flare training guide](projects/cursor-flare-workflow/README.md). |
| Troubleshooting | Tables that separate evidence from diagnosis in the cloud, webhook, RBAC, and Kubernetes samples. |
| Safety and security | Warnings before destructive steps, least-privilege role guardrails, and constant-time HMAC webhook verification. No embedded credentials in examples. |
| Docs as code | [CI check, review model, and worked change review](projects/docs-as-code/README.md). |
| Release communication | [Compatibility notice](projects/release-documentation/README.md) and [release notes](projects/release-notes/README.md). |

## Reading paths

- **Developer documentation:** API reference, webhook integration, docs-as-code validation, then the supporting OpenAPI description.
- **Product documentation:** RBAC administration, cloud operations, hardware setup, then release notes.
- **AI documentation:** AI-ready content, AI workflows, `llms.txt`, then the authorship and validation record.
- **Architecture or leadership:** Docs as code, doc set design, then the governance table in the architecture sample.

## Conventions

Headings use sentence case and task headings start with a verb. Commands, file names, and literal values use code formatting. UI labels are bold. Warnings come before the action that can cause harm. Procedures in developer samples address the reader directly. Enterprise administration procedures use third-person role-based wording. Numbered steps describe actions, and a result line says what the reader should see.

The style follows the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) with two house rules from the [style checklist](projects/ai-workflows/style-checklist.md): no long dashes and no semicolons in prose.

## How the samples are checked

`python tools/check_portfolio.py` runs these checks:

- Local Markdown links resolve, headings are well formed, and code fences close.
- Python and XML examples parse.
- DITA references and keys resolve, and the excerpts in the READMEs match the source files.
- The migration, webhook verification, and in-app guidance unit tests pass.

The checks do not test live systems, external URLs, DITA schema validity, or the printed PDF. Commands in the procedures are taken from the cited vendor references and have not been run against a customer environment. A technical reviewer would verify them in the target environment before publication.
