import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const SKILLS = [
  {
    title: "Developer documentation",
    items: ["REST API references and OpenAPI 3.x", "Webhook and gRPC integration guides", "Code samples in Bash, PowerShell, and Python"],
  },
  {
    title: "Documentation engineering",
    items: ["Docs-as-code with Git and GitHub Actions", "Docusaurus, Markdown, and Mermaid", "Automated link, structure, and example checks"],
  },
  {
    title: "Structured and enterprise authoring",
    items: ["DITA 1.3 and MadCap Flare", "Information architecture and taxonomy", "Release notes, installation, and service guides"],
  },
  {
    title: "AI documentation governance",
    items: ["Retrieval-ready content and llms.txt", "Prompt guardrails and review checklists", "Stated AI-assistance and validation limits"],
  },
];

export default function About() {
  return (
    <Layout
      title="About and contact"
      description="About Sriraj Guttapalyam, a senior technical writer, and how to get in touch."
    >
      <main className="mainSection">
        <div className="container aboutPage">
          <div className="sectionHeader">
            <h1>About and contact</h1>
            <p>
              Sriraj Guttapalyam is a senior technical writer with more than 10 years of experience in API, developer, and enterprise product documentation. This portfolio shows how that work is planned, written, validated, and limited, so a reviewer can check the evidence directly.
            </p>
          </div>

          <h2>What I can do for a documentation team</h2>
          <div className="domainGrid">
            {SKILLS.map((group) => (
              <div key={group.title} className="domainCard">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2>How to review this portfolio</h2>
          <ol>
            <li>
              Start with the <Link to="/docs/api-reference">REST API reference</Link> to check task structure, examples, and error recovery.
            </li>
            <li>
              Read the <Link to="/docs/webhook-integration">webhook guide</Link> and run its unit tests.
            </li>
            <li>
              Open the <Link to="/docs/portfolio-evidence">authorship and validation record</Link> to see which work is writer-owned, which is AI-assisted, and what remains unverified.
            </li>
          </ol>

          <h2>Contact</h2>
          <ul>
            <li>
              Email: <a href="mailto:Sriraj.guttapalyam@gmail.com">Sriraj.guttapalyam@gmail.com</a>
            </li>
            <li>
              LinkedIn: <a href="https://www.linkedin.com/in/sriraj-guttapalyam">linkedin.com/in/sriraj-guttapalyam</a>
            </li>
            <li>
              Source code: <a href="https://github.com/sriraj-guttapalyam/technical-writing-portfolio">GitHub repository</a>
            </li>
            <li>Location: Bengaluru, India</li>
          </ul>

          <p>
            All samples use public or fictional products and contain no employer-confidential material. Documentation for employer products is available to discuss in an interview, but is not published here.
          </p>
        </div>
      </main>
    </Layout>
  );
}
