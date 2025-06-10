import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { getContentType } from "../util/content-type.ts";
import ignore from "../util/ignore-matcher.js";

/**
 * Properties for creating or updating Assets
 */
export interface AssetsProps {
  /**
   * Path to a directory containing static assets to be uploaded
   * These files will be served by Cloudflare's Workers runtime
   */
  path: string;
}

/**
 * Output returned after Assets creation/update
 */
export interface Assets extends Resource<"cloudflare::Asset">, AssetsProps {
  /**
   * The type of binding
   */
  type: "assets";

  /**
   * The ID of the assets bundle
   */
  id: string;

  /**
   * Asset files that were found
   */
  files: AssetFile[];

  /**
   * Time at which the assets were created
   */
  createdAt: number;

  /**
   * Time at which the assets were last updated
   */
  updatedAt: number;
}

/**
 * Represents a single asset file
 */
export interface AssetFile {
  /**
   * Path relative to the assets directory
   */
  path: string;

  /**
   * Full filesystem path to the file
   */
  filePath: string;

  /**
   * Content type of the file
   */
  contentType: string;
}

/**
 * Cloudflare Assets represent a collection of static files that can be uploaded and served
 * by Cloudflare Workers.
 *
 * @example
 * // Create a basic assets bundle from a local directory
 * const staticAssets = await Assets("static", {
 *   path: "./src/assets"
 * });
 *
 * // Use these assets with a worker
 * const worker = await Worker("frontend", {
 *   name: "frontend-worker",
 *   entrypoint: "./src/worker.ts",
 *   bindings: {
 *     ASSETS: staticAssets
 *   }
 * });
 */
export const Assets = Resource(
  "cloudflare::Asset",
  {
    alwaysUpdate: true,
  },
  async function (
    this: Context<Assets>,
    id: string,
    props: AssetsProps,
  ): Promise<Assets> {
    if (this.phase === "delete") {
      return this.destroy();
    }

    try {
      // Check if the assets directory exists
      const stats = await fs.stat(props.path);
      if (!stats.isDirectory()) {
        throw new Error(`Assets path ${props.path} is not a directory`);
      }
    } catch (_error) {
      throw new Error(
        `Assets directory ${props.path} does not exist or is not accessible`,
      );
    }

    // Recursively get all files in the assets directory
    const ignoreMatcher = await createIgnoreMatcher(props.path);
    const filesList = await getFilesRecursively(props.path, ignoreMatcher);

    // Create asset file objects
    const files: AssetFile[] = filesList.map((filePath) => {
      const relativePath = path.relative(props.path, filePath);
      const normalizedPath = relativePath.split(path.sep).join("/"); // Ensure forward slashes for URLs

      return {
        path: normalizedPath,
        filePath,
        contentType: getContentType(filePath) ?? "application/null",
      };
    });

    // Get current timestamp
    const now = Date.now();

    // Construct the output
    return this({
      id,
      type: "assets",
      path: props.path,
      files,
      createdAt: this.output?.createdAt || now,
      updatedAt: now,
    });
  },
);

async function createIgnoreMatcher(
  dir: string,
): Promise<{ ignores: (path: string) => boolean }> {
  const ignoreMatcher = ignore().add(".assetsignore");
  const ignorePath = path.join(dir, ".assetsignore");
  try {
    const content = await fs.readFile(ignorePath, "utf-8");
    ignoreMatcher.add(content.split("\n"));
  } catch {
    // ignore
  }
  return ignoreMatcher;
}

// Helper functions for file operations
async function getFilesRecursively(
  dir: string,
  ignoreMatcher: { ignores: (path: string) => boolean },
): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const result: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const path = `${dir}/${file.name}`;
      if (ignoreMatcher.ignores(file.name)) {
        return;
      }
      if (file.isDirectory()) {
        result.push(...(await getFilesRecursively(path, ignoreMatcher)));
      } else {
        result.push(path);
      }
    }),
  );

  return result;
}
