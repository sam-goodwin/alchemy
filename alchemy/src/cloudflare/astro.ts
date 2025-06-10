import { writeFile } from "node:fs/promises";
import path from "node:path";
import { alchemy } from "../alchemy.ts";
import { Exec } from "../os/exec.ts";
import { Scope } from "../scope.ts";
import { Assets } from "./assets.ts";
import type { Bindings } from "./bindings.ts";
import type { Website, WebsiteProps } from "./website.ts";
import {
  DEFAULT_COMPATIBILITY_DATE,
  Worker,
  type WorkerProps,
} from "./worker.ts";
import { WranglerJson } from "./wrangler.json.ts";

/**
 * Properties for creating an Astro resource.
 * Extends WebsiteProps, allowing customization of the underlying Website.
 */
export interface AstroProps<B extends Bindings> extends WebsiteProps<B> {}

/**
 * Represents the output of an Astro resource deployment.
 * It resolves to the underlying Cloudflare Worker type, ensuring type safety.
 * Prevents overriding the internal ASSETS binding.
 */
export type Astro<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

/**
 * Creates and deploys an Astro application using the Cloudflare adapter.
 *
 * This resource simplifies deploying Astro applications by providing sensible
 * defaults for the build command, main entrypoint, and assets directory
 * based on the `@astrojs/cloudflare` adapter output.
 *
 * It wraps the underlying `Website` resource.
 *
 * @param id A unique identifier for the resource.
 * @param props Configuration options for the Astro deployment, overriding defaults.
 * @returns A promise that resolves to the deployed Cloudflare Worker details.
 *
 * @example
 * ## Deploy a basic Astro site with default settings
 *
 * Deploy an Astro application with minimal configuration using default build settings.
 *
 * ```ts
 * import { Astro } from "alchemy/cloudflare";
 *
 * const astroSite = await Astro("my-astro-app");
 * ```
 *
 * @example
 * ## Deploy with custom bindings and build command
 *
 * Deploy an Astro application with custom Cloudflare bindings and build configuration.
 *
 * ```ts
 * import { Astro, D1Database } from "alchemy/cloudflare";
 *
 * const db = await D1Database("my-db");
 * const astroSiteWithDb = await Astro("my-astro-app-with-db", {
 *   command: "npm run build", // Specify a custom build command
 *   bindings: {
 *     DB: db, // Add custom bindings
 *   },
 * });
 * ```
 */
export async function Astro<B extends Bindings>(
  id: string,
  props?: Partial<AstroProps<B>>,
): Promise<Astro<B>> {
  if (props?.bindings?.ASSETS) {
    throw new Error("ASSETS binding is reserved for internal use");
  }
  const wrangler = props?.wrangler ?? true;
  const main = props?.main ?? path.join("dist", "_worker.js/index.js");
  const assetsDir =
    typeof props?.assets === "string"
      ? props?.assets
      : (props?.assets?.dist ?? "dist");

  return alchemy.run(
    id,
    {
      parent: Scope.current,
    },
    async () => {
      const cwd = path.resolve(props?.cwd || process.cwd());
      const fileName =
        typeof wrangler === "boolean"
          ? "wrangler.jsonc"
          : typeof wrangler === "string"
            ? wrangler
            : (wrangler?.path ?? "wrangler.jsonc");
      const wranglerPath =
        fileName && path.relative(cwd, path.join(cwd, fileName));
      const wranglerMain =
        typeof wrangler === "object"
          ? (wrangler.main ?? props?.main)
          : props?.main;

      const workerName = props?.name ?? id;

      const workerProps = {
        ...props,
        compatibilityDate:
          props?.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE,
        compatibilityFlags: [
          "nodejs_compat",
          ...(props?.compatibilityFlags ?? []),
        ],
        name: workerName,
        entrypoint: main,
        assets: {
          html_handling: "auto-trailing-slash",
          not_found_handling: "single-page-application",
          run_worker_first: false,
          ...(typeof props?.assets === "string" ? {} : props?.assets),
        },
        script: props?.main
          ? undefined
          : `
export default {
  async fetch(request, env) {
    return new Response("Not Found", { status: 404 });
  },
};`,
        url: true,
        adopt: true,
      } as WorkerProps<any> & { name: string };

      if (wrangler) {
        await WranglerJson("wrangler.jsonc", {
          path: wranglerPath,
          worker: workerProps,
          main: wranglerMain,
          // hard-code the assets directory because we haven't yet included the assets binding
          assets: {
            binding: "ASSETS",
            directory: assetsDir,
          },
        });
      }

      if (props?.command) {
        await Exec("build", {
          cwd,
          command: props?.command,
          env: props?.env,
          memoize: props?.memoize,
        });
      }

      await writeFile(
        path.join(cwd, assetsDir, ".assetsignore"),
        ["_worker.js", "_routes.json"].join("\n"),
      );

      return (await Worker("worker", {
        ...workerProps,
        bindings: {
          ...workerProps.bindings,
          // we don't include the Assets binding until after build to make sure the asset manifest is correct
          // we generate the wrangler.json using all the bind
          ASSETS: await Assets("assets", {
            path: path.join(cwd, assetsDir),
          }),
        },
      } as WorkerProps<any> & { name: string })) as Website<B>;
    },
  );
}
