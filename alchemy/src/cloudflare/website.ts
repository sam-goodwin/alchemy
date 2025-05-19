import fs from "node:fs/promises";
import path from "node:path";
import { alchemy } from "../alchemy.js";
import { Exec } from "../os/exec.js";
import { Assets } from "./assets.js";
import type { Bindings } from "./bindings.js";
import { Worker, type AssetsConfig, type WorkerProps } from "./worker.js";
import { WranglerJson } from "./wrangler.json.js";

export interface WebsiteProps<B extends Bindings>
  extends Omit<WorkerProps<B>, "name" | "assets" | "entrypoint"> {
  /**
   * The command to run to build the site
   */
  command: string;
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

  return alchemy.run(id, async () => {
    // building the site requires a wrangler.jsonc file to start
    // - so initialize an empty one if it doesn't exist

    const cwd = path.resolve(props.cwd || process.cwd());
    const fileName =
      typeof props.wrangler === "boolean"
        ? "wrangler.jsonc"
        : typeof props.wrangler === "string"
          ? props.wrangler
          : (props.wrangler?.path ?? "wrangler.jsonc");
    const wranglerPath =
      fileName && path.relative(cwd, path.join(cwd, fileName));
    const wranglerMain =
      typeof props.wrangler === "object"
        ? (props.wrangler.main ?? props.main)
        : props.main;

    if (props.wrangler) {
      try {
        await fs.access(wranglerPath!);
      } catch {
        await fs.writeFile(
          wranglerPath!,
          JSON.stringify(
            {
              name: id,
              main: wranglerMain,
              compatibility_date: new Date().toISOString().split("T")[0],
            },
            null,
            2,
          ),
        );
      }
    }

    await Exec("build", {
      command: props.command,
    });

    const worker = await Worker("worker", {
      ...props,
      name: props.name ?? id,
      entrypoint: props.main,
      bundle: {
        target: "esnext",
        platform: "node",
        ...props.bundle,
      },
      assets: {
        html_handling: "auto-trailing-slash",
        not_found_handling: "single-page-application",
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
      bindings: {
        ...props.bindings,
        ASSETS: await Assets("assets", {
          path:
            typeof props.assets === "string"
              ? props.assets
              : (props.assets?.dist ?? "dist"),
        }),
      },
    });

    if (props.wrangler) {
      await WranglerJson("wrangler.jsonc", {
        path: wranglerPath,
        worker,
        main: wranglerMain,
      });
    }

    return worker as Website<B>;
  });
}
