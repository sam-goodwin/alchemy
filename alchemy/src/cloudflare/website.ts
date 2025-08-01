import assert from "node:assert";
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { alchemy } from "../alchemy.ts";
import { Exec } from "../os/index.ts";
import { Scope } from "../scope.ts";
import { isSecret, type Secret } from "../secret.ts";
import { dedent } from "../util/dedent.ts";
import { DeferredPromise } from "../util/deferred-promise.ts";
import { exists } from "../util/exists.ts";
import { Assets } from "./assets.ts";
import type { Bindings } from "./bindings.ts";
import { DEFAULT_COMPATIBILITY_DATE } from "./compatibility-date.gen.ts";
import { type AssetsConfig, Worker, type WorkerProps } from "./worker.ts";
import { WranglerJson, type WranglerJsonSpec } from "./wrangler.json.ts";

export interface WebsiteProps<B extends Bindings>
  extends Omit<WorkerProps<B>, "assets" | "dev"> {
  /**
   * Configuration for the build command
   *
   * If not provided, the build is assumed to have already happened.
   */
  build?:
    | string
    | {
        /**
         * The command to run to build the site
         */
        command: string;
        /**
         * Additional environment variables to set when running the build command
         */
        env?: Record<string, string>;
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
      };
  /**
   * Configuration for the dev command
   */
  dev?:
    | string
    | {
        /**
         * The command to run to start the dev server
         */
        command: string;
        /**
         * Additional environment variables to set when running the dev command
         */
        env?: Record<string, string>;
      };
  /**
   * The directory containing static assets
   *
   * @default dist
   */
  assets?: string | ({ directory?: string } & AssetsConfig);
  /**
   * Configures default routing to support client-side routing for Single Page Applications (SPA)
   *
   * @default false
   */
  spa?: boolean;
  /**
   * Configuration for the wrangler.json file
   */
  wrangler?: {
    /**
     * Path to the wrangler.json file
     *
     * @default .alchemy/local/wrangler.jsonc
     */
    path?: string;
    /**
     * The main entry point for the worker
     *
     * @default worker.entrypoint
     */
    main?: string;
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
    transform?: (
      spec: WranglerJsonSpec,
    ) => WranglerJsonSpec | Promise<WranglerJsonSpec>;
    /**
     * Whether to include secrets in the wrangler.json file
     *
     * @default true if no path is specified, false otherwise
     */
    secrets?: boolean;
  };
}

export type Website<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function Website<B extends Bindings>(
  id: string,
  props: WebsiteProps<B>,
) {
  const {
    name = id,
    build,
    assets,
    dev,
    script,
    spa = true,
    ...workerProps
  } = props;

  assert(
    !workerProps.bindings?.ASSETS,
    "ASSETS binding is reserved for internal use",
  );

  const paths = (() => {
    const cwd = props.cwd ?? process.cwd();
    return {
      cwd,
      assets: path.resolve(
        cwd,
        typeof assets === "string" ? assets : (assets?.directory ?? "dist"),
      ),
      local: path.resolve(cwd, ".alchemy/local"),
      entrypoint: path.resolve(
        cwd,
        props.entrypoint ?? ".alchemy/local/worker.js",
      ),
      get wrangler() {
        return {
          path: path.resolve(
            cwd,
            props.wrangler?.path ?? ".alchemy/local/wrangler.jsonc",
          ),
          main: props.wrangler?.main
            ? path.resolve(cwd, props.wrangler.main)
            : this.entrypoint,
        };
      },
    };
  })();
  const secrets = props.wrangler?.secrets ?? !props.wrangler?.path;
  const env = {
    ...(process.env ?? {}),
    ...(props.env ?? {}),
    ...Object.fromEntries(
      Object.entries(props.bindings ?? {}).flatMap(([key, value]) => {
        if (typeof value === "string") {
          return [[key, value]];
        }
        if (isSecret(value) && secrets) {
          return [[key, value.unencrypted]];
        }
        return [];
      }),
    ),
  };
  const worker = {
    ...workerProps,
    name,
    cwd: path.relative(process.cwd(), paths.cwd),
    compatibilityDate:
      workerProps.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE,
    assets: {
      html_handling: "auto-trailing-slash",
      not_found_handling: spa ? "single-page-application" : "none",
      run_worker_first: false,
      ...(typeof props.assets === "string" ? {} : props.assets),
    },
    entrypoint: path.relative(paths.cwd, paths.entrypoint),
  } as WorkerProps<B> & { name: string };

  return await alchemy.run(id, { parent: Scope.current }, async (scope) => {
    if (!workerProps.entrypoint) {
      await fs.mkdir(path.dirname(paths.entrypoint), { recursive: true });
      const content =
        script ??
        dedent`
        export default {
            async fetch(request, env) {
                return new Response("Not Found", { status: 404 });
            },
        };`;
      await fs.writeFile(paths.entrypoint, content);
    }

    await writeMiniflareSymlink(paths.cwd);

    await WranglerJson("wrangler.jsonc", {
      path: path.relative(paths.cwd, paths.wrangler.path),
      worker,
      assets: {
        binding: "ASSETS",
        directory: path.relative(paths.cwd, paths.assets),
      },
      main: path.relative(paths.cwd, paths.wrangler.main),
      secrets,
      transform: {
        wrangler: props.wrangler?.transform,
      },
    });

    if (build && !scope.local) {
      await Exec("build", {
        cwd: path.relative(process.cwd(), paths.cwd),
        command: typeof build === "string" ? build : build.command,
        env: {
          ...env,
          ...(typeof build === "object" ? build.env : {}),
          NODE_ENV: "production",
        },
        memoize: typeof build === "object" ? build.memoize : undefined,
      });
    }

    let url: string | undefined;
    if (dev && scope.local) {
      url = await runDevCommand(scope, {
        id,
        command: typeof dev === "string" ? dev : dev.command,
        env: {
          ...env,
          ...(typeof dev === "object" ? dev.env : {}),
        },
        cwd: paths.cwd,
      });
    }

    return (await Worker("worker", {
      ...worker,
      bindings: {
        ...worker.bindings,
        ...(!scope.local
          ? {
              ASSETS: await Assets("assets", {
                path: path.relative(process.cwd(), paths.assets),
              }),
            }
          : {}),
      },
      dev: url ? { url } : undefined,
    })) as Website<B>;
  });
}

