import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const TRACKS = [
  {
    badge: "In-App UX & Product Guidance",
    title: "Onboarding Tours, Banners & Guide Analytics",
    description:
      "Role-gated conditional MFA walkthrough, non-blocking release announcement banner, UX microcopy character budgets, portable JSON spec, and completion funnel diagnostics.",
    primaryTo: "/docs/in-app-guidance/",
    primaryLabel: "View In-App Guidance Sample →",
  },
  {
    badge: "Identity, Access & Cloud Admin",
    title: "Enterprise RBAC & Operational Diagnostics",
    description:
      "Least-privilege permission matrices, site-scoped role workflows, audit-log compliance verification, and evidence-bounded AWS CloudWatch error investigation.",
    primaryTo: "/docs/rbac-administration/",
    primaryLabel: "View RBAC Admin Guide →",
  },
  {
    badge: "Developer & API Documentation",
    title: "REST APIs, OpenAPI 3.x, Webhooks & gRPC",
    description:
      "Pagination with Link headers, status-code recovery tables, OpenAPI schema design, unit-tested HMAC-SHA256 webhook verification, and Protobuf sequence flows.",
    primaryTo: "/docs/api-reference/",
    primaryLabel: "View API & Webhook Docs →",
  },
  {
    badge: "AI Tooling, Prompts & RAG Retrieval",
    title: "AI-Retrievable Docs & Hallucination Guardrails",
    description:
      "Chunk-autonomous procedures, YAML metadata schema, root llms.txt index, 27-query retrieval test, standardized prompt templates, and custom AI style rules.",
    primaryTo: "/docs/ai-ready-content/",
    primaryLabel: "View AI & RAG Strategy →",
  },
  {
    badge: "Docs-as-Code & Information Architecture",
    title: "GitHub Actions CI/CD, Governance & DITA 1.3",
    description:
      "Pull-request editorial and technical review workflow, automated Python/XML/JSON CI validation, taxonomy governance, and modular DITA 1.3 Kubernetes rollout maps.",
    primaryTo: "/docs/docs-as-code/",
    primaryLabel: "View Docs-as-Code Pipeline →",
  },
  {
    badge: "Rolling Releases & Connected Systems",
    title: "Breaking-Change Migrations & Release Notes",
    description:
      "Customer-facing release notes focused on admin impact, unit-tested Python 3.12 compatibility migration guides, and safety-first hardware provisioning.",
    primaryTo: "/docs/release-notes/",
    primaryLabel: "View Release Docs →",
  },
];

export default function Home() {
  return (
    <Layout
      title="Technical Writing & Documentation Engineering Portfolio"
      description="Portfolio of Sriraj Guttapalyam — Senior Technical Writer specializing in Docs-as-Code, API documentation, AI-ready RAG content, in-app user guidance, and structured authoring."
    >
      <header className="heroBanner">
        <div className="container">
          <p className="heroEyebrow">TECHNICAL WRITING &amp; DOCUMENTATION ENGINEERING PORTFOLIO</p>
          <h1 className="heroTitle">Sriraj Guttapalyam</h1>
          <p className="heroSubtitle">
            Senior Technical Writer with 10+ years building clear, developer- and IT-admin-focused documentation across SaaS platforms, identity &amp; security compliance, APIs, and connected systems. Built as a live <strong>GitHub Docs-as-Code + Docusaurus</strong> portal with automated CI checks and <code>llms.txt</code> indexing.
          </p>
          <div className="heroButtons">
            <Link className="button button--primary button--lg" to="/docs/in-app-guidance/">
              Start Guided Tour of Samples
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/ai-workflows/"
            >
              Explore AI Prompts &amp; Guardrails
            </Link>
          </div>
          <div className="heroPills">
            <span>GitHub Docs-as-Code &amp; Docusaurus CI/CD</span>
            <span>REST APIs, OpenAPI &amp; Webhooks</span>
            <span>In-App Onboarding &amp; UX Microcopy</span>
            <span>Prompt Engineering &amp; RAG Chunking</span>
            <span>DITA/XML &amp; MadCap Flare</span>
          </div>
        </div>
      </header>

      <main className="mainSection">
        <div className="container">
          <div className="sectionHeader">
            <h2>Explore Reference Samples by Discipline</h2>
            <p>
              Every sample uses a public API or fictional enterprise platform (<strong>Sensor Hub</strong>) so all source files, JSON/YAML specs, unit tests, and AI prompts are 100% open for technical review.
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
        </div>
      </main>
    </Layout>
  );
}
