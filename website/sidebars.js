/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  portfolioSidebar: [
    {
      type: "category",
      label: "Flagship Samples",
      collapsed: false,
      items: [
        "api-reference/README",
        "webhook-integration/README",
        "docs-as-code/README",
        "ai-ready-content/README",
        "ai-workflows/README",
        "portfolio-evidence/README",
      ],
    },
    {
      type: "category",
      label: "In-App UX, IAM & Cloud Admin",
      collapsed: true,
      items: [
        "in-app-guidance/README",
        "rbac-administration/README",
        "cloud-user-guide/README",
      ],
    },
    {
      type: "category",
      label: "Additional Developer Documentation",
      collapsed: true,
      items: [
        "openapi-reference/README",
        "grpc-architecture/README",
      ],
    },
    {
      type: "category",
      label: "Additional AI & Structured Content",
      collapsed: true,
      items: [
        "cursor-flare-workflow/README",
        "structured-authoring/README",
      ],
    },
    {
      type: "category",
      label: "Information Architecture",
      collapsed: true,
      items: [
        "doc-architecture/README",
      ],
    },
    {
      type: "category",
      label: "Release & Hardware Guides",
      collapsed: true,
      items: [
        "release-documentation/README",
        "release-notes/README",
        "hardware-installation/README",
      ],
    },
  ],
};
