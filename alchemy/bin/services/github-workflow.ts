import { spinner } from "@clack/prompts";
import * as fs from "fs-extra";
import path from "node:path";
import { throwWithContext } from "../errors.ts";
import type { ProjectContext } from "../types.ts";

export async function addGitHubWorkflowToAlchemy(
  context: ProjectContext,
): Promise<void> {
  const alchemyFilePath = path.join(context.path, "alchemy.run.ts");

  const s = spinner();
  s.start("Setting up GitHub Actions...");

  try {
    const workflowDir = path.join(context.path, ".github", "workflows");
    await fs.ensureDir(workflowDir);

    const prPreviewWorkflow = `name: Preview

on:
  pull_request:
    types: [opened, reopened, synchronize, closed]

# Ensure only one workflow runs at a time per PR
concurrency:
  group: "pr-preview-\${{ github.event.pull_request.number }}"
  cancel-in-progress: false

jobs:
  deploy-preview:
    if: \${{ github.event.action != 'closed' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        shell: bash
        run: bun install

      - name: Deploy Preview
        run: bun run deploy --stage pr-\${{ github.event.pull_request.number }}
        env:
          GITHUB_SHA: \${{ github.event.pull_request.head.sha }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY_OWNER: \${{ github.repository_owner }}
          GITHUB_REPOSITORY_NAME: \${{ github.event.repository.name }}
          PULL_REQUEST: \${{ github.event.pull_request.number }}
          CLOUDFLARE_API_TOKEN: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

  cleanup-preview:
    if: \${{ github.event.action == 'closed' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        shell: bash
        run: bun install

      - name: Cleanup Preview
        run: bun run destroy
        env:
          BRANCH_PREFIX: pr-\${{ github.event.pull_request.number }}
          GITHUB_SHA: \${{ github.event.pull_request.head.sha }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY_OWNER: \${{ github.repository_owner }}
          GITHUB_REPOSITORY_NAME: \${{ github.event.repository.name }}
          PULL_REQUEST: \${{ github.event.pull_request.number }}
          CLOUDFLARE_API_TOKEN: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
`;

    const publishWorkflow = `name: Publish

on:
  push:
    branches: [main]

# Ensure only one workflow runs at a time
concurrency:
  group: "publish"
  cancel-in-progress: false

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        shell: bash
        run: bun install

      - name: Deploy to Production
        run: bun run deploy
        env:
          STAGE: prod
          GITHUB_SHA: \${{ github.sha }}
          CLOUDFLARE_API_TOKEN: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
`;

    await fs.writeFile(
      path.join(workflowDir, "pr-preview.yml"),
      prPreviewWorkflow,
    );
    await fs.writeFile(path.join(workflowDir, "publish.yml"), publishWorkflow);

    let code = await fs.readFile(alchemyFilePath, "utf-8");

    const alchemyImportRegex = /(import alchemy from "alchemy";)/;
    const alchemyImportMatch = code.match(alchemyImportRegex);
    if (alchemyImportMatch) {
      const githubImport = '\nimport { GitHubComment } from "alchemy/github";';
      code = code.replace(alchemyImportRegex, `$1${githubImport}`);
    }

    const cloudflareResourceRegex =
      /(await (?:Worker|TanStackStart|Nuxt|Astro|Website|SvelteKit|Redwood|ReactRouter|Vite)\([^,]+,\s*{[^}]*)(}\);)/g;
    code = code.replace(
      cloudflareResourceRegex,
      (match, beforeClosing, closing) => {
        if (beforeClosing.includes("version:")) {
          return match;
        }

        const hasTrailingComma = beforeClosing.trim().endsWith(",");
        const versionProp = hasTrailingComma
          ? `  version: app.stage === "prod" ? undefined : app.stage,\n`
          : `,\n  version: app.stage === "prod" ? undefined : app.stage,\n`;

        return beforeClosing + versionProp + closing;
      },
    );

    const finalizeRegex = /(await app\.finalize\(\);)/;
    const finalizeMatch = code.match(finalizeRegex);
    if (finalizeMatch) {
      const githubWorkflowCode = `
if (process.env.PULL_REQUEST) {
  const previewUrl = worker.url;
  
  await GitHubComment("pr-preview-comment", {
    owner: process.env.GITHUB_REPOSITORY_OWNER || "your-username",
    repository: process.env.GITHUB_REPOSITORY_NAME || "${context.name}",
    issueNumber: Number(process.env.PULL_REQUEST),
    body: \`
## 🚀 Preview Deployed

Your preview is ready! 

**Preview URL:** \${previewUrl}

This preview was built from commit \${process.env.GITHUB_SHA}

---
<sub>🤖 This comment will be updated automatically when you push new commits to this PR.</sub>\`,
  });
}

`;

      code = code.replace(finalizeRegex, `${githubWorkflowCode}$1`);
    }

    await fs.writeFile(alchemyFilePath, code, "utf-8");

    s.stop("GitHub Actions configured");
  } catch (error) {
    s.stop("GitHub Actions setup failed");
    throwWithContext(error, "Failed to add GitHub workflow setup");
  }
}
