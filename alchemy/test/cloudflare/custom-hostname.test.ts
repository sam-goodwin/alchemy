import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { CustomHostname } from "../../src/cloudflare/custom-hostname.ts";
import { Zone } from "../../src/cloudflare/zone.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const api = await createCloudflareApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("CustomHostname Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding hostnames
  const testZoneName = `${BRANCH_PREFIX}-custom-hostname.dev`;
  const testHostname1 = `app1.${BRANCH_PREFIX}-customer.com`;
  const testHostname2 = `app2.${BRANCH_PREFIX}-customer.com`;

  test("create, update, and delete custom hostname", async (scope) => {
    let zone: Zone | undefined;
    let customHostname: CustomHostname | undefined;

    try {
      // First create a zone for our custom hostnames
      zone = await Zone("custom-hostname-zone", {
        name: testZoneName,
        type: "full",
        jumpStart: false,
      });

      expect(zone.id).toBeTruthy();
      expect(zone.name).toEqual(testZoneName);

      // Create a custom hostname with basic settings
      customHostname = await CustomHostname("test-custom-hostname", {
        hostname: testHostname1,
        zone: zone,
        ssl: {
          method: "http",
          type: "dv",
          settings: {
            http2: "on",
            tls_1_3: "on",
            min_tls_version: "1.2",
          },
          bundle_method: "ubiquitous",
        },
        custom_metadata: {
          customer_id: "test-customer-1",
          plan: "basic",
        },
      });

      expect(customHostname.id).toBeTruthy();
      expect(customHostname.hostname).toEqual(testHostname1);
      expect(customHostname.zoneId).toEqual(zone.id);
      expect(customHostname.status).toBeTruthy();
      expect(customHostname.ssl).toBeTruthy();
      expect(customHostname.ssl.method).toEqual("http");
      expect(customHostname.ssl.type).toEqual("dv");
      expect(customHostname.custom_metadata).toEqual({
        customer_id: "test-customer-1",
        plan: "basic",
      });
      expect(customHostname.createdAt).toBeTruthy();

      // Verify custom hostname was created by querying the API directly
      const getResponse = await api.get(
        `/zones/${zone.id}/custom_hostnames/${customHostname.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.hostname).toEqual(testHostname1);
      expect(responseData.result.ssl.method).toEqual("http");

      // Update the custom hostname with different settings
      customHostname = await CustomHostname("test-custom-hostname", {
        hostname: testHostname1,
        zone: zone.id, // Test using zone ID directly instead of Zone resource
        ssl: {
          method: "txt", // Change method
          type: "dv",
          settings: {
            http2: "off", // Change setting
            tls_1_3: "on",
            min_tls_version: "1.3", // Change min TLS version
          },
          bundle_method: "optimal", // Change bundle method
        },
        custom_metadata: {
          customer_id: "test-customer-1",
          plan: "premium", // Update metadata
          environment: "production", // Add new metadata
        },
      });

      expect(customHostname.id).toBeTruthy();
      expect(customHostname.hostname).toEqual(testHostname1);
      expect(customHostname.ssl.method).toEqual("txt");
      expect(customHostname.ssl.bundle_method).toEqual("optimal");
      expect(customHostname.custom_metadata).toEqual({
        customer_id: "test-customer-1",
        plan: "premium",
        environment: "production",
      });
      expect(customHostname.modifiedAt).toBeTruthy();

      // Verify settings were updated in the API
      const updatedResponse = await api.get(
        `/zones/${zone.id}/custom_hostnames/${customHostname.id}`,
      );
      const updatedData: any = await updatedResponse.json();

      expect(updatedData.result.ssl.method).toEqual("txt");
      expect(updatedData.result.ssl.bundle_method).toEqual("optimal");
      expect(updatedData.result.custom_metadata?.plan).toEqual("premium");
      expect(updatedData.result.custom_metadata?.environment).toEqual(
        "production",
      );
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify custom hostname is deleted
      if (customHostname && zone) {
        const getDeletedResponse = await api.get(
          `/zones/${zone.id}/custom_hostnames/${customHostname.id}`,
        );
        expect(getDeletedResponse.status).toEqual(404);
      }

      // Verify zone is deleted
      if (zone) {
        const getDeletedZoneResponse = await api.get(`/zones/${zone.id}`);
        expect(getDeletedZoneResponse.status).toEqual(400);
      }
    }
  });

  test("create custom hostname with minimal configuration", async (scope) => {
    let zone: Zone | undefined;
    let customHostname: CustomHostname | undefined;

    try {
      // Create a zone for our custom hostname
      zone = await Zone("minimal-custom-hostname-zone", {
        name: `${BRANCH_PREFIX}-minimal.dev`,
        type: "full",
        jumpStart: false,
      });

      // Create custom hostname with minimal configuration
      customHostname = await CustomHostname("minimal-custom-hostname", {
        hostname: testHostname2,
        zone: zone,
        // Only required fields, rely on defaults for SSL settings
      });

      expect(customHostname.id).toBeTruthy();
      expect(customHostname.hostname).toEqual(testHostname2);
      expect(customHostname.zoneId).toEqual(zone.id);
      expect(customHostname.ssl).toBeTruthy();
      // Should use default SSL method and type
      expect(customHostname.ssl.method).toBeTruthy();
      expect(customHostname.ssl.type).toBeTruthy();

      // Verify via API
      const getResponse = await api.get(
        `/zones/${zone.id}/custom_hostnames/${customHostname.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.hostname).toEqual(testHostname2);
    } finally {
      // Always clean up
      await destroy(scope);

      // Verify cleanup
      if (customHostname && zone) {
        const getDeletedResponse = await api.get(
          `/zones/${zone.id}/custom_hostnames/${customHostname.id}`,
        );
        expect(getDeletedResponse.status).toEqual(404);
      }
    }
  });

  test("handle custom hostname that already exists", async (scope) => {
    let zone: Zone | undefined;
    let customHostname1: CustomHostname | undefined;
    let customHostname2: CustomHostname | undefined;

    try {
      // Create a zone for our custom hostname
      zone = await Zone("existing-custom-hostname-zone", {
        name: `${BRANCH_PREFIX}-existing.dev`,
        type: "full",
        jumpStart: false,
      });

      const testHostname = `existing.${BRANCH_PREFIX}-customer.com`;

      // Create the first custom hostname
      customHostname1 = await CustomHostname("existing-custom-hostname-1", {
        hostname: testHostname,
        zone: zone,
        ssl: {
          method: "http",
          type: "dv",
        },
        custom_metadata: {
          version: "1",
        },
      });

      expect(customHostname1.id).toBeTruthy();
      expect(customHostname1.hostname).toEqual(testHostname);

      // Create a second custom hostname with the same hostname - should adopt the existing one
      customHostname2 = await CustomHostname("existing-custom-hostname-2", {
        hostname: testHostname,
        zone: zone,
        ssl: {
          method: "txt", // Different method
          type: "dv",
        },
        custom_metadata: {
          version: "2", // Different metadata
        },
      });

      // Should update the existing hostname rather than create a new one
      expect(customHostname2.id).toEqual(customHostname1.id);
      expect(customHostname2.hostname).toEqual(testHostname);
      expect(customHostname2.ssl.method).toEqual("txt"); // Should be updated
      expect(customHostname2.custom_metadata?.version).toEqual("2"); // Should be updated

      // Verify only one custom hostname exists for this hostname
      const listResponse = await api.get(`/zones/${zone.id}/custom_hostnames`);
      const listData: any = await listResponse.json();
      const matchingHostnames = listData.result.filter(
        (h: any) => h.hostname === testHostname,
      );
      expect(matchingHostnames).toHaveLength(1);
      expect(matchingHostnames[0].id).toEqual(customHostname1.id);
    } finally {
      // Always clean up
      await destroy(scope);
    }
  });
});

/**
 * Helper function to verify custom hostname does not exist
 */
async function _assertCustomHostnameDoesNotExist(
  api: any,
  zoneId: string,
  customHostnameId: string,
) {
  const response = await api.get(
    `/zones/${zoneId}/custom_hostnames/${customHostnameId}`,
  );
  if (response.status !== 404) {
    throw new Error(
      `Expected custom hostname ${customHostnameId} to not exist, but got status ${response.status}`,
    );
  }
}
