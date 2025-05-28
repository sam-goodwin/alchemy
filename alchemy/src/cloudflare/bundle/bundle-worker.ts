import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { ResolvedEnvironment } from "unenv";
import { Bundle } from "../../esbuild/bundle.js";
import type { Bindings } from "../bindings.js";
import type { WorkerProps } from "../worker.js";
import { createAliasPlugin } from "./alias-plugin.js";
import {
  isBuildFailure,
  rewriteNodeCompatBuildFailure,
} from "./build-failures.js";
import { external, external_als } from "./external.js";
import { getNodeJSCompatMode } from "./nodejs-compat-mode.js";

export async function bundleWorkerScript<B extends Bindings>(
  props: WorkerProps<B> & {
    entrypoint: string;
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
  const main = props.entrypoint;

  let env: ResolvedEnvironment | undefined;
  if (nodeJsCompatMode === "v2") {
    const { defineEnv } = await import("unenv");
    const { cloudflare } = await import("@cloudflare/unenv-preset");
    env = defineEnv({
      presets: [cloudflare],
      npmShims: true,
    }).env;
  }
  console.log(env?.inject);

  try {
    const bundle = await Bundle("bundle", {
      entryPoint: main,
      format: props.format === "cjs" ? "cjs" : "esm", // Use the specified format or default to ESM
      target: "esnext",
      platform: "node",
      minify: false,
      ...(props.bundle || {}),
      conditions: ["workerd", "worker", "browser"],
      options: {
        absWorkingDir: projectRoot,
        ...(props.bundle?.options || {}),
        keepNames: true, // Important for Durable Object classes
        loader: {
          ".sql": "text",
          ".json": "json",
        },
        alias: env?.alias,
        plugins: [
          ...(props.bundle?.plugins ?? []),
          // ...(nodeJsCompatMode === "v2" ? [await nodeJsCompatPlugin()] : []),
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
        ...(env?.external ?? []),
        ...(nodeJsCompatMode === "als" ? external_als : external),
        ...(props.bundle?.external ?? []),
        ...(props.bundle?.options?.external ?? []),
      ],
      inject:
        props.bundle?.inject || env
          ? [
              ...(props.bundle?.inject ?? []),
              ...(env?.polyfill ?? []),
              ...(env?.inject ? [await makeInjectFile(env)] : []),
            ]
          : undefined,
    });
    if (bundle.content) {
      await fs.writeFile("script.js", bundle.content);
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

async function makeInjectFile(env: ResolvedEnvironment): Promise<string> {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "alchemy-inject-"));
  const stub = path.join(tmp, "globals.mjs");

  const lines: string[] = [];

  for (const [id, spec] of Object.entries(env.inject)) {
    console.log(id);
    const [modulePath, exportName = "default"] = Array.isArray(spec)
      ? [spec[0], spec[1]]
      : [spec, "default"];

    // generate a unique local symbol to avoid clashes
    const local = `${id}__shim`;

    const importStmt =
      exportName === "default"
        ? `import ${local} from "${modulePath}";`
        : `import { ${exportName} as ${local} } from "${modulePath}";`;

    lines.push(
      importStmt,
      `globalThis.${id} = ${local};`,
      `export const ${id} = ${local};`,
    );
  }

  await fs.writeFile(stub, lines.join("\n"));
  return stub; // add this to esbuild's `inject`
}
