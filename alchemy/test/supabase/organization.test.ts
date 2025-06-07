import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Organization", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete organization",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-org-test`;
      const orgName = `${BRANCH_PREFIX}-test-organization`;

      try {
        const organization = await Organization(testId, {
          name: orgName,
        });

        expect(organization.id).toBeTruthy();
        expect(organization.name).toEqual(orgName);
        expect(organization.plan).toBeDefined();

        const response = await api.get("/organizations");
        expect(response.ok).toBe(true);
        const organizations = (await response.json()) as any[];
        const createdOrg = organizations.find(
          (org: any) => org.name === orgName,
        );
        expect(createdOrg).toBeDefined();
        expect(createdOrg.id).toEqual(organization.id);

        const updatedOrgName = `${orgName}-updated`;
        const updatedOrganization = await Organization(testId, {
          name: updatedOrgName,
        });

        expect(updatedOrganization.id).toEqual(organization.id);
        expect(updatedOrganization.name).toEqual(updatedOrgName);

        const updatedResponse = await api.get("/organizations");
        expect(updatedResponse.ok).toBe(true);
        const updatedOrganizations = (await updatedResponse.json()) as any[];
        const updatedOrg = updatedOrganizations.find(
          (org: any) => org.id === organization.id,
        );
        expect(updatedOrg.name).toEqual(updatedOrgName);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing organization",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-organization`;

      try {
        const originalOrganization = await Organization("original", {
          name: orgName,
        });

        expect(originalOrganization.name).toEqual(orgName);

        const adoptedOrganization = await Organization(testId, {
          name: orgName,
          adopt: true,
        });

        expect(adoptedOrganization.id).toEqual(originalOrganization.id);
        expect(adoptedOrganization.name).toEqual(orgName);

        const response = await api.get("/organizations");
        expect(response.ok).toBe(true);
        const organizations = (await response.json()) as any[];
        const orgsWithName = organizations.filter(
          (org: any) => org.name === orgName,
        );
        expect(orgsWithName).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
