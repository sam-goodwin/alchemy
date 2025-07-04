import alchemy from "alchemy";
import { DOStateStore, Website, Worker } from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";

const stage = process.env.STAGE ?? process.env.PULL_REQUEST ?? "dev";

const app = await alchemy("alchemy:website", {
  stateStore: (scope) => new DOStateStore(scope),
  stage,
});

const domain =
  stage === "prod"
    ? "alchemy.run"
    : stage === "dev"
      ? "dev.alchemy.run"
      : undefined;

const website = await Website("website", {
  name: "alchemy-website",
  command: "bun run build",
  assets: "dist",
  adopt: true,
  wrangler: false,
  version: stage === "prod" ? undefined : stage,
  domains: domain ? [domain] : undefined,
});

const url = domain ? `https://${domain}` : website.url;

console.log(url);

export const ogWorker = await Worker("alchemy-og-worker", {
  entrypoint: "./src/og-worker.ts",
  compatibilityFlags: ["nodejs_compat"],
  routes: [
    {
      pattern: "og.alchemy.run/*",
    },
  ],
});

if (process.env.PULL_REQUEST) {
  await GitHubComment("comment", {
    owner: "sam-goodwin",
    repository: "alchemy",
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## 🚀 Website Preview Deployed

Your website preview is ready!

**Preview URL:** ${url}

This preview was built from commit ${process.env.GITHUB_SHA}

---
<sub>🤖 This comment will be updated automatically when you push new commits to this PR.</sub>`,
  });
}

await app.finalize();
