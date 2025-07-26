import { dedent } from "../util/dedent.ts";

/**
 * TanStackStart server functions and middleware run in Node.js intead of Miniflare when using `vite dev`.
 *
 * This plugin polyfills the cloudflare:workers module & includes `process.env` during the dev server phase.
 *
 * @see https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack/#using-cloudflare-bindings
 */
export function cloudflareWorkersDevEnvironmentShim() {
  return {
    name: "cloudflare-workers-dev-shim",
    apply: "serve", // dev‑only
    enforce: "pre",
    resolveId(id: string) {
      if (id === "cloudflare:workers") return id; // tell Vite we handled it
    },
    load(id: string) {
      if (id === "cloudflare:workers") {
        const processEnv = JSON.stringify(process.env);

        // @see https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
        return dedent`
          import { getPlatformProxy } from "wrangler";
          const cloudflare = await getPlatformProxy({ experimental: { remoteBindings: true } });
          export const env = Object.assign(${processEnv}, cloudflare.env);
        `.trim();
      }
    },
  } as const;
}
