import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { IpAddress } from "../../src/fly/ip-address.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly IpAddress Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-ip`;

  test("create and delete fly IP address", async (scope) => {
    let app: App | undefined;
    let ipAddress: IpAddress | undefined;
    
    try {
      // First create an app for the IP address
      const appName = `${testId}-app`;
      app = await App(`${testId}-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test IPv4 address
      ipAddress = await IpAddress(testId, {
        app: app,
        type: "v4",
        region: "global",
      });

      expect(ipAddress.id).toBeTruthy();
      expect(ipAddress.address).toBeTruthy();
      expect(ipAddress.type).toEqual("v4");
      expect(ipAddress.region).toBeTruthy();
      expect(ipAddress.created_at).toBeTruthy();
      expect(typeof ipAddress.shared).toBe("boolean");

      // Verify IP address format
      const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      expect(ipv4Regex.test(ipAddress.address)).toBe(true);

      // Verify IP address was created by querying the API directly
      const ipResponse = await api.get(`/apps/${appName}/ip-addresses/${ipAddress.id}`);
      expect(ipResponse.status).toEqual(200);

      const ipData: any = await ipResponse.json();
      expect(ipData.address).toEqual(ipAddress.address);
      expect(ipData.type).toEqual("v4");
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify IP address was deleted
      if (ipAddress?.id && app?.name) {
        await assertIpAddressDoesNotExist(api, app.name, ipAddress.id);
      }
    }
  });

  test("create IPv6 address", async (scope) => {
    let app: App | undefined;
    let ipAddress: IpAddress | undefined;
    
    try {
      // First create an app for the IP address
      const appName = `${testId}-v6-app-${Date.now()}`;
      app = await App(`${testId}-v6-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test IPv6 address
      ipAddress = await IpAddress(`${testId}-v6`, {
        app: app,
        type: "v6",
      });

      expect(ipAddress.id).toBeTruthy();
      expect(ipAddress.address).toBeTruthy();
      expect(ipAddress.type).toEqual("v6");
      expect(ipAddress.created_at).toBeTruthy();

      // Verify IPv6 address format (basic check for colons)
      expect(ipAddress.address).toContain(":");
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify IP address was deleted
      if (ipAddress?.id && app?.name) {
        await assertIpAddressDoesNotExist(api, app.name, ipAddress.id);
      }
    }
  });
});

async function assertIpAddressDoesNotExist(api: any, appName: string, ipId: string) {
  const getDeletedResponse = await api.get(`/apps/${appName}/ip-addresses/${ipId}`);
  expect(getDeletedResponse.status).toEqual(404);
}