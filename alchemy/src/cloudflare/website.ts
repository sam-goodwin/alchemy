import path from "node:path";
import { alchemy } from "../alchemy.ts";
import { Exec } from "../os/exec.ts";
import { Scope } from "../scope.ts";
import { Assets } from "./assets.ts";
import type { Bindings } from "./bindings.ts";
import {
  DEFAULT_COMPATIBILITY_DATE,
  Worker,
  type AssetsConfig,
  type WorkerProps,
} from "./worker.ts";
import { WranglerJson } from "./wrangler.json.ts";

export interface WebsiteProps<B extends Bindings>
  extends Omit<WorkerProps<B>, "name" | "assets" | "entrypoint"> {
  /**
   * The command to run to build the site
   *
   * If one is not provided, the build is assumed to have already happened.
   */
  command?: string;

  /**
   * Whether to memoize the command (only re-run if the command changes)
   *
   * When set to `true`, the command will only be re-executed if the command string changes.
   *
   * When set to an object with `patterns`, the command will be re-executed if either:
   * 1. The command string changes, or
   * 2. The contents of any files matching the glob patterns change
   *
   * ⚠️ **Important Note**: When using memoization with build commands, the build outputs
   * will not be produced if the command is memoized. This is because the command is not
   * actually executed when memoized. Consider disabling memoization in CI environments:
   *
   * @example
   * // Disable memoization in CI to ensure build outputs are always produced
   * await Website("my-website", {
   *   command: "vite build",
   *   memoize: process.env.CI ? false : {
   *     patterns: ["./src/**"]
   *   }
   * });
   *
   * @default false
   */
  memoize?: boolean | { patterns: string[] };

  /**
   * The name of the worker
   *
   * @default id
   */
  name?: string;
  /**
   * The entrypoint to your server
   *
   * @default - a simple server that serves static assets is generated
   */
  main?: string;
  /**
   * The directory containing your static assets
   *
   * @default "./dist"
   */
  assets?:
    | string
    | ({
        dist?: string;
      } & AssetsConfig);
  /**
   * @default process.cwd()
   */
  cwd?: string;

  /**
   * Write a wrangler.jsonc file
   *
   * @default - no wrangler.jsonc file is written
   */
  wrangler?:
    | boolean
    | string
    | {
        path?: string;
        // override main
        main?: string;
      };

  /**
   * Configures default routing to support client-side routing for Single Page Applications (SPA)
   *
   * @default false
   */
  spa?: boolean;

  /**
   * Configure the command to use in development mode
   */
  dev?: {
    command: string;
    url: string;
  };
}

export type Website<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function Website<B extends Bindings>(
  id: string,
  props: WebsiteProps<B>,
): Promise<Website<B>> {
  if (props.bindings?.ASSETS) {
    throw new Error("ASSETS binding is reserved for internal use");
  }
  const wrangler = props.wrangler ?? true;

  return alchemy.run(
    id,
    {
      parent: Scope.current,
    },
    async (scope) => {
      // directory from which all relative paths are resolved
      const cwd = path.resolve(props.cwd || process.cwd());

      function resolveAbsPath<S extends string | undefined>(f: S): S {
        return (
          f ? (path.isAbsolute(f) ? f : path.resolve(cwd, f)) : undefined
        ) as S;
      }

      // absolute path to the wrangler.jsonc file
      const wranglerJsonPath = resolveAbsPath(
        typeof wrangler === "boolean"
          ? "wrangler.jsonc"
          : typeof wrangler === "string"
            ? wrangler
            : (wrangler?.path ?? "wrangler.jsonc"),
      );

      // absolute path to the worker entrypoint
      const mainPath = resolveAbsPath(props.main);

      // absolute path to the worker entrypoint (if different in wrangler.jsonc)
      const wranglerMainPath = resolveAbsPath(
        typeof wrangler === "object"
          ? (wrangler.main ?? props.main!)
          : props.main,
      );

      // absolute path to the assets directory
      const assetsDirPath = resolveAbsPath(
        typeof props.assets === "string"
          ? props.assets
          : (props.assets?.dist ?? "dist"),
      );

      const workerName = props.name ?? id;

      const workerProps = {
        ...props,
        compatibilityDate:
          props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE,
        name: workerName,
        entrypoint: mainPath
          ? // this path should be relative to the process.cwd() because it is used by esbuild
            path.relative(process.cwd(), mainPath)
          : undefined,
        assets: {
          html_handling: "auto-trailing-slash",
          not_found_handling: props.spa ? "single-page-application" : "none",
          run_worker_first: false,
          ...(typeof props.assets === "string" ? {} : props.assets),
        },
        script: props.main
          ? undefined
          : `
export default {
  async fetch(request, env) {
    return new Response("Not Found", { status: 404 });
  },
};`,
        url: true,
        adopt: true,
        dev: props.dev
          ? {
              command: props.dev.command,
              url: props.dev.url,
              cwd,
            }
          : undefined,
      } as WorkerProps<any> & { name: string };

      if (wrangler) {
        await WranglerJson("wrangler.jsonc", {
          path: wranglerJsonPath,
          worker: workerProps,
          main: wranglerMainPath,
          // hard-code the assets directory because we haven't yet included the assets binding
          assets: {
            binding: "ASSETS",
            directory: assetsDirPath,
          },
          cwd: cwd,
        });
      }

      const isDev = scope.dev && !!props.dev;

      if (props.command && !isDev) {
        await Exec("build", {
          cwd,
          command: props.command,
          env: props.env,
          memoize: props.memoize,
        });
      }

      return (await Worker("worker", {
        ...workerProps,
        bindings: {
          ...workerProps.bindings,
          // we don't include the Assets binding until after build to make sure the asset manifest is correct
          // we generate the wrangler.json using all the bind
          ASSETS: isDev
            ? undefined
            : await Assets("assets", {
                // Assets are discovered from proces.cwd(), not Website.cwd or wrangler.jsonc
                path: path.relative(process.cwd(), assetsDirPath),
              }),
        },
      } as WorkerProps<any> & { name: string })) as Website<B>;
    },
  );
}
