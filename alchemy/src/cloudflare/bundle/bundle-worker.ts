import fs from "node:fs/promises";
import { bootstrapPlugin } from "../../bootstrap/plugin.js";
import { Bundle } from "../../esbuild/bundle.js";
import { Scope, serializeScope } from "../../scope.js";
import type { Bindings } from "../bindings.js";
import type { WorkerProps } from "../worker.js";
import { createAliasPlugin } from "./alias-plugin.js";
import {
  isBuildFailure,
  rewriteNodeCompatBuildFailure,
} from "./build-failures.js";
import { external, external_als } from "./external.js";
import { getNodeJSCompatMode } from "./nodejs-compat-mode.js";
import { nodeJsCompatPlugin } from "./nodejs-compat.js";

export async function bundleWorkerScript<B extends Bindings>(
  props: WorkerProps<B> & {
    compatibilityDate: string;
    compatibilityFlags: string[];
  },
) {
  const projectRoot = props.projectRoot ?? process.cwd();

  const nodeJsCompatMode = await getNodeJSCompatMode(
    props.compatibilityDate,
    props.compatibilityFlags,
  );

  if (nodeJsCompatMode === "v1") {
    throw new Error(
      "You must set your compatibilty date >= 2024-09-23 when using 'nodejs_compat' compatibility flag",
    );
  }
  const main = props.entrypoint ?? props.meta?.path;
  if (!main) {
    throw new Error("One of entrypoint or meta.file must be provided");
  }

  try {
    const bundle = await Bundle("bundle", {
      entryPoint: main,
      format: props.format === "cjs" ? "cjs" : "esm", // Use the specified format or default to ESM
      target: "esnext",
      platform: "node",
      minify: false,
      ...(props.bundle || {}),
      conditions: ["workerd", "worker", "browser"],
      banner: props.fetch
        ? {
            js: `import { env as __ALCHEMY_ENV__ } from "cloudflare:workers";

var __ALCHEMY_STATE__ = ${JSON.stringify(await serializeScope(Scope.root))};

var STATE = {
  get: (id) => Promise.resolve(null),
  // get: (id) => __ALCHEMY_ENV__.STATE.get(id),
}`,
          }
        : undefined,
      options: {
        absWorkingDir: projectRoot,
        ...(props.bundle?.options || {}),
        keepNames: true, // Important for Durable Object classes
        loader: {
          ".sql": "text",
          ".json": "json",
        },
        plugins: [
          ...(props.fetch ? [bootstrapPlugin] : []),
          ...(props.bundle?.plugins ?? []),
          ...(nodeJsCompatMode === "v2" ? [await nodeJsCompatPlugin()] : []),
          ...(props.bundle?.alias
            ? [
                createAliasPlugin({
                  alias: props.bundle?.alias,
                  projectRoot,
                }),
              ]
            : []),
        ],
      },
      external: [
        ...(props.fetch
          ? [
              // for alchemy
              "libsodium*",
              "@swc/*",
              "esbuild",
              // TODO(sam): this is for fetch, why is it a package?
              "undici",
              // TODO(sam): no idea where this came from, feels dangerous to externalize it
              "ws",
            ]
          : []),
        ...(nodeJsCompatMode === "als" ? external_als : external),
        ...(props.bundle?.external ?? []),
        ...(props.bundle?.options?.external ?? []),
      ],
    });
    if (bundle.content) {
      return bundle.content;
    }
    if (bundle.path) {
      return await fs.readFile(bundle.path, "utf-8");
    }
    throw new Error("Failed to create bundle");
  } catch (e: any) {
    if (e.message?.includes("No such module 'node:")) {
      throw new Error(
        `${e.message}.\nMake sure to set 'nodejs_compat' compatibility flag and compatibilityDate > 2024-09-23`,
        { cause: e },
      );
    }
    if (isBuildFailure(e)) {
      rewriteNodeCompatBuildFailure(e.errors, nodeJsCompatMode);
      throw e;
    }
    console.error("Error reading bundle:", e);
    throw new Error("Error reading bundle");
  }
}
