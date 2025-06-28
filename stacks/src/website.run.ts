// ensure providers are registered (for deletion purposes)

import "alchemy/cloudflare";
import "alchemy/dns";
import "alchemy/os";

import alchemy from "alchemy";
import { Astro, Zone } from "alchemy/cloudflare";
import path from "node:path";
import { BRANCH_PREFIX } from "../../alchemy/test/util.ts";

// Support BRANCH_PREFIX for resource isolation
const branchPrefix = BRANCH_PREFIX;
const isProd = process.argv.includes("--prod");
const isPreview = !isProd;

console.log({
  isLive: isProd,
  isPreview,
  branchPrefix,
});

const app = await alchemy("alchemy:website", {
  stage: "dev",
});

// Only create zone for production deployments, not for previews
if (isProd) {
  await Zone("alchemy.run", {
    name: "alchemy.run",
    type: "full",
  });
}

export const website = await Astro("website", {
  name: branchPrefix ? `${branchPrefix}-alchemy-website` : "alchemy-website",
  url: true,
  command: "bun docs:build",
  cwd: path.resolve(import.meta.dirname, "..", "..", "alchemy-web"),
  domains: isProd ? ["alchemy.run"] : undefined,
});

// Log the website URL for CI to extract
if (isPreview) {
  console.log(`Website preview deployed: ${website.url}`);
} else {
  console.log("Website deployed: https://alchemy.run");
}

await app.finalize();
