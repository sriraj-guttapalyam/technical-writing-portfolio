/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  portfolioSidebar: [
    {
      type: "category",
      label: "In-App UX, IAM & Cloud Admin",
      collapsed: false,
      items: [
        "in-app-guidance/README",
        "rbac-administration/README",
        "cloud-user-guide/README",
      ],
    },
    {
      type: "category",
      label: "API & Developer Documentation",
      collapsed: false,
      items: [
        "api-reference/README",
        "openapi-reference/README",
        "webhook-integration/README",
        "grpc-architecture/README",
      ],
    },
    {
      type: "category",
      label: "AI Workflows & RAG Readiness",
      collapsed: false,
      items: [
        "ai-ready-content/README",
        "ai-workflows/README",
        "cursor-flare-workflow/README",
      ],
    },
    {
      type: "category",
      label: "Docs-as-Code & Architecture",
      collapsed: false,
      items: [
        "docs-as-code/README",
        "doc-architecture/README",
        "structured-authoring/README",
      ],
    },
    {
      type: "category",
      label: "Release & Hardware Guides",
      collapsed: false,
      items: [
        "release-documentation/README",
        "release-notes/README",
        "hardware-installation/README",
      ],
    },
  ],
};
