import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Secret as SupabaseSecret } from "../../src/supabase/secret.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Secret", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete secrets",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-secret-test`;
      const orgName = `${BRANCH_PREFIX}-secret-org`;
      const projectName = `${BRANCH_PREFIX}-secret-project`;

      try {
        const organization = await Organization("secret-org", {
          name: orgName,
        });

        const project = await Project("secret-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const secrets = await SupabaseSecret(testId, {
          project: project.id,
          secrets: {
            API_KEY: "secret-value-123",
            DATABASE_URL: "postgres://localhost:5432/test",
            JWT_SECRET: "super-secret-key",
          },
        });

        expect(secrets.project).toEqual(project.id);
        expect(secrets.secrets).toHaveLength(3);
        expect(secrets.secrets.map((s: any) => s.name)).toContain("API_KEY");
        expect(secrets.secrets.map((s: any) => s.name)).toContain(
          "DATABASE_URL",
        );
        expect(secrets.secrets.map((s: any) => s.name)).toContain("JWT_SECRET");

        const response = await api.get(`/projects/${project.id}/secrets`);
        expect(response.ok).toBe(true);
        const secretsList = (await response.json()) as any[];
        const apiKeySecret = secretsList.find((s: any) => s.name === "API_KEY");
        const dbUrlSecret = secretsList.find(
          (s: any) => s.name === "DATABASE_URL",
        );
        const jwtSecret = secretsList.find((s: any) => s.name === "JWT_SECRET");

        expect(apiKeySecret).toBeDefined();
        expect(dbUrlSecret).toBeDefined();
        expect(jwtSecret).toBeDefined();

        const updatedSecrets = await SupabaseSecret(testId, {
          project: project.id,
          secrets: {
            API_KEY: "updated-secret-value-456",
            NEW_SECRET: "brand-new-secret",
          },
        });

        expect(updatedSecrets.project).toEqual(project.id);
        expect(updatedSecrets.secrets).toHaveLength(2);
        expect(updatedSecrets.secrets.map((s: any) => s.name)).toContain(
          "API_KEY",
        );
        expect(updatedSecrets.secrets.map((s: any) => s.name)).toContain(
          "NEW_SECRET",
        );
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing secrets",
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

        const originalSecrets = await SupabaseSecret("original", {
          project: project.id,
          secrets: {
            SHARED_SECRET: "original-value",
          },
        });

        expect(originalSecrets.secrets).toHaveLength(1);

        const adoptedSecrets = await SupabaseSecret(testId, {
          project: project.id,
          secrets: {
            SHARED_SECRET: "adopted-value",
          },
          adopt: true,
        });

        expect(adoptedSecrets.project).toEqual(project.id);
        expect(adoptedSecrets.secrets).toHaveLength(1);
        expect(adoptedSecrets.secrets[0].name).toEqual("SHARED_SECRET");

        const response = await api.get(`/projects/${project.id}/secrets`);
        expect(response.ok).toBe(true);
        const secretsList = (await response.json()) as any[];
        const sharedSecrets = secretsList.filter(
          (s: any) => s.name === "SHARED_SECRET",
        );
        expect(sharedSecrets).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
