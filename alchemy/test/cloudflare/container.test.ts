import path from "node:path";
import { describe } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { Container, ContainerApplication } from "../../src/cloudflare/index.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import "../../src/test/vitest.ts";
import { BRANCH_PREFIX } from "../util.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Container Resource", () => {
  test("create container", async (scope) => {
    try {
      const make = async (dockerfile?: string) =>
        Worker(`container-test-worker${BRANCH_PREFIX}`, {
          adopt: true,
          entrypoint: path.join(import.meta.dirname, "container-handler.ts"),
          compatibilityFlags: ["nodejs_compat"],
          compatibilityDate: "2025-06-24",
          format: "esm",
          bindings: {
            MY_CONTAINER: await Container(`container-test${BRANCH_PREFIX}`, {
              className: "MyContainer",
              name: "test-image",
              tag: "latest",
              build: {
                context: path.join(import.meta.dirname, "container"),
                dockerfile,
              },
              maxInstances: 1,
            }),
          },
        });

      // create
      await make();
      // update
      await make("Dockerfile.update");
    } finally {
      // delete
      await destroy(scope);
    }
  });

  test("container application adoption", async (scope) => {
    const applicationId = `${BRANCH_PREFIX}-container-app-adopt`;
    
    // Create a container to get the properly configured image
    const container = await Container(`${BRANCH_PREFIX}-container-for-app`, {
      className: "TestContainer",
      name: "test-container-adopt",
      tag: "latest",
      build: {
        context: path.join(import.meta.dirname, "container"),
      },
    });

    try {
      // Create the initial container application
      let containerApp = await ContainerApplication(applicationId, {
        name: applicationId,
        image: container.image,
        instances: 1,
        maxInstances: 2,
        instanceType: "dev",
      });

      expect(containerApp).toMatchObject({
        name: applicationId,
        id: expect.any(String),
      });

      // Test that creating another application with the same name fails without adopt
      await expect(
        ContainerApplication(`${applicationId}-duplicate`, {
          name: applicationId,
          image: container.image,
          instances: 1,
          maxInstances: 2,
        }),
      ).rejects.toThrow(/already exists/);

      // Test that adopting the existing application succeeds
      const adoptedApp = await ContainerApplication(
        `${applicationId}-adopted`,
        {
          name: applicationId,
          adopt: true,
          image: container.image,
          instances: 2, // Different configuration
          maxInstances: 3,
          instanceType: "basic",
        },
      );

      expect(adoptedApp).toMatchObject({
        name: applicationId,
        id: containerApp.id, // Should be the same ID as the original
      });

      // Test updating the adopted application
      containerApp = await ContainerApplication(applicationId, {
        name: applicationId,
        adopt: true,
        image: container.image,
        instances: 3,
        maxInstances: 4,
        instanceType: "dev",
      });

      expect(containerApp).toMatchObject({
        name: applicationId,
        id: expect.any(String),
      });
    } finally {
      await destroy(scope);
    }
  });

  test("container application adoption with non-existent app", async (scope) => {
    const applicationId = `${BRANCH_PREFIX}-container-app-nonexistent`;
    
    // Create a container to get the properly configured image
    const container = await Container(`${BRANCH_PREFIX}-container-for-nonexistent`, {
      className: "TestContainer",
      name: "test-container-nonexistent",
      tag: "latest",
      build: {
        context: path.join(import.meta.dirname, "container"),
      },
    });

    try {
      // Test that adopting a non-existent application creates it normally
      const containerApp = await ContainerApplication(applicationId, {
        name: applicationId,
        adopt: true,
        image: container.image,
        instances: 1,
        maxInstances: 2,
      });

      expect(containerApp).toMatchObject({
        name: applicationId,
        id: expect.any(String),
      });
    } finally {
      await destroy(scope);
    }
  });
});
