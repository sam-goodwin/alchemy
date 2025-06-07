import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { Volume } from "../../src/fly/volume.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly Volume Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-volume`;

  test("create, update, and delete fly volume", async (scope) => {
    let app: App | undefined;
    let volume: Volume | undefined;
    
    try {
      // First create an app for the volume
      const appName = `${testId}-app`;
      app = await App(`${testId}-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test volume
      volume = await Volume(testId, {
        app: app,
        name: `${testId}-volume`,
        region: "iad",
        size_gb: 1, // Minimum size for testing
        encrypted: true,
      });

      expect(volume.id).toBeTruthy();
      expect(volume.name).toEqual(`${testId}-volume`);
      expect(volume.region).toEqual("iad");
      expect(volume.size_gb).toEqual(1);
      expect(volume.encrypted).toEqual(true);
      expect(volume.state).toBeTruthy();
      expect(volume.zone).toBeTruthy();
      expect(volume.created_at).toBeTruthy();

      // Verify volume was created by querying the API directly
      const getResponse = await api.get(`/apps/${appName}/volumes/${volume.id}`);
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.name).toEqual(`${testId}-volume`);
      expect(responseData.size_gb).toEqual(1);

      // Update the volume by extending its size
      volume = await Volume(testId, {
        app: app,
        name: `${testId}-volume`,
        region: "iad",
        size_gb: 2, // Extended size
        encrypted: true,
      });

      expect(volume.size_gb).toEqual(2);

      // Verify volume was extended
      const getUpdatedResponse = await api.get(`/apps/${appName}/volumes/${volume.id}`);
      const updatedData: any = await getUpdatedResponse.json();
      expect(updatedData.size_gb).toEqual(2);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify volume was deleted
      if (volume?.id && app?.name) {
        await assertVolumeDoesNotExist(api, app.name, volume.id);
      }
    }
  });
});

async function assertVolumeDoesNotExist(api: any, appName: string, volumeId: string) {
  const getDeletedResponse = await api.get(`/apps/${appName}/volumes/${volumeId}`);
  expect(getDeletedResponse.status).toEqual(404);
}