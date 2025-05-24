import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Network } from "../../src/docker/network.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

describe("Network", () => {
  test("should create a test network with default driver", async (scope) => {
    try {
      const networkName = `alchemy-test-network-${Date.now()}`;
      const network = await Network("test-network", {
        name: networkName,
      });

      expect(network.name).toBe(networkName);
      expect(network.driver).toBe("bridge"); // default value
    } finally {
      await destroy(scope);
    }
  });
});
