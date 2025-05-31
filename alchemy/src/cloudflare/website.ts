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
  const wrangler = props.wrangler ?? true;

  return alchemy.run(id, async () => {
    const cwd = path.resolve(props.cwd || process.cwd());
    const fileName =
      typeof wrangler === "boolean"
        ? "wrangler.jsonc"
        : typeof wrangler === "string"
          ? wrangler
          : (wrangler?.path ?? "wrangler.jsonc");
    const wranglerPath =
      fileName && path.join(cwd, fileName);
    const wranglerMain =
      typeof wrangler === "object" ? (wrangler.main ?? props.main) : props.main;

    const workerName = props.name ?? id;

    const assetDir =
      typeof props.assets === "string"
        ? props.assets
        : (props.assets?.dist ?? "dist");

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

    await Exec("build", {
      cwd,
      command: props.command,
      env: props.env,
    });

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
