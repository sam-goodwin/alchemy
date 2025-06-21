import fs from "node:fs/promises";
import { describe, expect } from "vitest";
import { alchemy } from "../src/alchemy.js";
import { destroy } from "../src/destroy.js";
import { FileSystemStateStore } from "../src/fs/file-system-state-store.js";
import { File } from "../src/fs/file.js";
import { Scope } from "../src/scope.js";
import { BRANCH_PREFIX } from "./util.js";

import { Resource } from "../src/resource.js";
import { serializeScope } from "../src/serde.js";
import "../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Scope", () => {
  test("should maintain scope context and track resources", async (scope) => {
    try {
      await File("file", {
        path: "test.txt",
        content: "Hello World",
      });

      const content = await fs.readFile("test.txt", "utf-8");
      expect(content).toBe("Hello World");

      expect(Scope.current).toEqual(scope);
      expect(scope.resources.size).toBe(1);
      expect(scope).toBe(scope);
    } finally {
      await destroy(scope);
    }
  });

  test("should have phase available in stateStore callback", async (scope) => {
    try {
      let observedPhase: string | undefined;
      new Scope({
        scopeName: "phase-test",
        phase: "read",
        stateStore: (scope) => {
          observedPhase = scope.phase;
          return new FileSystemStateStore(scope);
        },
      });
      expect(observedPhase).toBe("read");
    } finally {
      await destroy(scope);
    }
  });

  test("serialized scope should be equal to the original scope", async (scope) => {
    try {
      await File("foo", {
        path: "test2.txt",
        content: "Hello World",
      });
      await alchemy.run("bar", async () => {
        await File("baz", {
          path: "test3.txt",
          content: "Hello World",
        });
        await Nested("gaz");
      });

      const serialized: any = await serializeScope(scope.root);

      const fqn = scope.chain.join("/");

      expect(serialized).toEqual({
        [`${fqn}/foo`]: {
          "Symbol(alchemy::ResourceKind)": "fs::File",
          "Symbol(alchemy::ResourceID)": "foo",
          "Symbol(alchemy::ResourceFQN)": `${fqn}/foo`,
          "Symbol(alchemy::ResourceScope)": {
            "@scope": null,
          },
          "Symbol(alchemy::ResourceSeq)": 0,
          path: "test2.txt",
          content: "Hello World",
        },
        [`${fqn}/bar/baz`]: {
          "Symbol(alchemy::ResourceKind)": "fs::File",
          "Symbol(alchemy::ResourceID)": "baz",
          "Symbol(alchemy::ResourceFQN)": `${fqn}/bar/baz`,
          "Symbol(alchemy::ResourceScope)": {
            "@scope": null,
          },
          "Symbol(alchemy::ResourceSeq)": 0,
          path: "test3.txt",
          content: "Hello World",
        },
        [`${fqn}/bar/gaz`]: {
          "Symbol(alchemy::ResourceKind)": "Nested",
          "Symbol(alchemy::ResourceID)": "gaz",
          "Symbol(alchemy::ResourceFQN)": `${fqn}/bar/gaz`,
          "Symbol(alchemy::ResourceScope)": {
            "@scope": null,
          },
          "Symbol(alchemy::ResourceSeq)": 1,
        },
        [`${fqn}/bar/gaz/file`]: {
          "Symbol(alchemy::ResourceKind)": "fs::File",
          "Symbol(alchemy::ResourceID)": "file",
          "Symbol(alchemy::ResourceFQN)": `${fqn}/bar/gaz/file`,
          "Symbol(alchemy::ResourceScope)": {
            "@scope": null,
          },
          "Symbol(alchemy::ResourceSeq)": 0,
          path: "test4.txt",
          content: "Hello World",
        },
      });
    } finally {
      await destroy(scope);
    }
  });

  test("scope CRUD operations should work", async (scope) => {
    try {
      const innerScope = await alchemy.run("innerScope", async (scope) => {
        await scope.set("foo", "foo-1");
        expect(await scope.get("foo")).toBe("foo-1");
        await scope.delete("foo");
        expect(await scope.get("foo")).toBeUndefined();
        await scope.set("bar", "baz-1");
        return scope;
      });
      expect(await innerScope.get("bar")).toBe("baz-1");
      await innerScope.delete("bar");
      expect(await innerScope.get("bar")).toBeUndefined();
    } finally {
      await destroy(scope);
    }
  });

  test("scope CRUD operations should work across instances of the same scope", async (scope) => {
    try {
      await alchemy.run("innerScope", async (scope) => {
        await scope.set("foo", "foo-1");
      });
      await alchemy.run("innerScope", async (scope) => {
        expect(await scope.get("foo")).toBe("foo-1");
      });
    } finally {
      await destroy(scope);
    }
  });
});

const Nested = Resource("Nested", async function (this, _id: string) {
  await File("file", {
    path: "test4.txt",
    content: "Hello World",
  });
  return this({});
});
