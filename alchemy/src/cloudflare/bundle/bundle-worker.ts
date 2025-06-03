import fs from "node:fs/promises";
import path from "node:path";
import { Bundle } from "../../esbuild/bundle.ts";
import type { Bindings } from "../bindings.ts";
import type { WorkerProps } from "../worker.ts";
import { createAliasPlugin } from "./alias-plugin.ts";
import {
  isBuildFailure,
  rewriteNodeCompatBuildFailure,
} from "./build-failures.ts";
import { external, external_als } from "./external.ts";
import { getNodeJSCompatMode } from "./nodejs-compat-mode.ts";
import { nodeJsCompatPlugin } from "./nodejs-compat.ts";
import { wasmPlugin } from "./wasm-plugin.ts";

export type NoBundleResult = {
  [fileName: string]: Buffer;
};

/**
 * Represents the output of a bundled worker script, including optional source map.
 */
export interface BundledWorkerScript {
  /**
   * The name of the main bundled script file (e.g., "_worker.js").
   */
  scriptName: string;
  /**
   * The content of the main bundled script.
   */
  scriptContent: string;
  /**
   * Optional source map details if generated.
   */
  sourceMap?: {
    /**
     * The name of the source map file (e.g., "_worker.js.map").
     */
    name: string;
    /**
     * The content of the source map file.
     */
    content: string;
  };
}

/**
 * The output of the worker script bundling process.
 * Can be a single bundled script with an optional source map, or multiple files if noBundle is true.
 */
export type WorkerScriptOutput = NoBundleResult | BundledWorkerScript;

export async function bundleWorkerScript<B extends Bindings>(
  props: WorkerProps<B> & {
    entrypoint: string;
    compatibilityDate: string;
    compatibilityFlags: string[];
  },
): Promise<WorkerScriptOutput> {
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

  if (props.noBundle) {
    const rootDir = path.dirname(path.resolve(main));
    const rules = (
      props.rules ?? [
        {
          globs: ["**/*.js", "**/*.mjs", "**/*.wasm"],
        },
      ]
    ).flatMap((rule) => rule.globs);
    const files = Array.from(
      new Set(
        (
          await Promise.all(
            rules.map((rule) =>
              Array.fromAsync(
                fs.glob(rule, {
                  cwd: rootDir,
                }),
              ),
            ),
          )
        ).flat(),
      ),
    );
    return Object.fromEntries(
      await Promise.all(
        files.map(async (file) => [
          file,
          await fs.readFile(path.resolve(rootDir, file)),
        ]),
      ),
    );
  }

  try {
    const entryPointBaseName = path.basename(main, path.extname(main));
    const outfileName = `${entryPointBaseName}.js`;

    const bundleResult = await Bundle("bundle", {
      entryPoint: main,
      outfile: outfileName,
      format: props.format === "cjs" ? "cjs" : "esm",
      target: "esnext",
      platform: "node",
      minify: props.bundle?.minify ?? false,
      ...(props.bundle || {}),
      sourcemap: props.sourceMaps ? 'inline' : undefined,
      conditions: ["workerd", "worker", "browser"],
      absWorkingDir: projectRoot,
      keepNames: true,
      loader: {
        ".sql": "text",
        ".json": "json",
        ...props.bundle?.loader,
      },
      plugins: [
        wasmPlugin,
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
      external: [
        ...(nodeJsCompatMode === "als" ? external_als : external),
        ...(props.bundle?.external ?? []),
      ],
      write: false,
    });

    if (!bundleResult.content) {
      throw new Error("Failed to create bundle: no content.");
    }

    let scriptName = "_worker.js";
    if (bundleResult.path) {
      scriptName = path.basename(bundleResult.path);
      if (scriptName.endsWith(".map")) {
        scriptName = scriptName.slice(0, -4);
      }
    }
    
    const workerScriptOutput: BundledWorkerScript = {
      scriptName: scriptName,
      scriptContent: bundleResult.content,
    };

    return workerScriptOutput;

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
