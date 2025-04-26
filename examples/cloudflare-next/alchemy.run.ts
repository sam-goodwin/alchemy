import alchemy from "../../alchemy/src/";
import { Website } from "../../alchemy/src/cloudflare";

const app = await alchemy("cloudflare-next", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

export const website = await Website("cloudflare-next", {
  command: "echo bun opennextjs-cloudflare build",
  main: ".open-next/worker.js",
  assets: ".open-next/assets",
  compatibilityDate: "2025-03-01",
  compatibilityFlags: ["nodejs_compat"],
  bundle: {
    platform: "node",
    target: "esnext",
  },
});

await app.finalize();
