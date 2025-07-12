import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { memoize } from "../../util/memoize.ts";

export type InternalWorker = "do-state-store" | "remote-binding-proxy";

export const getInternalWorkerBundle = memoize(async (name: InternalWorker) => {
  const content = await fs.readFile(
    path.join(import.meta.dirname, "..", "..", "..", "workers", `${name}.js`),
  );
  return {
    file: new File([content], `${name}.js`, {
      type: "application/javascript+module",
    }),
    tag: `${name}:${crypto.createHash("sha256").update(content).digest("hex")}`,
  };
});
