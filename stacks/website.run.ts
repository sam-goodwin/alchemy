// ensure providers are registered (for deletion purposes)

import "../alchemy/src/cloudflare/index.js";
import { Astro, CustomDomain, Zone } from "../alchemy/src/cloudflare/index.js";
import "../alchemy/src/dns/index.js";
import alchemy from "../alchemy/src/index.js";
import "../alchemy/src/os/index.js";
import options from "./env.js";

// Support BRANCH_PREFIX for resource isolation
const branchPrefix = process.env.BRANCH_PREFIX;
const isPreview = !!branchPrefix;

const app = await alchemy("alchemy:website", options);

// Only create zone for production deployments, not for previews
let zone;
if (!isPreview) {
  zone = await Zone("alchemy.run", {
    name: "alchemy.run",
    type: "full",
  });
}

export const website = await Astro("alchemy-web", {
  name: branchPrefix ? `${branchPrefix}-alchemy-website` : "alchemy-website",
  cwd: "alchemy-web",
  command: "bun run docs:build",
  assets: {
    html_handling: "auto-trailing-slash",
    // not_found_handling: "single-page-application",
    run_worker_first: false,
  },
});

// Only set up custom domain for production deployments
if (!isPreview && zone) {
  await CustomDomain("alchemy-web-domain", {
    name: "alchemy.run",
    zoneId: zone.id,
    workerName: website.name,
  });
}

// Log the website URL for CI to extract
if (isPreview) {
  console.log(`Website preview deployed: ${website.url}`);
} else {
  console.log("Website deployed: https://alchemy.run");
}

await app.finalize();
