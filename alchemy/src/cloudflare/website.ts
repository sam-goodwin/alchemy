import path from "node:path";
import { alchemy } from "../alchemy.ts";
import { Exec } from "../os/exec.ts";
import { Scope } from "../scope.ts";
import { detectPackageManager } from "../util/detect-package-manager.ts";
import { Assets } from "./assets.ts";
import type { Bindings } from "./bindings.ts";
import {
  DEFAULT_COMPATIBILITY_DATE,
  Worker,
  type AssetsConfig,
  type WorkerProps,
} from "./worker.ts";
import { WranglerJson, type WranglerJsonSpec } from "./wrangler.json.ts";

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
  };

  /**
   * Transform hooks to modify generated configuration files
   */
  transform?: {
    /**
     * Hook to modify the wrangler.json object before it's written
     *
     * This function receives the generated wrangler.json spec and should return
     * a modified version. It's applied as the final transformation before the
     * file is written to disk.
     *
     * @param spec - The generated wrangler.json specification
     * @returns The modified wrangler.json specification
     */
    wrangler?: (
      spec: WranglerJsonSpec,
    ) => WranglerJsonSpec | Promise<WranglerJsonSpec>;
  };
}

const packageManager = detectPackageManager();
const devCommand = {
  npm: "npx vite dev",
  bun: "bun vite dev",
  pnpm: "pnpm vite dev",
  yarn: "yarn vite dev",
}[packageManager];

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
      const cwd = path.resolve(props.cwd || process.cwd());

      function resolveAbsPath<S extends string | undefined>(f: S): S {
        return (
          f ? (path.isAbsolute(f) ? f : path.resolve(cwd, f)) : undefined
        ) as S;
      }

      const mainPath = resolveAbsPath(props.main);
      const assetsDirPath = resolveAbsPath(
        typeof props.assets === "string"
          ? props.assets
          : (props.assets?.dist ?? "dist"),
      );
      const wranglerJsonPath = resolveAbsPath(
        typeof wrangler === "boolean"
          ? "wrangler.jsonc"
          : typeof wrangler === "string"
            ? wrangler
            : (wrangler?.path ?? "wrangler.jsonc"),
      );

      const workerName = props.name ?? id;

      const workerProps = {
        ...props,
        compatibilityDate:
          props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE,
        name: workerName,
        cwd: path.relative(process.cwd(), cwd),
        entrypoint: mainPath,
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
        url: props.url ?? true,
        adopt: props.adopt ?? true,
        dev: {
          command: props.dev?.command ?? devCommand,
        },
      } as WorkerProps<any> & { name: string };

      if (wrangler) {
        const wranglerPath = path.relative(cwd, wranglerJsonPath);
        const wranglerDir = path.dirname(wranglerPath);

        await WranglerJson("wrangler.jsonc", {
          path: wranglerPath,
          worker: workerProps,
          // @ts-expect-error - props.wrangler can be string | object, this is fine
          main: props.wrangler?.main ?? props.main,
          // hard-code the assets directory because we haven't yet included the assets binding
          assets: {
            binding: "ASSETS",
            // path must be relative to the wrangler.jsonc file
            directory: path.relative(wranglerDir, assetsDirPath),
          },
          transform: props.transform,
        });
      }

      const isDev = scope.dev || props.dev;

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
