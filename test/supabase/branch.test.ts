import { describe, expect } from "vitest";
import { alchemy } from "../../alchemy/src/alchemy.ts";
import { destroy } from "../../alchemy/src/destroy.ts";
import { Branch } from "../../alchemy/src/supabase/branch.ts";
import { Project } from "../../alchemy/src/supabase/project.ts";
import { Organization } from "../../alchemy/src/supabase/organization.ts";
import { createSupabaseApi } from "../../alchemy/src/supabase/api.ts";
import { BRANCH_PREFIX } from "../../alchemy/test/util.ts";

import "../../alchemy/src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Branch", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete branch",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-branch-test`;
      const orgName = `${BRANCH_PREFIX}-test-org`;
      const projectName = `${BRANCH_PREFIX}-test-project`;
      const branchName = `${BRANCH_PREFIX}-test-branch`;

      try {
        const organization = await Organization("test-org", {
          name: orgName,
        });

        expect(organization.id).toBeTruthy();
        expect(organization.name).toEqual(orgName);

        const project = await Project("test-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        expect(project.id).toBeTruthy();
        expect(project.name).toEqual(projectName);

        const branch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          gitBranch: "feature/test-branch",
          persistent: true,
        });

        expect(branch.id).toBeTruthy();
        expect(branch.name).toEqual(branchName);

        expect(branch.gitBranch).toEqual("feature/test-branch");
        expect(branch.persistent).toBe(true);

        const response = await api.get(`/projects/${project.id}/branches`);
        expect(response.ok).toBe(true);
        const branches = await response.json() as any[];
        const createdBranch = branches.find((b: any) => b.name === branchName);
        expect(createdBranch).toBeDefined();
        expect(createdBranch.git_branch).toEqual("feature/test-branch");

        const updatedBranch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          gitBranch: "feature/updated-branch",
          persistent: false,
        });

        expect(updatedBranch.id).toEqual(branch.id);
        expect(updatedBranch.gitBranch).toEqual("feature/updated-branch");
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing branch",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-org`;
      const projectName = `${BRANCH_PREFIX}-adopt-project`;
      const branchName = `${BRANCH_PREFIX}-adopt-branch`;

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

        const originalBranch = await Branch("original", {
          project: project.id,
          branchName: branchName,
          persistent: true,
        });

        expect(originalBranch.name).toEqual(branchName);

        const adoptedBranch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          adopt: true,
        });

        expect(adoptedBranch.id).toEqual(originalBranch.id);
        expect(adoptedBranch.name).toEqual(branchName);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
