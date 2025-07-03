import { describe, expect } from "vitest";
import { alchemy } from "../src/alchemy.ts";
import { BRANCH_PREFIX } from "./util.ts";

import "../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("alchemy.run", async () => {
  describe("read mode", async () => {
    test("can create a scope", async (scope) => {
      expect(scope.phase).toBe("apply");

      await alchemy.run("child", { phase: "read" }, async (child) => {
        expect(child.phase).toBe("read");
        expect(child.appName).toBeUndefined();
        expect(child.scopeName).toBe("child");
        expect(child.parent).toBe(scope);
      });
    });
  });
});
