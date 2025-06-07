import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { Volume } from "../../src/railway/volume.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Volume Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-vol-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-vol-environment`;
  const testVolumeId = `${BRANCH_PREFIX}-volume`;

  test.skipIf(!!process.env.CI)(
    "create, update, and delete volume",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
      let project: Project | undefined;
      let environment: Environment | undefined;
      let volume: Volume | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Volume Test Project`,
          description: "A project for testing volumes",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        volume = await Volume(testVolumeId, {
          name: "data-volume",
          project: project,
          environment: environment,
          mountPath: "/data",
          size: 1024,
        });

        expect(volume.id).toBeTruthy();
        expect(volume).toMatchObject({
          name: "data-volume",
          projectId: project.id,
          environmentId: environment.id,
          mountPath: "/data",
          size: 1024,
        });

        const response = await api.query(
          `
        query Volume($id: String!) {
          volume(id: $id) {
            id
            name
            projectId
            environmentId
            mountPath
            size
          }
        }
        `,
          { id: volume.id },
        );

        const railwayVolume = response.data?.volume;
        expect(railwayVolume).toMatchObject({
          id: volume.id,
          name: "data-volume",
          projectId: project.id,
          environmentId: environment.id,
          mountPath: "/data",
          size: 1024,
        });

        volume = await Volume(testVolumeId, {
          name: "updated-data-volume",
          project: project,
          environment: environment,
          mountPath: "/app/data",
          size: 2048,
        });

        expect(volume).toMatchObject({
          name: "updated-data-volume",
          mountPath: "/app/data",
          size: 2048,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (volume?.id) {
          await assertVolumeDeleted(volume.id, api);
        }
      }
    },
  );
});

async function assertVolumeDeleted(volumeId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Volume($id: String!) {
        volume(id: $id) {
          id
        }
      }
      `,
      { id: volumeId },
    );

    expect(response.data?.volume).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
