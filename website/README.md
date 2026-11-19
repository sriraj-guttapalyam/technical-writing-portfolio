# Documentation portal (Docusaurus 3 + GitHub Pages)

The Markdown files in `../projects/` are the single source of truth. This folder configures Docusaurus 3 with Mermaid diagram rendering and automated GitHub Pages deployment via [`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml). The homepage and sidebar foreground the four flagship samples listed in the root [README](../README.md).

## Preview locally

1. Install Node.js 18 or later.
2. From `website/`, run `npm ci`.
3. Run `npm run start` to launch the local hot-reload server.
4. Run `npm run build` to verify the static production bundle in `website/build/`.

The production build treats broken internal links as errors. Content outside `../projects/` is not part of the Docusaurus documentation route. Link to such repository content with an absolute GitHub URL.

## Automated GitHub Pages publishing

1. Push the repository to GitHub on the `main` branch.
2. In GitHub repository **Settings** > **Pages**, set **Source** to **GitHub Actions**.
3. On every push to `main`, `.github/workflows/deploy-pages.yml` runs `python tools/check_portfolio.py`, copies `llms.txt` to static assets, builds Docusaurus with automatic `GITHUB_REPOSITORY` base URL detection, and deploys the live portal.

Pull requests run the same Python check and Docusaurus production build through [`../.github/workflows/docs-check.yml`](../.github/workflows/docs-check.yml).
