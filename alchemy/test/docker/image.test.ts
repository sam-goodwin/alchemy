import { describe, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Image } from "../../src/docker/image.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

// Helper function to get the absolute path to a fixture
function getFixturePath(fixtureName: string): string {
  return path.join(
    process.cwd(),
    "alchemy",
    "test",
    "docker",
    "fixtures",
    fixtureName,
  );
}

describe("Image", () => {
  test("should build a simple image", async (scope) => {
    try {
      const contextPath = getFixturePath("simple-image");

      // Ensure the context path exists
      expect(fs.existsSync(contextPath)).toBe(true);
      expect(fs.existsSync(path.join(contextPath, "Dockerfile"))).toBe(true);

      const image = await Image("test-simple-image", {
        name: "alchemy-test",
        tag: "simple",
        build: {
          context: contextPath,
        },
        skipPush: true,
      });

      expect(image.name).toBe("alchemy-test");
      expect(image.tag).toBe("simple");
      expect(image.imageRef).toBe("alchemy-test:simple");
      expect(image.build.context).toBe(contextPath);
      // imageId might not be available in a CI environment where Docker is not running
      if (image.imageId) {
        expect(image.imageId.length).toBeGreaterThan(0);
      }
    } finally {
      await destroy(scope);
    }
  });

  test("should handle build arguments", async (scope) => {
    try {
      const contextPath = getFixturePath("build-args");

      // Ensure the context path exists
      expect(fs.existsSync(contextPath)).toBe(true);
      expect(fs.existsSync(path.join(contextPath, "Dockerfile"))).toBe(true);

      const image = await Image("test-build-args", {
        name: "alchemy-test",
        tag: "args",
        build: {
          context: contextPath,
          buildArgs: {
            MESSAGE: "Hello from Alchemy",
            VERSION: "2.0",
          },
        },
        skipPush: true,
      });

      expect(image.name).toBe("alchemy-test");
      expect(image.tag).toBe("args");
      expect(image.build.buildArgs).toEqual({
        MESSAGE: "Hello from Alchemy",
        VERSION: "2.0",
      });
    } finally {
      await destroy(scope);
    }
  });

  test("should support multi-stage builds with target", async (scope) => {
    try {
      const contextPath = getFixturePath("multi-stage");

      // Ensure the context path exists
      expect(fs.existsSync(contextPath)).toBe(true);
      expect(fs.existsSync(path.join(contextPath, "Dockerfile"))).toBe(true);

      const image = await Image("test-multi-stage", {
        name: "alchemy-test",
        tag: "multi",
        build: {
          context: contextPath,
          target: "builder", // Target the builder stage
        },
        skipPush: true,
      });

      expect(image.name).toBe("alchemy-test");
      expect(image.tag).toBe("multi");
      expect(image.build.target).toBe("builder");
    } finally {
      await destroy(scope);
    }
  });

  test("should handle invalid context path", async (scope) => {
    expect.assertions(1);
    try {
      await Image("test-invalid-context", {
        name: "alchemy-test",
        tag: "invalid",
        build: {
          context: "/non/existent/path",
        },
        skipPush: true,
      });
    } catch (error) {
      expect(error).toBeDefined();
    } finally {
      await destroy(scope);
    }
  });
});
