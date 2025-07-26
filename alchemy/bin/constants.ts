import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPackageVersion } from "./services/get-package-version.ts";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const dependencyVersionMap = {
  alchemy:
    process.env.NODE_ENV === "test"
      ? `file:${path.resolve(PKG_ROOT)}`
      : getPackageVersion(),

  miniflare: "^4.20250617.3",

  // all vite templates
  "@cloudflare/workers-types": "^4.20250620.0",
  wrangler: "^4.20.5",

  // astro
  "@astrojs/cloudflare": "^12.6.0",

  // nuxt
  "nitro-cloudflare-dev": "^0.2.2",

  // react-router
  "@cloudflare/vite-plugin": "^1.0.12",

  // sveltekit
  "@sveltejs/adapter-cloudflare": "^7.0.4",
} as const;

export type DependencyVersionMap = keyof typeof dependencyVersionMap;
