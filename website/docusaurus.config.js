// Production Docusaurus configuration for GitHub Pages and local preview.
const owner = process.env.GITHUB_REPOSITORY_OWNER || "sriraj-guttapalyam";
const repoFull = process.env.GITHUB_REPOSITORY || `${owner}/technical-writing-portfolio`;
const repoName = repoFull.split("/")[1] || "technical-writing-portfolio";
const isUserSite = repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const baseUrl = process.env.DOCUSAURUS_BASE_URL || (isUserSite ? "/" : `/${repoName}/`);
const repoHttpUrl = `https://github.com/${owner}/${repoName}`;

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Sriraj Guttapalyam",
  tagline:
    "Senior Technical Writer | API Documentation, Docs-as-Code, and AI Documentation Governance",
  favicon: "img/favicon.svg",
  url: `https://${owner}.github.io`,
  baseUrl,
  organizationName: owner,
  projectName: repoName,
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../projects",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.js",
          exclude: [
            "**/dogbench/**",
            "**/ai-documentation-mastery/**",
            "**/ai-ready-llms-txt-tutorial/**",
            "**/developer-documentation-masterclass/**",
            "**/markdown-for-technical-writers/**",
            "**/portfolio-skills-zero-to-hero/**",
            "**/*.py",
            "**/*.yaml",
            "**/*.yml",
            "**/*.json",
            "**/*.mdc",
            "**/*.dita",
            "**/*.ditamap",
            "**/*.pdf",
          ],
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Sriraj Guttapalyam",
        items: [
          {
            to: "/docs/api-reference",
            label: "API Reference",
            position: "left",
          },
          {
            to: "/docs/webhook-integration",
            label: "Webhooks",
            position: "left",
          },
          {
            to: "/docs/docs-as-code",
            label: "Docs-as-Code",
            position: "left",
          },
          {
            to: "/docs/ai-ready-content",
            label: "AI Case Study",
            position: "left",
          },
          {
            to: "/docs/in-app-guidance",
            label: "More Samples",
            position: "left",
          },
          {
            href: "https://www.linkedin.com/in/sriraj-guttapalyam",
            label: "LinkedIn",
            position: "right",
          },
          {
            href: repoHttpUrl,
            label: "GitHub Repo",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "SaaS, IAM & In-App UX",
            items: [
              { label: "In-App Onboarding & Announcements", to: "/docs/in-app-guidance" },
              { label: "RBAC & Scoped Access Admin", to: "/docs/rbac-administration" },
              { label: "Cloud Log Diagnostics", to: "/docs/cloud-user-guide" },
              { label: "Hardware Setup & Safety", to: "/docs/hardware-installation" },
            ],
          },
          {
            title: "Developer & API Docs",
            items: [
              { label: "REST API Reference", to: "/docs/api-reference" },
              { label: "HMAC Webhook Security", to: "/docs/webhook-integration" },
              { label: "OpenAPI 3.x Specification", to: "/docs/openapi-reference" },
              { label: "Event-Driven gRPC Architecture", to: "/docs/grpc-architecture" },
              { label: "Release Migration & Notes", to: "/docs/release-documentation" },
            ],
          },
          {
            title: "AI, Architecture & Evidence",
            items: [
              { label: "RAG-Ready Content & Baseline", to: "/docs/ai-ready-content" },
              { label: "AI Prompting & Guardrails", to: "/docs/ai-workflows" },
              { label: "Cursor + MadCap Flare Workflow", to: "/docs/cursor-flare-workflow" },
              { label: "DITA 1.3 & Information Architecture", to: "/docs/doc-architecture" },
              { label: "Authorship & Validation Record", to: "/docs/portfolio-evidence" },
              { label: "llms.txt Machine Index", href: `https://${owner}.github.io/${repoName}/llms.txt` },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Sriraj Kumar Reddy Guttapalyam. All samples use public or fictional products and contain no employer-confidential material.`,
      },
    }),
};
