import {
  GetEmailIdentityCommand,
  NotFoundException,
  SESv2Client,
} from "@aws-sdk/client-sesv2";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.js";
import { SESVerification } from "../../src/aws/ses-verification.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

// Skip tests if Cloudflare API token is not available
const isEnabled = process.env.CLOUDFLARE_API_TOKEN || process.env.ALL_TESTS;

describe.skipIf(!isEnabled)("SESVerification Resource", () => {
  const testId = `${BRANCH_PREFIX}-ses-verification`;
  const testDomain = `${testId.toLowerCase()}.example.com`;

  test("create SES verification with DNS records", async (scope) => {
    let verification: SESVerification | undefined;

    try {
      verification = await SESVerification(testId, {
        domain: testDomain,
        enableDkim: true,
        enableReceiving: true,
        region: "us-east-1",
        verificationTimeout: 60000, // 1 minute for testing
        pollingInterval: 5000, // 5 seconds for testing
        apiToken: process.env.CLOUDFLARE_API_TOKEN,
      });

      // Verify the resource was created with expected properties
      expect(verification.domain).toBe(testDomain);
      expect(verification.emailIdentityArn).toBeTruthy();
      expect(verification.verificationStatus).toBeDefined();
      expect(verification.zoneId).toBeTruthy();
      expect(verification.verified).toBeDefined();

      // Verify DNS records were created
      expect(verification.dnsRecords.domainVerificationRecord).toBeTruthy();
      expect(verification.dnsRecords.dkimRecords).toBeTruthy();
      expect(verification.dnsRecords.dkimRecords?.length).toBe(3);
      expect(verification.dnsRecords.mxRecord).toBeTruthy();

      // Verify DKIM was enabled
      expect(verification.dkimStatus).toBeDefined();
      expect(verification.dkimTokens).toBeTruthy();
      expect(verification.dkimTokens?.length).toBe(3);

      // Verify the SES email identity was created
      const client = new SESv2Client({});
      const identity = await client.send(
        new GetEmailIdentityCommand({
          EmailIdentity: testDomain,
        }),
      );

      expect(identity).toBeTruthy();
      expect(identity.DkimAttributes?.SigningEnabled).toBe(true);
      expect(identity.DkimAttributes?.Tokens?.length).toBe(3);
    } finally {
      // Clean up
      await destroy(scope);
      await assertSESVerificationDoesNotExist(testDomain);
    }
  });

  test("create SES verification without DKIM", async (scope) => {
    let verification: SESVerification | undefined;

    try {
      verification = await SESVerification(`${testId}-no-dkim`, {
        domain: testDomain,
        enableDkim: false,
        enableReceiving: false,
        verificationTimeout: 60000,
        pollingInterval: 5000,
        apiToken: process.env.CLOUDFLARE_API_TOKEN,
      });

      // Verify the resource was created with expected properties
      expect(verification.domain).toBe(testDomain);
      expect(verification.emailIdentityArn).toBeTruthy();
      expect(verification.verificationStatus).toBeDefined();
      expect(verification.zoneId).toBeTruthy();

      // Verify DNS records were created (only domain verification)
      expect(verification.dnsRecords.domainVerificationRecord).toBeTruthy();
      expect(verification.dnsRecords.dkimRecords).toBeUndefined();
      expect(verification.dnsRecords.mxRecord).toBeUndefined();

      // Verify DKIM was not enabled
      expect(verification.dkimStatus).toBeUndefined();
      expect(verification.dkimTokens).toBeUndefined();

      // Verify the SES email identity was created
      const client = new SESv2Client({});
      const identity = await client.send(
        new GetEmailIdentityCommand({
          EmailIdentity: testDomain,
        }),
      );

      expect(identity).toBeTruthy();
      expect(identity.DkimAttributes?.SigningEnabled).toBe(false);
    } finally {
      // Clean up
      await destroy(scope);
      await assertSESVerificationDoesNotExist(testDomain);
    }
  });

  test("handle existing SES email identity", async (scope) => {
    let verification: SESVerification | undefined;

    try {
      // Create the identity first
      const client = new SESv2Client({});
      await client.send(
        new GetEmailIdentityCommand({
          EmailIdentity: testDomain,
        }),
      );

      // Now create the verification resource
      verification = await SESVerification(`${testId}-existing`, {
        domain: testDomain,
        enableDkim: true,
        verificationTimeout: 60000,
        pollingInterval: 5000,
        apiToken: process.env.CLOUDFLARE_API_TOKEN,
      });

      // Should still work with existing identity
      expect(verification.domain).toBe(testDomain);
      expect(verification.emailIdentityArn).toBeTruthy();
      expect(verification.verificationStatus).toBeDefined();
      expect(verification.zoneId).toBeTruthy();
    } finally {
      // Clean up
      await destroy(scope);
      await assertSESVerificationDoesNotExist(testDomain);
    }
  });

  test("fail when Cloudflare zone not found", async (scope) => {
    const nonExistentDomain = "non-existent-domain-12345.com";

    try {
      await expect(
        SESVerification(`${testId}-no-zone`, {
          domain: nonExistentDomain,
          apiToken: process.env.CLOUDFLARE_API_TOKEN,
        }),
      ).rejects.toThrow(
        `No Cloudflare zone found for domain: ${nonExistentDomain}`,
      );
    } finally {
      await destroy(scope);
    }
  });
});

async function assertSESVerificationDoesNotExist(domain: string) {
  const client = new SESv2Client({});
  try {
    await client.send(
      new GetEmailIdentityCommand({
        EmailIdentity: domain,
      }),
    );
    // Should not reach here if identity was properly deleted
    expect(true).toBe(false);
  } catch (error) {
    expect(error instanceof NotFoundException).toBe(true);
  }
}
