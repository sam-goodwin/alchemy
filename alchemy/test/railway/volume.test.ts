import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Project } from "../../src/railway/project.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Service } from "../../src/railway/service.ts";
import { Volume, type VolumeResource } from "../../src/railway/volume.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const api = createRailwayApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Railway Volume", () => {
  test("volume lifecycle with backup configuration", async (scope) => {
    const projectName = `${BRANCH_PREFIX}-volume-test`;
    let project: Project;
    let environment: Environment;
    let service: Service;
    let volume: VolumeResource | undefined;

    try {
      // Create project and environment
      project = await Project("volume-test-project", {
        name: projectName,
        description: "Test project for Railway volume provider",
      });

      environment = await Environment("test-env", {
        name: "test",
        project: project,
      });

      // Create a service to attach volume to
      service = await Service("test-service", {
        name: "test-service",
        project: project,
        environment: environment,
        source: {
          image: "nginx:alpine",
          startCommand: "nginx -g 'daemon off;'",
        },
        autoDeploy: false, // Don't auto-deploy for test
      });

      // Create volume with backup configuration
      volume = await Volume("test-volume", {
        name: "test-data",
        mountPath: "/app/data",
        project: project,
        environment: environment,
        service: service,
        sizeGB: 1,
        backups: {
          schedule: "daily",
          retentionDays: 7,
          enabled: true,
        },
      });

      expect(volume).toMatchObject({
        name: "test-data",
        mountPath: "/app/data",
        sizeGB: 1,
        status: "AVAILABLE",
        backups: {
          schedule: "daily",
          retentionDays: 7,
          enabled: true,
        },
      });

      expect(volume.volumeId).toBeTruthy();
      expect(volume.projectId).toBe(project.projectId);
      expect(volume.environmentId).toBe(environment.environmentId);
      expect(volume.serviceId).toBe(service.serviceId);
      expect(volume.createdAt).toBeTruthy();
      expect(volume.updatedAt).toBeTruthy();

      // Update volume configuration
      volume = await Volume("test-volume", {
        name: "test-data",
        mountPath: "/app/data",
        project: project,
        environment: environment,
        service: service,
        sizeGB: 2, // Grow volume
        backups: {
          schedule: "weekly",
          retentionDays: 14,
          enabled: true,
        },
      });

      expect(volume.sizeGB).toBe(2);
      expect(volume.backups?.schedule).toBe("weekly");
      expect(volume.backups?.retentionDays).toBe(14);
    } finally {
      await destroy(scope);
      if (volume) {
        await assertVolumeDoesNotExist(api, volume);
      }
    }
  });
});

async function assertVolumeDoesNotExist(
  api: ReturnType<typeof createRailwayApi>,
  volume: VolumeResource,
) {
  try {
    const query = `
      query getVolume($id: String!) {
        volume(id: $id) {
          id
        }
      }
    `;

    await api.query(query, { id: volume.volumeId });

    // If we get here, the volume still exists
    throw new Error(
      `Volume ${volume.volumeId} should have been deleted but still exists`,
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("should have been deleted")
    ) {
      throw error;
    }
    // Expected: volume not found error means it was successfully deleted
  }
}
