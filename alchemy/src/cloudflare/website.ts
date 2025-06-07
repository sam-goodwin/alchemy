import path from "node:path";
import { alchemy } from "../alchemy.ts";
import { Exec } from "../os/exec.ts";
import { Assets } from "./assets.ts";
import type { Bindings } from "./bindings.ts";
import {
  DEFAULT_COMPATIBILITY_DATE,
  Worker,
  type AssetsConfig,
  type WorkerProps,
} from "./worker.ts";
import { WranglerJson } from "./wrangler.json.ts";
import { createViteDevServer, createViteProxy } from "./vite-dev-server.ts";
import { Scope } from "../scope.ts";

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
   * Vite configuration for dev mode
   * When scope.dev is true, this will be passed to the Vite dev server
   */
  vite?: {
    config?: any;
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

  return alchemy.run(id, async () => {
    const scope = Scope.current;
    const cwd = path.resolve(props.cwd || process.cwd());
    const fileName =
      typeof wrangler === "boolean"
        ? "wrangler.jsonc"
        : typeof wrangler === "string"
          ? wrangler
          : (wrangler?.path ?? "wrangler.jsonc");
    const wranglerPath =
      fileName && path.relative(cwd, path.join(cwd, fileName));
    const wranglerMain =
      typeof wrangler === "object" ? (wrangler.main ?? props.main) : props.main;

    const workerName = props.name ?? id;

    const assetDir =
      typeof props.assets === "string"
        ? props.assets
        : (props.assets?.dist ?? "dist");

    // Check if we're in dev mode and should start Vite dev server
    let viteDevServer: { port: number; url: string; dispose: () => Promise<void> } | undefined;
    let devScript: string | undefined;

    if (scope.dev) {
      console.log(`🚀 Starting Vite dev server for ${workerName}...`);
      
      viteDevServer = await createViteDevServer(
        `${workerName}-vite`,
        cwd,
        props.vite?.config
      );

      // Store dispose function for cleanup
      scope.defer(viteDevServer.dispose);

      // Create a worker script that proxies requests to the Vite dev server
      // but allows the worker to handle API routes if they exist
      devScript = props.main
        ? `
// Import the user's worker if they provided one
const userWorker = await import("${props.main}");

async function viteProxy(request) {
  const url = new URL(request.url);
  const viteRequestUrl = new URL(url.pathname + url.search, "${viteDevServer.url}");
  
  try {
    const response = await fetch(viteRequestUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return response;
  } catch (error) {
    console.error("Error proxying to Vite dev server:", error);
    return new Response("Vite dev server error", { status: 500 });
  }
}

export default {
  async fetch(request, env, ctx) {
    // If user provided a worker with fetch, let them handle API routes first
    if (userWorker.default?.fetch) {
      try {
        const response = await userWorker.default.fetch(request, env, ctx);
        // If the worker returns a successful response, use it
        if (response.status < 400) {
          return response;
        }
      } catch (error) {
        console.warn("User worker error, falling back to Vite:", error);
      }
    }
    
    // Otherwise, proxy to Vite dev server
    return viteProxy(request);
  },
  
  // Forward other handlers if they exist
  ...(userWorker.default?.queue && { queue: userWorker.default.queue }),
  ...(userWorker.default?.scheduled && { scheduled: userWorker.default.scheduled }),
};`
        : `
async function viteProxy(request) {
  const url = new URL(request.url);
  const viteRequestUrl = new URL(url.pathname + url.search, "${viteDevServer.url}");
  
  try {
    const response = await fetch(viteRequestUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return response;
  } catch (error) {
    console.error("Error proxying to Vite dev server:", error);
    return new Response("Vite dev server error", { status: 500 });
  }
}

export default {
  async fetch(request, env, ctx) {
    return viteProxy(request);
  },
};`;
    }

    const workerProps = {
      ...props,
      compatibilityDate: props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE,
      name: workerName,
      entrypoint: props.main,
      assets: {
        html_handling: "auto-trailing-slash",
        not_found_handling: "single-page-application",
        run_worker_first: false,
        ...(typeof props.assets === "string" ? {} : props.assets),
      },
      script: devScript ?? (props.main
        ? undefined
        : `
export default {
  async fetch(request, env) {
    return new Response("Not Found", { status: 404 });
  },
};`),
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
          directory: assetDir,
        },
      });
    }

    // Only run build command if not in dev mode with Vite
    if (props.command && !scope.dev) {
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
        ASSETS: await Assets("assets", {
          path: assetDir,
        }),
      },
    } as WorkerProps<any> & { name: string })) as Website<B>;
  });
}
