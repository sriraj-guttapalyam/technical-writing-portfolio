# Review authorship and validation evidence

This record explains how the four flagship samples were created and what their checks prove. It does not reconstruct review history that did not occur, and it does not present portfolio samples as employer deliverables.

## Responsibility boundary

I selected the subjects, audiences, scope, task sequence, warnings, examples, and validation boundaries. AI tools assisted with restructuring, alternative wording, test ideas, and draft review. I accepted, revised, or rejected that output and remain responsible for every published claim.

AI assistance does not replace source verification. Public vendor documentation, repository source files, automated tests, and explicitly identified fictional requirements provide the evidence available here. Employer-confidential material was not used.

## Flagship evidence

| Sample | Writer-owned decisions | AI-assisted work | Evidence and checks | Known limitations |
| --- | --- | --- | --- | --- |
| [API reference](../api-reference/README.md) | Endpoint scope, reader tasks, parameter explanations, pagination sequence, security boundaries, and error-recovery structure | Draft review, wording alternatives, and code-review suggestions | GitHub REST references, manual requests described in the sample, and syntax checks for fenced Python and JavaScript | No automated live API test. Public repository results change over time. |
| [Webhook integration](../webhook-integration/README.md) | Security-first sequence, raw-body requirement, acknowledgement boundary, deduplication guidance, and troubleshooting scope | Test-case suggestions and draft review | Source helper synchronized with the guide, Python syntax checks, and automated unit tests | The sample tests signature verification, not a deployed HTTP receiver, queue, or secret rotation system. |
| [Docs as code](../docs-as-code/README.md) | Check scope, review roles, workflow sequence, failure policy, and stated publication limits | Check implementation assistance and draft review | `tools/check_portfolio.py`, synchronized source excerpts, unit tests, pull-request workflow, and Docusaurus production build | CI does not prove technical truth, usability, external-link availability, or live product behavior. Repository rules remain separately configured. |
| [AI documentation case study](../ai-ready-content/README.md) | Chunking rules, metadata fields, evaluation questions, scoring decisions, limitations, and next steps | Restructuring suggestions, retrieval-question suggestions, and draft review | Dated 27-question author-scored baseline, metadata schema, prompt library, style checklist, and explicit evidence status | Round 2 is pending. The baseline is not an independent test or production RAG benchmark. |

## Reproduce the automated checks

From the repository root, run:

```text
python tools/check_portfolio.py
```

Then build the published portal:

```text
cd website
npm ci
npm run build
```

The Python check validates local links, headings, code fences, selected code syntax, DITA references, synchronized excerpts, and included unit tests. The Docusaurus build validates the documentation routes and fails on broken internal site links.

## Evidence still requiring people

- A technical reviewer must verify commands and behavior in the target environment.
- A second writer or user should create a held-out retrieval question set and score the results independently.
- A hiring reviewer should evaluate whether the information selection, sequence, tone, and limitations fit the target role.
- Employer experience claims require the normal employment and reference checks. They are separate from these public samples.