async function writeMiniflareSymlink(cwd: string) {
  const target = path.resolve(".alchemy/miniflare");
  await fs.mkdir(target, { recursive: true });

  await fs.mkdir(path.resolve(cwd, ".alchemy"), { recursive: true });
  await fs
    .symlink(target, path.resolve(cwd, ".alchemy/miniflare"))
    .catch((e) => {
      if (e.code !== "EEXIST") {
        throw e;
      }
    });
}

async function runDevCommand(
  scope: Scope,
  props: {
    id: string;
    command: string;
    env: Record<string, string | Secret<string> | undefined>;
    cwd?: string;
  },
) {
  const persistFile = path.join(process.cwd(), ".alchemy", `${props.id}.pid`);
  if (await exists(persistFile)) {
    const pid = Number.parseInt(await fs.readFile(persistFile, "utf8"));
    try {
      // Actually kill the process if it's alive
      process.kill(pid, "SIGTERM");
    } catch {
      // ignore
    }
    try {
      await fs.unlink(persistFile);
    } catch {
      // ignore
    }
  }
  const command = props.command.split(" ");
  const [cmd, ...args] = command;

  const childProcess = spawn(cmd, args, {
    cwd: props.cwd,
    shell: true,
    env: {
      FORCE_COLOR: "1",
      ...process.env,
      ...Object.fromEntries(
        Object.entries(props.env ?? {}).map(([key, value]) => {
          if (value === undefined) {
            return [];
          }
          if (isSecret(value)) {
            return [key, value.unencrypted];
          }
          return [key, value];
        }),
      ),
    },
    stdio: "pipe",
  });
  await once(childProcess, "spawn");
  scope.onCleanup(async () => {
    if (childProcess.exitCode === null && !childProcess.killed) {
      childProcess.kill("SIGTERM");
      await Promise.any([
        once(childProcess, "exit"),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);
      if (!childProcess.killed) {
        childProcess.kill("SIGKILL");
      }
    }
    try {
      await fs.unlink(persistFile);
    } catch {
      // ignore
    }
  });
  if (childProcess.pid) {
    await fs.mkdir(path.dirname(persistFile), { recursive: true });
    await fs.writeFile(persistFile, childProcess.pid.toString());
  }
  const URL_REGEX =
    /http:\/\/(?:(?:localhost|0\.0\.0\.0|127\.0\.0\.1)|(?:\d{1,3}\.){3}\d{1,3}):\d+(?:\/)?/;
  const promise = new DeferredPromise<string>();
  childProcess.stdout.on("data", (data) => {
    if (promise.status === "pending") {
      const match = data
        .toString()
        .replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "")
        .match(URL_REGEX);
      if (match) {
        promise.resolve(match[0]);
      }
    }
    process.stdout.write(data);
  });
  childProcess.stderr.on("data", (data) => {
    process.stderr.write(data);
  });

  return await Promise.race([
    promise.value,
    once(childProcess, "exit").then(([code, signal]) => {
      throw new Error(
        `Dev command "${props.command}" for "${props.id}" failed to start (code: ${code}, signal: ${signal})`,
      );
    }),
  ]);
}
