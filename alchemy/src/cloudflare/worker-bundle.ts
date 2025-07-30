import esbuild from "esbuild";
import { err, ok, type Result } from "neverthrow";
import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "../util/logger.ts";
import { external, external_als } from "./bundle/externals.ts";
import { esbuildPluginAlias } from "./bundle/plugin-alias.ts";
import { esbuildPluginCompatWarning } from "./bundle/plugin-compat-warning.ts";
import { createHotReloadPlugin } from "./bundle/plugin-hot-reload.ts";
import { esbuildPluginHybridNodeCompat } from "./bundle/plugin-hybrid-node-compat.ts";
import { createWasmPlugin } from "./bundle/plugin-wasm.ts";
import { validateNodeCompat } from "./bundle/validate-node-compat.ts";

export interface WorkerBundle {
  entrypoint: string;
  root?: string;
  modules: WorkerBundle.Module[];
}

export function normalizeWorkerBundle(props: {
  id: string;
  script: string | undefined;
  entrypoint: string | undefined;
  noBundle: boolean | undefined;
  format: "cjs" | "esm" | undefined;
  compatibilityDate: string;
  compatibilityFlags: string[];
  rules:
    | {
        globs: string[];
      }[]
    | undefined;
  bundle?: Omit<
    esbuild.BuildOptions,
    "entryPoints" | "format" | "absWorkingDir"
  >;
  cwd: string;
  outdir: string;
  sourceMap: boolean | undefined;
}): Result<WorkerBundleSource, string> {
  return validateNodeCompat({
    compatibilityDate: props.compatibilityDate,
    compatibilityFlags: props.compatibilityFlags,
    noBundle: props.noBundle ?? false,
  }).andThen((nodeCompat) => {
    if (props.script) {
      return ok(
        new WorkerBundleSource.Inline({
          content: props.script,
          format: props.format ?? "esm",
          nodeCompat,
        }),
      );
    }
    if (!props.entrypoint) {
      return err(
        "Either `script` or `entrypoint` must be provided for workers",
      );
    }
    return ok(
      props.noBundle
        ? new WorkerBundleSource.FS({
            entrypoint: props.entrypoint,
            format: props.format ?? "esm",
            nodeCompat,
            cwd: props.cwd,
            globs: props.rules?.flatMap((rule) => rule.globs),
            sourcemaps: props.sourceMap !== false,
          })
        : new WorkerBundleSource.ESBuild({
            id: props.id,
            entrypoint: props.entrypoint,
            format: props.format ?? "esm",
            nodeCompat,
            cwd: props.cwd,
            outdir: props.outdir,
            sourcemap: props.sourceMap !== false ? true : undefined,
            ...props.bundle,
          }),
    );
  });
}

export namespace WorkerBundle {
  export interface Module {
    type: "esm" | "cjs" | "text" | "data" | "wasm" | "sourcemap";
    path: string;
    content?: string | Uint8Array<ArrayBuffer>;
  }

  export const parseModules = (
    paths: string[],
    format: "esm" | "cjs",
  ): WorkerBundle.Module[] => {
    return paths.map((path) => {
      const ext = path.split(".").pop();
      switch (ext) {
        case "js":
          return { type: format, path };
        case "mjs":
          return { type: "esm", path };
        case "cjs":
          return { type: "cjs", path };
        case "wasm":
          return { type: "wasm", path };
        case "map":
          return { type: "sourcemap", path };
        default:
          return { type: "text", path };
      }
    });
  };

  export const toFormData = async (bundle: WorkerBundle) => {
    const types = {
      esm: "application/javascript+module",
      cjs: "application/javascript",
      text: "text/plain",
      data: "application/octet-stream",
      wasm: "application/wasm",
      sourcemap: "application/source-map",
    } as const;
    const form = new FormData();
    await Promise.all(
      bundle.modules.map(async (module) => {
        const content =
          module.content ??
          (await fs.readFile(path.join(bundle.root!, module.path)));
        form.append(
          module.path,
          new Blob([content], {
            type: types[module.type],
          }),
          module.path,
        );
      }),
    );
    return form;
  };
}

export interface WorkerBundleSource {
  create(): Promise<WorkerBundle>;
  watch(signal: AbortSignal): AsyncIterable<WorkerBundle>;
  delete?(): Promise<void>;
}

export namespace WorkerBundleSource {
  export interface BaseProps {
    format: "cjs" | "esm";
    nodeCompat: "als" | "v2" | null;
  }

  export class Inline implements WorkerBundleSource {
    constructor(
      private props: WorkerBundleSource.BaseProps & { content: string },
    ) {}

    async create(): Promise<WorkerBundle> {
      return {
        entrypoint: "worker.js",
        modules: [
          {
            path: "worker.js",
            type: this.props.format,
            content: this.props.content,
          },
        ],
      };
    }

    async *watch(): AsyncIterable<WorkerBundle> {
      yield await this.create();
    }
  }

  export class FS implements WorkerBundleSource {
    private root: string;
    private entrypoint: string;
    private globs: string[];
    private format: "esm" | "cjs";

    constructor(
      props: WorkerBundleSource.BaseProps & {
        entrypoint: string;
        globs: string[] | undefined;
        cwd: string;
        sourcemaps: boolean;
      },
    ) {
      const entrypoint = path.resolve(props.cwd, props.entrypoint);
      this.root = path.dirname(entrypoint);
      this.entrypoint = path.relative(this.root, entrypoint);
      this.globs = props.globs ?? [
        "**/*.js",
        "**/*.mjs",
        "**/*.wasm",
        ...(props.sourcemaps ? ["**/*.js.map"] : []),
      ];
      this.format = props.format;
    }

    async create(): Promise<WorkerBundle> {
      return {
        entrypoint: this.entrypoint,
        root: this.root,
        modules: await this.readFiles(),
      };
    }

