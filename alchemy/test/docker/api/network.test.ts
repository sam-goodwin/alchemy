import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { destroy } from "../../../src/destroy.js";
import { Network } from "../../../src/docker/api/network.js";
import { BRANCH_PREFIX } from "../../util.ts";

import "../../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Network", () => {
  test("should create a test network with default driver", async (scope) => {
    try {
      const networkName = `alchemy-test-network-${Date.now()}`;
      const network = await Network("test-network", {
        Name: networkName,
      });

      expect(network.Name).toBe(networkName);
      expect(network.Driver).toBe("bridge"); // default value
    } finally {
      await destroy(scope);
    }
  });

  test("should be replaced when props change", async (scope) => {
    try {
      const networkName = `alchemy-test-network-${Date.now()}`;
      const network = await Network("test-network", {
        Name: networkName,
      });

      expect(network.Name).toBe(networkName);
    } finally {
      await destroy(scope);
    }
  });

  test("should use specified driver", async (scope) => {
    try {
      const networkName = `alchemy-test-network-${Date.now()}`;
      const network = await Network("test-network", {
        Name: networkName,
        Driver: "overlay",
      });

      expect(network.Driver).toBe("overlay");
    } finally {
      await destroy(scope);
    }
  });
});
