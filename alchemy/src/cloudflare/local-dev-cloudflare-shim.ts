import { dedent } from "../util/dedent.ts";

/**
 * TanStackStart server functions and middleware run in Node.js intead of Miniflare when using `vite dev`.
 *
 * This plugin polyfills the cloudflare:workers module during the dev server phase.
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
      if (id === "cloudflare:workers")
        return dedent`
          import { getPlatformProxy } from "wrangler";
          // TODO: should we export default cloudflare; ??
          const cloudflare = await getPlatformProxy();
          export const env = cloudflare.env;`;
    },
  } as const;
}
