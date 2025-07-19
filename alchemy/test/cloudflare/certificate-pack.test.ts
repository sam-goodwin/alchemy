import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import {
  type CloudflareApi,
  createCloudflareApi,
} from "../../src/cloudflare/api.ts";
import { CertificatePack } from "../../src/cloudflare/certificate-pack.ts";
import { Zone } from "../../src/cloudflare/zone.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const api = await createCloudflareApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe
  .skipIf(!process.env.ALL_TESTS)
  //* we use sequential because we don't want to worry about collisions
  //* normally we make custom names but acm only works with real zones
  .sequential("CertificatePack Resource", () => {
    // Use BRANCH_PREFIX for deterministic, non-colliding resource names
    const testDomain = process.env.TEST_CERTIFICATE_DOMAIN ?? "cert-test.dev";

    test("create, and delete certificate pack", async (scope) => {
      let zone: Zone | undefined;
      let certificatePack: CertificatePack | undefined;

      try {
        // First create a test zone for the certificate pack
        zone = await Zone(testDomain, {
          name: testDomain,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        expect(zone.id).toBeTruthy();
        expect(zone.name).toEqual(testDomain);

        // Create a certificate pack with Let's Encrypt
        certificatePack = await CertificatePack(`${BRANCH_PREFIX}-cert`, {
          zone: zone,
          certificateAuthority: "lets_encrypt",
          hosts: [testDomain, `www.${testDomain}`],
          validationMethod: "txt",
          validityDays: 90,
          cloudflareBranding: false,
        });

        expect(certificatePack.id).toBeTruthy();
        expect(certificatePack.certificateAuthority).toEqual("lets_encrypt");
        expect(certificatePack.hosts).toEqual([
          testDomain,
          `www.${testDomain}`,
        ]);
        expect(certificatePack.validationMethod).toEqual("txt");
        expect(certificatePack.validityDays).toEqual(90);
        expect(certificatePack.type).toEqual("advanced");
        expect(certificatePack.cloudflareBranding).toBeFalsy();

        // Verify certificate pack was created by querying the API directly
        const getResponse = await api.get(
          `/zones/${zone.id}/ssl/certificate_packs/${certificatePack.id}`,
        );
        expect(getResponse.status).toEqual(200);

        const responseData: any = await getResponse.json();
        expect(responseData.result.id).toEqual(certificatePack.id);
        expect(responseData.result.certificate_authority).toEqual(
          "lets_encrypt",
        );
        expect(responseData.result.validation_method).toEqual("txt");
        expect(responseData.result.validity_days).toEqual(90);
        expect(responseData.result.cloudflare_branding).toBeFalsy();
      } finally {
        // Always clean up, even if test assertions fail
        await destroy(scope);
        // Verify certificate pack was deleted
        if (certificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            certificatePack.id,
          );
        }
      }
    });

    test("replace certificate pack", async (scope) => {
      let zone: Zone | undefined;
      let certificatePack: CertificatePack | undefined;

      try {
        // Create a test zone
        zone = await Zone(testDomain, {
          name: testDomain,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Create initial certificate pack
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-immutable-cert`,
          {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: [`test.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(certificatePack.id).toBeTruthy();

        // Try to update certificate authority (should fail)
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-immutable-cert`,
          {
            zone: zone,
            certificateAuthority: "google", // Changed from lets_encrypt
            hosts: [`test.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(certificatePack.certificateAuthority).toEqual("google");

        // Try to update hosts (should fail)
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-immutable-cert`,
          {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: [`test.${testDomain}`, `www.test.${testDomain}`], // Added host
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(certificatePack.hosts).toEqual([
          `test.${testDomain}`,
          `www.test.${testDomain}`,
        ]);
      } finally {
        await destroy(scope);

        if (certificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            certificatePack.id,
          );
        }
      }
    });

    test("create certificate pack with zone ID string", async (scope) => {
      let zone: Zone | undefined;
      let certificatePack: CertificatePack | undefined;

      try {
        // Create a test zone
        zone = await Zone(testDomain, {
          name: testDomain,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Create certificate pack using zone ID string instead of Zone object
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-string-cert`,
          {
            zone: zone.id, // Use zone ID string
            certificateAuthority: "lets_encrypt",
            hosts: [testDomain, `*.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
            cloudflareBranding: true,
          },
        );

        expect(certificatePack.id).toBeTruthy();
        expect(certificatePack.zoneId).toEqual(zone.id);
        expect(certificatePack.hosts).toEqual(
          expect.arrayContaining([
            testDomain,
            `*.${testDomain}`,
            expect.stringContaining("sni.cloudflaressl.com"),
          ]),
        );
        expect(certificatePack.validityDays).toEqual(90);

        // Verify with API
        const getResponse = await api.get(
          `/zones/${zone.id}/ssl/certificate_packs/${certificatePack.id}`,
        );
        expect(getResponse.status).toEqual(200);

        const responseData: any = await getResponse.json();
        expect(responseData.result.hosts).toEqual(
          expect.arrayContaining([
            testDomain,
            `*.${testDomain}`,
            expect.stringContaining("sni.cloudflaressl.com"),
          ]),
        );
        expect(responseData.result.validity_days).toEqual(90);
      } finally {
        await destroy(scope);

        if (certificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            certificatePack.id,
          );
        }
      }
    });

    test("validate host requirements", async (scope) => {
      let zone: Zone | undefined;

      try {
        // Create a test zone
        zone = await Zone(testDomain, {
          name: testDomain,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Test empty hosts array (should fail)
        await expect(
          CertificatePack(`${BRANCH_PREFIX}-empty-hosts`, {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: [], // Empty array
            validationMethod: "txt",
            validityDays: 90,
          }),
        ).rejects.toThrow("At least one host must be specified");

        // Test too many hosts (should fail)
        const tooManyHosts = Array.from(
          { length: 51 },
          (_, i) => `host${i}.${testDomain}`,
        );
        await expect(
          CertificatePack(`${BRANCH_PREFIX}-too-many-hosts`, {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: tooManyHosts, // 51 hosts > 50 limit
            validationMethod: "txt",
            validityDays: 90,
          }),
        ).rejects.toThrow("Maximum 50 hosts are allowed per certificate pack");
      } finally {
        await destroy(scope);
      }
    });

    test("auto-infer zone from hostname", async (scope) => {
      let zone: Zone | undefined;
      let certificatePack: CertificatePack | undefined;

      try {
        // Create a test zone
        zone = await Zone(testDomain, {
          name: testDomain,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Create certificate pack without specifying zone - should auto-infer
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-auto-infer-cert`,
          {
            // zone: omitted - should auto-infer from hosts
            certificateAuthority: "lets_encrypt",
            hosts: [`${testDomain}`, `www.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(certificatePack.id).toBeTruthy();
        expect(certificatePack.zoneId).toEqual(zone.id);
        expect(certificatePack.zoneName).toEqual(`${testDomain}`);
        expect(certificatePack.hosts).toEqual([
          `${testDomain}`,
          `www.${testDomain}`,
        ]);

        // Verify certificate pack was created in the correct zone
        const getResponse = await api.get(
          `/zones/${zone.id}/ssl/certificate_packs/${certificatePack.id}`,
        );
        expect(getResponse.status).toEqual(200);

        const responseData: any = await getResponse.json();
        expect(responseData.result.zone_id).toEqual(zone.id);
      } finally {
        await destroy(scope);

        if (certificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            certificatePack.id,
          );
        }
      }
    });

    test("adopt existing certificate pack instead of creating duplicate", async (scope) => {
      let zone: Zone | undefined;
      let firstCertificatePack: CertificatePack | undefined;
      let secondCertificatePack: CertificatePack | undefined;

      try {
        // Create a test zone
        zone = await Zone(`adopt-${testDomain}`, {
          name: `adopt-${testDomain}`,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Create first certificate pack
        firstCertificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-adopt-cert-1`,
          {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: [`${testDomain}`, `www.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(firstCertificatePack.id).toBeTruthy();

        // Create second certificate pack with same configuration - should adopt existing one
        secondCertificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-adopt-cert-2`,
          {
            zone: zone,
            certificateAuthority: "lets_encrypt",
            hosts: [`${testDomain}`, `www.${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        // Should have the same ID (adopted the existing one)
        expect(secondCertificatePack.id).toEqual(firstCertificatePack.id);
        expect(secondCertificatePack.hosts).toEqual(firstCertificatePack.hosts);
        expect(secondCertificatePack.certificateAuthority).toEqual(
          firstCertificatePack.certificateAuthority,
        );
        expect(secondCertificatePack.validationMethod).toEqual(
          firstCertificatePack.validationMethod,
        );
        expect(secondCertificatePack.validityDays).toEqual(
          firstCertificatePack.validityDays,
        );
      } finally {
        await destroy(scope);

        // Both certificate pack references point to the same underlying cert,
        // so we only need to check once
        if (firstCertificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            firstCertificatePack.id,
          );
        }
      }
    });

    test("auto-infer zone with wildcard hostname", async (scope) => {
      let zone: Zone | undefined;
      let certificatePack: CertificatePack | undefined;

      try {
        // Create a test zone
        zone = await Zone(`${testDomain}`, {
          name: `${testDomain}`,
          type: "full",
          jumpStart: false,
          delete: false,
        });

        // Create certificate pack with wildcard hostname - should auto-infer zone
        certificatePack = await CertificatePack(
          `${BRANCH_PREFIX}-wildcard-cert`,
          {
            // zone: omitted - should auto-infer from wildcard host
            certificateAuthority: "lets_encrypt",
            hosts: [`*.${testDomain}`, `${testDomain}`],
            validationMethod: "txt",
            validityDays: 90,
          },
        );

        expect(certificatePack.id).toBeTruthy();
        expect(certificatePack.zoneId).toEqual(zone.id);
        expect(certificatePack.zoneName).toEqual(`${testDomain}`);
        expect(certificatePack.hosts).toEqual([
          `*.${testDomain}`,
          `${testDomain}`,
        ]);
      } finally {
        await destroy(scope);

        if (certificatePack && zone) {
          await assertCertificatePackDoesNotExist(
            api,
            zone.id,
            certificatePack.id,
          );
        }
      }
    });
  });

/**
 * Helper function to verify certificate pack was deleted
 */
async function assertCertificatePackDoesNotExist(
  api: CloudflareApi,
  zoneId: string,
  certificatePackId: string,
): Promise<void> {
  const response = await api.get(
    `/zones/${zoneId}/ssl/certificate_packs/${certificatePackId}`,
  );

  // Certificate pack should either not exist (404) or be marked as deleted
  if (response.status === 404) {
    // Certificate pack not found - expected after deletion
    return;
  }

  if (response.status === 200) {
    const data: any = await response.json();
    if (
      data.result?.status === "deleted" ||
      data.result?.status === "pending_deletion"
    ) {
      // Certificate pack exists but is marked as deleted - acceptable
      return;
    }
  }

  // If we get here, the certificate pack still exists and is not deleted
  throw new Error(
    `Certificate pack ${certificatePackId} still exists after deletion attempt`,
  );
}
