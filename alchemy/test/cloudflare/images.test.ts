import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { Images } from "../../src/cloudflare/images.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import path from "node:path";
import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Images Binding", () => {
  test("create worker with images binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-images-worker`;

    let worker: Worker | undefined;

    try {
      worker = await Worker(workerName, {
        name: workerName,
        entrypoint: path.join(import.meta.dirname, "images-handler.ts"),
        format: "esm",
        url: true,
        bindings: {
          IMAGES: new Images(),
        },
      });

      const response = await fetch(worker.url!);
      expect(response.status).toEqual(200);
      const text = await response.text();
      expect(text).toContain("Images binding available");
    } finally {
      await destroy(scope);
    }
  });
});
