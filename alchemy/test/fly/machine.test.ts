import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { Machine } from "../../src/fly/machine.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly Machine Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-machine`;

  test("create, update, and delete fly machine", async (scope) => {
    let app: App | undefined;
    let machine: Machine | undefined;
    
    try {
      // First create an app for the machine
      const appName = `${testId}-app`;
      app = await App(`${testId}-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test machine
      machine = await Machine(testId, {
        app: app,
        region: "iad",
        name: `${testId}-machine`,
        config: {
          image: "nginx:alpine",
          env: {
            NODE_ENV: "test",
          },
          guest: {
            cpus: 1,
            memory_mb: 256,
          },
          services: [{
            protocol: "tcp",
            internal_port: 80,
            ports: [{ port: 80, handlers: ["http"] }],
          }],
        },
      });

      expect(machine.id).toBeTruthy();
      expect(machine.name).toEqual(`${testId}-machine`);
      expect(machine.region).toEqual("iad");
      expect(machine.state).toBeTruthy();
      expect(machine.instance_id).toBeTruthy();
      expect(machine.private_ip).toBeTruthy();
      expect(machine.config).toBeTruthy();
      expect(machine.config.image).toEqual("nginx:alpine");
      expect(machine.image_ref).toBeTruthy();
      expect(machine.created_at).toBeTruthy();

      // Verify machine was created by querying the API directly
      const getResponse = await api.get(`/apps/${appName}/machines/${machine.id}`);
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.name).toEqual(`${testId}-machine`);

      // Update the machine configuration
      machine = await Machine(testId, {
        app: app,
        region: "iad",
        name: `${testId}-machine`,
        config: {
          image: "nginx:alpine",
          env: {
            NODE_ENV: "production",
            NEW_VAR: "updated",
          },
          guest: {
            cpus: 1,
            memory_mb: 512, // Increased memory
          },
          services: [{
            protocol: "tcp",
            internal_port: 80,
            ports: [{ port: 80, handlers: ["http"] }],
          }],
        },
      });

      expect(machine.config.guest?.memory_mb).toEqual(512);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify machine was deleted
      if (machine?.id && app?.name) {
        await assertMachineDoesNotExist(api, app.name, machine.id);
      }
    }
  });
});

async function assertMachineDoesNotExist(api: any, appName: string, machineId: string) {
  const getDeletedResponse = await api.get(`/apps/${appName}/machines/${machineId}`);
  expect(getDeletedResponse.status).toEqual(404);
}