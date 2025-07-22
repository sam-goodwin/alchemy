import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createResendApi } from "../../src/resend/api.ts";
import { ResendDomain } from "../../src/resend/domain.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("ResendDomain", () => {
  test.skipIf(!process.env.RESEND_API_KEY)(
    "create, update, and delete resend domain",
    async (scope) => {
      const api = createResendApi();
      const resourceId = `${BRANCH_PREFIX}-domain`;
      const domainName = `${resourceId}.example.com`;
      let domain: ResendDomain | undefined;

      try {
        // Create
        domain = await ResendDomain(resourceId, {
          name: domainName,
          region: "us-east-1",
        });

        expect(domain).toMatchObject({
          name: domainName,
          region: "us-east-1",
          status: expect.any(String),
          records: expect.any(Array),
          created_at: expect.any(String),
        });

        expect(domain.id).toBeTruthy();
        expect(domain.records.length).toBeGreaterThan(0);

        // Verify each DNS record has required fields
        domain.records.forEach((record) => {
          expect(record.name).toBeTruthy();
          expect(record.type).toBeTruthy();
          expect(record.value).toBeTruthy();
          expect(record.status).toBeTruthy();
        });

        // Update (should not change immutable properties)
        domain = await ResendDomain(resourceId, {
          name: domainName,
          region: "us-east-1",
        });

        expect(domain).toMatchObject({
          name: domainName,
          region: "us-east-1",
        });

        // Test immutable property validation
        await expect(
          ResendDomain(resourceId, {
            name: "different-domain.example.com",
            region: "us-east-1",
          }),
        ).rejects.toThrow("Cannot change domain name");

        await expect(
          ResendDomain(resourceId, {
            name: domainName,
            region: "eu-west-1",
          }),
        ).rejects.toThrow("Cannot change domain region");
      } finally {
        await destroy(scope);
        await assertDomainDoesNotExist(api, domain);
      }
    },
  );
});

async function assertDomainDoesNotExist(
  api: any,
  domain: ResendDomain | undefined,
) {
  if (domain?.id) {
    const response = await api.get(`/domains/${domain.id}`);
    expect(response.status).toBe(404);
  }
}
