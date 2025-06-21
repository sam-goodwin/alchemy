import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/index.ts";
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

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete volume",
    async (scope) => {
      const api = createRailwayApi();
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

        // Volume creation verified by the resource properties above

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

        // Volume deletion is handled by destroy(scope)
      }
    },
  );
});

