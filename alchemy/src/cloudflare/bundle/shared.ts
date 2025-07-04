import type esbuild from "esbuild";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getContentType } from "../../util/content-type.ts";

export interface WorkerBundleBaseProps {
  format: "cjs" | "esm";
  nodeCompat: "als" | "v2" | null;
}

export interface WorkerBundle {
  entrypoint: string;
  files: File[];
  hash: string;
}

export type WorkerBundleChunk =
  | {
      type: "start";
    }
  | {
      type: "end";
      result: WorkerBundle;
    }
  | {
      type: "error";
      errors: esbuild.Message[];
    };

export interface WorkerBundleProvider {
  create(): Promise<WorkerBundle>;
  watch(signal: AbortSignal): Promise<ReadableStream<WorkerBundleChunk>>;
  delete?(): Promise<void>;
}

export const normalizeFileType = (file: string, format: "cjs" | "esm") => {
  if (path.extname(file) === ".js" && format === "esm") {
    return "application/javascript+module";
  }
  return getContentType(file);
};

export const parseFiles = async (
  root: string,
  paths: string[],
  format: "esm" | "cjs",
) => {
  const outputs = await Promise.all(
    paths.map(async (file) => {
      const content = await fs.readFile(path.join(root, file));
      return {
        file: new File([content], file, {
          type: normalizeFileType(file, format),
        }),
        hash: crypto.createHash("sha256").update(content).digest("hex"),
      };
    }),
  );
  return {
    files: outputs.map(({ file }) => file),
    hash: combineFileHashes(outputs),
  };
};

const combineFileHashes = (files: { file: File; hash: string }[]) => {
  const sorted = files.sort((a, b) => a.file.name.localeCompare(b.file.name));
  const finalHash = crypto.createHash("sha256");
  for (const { hash } of sorted) {
    finalHash.update(hash);
  }
  return finalHash.digest("hex");
};
