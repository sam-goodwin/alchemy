import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Container } from "../../src/docker/container.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

describe("Container", () => {
  test("should create a container without starting it", async (scope) => {
    try {
      // Create a container without starting it to avoid port conflicts
      const container = await Container("test-container", {
        image: "hello-world:latest",
        name: "alchemy-test-container",
        start: false,
      });

      expect(container.name).toBe("alchemy-test-container");
      expect(container.state).toBe("created");
    } finally {
      await destroy(scope);
    }
  });
});
