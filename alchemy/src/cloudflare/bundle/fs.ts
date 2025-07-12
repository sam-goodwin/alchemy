import kleur from "kleur";
import fs from "node:fs/promises";
import path from "pathe";
import { logger } from "../../util/logger.ts";
import type {
  WorkerBundle,
  WorkerBundleBaseProps,
  WorkerBundleChunk,
  WorkerBundleProvider,
} from "./shared.ts";
import { parseFiles } from "./shared.ts";

interface FSBundleProps extends WorkerBundleBaseProps {
  entrypoint: string;
  globs: string[] | undefined;
  cwd: string;
  sourcemaps: boolean;
}

export class FSBundleProvider implements WorkerBundleProvider {
  private root: string;
  private entrypoint: string;
  private globs: string[];
  private format: "esm" | "cjs";

  constructor(props: FSBundleProps) {
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

  async create(log = true): Promise<WorkerBundle> {
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
    const { files, hash } = await parseFiles(
      this.root,
      Array.from(fileNames),
      this.format,
    );
    if (log) {
      logger.log(`${kleur.gray("worker:")} ${kleur.blue(this.entrypoint)}`);
      logger.log(`${kleur.gray("main:")} ${kleur.blue(this.entrypoint)}`);
      logger.log(
        `${kleur.gray("dist:")} ${kleur.blue(path.relative(process.cwd(), this.root))}:`,
      );
    }
    return {
      entrypoint: this.entrypoint,
      files,
      hash,
    };
  }

  async watch(signal: AbortSignal): Promise<ReadableStream<WorkerBundleChunk>> {
    let result = await this.create();
    const watcher = fs.watch(this.root, {
      recursive: true,
      signal,
    });
    const iterator = watcher[Symbol.asyncIterator]();
    return new ReadableStream({
      start: async (controller) => {
        controller.enqueue({ type: "end", result });
      },
      pull: async (controller) => {
        const next = await iterator.next().catch((err) => {
          if (err instanceof DOMException && err.name === "AbortError") {
            return { done: true };
          }
          throw err;
        });
        if (next.done) {
          controller.close();
        } else {
          controller.enqueue({ type: "start" });
          const update = await this.create(false);
          if (update.hash !== result.hash) {
            result = update;
            controller.enqueue({ type: "end", result });
          }
        }
      },
    });
  }
}
