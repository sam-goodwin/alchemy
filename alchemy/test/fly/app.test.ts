import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly App Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-app`;

  test("create, update, and delete fly app", async (scope) => {
    let app: App | undefined;
    try {
      // Create a test Fly app with basic settings
      const appName = `${testId}-app`;
      app = await App(testId, {
        name: appName,
        primaryRegion: "iad",
        env: {
          NODE_ENV: "test",
          TEST_VAR: alchemy.secret("test-value"),
        },
      });

      expect(app.id).toBeTruthy();
      expect(app.name).toEqual(appName);
      expect(app.hostname).toEqual(`${appName}.fly.dev`);
      expect(app.organization).toBeTruthy();
      expect(app.organization.slug).toBeTruthy();
      expect(app.status).toBeTruthy();
      expect(app.created_at).toBeTruthy();

      // Verify app was created by querying the API directly
      const getResponse = await api.get(`/apps/${appName}`);
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.name).toEqual(appName);

      // Update the app with new environment variables
      app = await App(testId, {
        name: appName,
        primaryRegion: "iad",
        env: {
          NODE_ENV: "production",
          NEW_VAR: "updated-value",
        },
      });

      expect(app.name).toEqual(appName);
      expect(app.env).toBeTruthy();
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify app was deleted
      if (app?.name) {
        await assertAppDoesNotExist(api, app.name);
      }
    }
  });
});

async function assertAppDoesNotExist(api: any, appName: string) {
  const getDeletedResponse = await api.get(`/apps/${appName}`);
  expect(getDeletedResponse.status).toEqual(404);
}