import fs from "node:fs";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { ignore } from "../util/ignore.js";

/**
 * Properties for creating a CopyFile resource
 */
export interface CopyFileProps {
  /**
   * Source path of the file to copy
   */
  src: string;

  /**
   * Destination path where the file should be copied to
   */
  dest: string;

  /**
   * Whether to overwrite the destination file if it already exists
   * @default true
   */
  overwrite?: boolean;
}

/**
 * Output returned after CopyFile creation/update
 */
export interface CopyFile extends Resource<"fs::CopyFile">, CopyFileProps {
  /**
   * Time at which the object was created
   */
  createdAt: number;

  /**
   * Whether the file was successfully copied
   */
  copied: boolean;
}

/**
 * CopyFile Resource
 *
 * Copies a file from a source location to a destination location.
 *
 * @example
 * // Copy a file to a new location
 * const copiedFile = await CopyFile("config-copy", {
 *   src: "config.json",
 *   dest: "backup/config.json"
 * });
 *
 * @example
 * // Copy a file without overwriting if destination exists
 * const safeCopy = await CopyFile("safe-copy", {
 *   src: "data.json",
 *   dest: "backup/data.json",
 *   overwrite: false
 * });
 */
export const CopyFile = Resource(
  "fs::CopyFile",
  async function (
    this: Context<CopyFile>,
    _id: string,
    props: CopyFileProps,
  ): Promise<CopyFile> {
    const { src, dest, overwrite = true } = props;

    if (this.phase === "delete") {
      // When deleting, remove the destination file
      await ignore("ENOENT", async () => fs.promises.unlink(dest));
      return this.destroy();
    }
    try {
      // Check if source file exists
      await fs.promises.access(src, fs.constants.F_OK);

      // If this is an update and the destination has changed, delete the old file
      if (
        this.phase === "update" &&
        this.output?.dest &&
        this.output.dest !== dest
      ) {
        await ignore("ENOENT", async () =>
          fs.promises.unlink(this.output.dest),
        );
      }

      // Check if destination file exists
      const destinationExists = await fs.promises
        .access(dest, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      // Copy file if destination doesn't exist or overwrite is true
      if (!destinationExists || overwrite) {
        await fs.promises.copyFile(src, dest);
      }

      return this({
        src,
        dest,
        overwrite,
        copied: true,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error(`Error copying file from ${src} to ${dest}:`, error);
      throw error;
    }
  },
);
