import type { Assets } from "./assets.js";
import type { Bindings } from "./bindings.js";
import { Website, type WebsiteProps } from "./website.js";
import type { Worker } from "./worker.js";

export interface OrangeProps<B extends Bindings> extends WebsiteProps<B> {}

// don't allow the ASSETS to be overriden
export type Orange<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

/**
 * Deploys an Orange application to Cloudflare Workers.
 *
 * This resource simplifies deploying Orange applications by assuming the build
 * command, main entrypoint, and assets directory based on the `create-orange`
 * template CLI.
 *
 * It wraps the underlying `Website` resource.
 *
 * @example
 * // Deploy a basic Orange application with default settings
 * const orangeApp = await Orange("my-orange-app");
 *
 * @example
 * // Deploy with a database binding
 * const database = await D1Database("orange-db");
 * const orangeApp = await Orange("orange-with-db", {
 *   bindings: { DB: database }
 * });
 *
 * @param id - Unique identifier for the Orange resource
 * @param props - Configuration properties for the Orange resource
 * @returns A Cloudflare Worker resource representing the deployed Orange application
 */
export async function Orange<B extends Bindings>(
  id: string,
  props?: Partial<OrangeProps<B>>,
): Promise<Orange<B>> {
  return Website(id, {
    ...props,
    command: props?.command ?? "bun run build",
    // The entrypoint and the Wrangler main must differ for the Cloudflare vite plugin
    // to bundle the application correctly, and alchemy must run our bundler on the Vite
    // output since we don't resolve vite imports.
    wrangler: props?.wrangler ?? {
      main: "app/entry.server.ts",
    },
    // Since we've already bundled the application with the build command, we can just
    // upload the modules in the `dist/srr` directory. With `noBundle: true`, any files
    // that match `**/*.js`, `**/*.mjs`, and `**/*.wasm` under the entrypoint's directory
    // (which is `dist/ssr`) will be uploaded to the worker so we don't need any explicit
    // module rules.
    noBundle: true,
    // `main` is used as the entrypoint in the Worker resource.
    main: props?.main ?? "dist/ssr/entry.server.js",
    assets: props?.assets ?? "dist/client",
    compatibilityFlags: ["nodejs_compat", ...(props?.compatibilityFlags ?? [])],
  });
}
