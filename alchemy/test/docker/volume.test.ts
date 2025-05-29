import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Volume } from "../../src/docker/volume.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

describe("Volume", () => {
  test("should create a volume with default driver", async (scope) => {
    try {
      const volumeName = `alchemy-test-volume-${Date.now()}`;
      const volume = await Volume("test-volume", {
        name: volumeName,
      });

      expect(volume.name).toBe(volumeName);
      expect(volume.driver).toBe("local"); // default value
      expect(volume.id).toBe(volumeName); // volume ID is same as name
    } finally {
      await destroy(scope);
    }
  });

  test("should create a volume with custom driver and options", async (scope) => {
    try {
      const volumeName = `alchemy-test-volume-custom-${Date.now()}`;
      const volume = await Volume("test-volume-custom", {
        name: volumeName,
        driver: "local",
        driverOpts: {
          type: "tmpfs",
          device: "tmpfs",
          o: "size=100m,uid=1000",
        },
      });

      expect(volume.name).toBe(volumeName);
      expect(volume.driver).toBe("local");
      expect(volume.driverOpts).toEqual({
        type: "tmpfs",
        device: "tmpfs",
        o: "size=100m,uid=1000",
      });
    } finally {
      await destroy(scope);
    }
  });

  test("should create a volume with labels", async (scope) => {
    try {
      const volumeName = `alchemy-test-volume-labels-${Date.now()}`;
      const volume = await Volume("test-volume-labels", {
        name: volumeName,
        labels: [
          { name: "com.example.usage", value: "test-volume" },
          { name: "com.example.created-by", value: "alchemy-tests" },
        ],
      });

      expect(volume.name).toBe(volumeName);
      expect(volume.labels).toEqual([
        { name: "com.example.usage", value: "test-volume" },
        { name: "com.example.created-by", value: "alchemy-tests" },
      ]);
    } finally {
      await destroy(scope);
    }
  });

  test("should create a volume with labels as record", async (scope) => {
    try {
      const volumeName = `alchemy-test-volume-record-labels-${Date.now()}`;
      const volume = await Volume("test-volume-record-labels", {
        name: volumeName,
        labels: {
          "com.example.usage": "test-volume",
          "com.example.created-by": "alchemy-tests",
        },
      });

      expect(volume.name).toBe(volumeName);
      // When we pass labels as a record, it should be processed correctly internally
      // but not reflected in the output since we're preserving the input format
      expect(volume.labels).toBeUndefined();
    } finally {
      await destroy(scope);
    }
  });
});
