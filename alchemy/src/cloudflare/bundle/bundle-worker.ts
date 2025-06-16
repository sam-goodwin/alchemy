import kleur from "kleur";
import fs from "node:fs/promises";
import path from "node:path";
import { Bundle } from "../../esbuild/bundle.ts";
import { logger } from "../../util/logger.ts";
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

export async function bundleWorkerScript<B extends Bindings>(
  props: WorkerProps<B> & {
    name: string;
    entrypoint: string;
    compatibilityDate: string;
    compatibilityFlags: string[];
  },
): Promise<string | NoBundleResult> {
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
          globs: [
            "**/*.js",
            "**/*.mjs",
            "**/*.wasm",
            ...(props.uploadSourceMaps ? ["**/*.js.map"] : []),
          ],
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
    const useColor = !(process.env.CI || process.env.NO_COLOR);
    logger.log(
      `${useColor ? kleur.gray("worker:") : "worker:"} ${useColor ? kleur.blue(props.name) : props.name}`,
    );
    logger.log(
      `${useColor ? kleur.gray("main:") : "main:"} ${useColor ? kleur.blue(main) : main}`,
    );
    logger.log(
      `${useColor ? kleur.gray("dist:") : "dist:"} ${useColor ? kleur.blue(path.relative(process.cwd(), rootDir)) : path.relative(process.cwd(), rootDir)}:`,
    );
    // End of Selection
    return Object.fromEntries(
      await Promise.all(
        files.map(async (file, i) => {
          logger.log(
            kleur.blue(`${i < files.length - 1 ? "├─" : "└─"} ${file}`),
          );
          return [file, await fs.readFile(path.resolve(rootDir, file))];
        }),
      ),
    );
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
      absWorkingDir: projectRoot,
      keepNames: true, // Important for Durable Object classes
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
    logger.error("Error reading bundle:", e);
    throw new Error("Error reading bundle");
  }
}
