import type { PluginOption } from "vite";
import type { GetPlatformProxyOptions } from "wrangler";
import { dedent } from "../../util/dedent.ts";

/**
 * TanStackStart server functions and middleware run in Node.js intead of Miniflare when using `vite dev`.
 *
 * This plugin polyfills the cloudflare:workers module & includes `process.env` during the dev server phase.
 *
 * @see https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack/#using-cloudflare-bindings
 */
export default function alchemy(options: GetPlatformProxyOptions = {}) {
  return [
    {
      name: "alchemy:workers-dev-shim",
      apply: "serve", // dev‑only
      enforce: "pre",
      resolveId: (id, _importer, options) => {
        if (id === "cloudflare:workers") {
          if (!options.ssr) {
            throw new Error(
              "cloudflare:workers is not supported in the client",
            );
          }
          return id;
        }
      },
      load: (id) => {
        if (id === "cloudflare:workers") {
          return dedent`
          import { getCloudflareEnvProxy } from "alchemy/cloudflare/env";
          export const env = await getCloudflareEnvProxy(${JSON.stringify(
            options,
          )});
        `;
        }
      },
    },
    {
      name: "alchemy:workers-build-external",
      config: () => ({
        build: {
          rollupOptions: {
            external: ["cloudflare:workers"],
          },
        },
      }),
    },
  ] satisfies PluginOption;
}
