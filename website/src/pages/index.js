import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const TRACKS = [
  {
    badge: "Flagship 1 · REST API documentation",
    title: "GitHub REST API Reference",
    description:
      "A public endpoint documented with parameters, pagination, nullable fields, status-code recovery, Bash and PowerShell requests, and reusable client examples.",
    primaryTo: "/docs/api-reference",
    primaryLabel: "Review API Reference →",
  },
  {
    badge: "Flagship 2 · Secure integrations",
    title: "Webhook Signature Verification",
    description:
      "A security-first integration guide with constant-time HMAC-SHA256 verification, idempotent retry handling, synchronized source code, and unit tests.",
    primaryTo: "/docs/webhook-integration",
    primaryLabel: "Review Webhook Guide →",
  },
  {
    badge: "Flagship 3 · Documentation engineering",
    title: "Docs-as-Code Review and Validation",
    description:
      "A focused pull-request workflow backed by local source checks, automated tests, a Docusaurus production build, and defined human review responsibilities.",
    primaryTo: "/docs/docs-as-code",
    primaryLabel: "Review Docs-as-Code Sample →",
  },
  {
    badge: "Flagship 4 · AI documentation governance",
    title: "AI Retrieval Baseline and Guardrails",
    description:
      "A dated 27-question baseline with explicit limits, chunking and metadata rules, prompt guardrails, and a transparent account of AI assistance.",
    primaryTo: "/docs/ai-ready-content",
    primaryLabel: "Review AI Documentation Case Study →",
  },
];

const DOMAINS = [
  {
    title: "In-App UX, IAM & Cloud Admin",
    items: [
      { label: "In-App Onboarding & Release Banners", to: "/docs/in-app-guidance" },
      { label: "RBAC & Scoped Site Access Admin", to: "/docs/rbac-administration" },
      { label: "CloudWatch Log Diagnostics", to: "/docs/cloud-user-guide" },
    ],
  },
  {
    title: "Developer & API Documentation",
    items: [
      { label: "OpenAPI 3.x Specification", to: "/docs/openapi-reference" },
      { label: "Event-Driven gRPC Architecture", to: "/docs/grpc-architecture" },
      { label: "Python 3.12 Compatibility & Migration", to: "/docs/release-documentation" },
    ],
  },
  {
    title: "AI Workflows & Structured Authoring",
    items: [
      { label: "AI Prompting, Rules & Style Checklist", to: "/docs/ai-workflows" },
      { label: "Cursor + MadCap Flare Workflow", to: "/docs/cursor-flare-workflow" },
      { label: "DITA 1.3 Concept, Task & Reference", to: "/docs/structured-authoring" },
    ],
  },
  {
    title: "Architecture, Releases & Hardware",
    items: [
      { label: "Information Architecture & Taxonomy", to: "/docs/doc-architecture" },
      { label: "Customer-Facing Release Notes", to: "/docs/release-notes" },
      { label: "Hardware Boot-Media Setup & Safety", to: "/docs/hardware-installation" },
    ],
  },
];

export default function Home() {
  return (
    <Layout
      title="Technical Writing & Documentation Engineering Portfolio"
      description="Portfolio of Sriraj Guttapalyam, a senior technical writer specializing in API documentation, docs-as-code, and AI documentation governance."
    >
      <header className="heroBanner">
        <div className="container">
          <p className="heroEyebrow">TECHNICAL WRITING &amp; DOCUMENTATION ENGINEERING PORTFOLIO</p>
          <h1 className="heroTitle">Sriraj Guttapalyam</h1>
          <p className="heroSubtitle">
            Senior Technical Writer with 10+ years creating API, developer, and enterprise product documentation. This portfolio foregrounds four reviewable samples with stated evidence and limits. GitHub Actions runs the repository checks on pull requests and builds the Docusaurus portal before publication.
          </p>
          <div className="heroButtons">
            <Link className="button button--primary button--lg" to="/docs/api-reference">
              Start with the API Reference
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/ai-workflows"
            >
              Review AI Use and Guardrails
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/portfolio-evidence"
            >
              Authorship &amp; Validation
            </Link>
          </div>
          <div className="heroPills">
            <span>REST APIs &amp; OpenAPI</span>
            <span>Secure Webhook Integration</span>
            <span>GitHub Docs-as-Code &amp; CI</span>
            <span>AI Documentation Guardrails</span>
            <span>DITA 1.3 &amp; MadCap Flare</span>
            <span>In-App UX &amp; RBAC</span>
          </div>
        </div>
      </header>

      <main className="mainSection">
        <div className="container">
          <div className="sectionHeader">
            <h2>Review the Flagship Samples</h2>
            <p>
              Each flagship uses a public API, repository evidence, or a clearly identified fictional platform. Source files, tests, prompts, validation methods, and known limitations are available for review.
            </p>
          </div>
          <div className="cardGrid">
            {TRACKS.map((item) => (
              <div key={item.title} className="sampleCard">
                <span className="cardBadge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="cardLink" to={item.primaryTo}>
                  {item.primaryLabel}
                </Link>
              </div>
            ))}
          </div>

          <div className="sectionHeader domainSectionHeader">
            <h2>Explore All Portfolio Samples by Domain</h2>
            <p>
              Additional writing samples covering enterprise SaaS administration, in-app UX guidance, OpenAPI and gRPC specifications, DITA/XML, MadCap Flare with Cursor, information architecture, release communication, and hardware safety procedures.
            </p>
          </div>
          <div className="domainGrid">
            {DOMAINS.map((domain) => (
              <div key={domain.title} className="domainCard">
                <h3>{domain.title}</h3>
                <ul>
                  {domain.items.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
