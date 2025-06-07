import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createPolarClient } from "../../src/polar/client.ts";
import {
  Organization,
  type Organization as OrganizationOutput,
  type OrganizationProps,
} from "../../src/polar/organization.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Polar Organization Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-polar-organization`;

  test.skipIf(!!process.env.CI)(
    "update organization settings",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const logicalId = `${baseLogicalId}-${testRunSuffix}`;
      let organizationOutput: OrganizationOutput | undefined;

      try {
        const organizations = await polarClient.get("/organizations");
        if (!organizations.items || organizations.items.length === 0) {
          throw new Error("No organizations found for testing");
        }

        const _existingOrg = organizations.items[0];

        const updateProps: OrganizationProps = {
          bio: "Updated test bio",
          pledgeMinimumAmount: 1000,
          pledgeBadgeShowAmount: true,
          metadata: { test: "true", updated: "yes" },
        };

        organizationOutput = await Organization(logicalId, updateProps);

        expect(organizationOutput.id).toBeTruthy();
        expect(organizationOutput.bio).toEqual("Updated test bio");
        expect(organizationOutput.pledgeMinimumAmount).toEqual(1000);
        expect(organizationOutput.metadata?.test).toEqual("true");

        const fetchedOrganization = await polarClient.get(
          `/organizations/${organizationOutput.id}`,
        );
        expect(fetchedOrganization.bio).toEqual("Updated test bio");
      } finally {
        await destroy(scope);
      }
    },
  );
});
