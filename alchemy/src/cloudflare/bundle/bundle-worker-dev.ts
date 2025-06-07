import type esbuild from "esbuild";
import type { Bindings } from "../bindings.ts";
import type { WorkerProps } from "../worker.ts";
import { bundleWorkerScript } from "./bundle-worker.ts";
import { miniflareWorker } from "../worker-miniflare.ts";

interface DevWorkerContext {
  context: esbuild.BuildContext;
  dispose: () => Promise<void>;
}

const activeContexts = new Map<string, DevWorkerContext>();

/**
 * Creates an esbuild context for watching and hot-reloading a worker
 */
export async function createWorkerDevContext<B extends Bindings>(
  workerName: string,
  props: WorkerProps<B> & {
    entrypoint: string;
    compatibilityDate: string;
    compatibilityFlags: string[];
  },
  onRebuild?: (script: string) => Promise<void>
): Promise<{
  initialScript: string;
  dispose: () => Promise<void>;
}> {
  // Clean up any existing context for this worker
  const existing = activeContexts.get(workerName);
  if (existing) {
    await existing.dispose();
    activeContexts.delete(workerName);
  }

  if (!props.entrypoint) {
    throw new Error("entrypoint is required for dev mode watching");
  }

  // First get the initial bundle to start with
  const initialScript = await bundleWorkerScript(props);
  if (typeof initialScript !== "string") {
    throw new Error("Dev mode watching only supports bundled scripts, not NoBundleResult");
  }

  // Create esbuild context for watching
  const esbuild = await import("esbuild");
  
  const projectRoot = props.projectRoot ?? process.cwd();
  
  // Get the bundle options from bundleWorkerScript logic
  const bundleOptions: esbuild.BuildOptions = {
    entryPoints: [props.entrypoint],
    format: props.format === "cjs" ? "cjs" : "esm",
    target: "esnext",
    platform: "node",
    minify: false,
    bundle: true,
    write: false, // We want the result in memory for hot reloading
    ...props.bundle,
    conditions: ["workerd", "worker", "browser"],
    absWorkingDir: projectRoot,
    keepNames: true,
    loader: {
      ".sql": "text",
      ".json": "json",
      ...props.bundle?.loader,
    },
    // Plugins will be added later based on compatibility flags
    plugins: props.bundle?.plugins ?? [],
    external: props.bundle?.external ?? [],
  };

  // Create the context
  const context = await esbuild.context({
    ...bundleOptions,
    plugins: [
      ...bundleOptions.plugins,
      {
        name: "alchemy-hot-reload",
        setup(build) {
          build.onEnd(async (result) => {
            if (result.errors.length > 0) {
              console.error("Build errors:", result.errors);
              return;
            }
            
            if (result.outputFiles && result.outputFiles.length > 0) {
              const newScript = result.outputFiles[0].text;
              console.log(`🔄 Rebuilt worker: ${workerName}`);
              
              if (onRebuild) {
                try {
                  await onRebuild(newScript);
                } catch (error) {
                  console.error("Error during hot reload:", error);
                }
              }
            }
          });
        },
      },
    ],
  });

  // Start watching
  await context.watch();

  const dispose = async () => {
    await context.dispose();
    activeContexts.delete(workerName);
  };

  // Store the context for cleanup
  activeContexts.set(workerName, { context, dispose });

  return {
    initialScript,
    dispose,
  };
}

/**
 * Disposes all active dev contexts
 */
export async function disposeAllDevContexts(): Promise<void> {
  await Promise.all(
    Array.from(activeContexts.values()).map(ctx => ctx.dispose())
  );
  activeContexts.clear();
}