    async *watch(signal: AbortSignal): AsyncIterable<WorkerBundle> {
      const watcher = fs.watch(this.root, { recursive: true, signal });
      for await (const event of watcher) {
        if (event.eventType === "change") {
          yield await this.create();
        }
      }
    }

    private async readFiles() {
      const fileNames = new Set<string>();
      await Promise.all(
        this.globs.map(async (glob) => {
          for await (const file of fs.glob(glob, { cwd: this.root })) {
            fileNames.add(file);
          }
        }),
      );
      if (fileNames.size === 0) {
        throw new Error(
          `No files found matching ${this.globs.join(", ")} in ${this.root}`,
        );
      }
      return WorkerBundle.parseModules(Array.from(fileNames), this.format);
    }
  }

  export interface ESBuildProps
    extends WorkerBundleSource.BaseProps,
      Omit<
        esbuild.BuildOptions,
        "entryPoints" | "format" | "absWorkingDir" | "outdir"
      > {
    id: string;
    entrypoint: string;
    cwd: string;
    outdir: string;
  }

  export class ESBuild implements WorkerBundleSource {
    constructor(private props: ESBuildProps) {
      // Normalize paths to ensure consistency between esbuild inputs and outputs:
      // - the `cwd` is absolute
      // - the `entrypoint` and `outdir` are relative to the `cwd`
      // This is so we can identify the entrypoint from the metafile.
      this.props.cwd = path.resolve(this.props.cwd);
      this.props.entrypoint = path.isAbsolute(props.entrypoint)
        ? path.relative(this.props.cwd, props.entrypoint)
        : path.normalize(props.entrypoint);
      this.props.outdir = path.isAbsolute(props.outdir)
        ? path.relative(this.props.cwd, props.outdir)
        : path.normalize(props.outdir);
    }

    async create(): Promise<WorkerBundle> {
      const wasmPlugin = createWasmPlugin();
      const options = this.buildOptions([wasmPlugin.plugin]);
      const result = await esbuild.build(options);
      const { entrypoint, root, modules } = await this.formatBuildOutput(
        result.metafile,
      );
      return {
        entrypoint,
        root,
        modules: [...modules, ...wasmPlugin.modules.values()],
      };
    }

    async *watch(signal: AbortSignal): AsyncIterable<WorkerBundle> {
      const wasm = createWasmPlugin();
      let count = 0;
      const hotReload = createHotReloadPlugin({
        onBuildStart: () => {
          if (count > 0) {
            logger.task(this.props.id, {
              message: "Rebuilding",
              status: "pending",
              resource: this.props.id,
              prefix: "dev",
              prefixColor: "cyanBright",
            });
          }
        },
      });
      const options = this.buildOptions([wasm.plugin, hotReload.plugin]);

      const context = await esbuild.context(options);
      signal.addEventListener("abort", () => context.dispose());
      await context.watch();

      for await (const result of hotReload.iterator) {
        count++;
        const { entrypoint, root, modules } = await this.formatBuildOutput(
          result.metafile!,
        );
        yield {
          entrypoint,
          root,
          modules: [...modules, ...wasm.modules.values()],
        };
      }
    }

    async delete(): Promise<void> {
      await fs.rm(path.join(this.props.cwd, this.props.outdir), {
        recursive: true,
        force: true,
      });
    }

    private buildOptions(additionalPlugins: esbuild.Plugin[]) {
      const {
        id: _,
        entrypoint,
        nodeCompat,
        cwd,
        format,
        ...props
      } = this.props;
      return {
        entryPoints: [entrypoint],
        absWorkingDir: cwd,
        target: "es2022",
        loader: {
          ".js": "jsx",
          ".mjs": "jsx",
          ".cjs": "jsx",
        },
        format,
        sourceRoot: this.props.outdir,
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        keepNames: true,
        ...props,
        metafile: true,
        write: true,
        bundle: true,
        define: {
          "navigator.userAgent": '"Cloudflare-Workers"',
          "process.env.NODE_ENV": '"undefined"',
          ...props.define,
        },
        conditions: props.conditions ?? ["workerd", "worker", "browser"],
        plugins: [
          esbuildPluginAlias(props.alias ?? {}, this.props.cwd),
          nodeCompat === "v2"
            ? esbuildPluginHybridNodeCompat()
            : esbuildPluginCompatWarning(nodeCompat ?? null),
          ...(props.plugins ?? []),
          ...additionalPlugins,
        ],
        external: [
          ...(nodeCompat === "als" ? external_als : external),
          ...(props.external ?? []),
        ],
      } satisfies esbuild.BuildOptions;
    }

    private async formatBuildOutput(
      metafile: esbuild.Metafile,
    ): Promise<WorkerBundle> {
      const outdir = path.resolve(this.props.cwd, this.props.outdir);
      await fs.writeFile(
        path.join(outdir, "metafile.json"),
        JSON.stringify(metafile, null, 2),
      );
      const paths: string[] = [];
      let entrypoint: string | undefined;
      for (const [key, value] of Object.entries(metafile.outputs)) {
        const name = path.relative(outdir, path.resolve(this.props.cwd, key));
        paths.push(name);
        if (value.entryPoint === this.props.entrypoint) {
          entrypoint = name;
        }
      }
      if (!entrypoint) {
        throw new Error(
          `Failed to find entrypoint in metafile - expected ${this.props.entrypoint} but found ${Object.values(
            metafile.outputs,
          )
            .map((v) => v.entryPoint)
            .filter((v) => v !== undefined)
            .join(", ")}`,
        );
      }
      return {
        entrypoint,
        root: outdir,
        modules: WorkerBundle.parseModules(paths, this.props.format),
      };
    }
  }
}
