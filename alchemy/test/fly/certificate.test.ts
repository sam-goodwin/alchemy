import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createFlyApi } from "../../src/fly/api.ts";
import { App } from "../../src/fly/app.ts";
import { Certificate } from "../../src/fly/certificate.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createFlyApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Fly Certificate Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-fly-cert`;

  test("create and delete fly certificate", async (scope) => {
    let app: App | undefined;
    let certificate: Certificate | undefined;
    
    try {
      // First create an app for the certificate
      const appName = `${testId}-app`;
      app = await App(`${testId}-app`, {
        name: appName,
        primaryRegion: "iad",
      });

      // Create a test certificate for a test domain
      // Note: Using a test domain that won't actually verify
      const testHostname = `${testId}.example.com`;
      certificate = await Certificate(testId, {
        app: app,
        hostname: testHostname,
        type: "managed",
      });

      expect(certificate.id).toBeTruthy();
      expect(certificate.hostname).toEqual(testHostname);
      expect(certificate.source).toBeTruthy();
      expect(certificate.certificate_authority).toBeTruthy();
      expect(certificate.created_at).toBeTruthy();
      expect(typeof certificate.check_passed).toBe("boolean");
      expect(typeof certificate.configured).toBe("boolean");
      expect(typeof certificate.verified).toBe("boolean");

      // Verify certificate was created by querying the API directly
      const certificatesResponse = await api.get(`/apps/${appName}/certificates`);
      expect(certificatesResponse.status).toEqual(200);

      const certificatesData: any = await certificatesResponse.json();
      const foundCert = certificatesData.data?.find((c: any) => c.hostname === testHostname);
      expect(foundCert).toBeTruthy();
      expect(foundCert.hostname).toEqual(testHostname);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify certificate was deleted
      if (certificate?.id && app?.name) {
        await assertCertificateDoesNotExist(api, app.name, certificate.hostname);
      }
    }
  });
});

async function assertCertificateDoesNotExist(api: any, appName: string, hostname: string) {
  const certificatesResponse = await api.get(`/apps/${appName}/certificates`);
  if (certificatesResponse.ok) {
    const certificatesData: any = await certificatesResponse.json();
    const foundCert = certificatesData.data?.find((c: any) => c.hostname === hostname);
    expect(foundCert).toBeFalsy();
  }
}