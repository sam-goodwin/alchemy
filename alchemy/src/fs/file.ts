import fs from "node:fs";
import path from "node:path";
import type { Context } from "../context";
import { Resource } from "../resource";
import { ignore } from "../util/ignore";

import { alchemy } from "../alchemy";

declare module "../alchemy" {
  interface Alchemy {
    files: (...paths: string[]) => Promise<{
      [relativePath: string]: string;
    }>;
  }
}

alchemy.files = async (...paths: string[]) =>
  Object.fromEntries(
    await Promise.all(
      paths.map(async (path) => [
        path,
        await fs.promises.readFile(path, "utf-8"),
      ]),
    ),
  );

export interface File extends Resource<"fs::File"> {
  path: string;
  content: string;
}

export const File = Resource(
  "fs::File",
  async function (
    this: Context<File>,
    id: string,
    {
      path: filePath,
      content,
    }: {
      path: string;
      content: string;
    },
  ): Promise<File> {
    if (this.phase === "delete") {
      await ignore("ENOENT", async () => fs.promises.unlink(filePath));
      return this.destroy();
    } else {
      await fs.promises.mkdir(path.dirname(filePath), {
        recursive: true,
      });
      await fs.promises.writeFile(filePath, content);
    }
    return this({
      path: filePath,
      content,
    });
  },
);
