import { describe, expect, vi } from "vitest";
import path from "node:path";
import { alchemy } from "../../src/alchemy.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import "../../src/test/vitest.ts";
import { BRANCH_PREFIX } from "../util.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("NodeJS Import Warning Plugin", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  test("should warn about node: imports without nodejs_compat flag", async (scope) => {
    const entrypoint = path.resolve(
      __dirname,
      "test-handlers/node-imports-handler.ts",
    );

    try {
      await Worker(`${BRANCH_PREFIX}-test-node-imports`, {
        entrypoint,
        format: "esm",
        compatibilityDate: "2024-09-23",
        compatibilityFlags: [], // No nodejs_compat flag
        adopt: true,
      });
    } catch (_e) {
      // Bundling might fail, but we're testing the warning
    } finally {
      await destroy(scope);
    }

    // Verify warning was logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("nodejs_compat compatibility flag is not set"),
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("node:fs, node:crypto"),
    );
  });

  test("should not warn when nodejs_compat flag is present", async (scope) => {
    const entrypoint = path.resolve(
      __dirname,
      "test-handlers/node-imports-handler.ts",
    );

    try {
      await Worker(`${BRANCH_PREFIX}-test-node-imports-with-compat`, {
        entrypoint,
        format: "esm",
        compatibilityDate: "2024-09-23",
        compatibilityFlags: ["nodejs_compat"], // nodejs_compat flag present
        adopt: true,
      });
    } catch (_e) {
      // Bundling might fail for other reasons, but we're testing no warning
    } finally {
      await destroy(scope);
    }

    // Verify no warning was logged about missing nodejs_compat
    const warningCalls = consoleWarnSpy.mock.calls.flat();
    const hasNodejsCompatWarning = warningCalls.some(
      (call) =>
        typeof call === "string" &&
        call.includes("nodejs_compat compatibility flag is not set"),
    );
    expect(hasNodejsCompatWarning).toBe(false);
  });

  test("should warn specifically about node:async_hooks without nodejs_compat or nodejs_als", async (scope) => {
    const entrypoint = path.resolve(
      __dirname,
      "test-handlers/async-hooks-handler.ts",
    );

    try {
      await Worker(`${BRANCH_PREFIX}-test-async-hooks`, {
        entrypoint,
        format: "esm",
        compatibilityDate: "2024-09-23",
        compatibilityFlags: [], // No nodejs_compat or nodejs_als flags
        adopt: true,
      });
    } catch (_e) {
      // Bundling might fail, but we're testing the warning
    } finally {
      await destroy(scope);
    }

    // Verify specific async_hooks warning was logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("node:async_hooks"),
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("nodejs_compat") &&
        expect.stringContaining("nodejs_als"),
    );
  });

  test("should not warn about async_hooks when nodejs_als flag is present", async (scope) => {
    const entrypoint = path.resolve(
      __dirname,
      "test-handlers/async-hooks-handler.ts",
    );

    try {
      await Worker(`${BRANCH_PREFIX}-test-async-hooks-with-als`, {
        entrypoint,
        format: "esm",
        compatibilityDate: "2024-09-23",
        compatibilityFlags: ["nodejs_als"], // nodejs_als flag present
        adopt: true,
      });
    } catch (_e) {
      // Bundling might fail for other reasons, but we're testing no async_hooks warning
    } finally {
      await destroy(scope);
    }

    // Verify no specific async_hooks warning was logged
    const warningCalls = consoleWarnSpy.mock.calls.flat();
    const hasAsyncHooksWarning = warningCalls.some(
      (call) =>
        typeof call === "string" &&
        call.includes("node:async_hooks") &&
        call.includes("nodejs_compat") &&
        call.includes("nodejs_als"),
    );
    expect(hasAsyncHooksWarning).toBe(false);
  });
});
