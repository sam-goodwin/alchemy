import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { SSOProvider } from "../../src/supabase/sso-provider.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("SSOProvider", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete SAML SSO provider",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-sso-test`;
      const orgName = `${BRANCH_PREFIX}-sso-org`;
      const projectName = `${BRANCH_PREFIX}-sso-project`;

      try {
        const organization = await Organization("sso-org", {
          name: orgName,
        });

        const project = await Project("sso-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const ssoProvider = await SSOProvider(testId, {
          project: project.id,
          type: "saml",
          metadata: {
            entity_id: "https://example.com/saml",
            metadata_url: "https://example.com/saml/metadata",
          },
          domains: ["example.com", "test.com"],
        });

        expect(ssoProvider.id).toBeTruthy();
        expect(ssoProvider.type).toEqual("saml");
        expect(ssoProvider.metadata.entity_id).toEqual(
          "https://example.com/saml",
        );
        expect(ssoProvider.domains).toContain("example.com");
        expect(ssoProvider.domains).toContain("test.com");

        const response = await api.get(
          `/projects/${project.id}/config/auth/sso/providers`,
        );
        expect(response.ok).toBe(true);
        const providers = (await response.json()) as any[];
        const createdProvider = providers.find(
          (p: any) => p.id === ssoProvider.id,
        );
        expect(createdProvider).toBeDefined();
        expect(createdProvider.type).toEqual("saml");

        const updatedProvider = await SSOProvider(testId, {
          project: project.id,
          type: "saml",
          metadata: {
            entity_id: "https://updated.com/saml",
            metadata_url: "https://updated.com/saml/metadata",
          },
          domains: ["updated.com"],
        });

        expect(updatedProvider.id).toEqual(ssoProvider.id);
        expect(updatedProvider.metadata.entity_id).toEqual(
          "https://updated.com/saml",
        );
        expect(updatedProvider.domains).toContain("updated.com");
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create OIDC SSO provider",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-oidc-test`;
      const orgName = `${BRANCH_PREFIX}-oidc-org`;
      const projectName = `${BRANCH_PREFIX}-oidc-project`;

      try {
        const organization = await Organization("oidc-org", {
          name: orgName,
        });

        const project = await Project("oidc-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const oidcProvider = await SSOProvider(testId, {
          project: project.id,
          type: "oidc",
          metadata: {
            issuer: "https://accounts.google.com",
            client_id: "test-client-id",
          },
        });

        expect(oidcProvider.id).toBeTruthy();
        expect(oidcProvider.type).toEqual("oidc");
        expect(oidcProvider.metadata.issuer).toEqual(
          "https://accounts.google.com",
        );
        expect(oidcProvider.metadata.client_id).toEqual("test-client-id");

        const response = await api.get(
          `/projects/${project.id}/config/auth/sso/providers`,
        );
        expect(response.ok).toBe(true);
        const providers = (await response.json()) as any[];
        const createdProvider = providers.find(
          (p: any) => p.id === oidcProvider.id,
        );
        expect(createdProvider).toBeDefined();
        expect(createdProvider.type).toEqual("oidc");
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing SSO provider",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-org`;
      const projectName = `${BRANCH_PREFIX}-adopt-project`;

      try {
        const organization = await Organization("adopt-org", {
          name: orgName,
        });

        const project = await Project("adopt-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const originalProvider = await SSOProvider("original", {
          project: project.id,
          type: "saml",
          metadata: {
            entity_id: "https://adopt.com/saml",
          },
        });

        expect(originalProvider.type).toEqual("saml");

        const adoptedProvider = await SSOProvider(testId, {
          project: project.id,
          type: "saml",
          metadata: {
            entity_id: "https://adopt.com/saml",
          },
          adopt: true,
        });

        expect(adoptedProvider.id).toEqual(originalProvider.id);
        expect(adoptedProvider.type).toEqual("saml");

        const response = await api.get(
          `/projects/${project.id}/config/auth/sso/providers`,
        );
        expect(response.ok).toBe(true);
        const providers = (await response.json()) as any[];
        const samlProviders = providers.filter((p: any) => p.type === "saml");
        expect(samlProviders).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
