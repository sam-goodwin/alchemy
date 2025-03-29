import fs from "node:fs";
import type { Context } from "../context";
import { Resource } from "../resource";
import { ignore } from "../util/ignore";

export interface Folder extends Resource<"fs::Folder"> {
  path: string;
}

export const Folder = Resource(
  "fs::Folder",
  async function (
    this: Context<Folder>,
    id: string,
    props?: { path: string },
  ): Promise<Folder> {
    const dirPath = props?.path || id;
    if (this.phase === "delete") {
      // we just do a best effort attempt
      await ignore(["ENOENT", "ENOTEMPTY"], async () =>
        fs.promises.rmdir(dirPath),
      );
      return this.destroy();
    } else {
      await ignore("EEXIST", async () =>
        fs.promises.mkdir(dirPath, { recursive: true }),
      );
    }
    return this({
      path: dirPath,
    });
  },
);
