# Sriraj Guttapalyam

## Senior technical writer | Docs-as-code, API documentation, AI-ready content, in-app guidance, DITA/XML

Senior technical writer with 10+ years across SaaS cloud platforms, enterprise security and compliance software, industrial automation, and connected hardware. I design and write developer, IT administrator, API, in-app onboarding, installation, and troubleshooting content that stays aligned with rolling releases and works for both human readers and AI retrieval systems (RAG). My toolkit spans GitHub docs-as-code (Markdown, Docusaurus, CI/CD checks), MadCap Flare, DITA/XML, prompt engineering, and in-app user guidance.

Currently at Picarro, I author the Fenceline Monitoring Cloud User Guide, Administrator Guide, and Site Operations Guide, prototype in-app user guidance, and validate every UI flow against live builds before release. Previously I documented Oracle Financial Sanctions across SaaS and on-premises deployments, Honeywell enterprise automation software and field instruments, and clinical and industrial systems at Cyient.

**Based in:** Bengaluru, India (Remote & Hybrid/Onsite)  
**Contact:** [Sriraj.guttapalyam@gmail.com](mailto:Sriraj.guttapalyam@gmail.com) | [LinkedIn](https://www.linkedin.com/in/sriraj-guttapalyam) | [Live Documentation Portal](https://sriraj-guttapalyam.github.io/technical-writing-portfolio/)

## Start here

### Four flagship samples for API, docs-as-code, and AI documentation roles

These samples provide the clearest evidence of technical depth, writing judgment, and validation:

1. [API reference](projects/api-reference/README.md) - Documents a public GitHub REST endpoint with parameters, nullable fields, pagination, error recovery, and bounded validation.
2. [Webhook integration](projects/webhook-integration/README.md) - Explains HMAC-SHA256 signature verification, fast acknowledgement, idempotent retries, and unit-tested Python code.
3. [Docs-as-code review and validation](projects/docs-as-code/README.md) - Connects focused pull requests, automated source checks, a Docusaurus production build, and human review responsibilities.
4. [AI documentation case study](projects/ai-ready-content/README.md) and [AI workflow and authorship disclosure](projects/ai-workflows/README.md) - Records a retrieval baseline, its limits, prompt guardrails, human decisions, and validation methods.

The [authorship and validation record](projects/portfolio-evidence/README.md) identifies where AI assisted, what remained writer-owned, and what each automated or manual check proves. Additional SaaS, in-app, DITA, release, hardware, and troubleshooting samples remain available in the [Samples](#samples) section.

| Flagship | Evidence available in this repository |
| --- | --- |
| API reference | Public GitHub endpoint and vendor references, syntax-checked code examples, documented validation limits |
| Webhook integration | Source helper synchronized with the guide and unit tests run by the repository check |
| Docs as code | Local checker, pull-request workflow, Docusaurus build, and an explicitly bounded review example |
| AI documentation | Dated 27-question baseline, stated limitations, prompt library, style rules, and authorship disclosure |

| Focus area | Recommended reading order |
| --- | --- |
| AI documentation, prompts, and RAG readiness | [Make a procedure retrievable](projects/ai-ready-content/README.md), [Use AI without losing accuracy](projects/ai-workflows/README.md), then review [`llms.txt`](llms.txt) and the [authorship record](projects/portfolio-evidence/README.md) |
| In-app user guidance and IT admin UX | [In-app onboarding and release announcements](projects/in-app-guidance/README.md), [Configure RBAC for site users](projects/rbac-administration/README.md), then [Investigate errors in CloudWatch](projects/cloud-user-guide/README.md) |
| Developer and API documentation | [API reference](projects/api-reference/README.md), [Webhook integration](projects/webhook-integration/README.md), then the supporting [OpenAPI description](projects/openapi-reference/README.md) |
| Documentation architecture and docs-as-code | [Review and validate a documentation change](projects/docs-as-code/README.md), then [Design the information architecture](projects/doc-architecture/README.md) |
| Structured authoring (DITA/XML and Flare) | [Check a Kubernetes rollout in DITA](projects/structured-authoring/README.md), then [Accelerate MadCap Flare authoring with Cursor](projects/cursor-flare-workflow/README.md) |

### Cross-functional collaboration (the "how")

- I collaborate closely with SWEs and PMs to map out complex system behaviors. For example, I distill unreleased API specs into clear integration guides, using GitHub PRs for technical review and resolving SME comments to finalize OpenAPI and Protobuf definitions.
- I check procedures and UI labels against the live application and engineering sources before release, and I log discrepancies for product and engineering. This is my current practice on Fenceline Monitoring Cloud releases through 1.9.
- I coordinate reviews with product, engineering, QA, and release teams in Jira and Confluence, and I track docs gaps against epics and user stories. This is how I kept Oracle Sanctions on-premises and SaaS help aligned.
- I maintain templates, style guidance, and review cycles as a Flare and FrameMaker specialist, and I mentor junior writers. This reduced post-release corrections at Honeywell.
- I resolve technical queries with engineering and product managers before publication, with weekly status and estimates. This is my practice from Cyient hardware and clinical software delivery.

## Samples

Each sample uses a public product or a fictional one, so nothing here comes from an employer. Start with the recommended path for your focus area above, or browse any sample directly below.

| Sample | The problem it solves |
| --- | --- |
| [In-app guidance](projects/in-app-guidance/README.md) | Untargeted pop-ups train administrators to dismiss onboarding. Role-gated MFA walkthrough, release banner, JSON spec, copy budgets, and completion analytics. |
| [AI-ready content](projects/ai-ready-content/README.md) | Answers get lost when docs are split into fragments. Chunk-friendly structure, a metadata schema, and a 27-question retrieval test a writer can run by hand. |
| [AI workflows](projects/ai-workflows/README.md) | Teams want AI help without invented commands. A defined review process, four prompts with review steps, an agent rule file, and a style checklist. |
| [Cursor + MadCap Flare workflow](projects/cursor-flare-workflow/README.md) | Writers receive scattered inputs across Jira, Confluence, Teams, email, demo videos, and QA builds. A six-stage Cursor + Flare training guide, rule file, and prompt playbook. |
| [Information architecture](projects/doc-architecture/README.md) | A new doc set needs a structure that stays consistent. Reader jobs, content model, taxonomy, reuse rules, and governance for a fictional product. |
| [OpenAPI description](projects/openapi-reference/README.md) | Humans and tools need the same facts about an endpoint. An OpenAPI file for a real public endpoint. |
| [API reference](projects/api-reference/README.md) | Developers need to call an endpoint correctly the first time. Parameters, pagination, nullable fields, and recovery for each status code. |
| [Webhook integration](projects/webhook-integration/README.md) | Unverified webhooks expose receivers to spoofed events and duplicate retries. Constant-time HMAC-SHA256 verification, deduplication, and unit tests. |
| [gRPC architecture](projects/grpc-architecture/README.md) | Developers need a clear model of distributed event streams. Sequence diagrams and Protobuf explanations for event-driven telemetry. |
| [RBAC administration](projects/rbac-administration/README.md) | Administrators need to grant site-scoped access without over-privileging accounts. Role permissions matrix, least-privilege workflow, and audit verification. |
| [Cloud operations](projects/cloud-user-guide/README.md) | "The app has errors" is not a diagnosis. A log investigation that stops at what the evidence supports. |
| [Structured authoring](projects/structured-authoring/README.md) | One procedure, three audiences. Concept, task, and reference topics in a DITA map with a shared key. |
| [Docs as code](projects/docs-as-code/README.md) | Documentation regressions slip through review. A CI check, a review model, and a worked change review. |
| [Release documentation](projects/release-documentation/README.md) | A Python 3.12 change breaks a common helper. A compatibility notice, migration, and tests. |
| [Release notes](projects/release-notes/README.md) | Notes that list changes without saying what they mean for the reader. Customer-facing notes for the tool in this repository. |
| [Hardware setup](projects/hardware-installation/README.md) | A step that erases a card needs a warning before it, not after. Boot-media preparation with verification and handoff. |

## Tools I specified and use

- [Local Callout Studio](local-callout-studio/README.md): an offline browser tool I specified and built with AI assistance. It puts numbered callouts on screenshots and repeats the layout across a batch. It makes no network calls.
- [`tools/check_portfolio.py`](tools/check_portfolio.py): a repository check for links, code syntax, and DITA references, used by the [docs-as-code sample](projects/docs-as-code/README.md).

## Experience

### Picarro Technologies Pvt. Ltd.

**Senior Technical Writer | August 2025 to present | Bengaluru, India**

Fenceline Monitoring Cloud, gas analytics, and industrial monitoring systems.

- Author and maintain the Fenceline Monitoring Cloud User Guide, Administrator Guide, and Site Operations Guide as topic-based content in MadCap Flare for operators, EHS personnel, and administrators. Publish HTML5 help and PDF.
- Update and publish release-aligned documentation for successive cloud releases through 1.9, keeping help and PDF in sync with new and changed features.
- Develop and revise hardware and CE certification content for gas monitoring systems, including safety, equipment ratings, and installation topics.
- Validate procedures and UI labels against the live application and engineering sources before each release. Log discrepancies for product and engineering.
- Build AI-assisted workflows in Cursor with custom style and terminology rules, and use Jira and Confluence integration for epic-to-documentation gap analysis. Validate AI-drafted topics against the live product. Work in Scrum with product management, engineering, and QA.

### Oracle Financial Services Software Limited

**Technical Writer II | August 2024 to August 2025 | Bengaluru, India**

Financial analytics: Sanctions, on-premises and cloud.

- Authored user, administration, installation, configuration, API, release, benchmark, and Licensing Information User Manuals for Oracle Financial Sanctions for on-premises and SaaS deployments.
- Migrated unstructured content to topic-based DITA in Oxygen XML Author. Produced synchronized HTML and PDF with Oxygen and Adobe FrameMaker.
- Analyzed requirement documents and user stories to keep on-premises and cloud help aligned with released features.
- Updated Product and Release pages in Oracle APEX and coordinated reviews with product, engineering, and release teams.

### Honeywell Technology Solutions Lab

**Expert Technical Writer | November 2021 to August 2024 | Bengaluru, India**

Automation software and field instruments.

- Wrote user, configuration, installation, and reference content for enterprise automation software. Published manuals and online help in MadCap Flare and Adobe FrameMaker.
- Served as team specialist for MadCap Flare and FrameMaker. Resolved tool and output issues and mentored junior writers on templates, styles, and builds.
- Reviewed market requirements with Offering Managers, product managers, developers, and QA to keep documentation technically accurate.
- Maintained style guides and templates and ran review cycles to reduce post-release corrections.

### Cyient Limited

**Technical Publications Specialist | April 2016 to September 2021 | Hyderabad, India**

Toro, Komatsu, Rio Tinto, and Ortho Clinical Diagnostics.

- Developed specifications, user manuals, and troubleshooting guides for Toro, Komatsu, and Rio Tinto equipment for field technicians.
- Created software documentation for Ortho Clinical Diagnostics and produced illustrations, block diagrams, and exploded views in Adobe Illustrator.
- Maintained client style guides and templates, shared weekly status and hour estimates, and resolved technical queries with engineering and product managers.

Awards: Six Honeywell Bronze Awards, October 2022 to January 2023. Cyient Team of the Month, April 2020. Cyient Associate of the Month, December 2017.

## Tools and methods

| Area | Tools and methods |
| --- | --- |
| Authoring | MadCap Flare, DITA/XML, Oxygen XML Author, Adobe FrameMaker, Markdown |
| AI-ready content | Chunk-friendly topic design, metadata schemas, hand-run retrieval testing, prompt design with human review |
| Version control and web content | Git, GitHub, GitLab, Bitbucket, GitHub Actions, HTML, CSS, JavaScript, Python |
| API documentation | REST APIs, OpenAPI, Swagger, Postman, YAML, JSON |
| Collaboration and delivery | Jira, Confluence, Agile/Scrum, software development life cycle |

## About this repository

The samples are portfolio work built on public products and one fictional product. They are not deliverables from the employers above, and the repository contains no employer manuals, customer data, or confidential details. Product names identify the technology in the example and imply no endorsement.

Where AI tools helped, the [AI workflows sample](projects/ai-workflows/README.md#how-this-portfolio-was-made) says how. Reading paths by role are in the [review map](PORTFOLIO_CONTENT_GUIDE.md). A printable version is in the [portfolio guide](Technical%20Writing%20Portfolio%20Guide.pdf). The Docusaurus static-site configuration is in [website/README.md](website/README.md).
