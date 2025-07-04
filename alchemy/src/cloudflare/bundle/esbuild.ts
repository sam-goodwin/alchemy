import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { esbuildPluginCompatWarning } from "./plugin-compat-warning.ts";
import { esbuildPluginHotReload } from "./plugin-hot-reload.ts";
import { esbuildPluginHybridNodeCompat } from "./plugin-hybrid-node-compat.ts";
import { esbuildPluginWasm } from "./plugin-wasm.ts";
import type {
  WorkerBundle,
  WorkerBundleBaseProps,
  WorkerBundleChunk,
  WorkerBundleProvider,
} from "./shared.ts";
import { parseFiles } from "./shared.ts";

interface ESBuildBundleProps
  extends WorkerBundleBaseProps,
    Omit<
      esbuild.BuildOptions,
      "entryPoints" | "format" | "absWorkingDir" | "outdir"
    > {
  entrypoint: string;
  cwd: string;
  outdir: string;
}

export class ESBuildBundleProvider implements WorkerBundleProvider {
  constructor(private props: ESBuildBundleProps) {}

  async create(): Promise<WorkerBundle> {
    const options = buildOptions(this.props);
    const result = await esbuild.build(options);
    return resolveOutputs(result.metafile, this.props);
  }

  async watch(signal: AbortSignal): Promise<ReadableStream<WorkerBundleChunk>> {
    const options = buildOptions(this.props);

    return new ReadableStream<WorkerBundleChunk>({
      start: async (controller) => {
        const context = await esbuild.context({
          ...options,
          plugins: [
            ...(options.plugins ?? []),
            esbuildPluginHotReload({
              onBuildStart: () => {
                controller.enqueue({ type: "start" });
              },
              onBuildError: (errors) => {
                controller.enqueue({ type: "error", errors });
              },
              onBuildEnd: async (result) => {
                controller.enqueue({
                  type: "end",
                  result: await resolveOutputs(result.metafile!, this.props),
                });
              },
            }),
          ],
        });
        await context.watch();
        signal.addEventListener("abort", async () => {
          await context.dispose();
          controller.close();
        });
      },
    });
  }

  async delete(): Promise<void> {
    await fs.rm(this.props.outdir, { recursive: true, force: true });
  }
}
function buildOptions({
  entrypoint,
  nodeCompat: compatibility,
  cwd,
  ...props
}: ESBuildBundleProps) {
  return {
    ...props,
    entryPoints: [entrypoint],
    absWorkingDir: path.resolve(cwd),
    outdir: path.relative(cwd, props.outdir),
    format: props.format,
    target: "esnext",
    platform: "node",
    metafile: true,
    write: true,
    bundle: true,
    conditions: ["workerd", "worker", "import", "module", "browser"],
    mainFields: ["module", "main"],
    loader: {
      ".sql": "text",
      ".json": "json",
      ...props.loader,
    },
    plugins: [
      esbuildPluginWasm(),
      compatibility === "v2"
        ? esbuildPluginHybridNodeCompat()
        : esbuildPluginCompatWarning(compatibility ?? null),
      ...(props.plugins ?? []),
    ],
    alias: props.alias,
    external: [
      ...(compatibility === "als" ? external_als : external),
      ...(props.external ?? []),
    ],
  } satisfies esbuild.BuildOptions;
}

async function resolveOutputs(
  metafile: esbuild.Metafile,
  props: ESBuildBundleProps,
): Promise<WorkerBundle> {
  const root = path.resolve(props.outdir);
  const paths: string[] = [];
  let entrypoint: string | undefined;
  for (const [key, value] of Object.entries(metafile.outputs)) {
    const name = path.relative(root, path.join(props.cwd, key));
    paths.push(name);
    if (value.entryPoint === props.entrypoint) {
      entrypoint = name;
    }
  }
  if (!entrypoint) {
    throw new Error(
      `Failed to find entrypoint in metafile: ${JSON.stringify(metafile)}`,
    );
  }
  const { files, hash } = await parseFiles(root, paths, props.format);
  return {
    entrypoint,
    files,
    hash,
  };
}

// https://developers.cloudflare.com/workers/runtime-apis/nodejs/#supported-nodejs-apis
const nodejs_compat = [
  "node:async_hooks",
  "node:assert",
  "node:buffer",
  "node:console",
  "node:crypto",
  "node:debug",
  "node:diagnostics_channel",
  "node:dns",
  "node:events",
  "node:inspector",
  "node:net",
  "node:path",
  "node:perf_hooks", // partially supported
  "node:process",
  "node:querystring",
  "node:stream",
  "node:string_decoder",
  "node:timers",
  "node:tls", // partially supported
  "node:url",
  "node:util",
  "node:zlib",
  // "node:*",
];

const external = [
  ...nodejs_compat,
  ...nodejs_compat.map((p) => p.split(":")[1]),
  "cloudflare:workers",
  "cloudflare:workflows",
  "cloudflare:*",
];

const external_als = ["node:async_hooks", "async_hooks", "cloudflare:*"];
