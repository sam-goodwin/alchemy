import type esbuild from "esbuild";
import type { Bindings } from "../bindings.ts";
import type { WorkerProps } from "../worker.ts";
import { createAliasPlugin } from "./alias-plugin.ts";
import { external, external_als } from "./external.ts";
import { getNodeJSCompatMode } from "./nodejs-compat-mode.ts";
import { nodeJsCompatPlugin } from "./nodejs-compat.ts";
import { nodeJsImportWarningPlugin } from "./nodejs-import-warning-plugin.ts";
import { wasmPlugin } from "./wasm-plugin.ts";

interface DevWorkerContext {
  context: esbuild.BuildContext;
  dispose: () => Promise<void>;
}

declare global {
  var _ALCHEMY_DEV_WORKER_CONTEXTS: Map<string, DevWorkerContext> | undefined;
}

const activeContexts = () =>
  (globalThis._ALCHEMY_DEV_WORKER_CONTEXTS ??= new Map());

/**
 * Creates an esbuild context for watching and hot-reloading a worker
 */
export async function createWorkerDevContext<B extends Bindings>(
  workerName: string,
  props: WorkerProps<B> & {
    entrypoint: string;
    compatibilityDate: string;
    compatibilityFlags: string[];
    cwd: string;
  },
  hooks: HotReloadHooks,
) {
  // Clean up any existing context for this worker
  const existing = activeContexts().get(workerName);
  if (existing) {
    await existing.dispose();
  }

  if (!props.entrypoint) {
    throw new Error(
      "A worker dev context was created, but no entry point was provided.",
    );
  }

  const esbuild = await import("esbuild");
  const nodeJsCompatMode = await getNodeJSCompatMode(
    props.compatibilityDate,
    props.compatibilityFlags,
  );

  const context = await esbuild.context({
    entryPoints: [props.entrypoint],
    format: props.format === "cjs" ? "cjs" : "esm",
    target: "esnext",
    platform: "node",
    minify: false,
    bundle: true,
    ...props.bundle,
    write: false, // We want the result in memory for hot reloading
    conditions: ["workerd", "worker", "import", "module", "browser"],
    mainFields: ["module", "main"],
    absWorkingDir: props.cwd,
    keepNames: true,
    loader: {
      ".sql": "text",
      ".json": "json",
      ...props.bundle?.loader,
    },
    plugins: [
      wasmPlugin,
      ...(props.bundle?.plugins ?? []),
      nodeJsCompatMode === "v2"
        ? await nodeJsCompatPlugin()
        : nodeJsImportWarningPlugin(nodeJsCompatMode),
      ...(props.bundle?.alias
        ? [
            createAliasPlugin({
              alias: props.bundle?.alias,
              projectRoot: props.cwd,
            }),
          ]
        : []),
      hotReloadPlugin(hooks),
    ],
    external: [
      ...(nodeJsCompatMode === "als" ? external_als : external),
      ...(props.bundle?.external ?? []),
    ],
  });

  await context.watch();

  activeContexts().set(workerName, {
    context,
    dispose: async () => {
      await context.dispose();
      activeContexts().delete(workerName);
    },
  });
}

interface HotReloadHooks {
  onBuildStart: () => void | Promise<void>;
  onBuildEnd: (script: string) => void | Promise<void>;
  onBuildError: (errors: esbuild.Message[]) => void | Promise<void>;
}

function hotReloadPlugin(hooks: HotReloadHooks): esbuild.Plugin {
  return {
    name: "alchemy-hot-reload",
    setup(build) {
      build.onStart(hooks.onBuildStart);
      build.onEnd(async (result) => {
        if (result.errors.length > 0) {
          await hooks.onBuildError(result.errors);
          return;
        }

        if (result.outputFiles && result.outputFiles.length > 0) {
          const newScript = result.outputFiles[0].text;
          await hooks.onBuildEnd(newScript);
        }
      });
    },
  };
}
