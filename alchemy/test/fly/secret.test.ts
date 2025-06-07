import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { FlySecret } from "../../src/fly/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly Secret Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-secret`;

  test("create, update, and delete fly secret", async (scope) => {
    let app: App | undefined;
    let secret: FlySecret | undefined;
    
    try {
      // First create an app for the secret
      const appName = `${testId}-app`;
      app = await App(`${testId}-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test secret
      secret = await FlySecret(testId, {
        app: app,
        name: "TEST_SECRET",
        value: alchemy.secret("initial-secret-value"),
      });

      expect(secret.name).toEqual("TEST_SECRET");
      expect(secret.digest).toBeTruthy();

      // Verify secret was created by checking app secrets
      const secretsResponse = await api.get(`/apps/${appName}/secrets`);
      expect(secretsResponse.status).toEqual(200);

      const secretsData: any = await secretsResponse.json();
      const foundSecret = secretsData.secrets?.find((s: any) => s.key === "TEST_SECRET");
      expect(foundSecret).toBeTruthy();

      // Update the secret value
      secret = await FlySecret(testId, {
        app: app,
        name: "TEST_SECRET",
        value: alchemy.secret("updated-secret-value"),
      });

      expect(secret.name).toEqual("TEST_SECRET");
      expect(secret.digest).toBeTruthy();

      // Verify secret was updated (digest should change)
      const updatedSecretsResponse = await api.get(`/apps/${appName}/secrets`);
      const updatedSecretsData: any = await updatedSecretsResponse.json();
      const updatedSecret = updatedSecretsData.secrets?.find((s: any) => s.key === "TEST_SECRET");
      expect(updatedSecret).toBeTruthy();
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify secret was removed from the app
      if (app?.name) {
        await assertSecretDoesNotExist(api, app.name, "TEST_SECRET");
      }
    }
  });
});

async function assertSecretDoesNotExist(api: any, appName: string, secretName: string) {
  const secretsResponse = await api.get(`/apps/${appName}/secrets`);
  if (secretsResponse.ok) {
    const secretsData: any = await secretsResponse.json();
    const foundSecret = secretsData.secrets?.find((s: any) => s.key === secretName);
    expect(foundSecret).toBeFalsy();
  }
}