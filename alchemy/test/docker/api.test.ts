import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { DockerApi } from "../../src/docker/api.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

describe("DockerApi", () => {
  test("should initialize with default docker path", async (scope) => {
    try {
      const dockerApi = new DockerApi();
      expect(dockerApi.dockerPath).toBe("docker");
    } finally {
      await destroy(scope);
    }
  });

  test("should initialize with custom docker path", async (scope) => {
    try {
      const dockerApi = new DockerApi({ dockerPath: "/usr/local/bin/docker" });
      expect(dockerApi.dockerPath).toBe("/usr/local/bin/docker");
    } finally {
      await destroy(scope);
    }
  });

  test("should execute docker command", async (scope) => {
    try {
      const dockerApi = new DockerApi();
      const result = await dockerApi.exec(["--version"]);

      expect(result).toHaveProperty("stdout");
      expect(result).toHaveProperty("stderr");
      // Docker version output should contain the word "Docker"
      expect(result.stdout.includes("Docker")).toBe(true);
    } finally {
      await destroy(scope);
    }
  });

  test("should check if docker daemon is running", async (scope) => {
    try {
      const dockerApi = new DockerApi();
      const isRunning = await dockerApi.isRunning();

      // This might be true or false depending on whether Docker is installed and running
      // Just ensure it returns a boolean
      expect(typeof isRunning).toBe("boolean");
    } finally {
      await destroy(scope);
    }
  });
});
