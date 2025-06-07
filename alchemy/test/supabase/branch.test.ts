import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Branch } from "../../src/supabase/branch.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Branch", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete branch",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-branch-test`;
      const orgName = `${BRANCH_PREFIX}-branch-org`;
      const projectName = `${BRANCH_PREFIX}-branch-project`;
      const branchName = `${BRANCH_PREFIX}-test-branch`;

      try {
        const organization = await Organization("branch-org", {
          name: orgName,
        });

        const project = await Project("branch-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const branch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          gitBranch: branchName,
        });

        expect(branch.id).toBeTruthy();
        expect(branch.name).toBeTruthy();
        expect(branch.gitBranch).toEqual(branchName);

        const response = await api.get(`/projects/${project.id}/branches`);
        expect(response.ok).toBe(true);
        const branches = (await response.json()) as any[];
        const createdBranch = branches.find((b: any) => b.id === branch.id);
        expect(createdBranch).toBeDefined();
        expect(createdBranch.git_branch).toEqual(branchName);

        const updatedBranch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          gitBranch: branchName,
        });

        expect(updatedBranch.id).toEqual(branch.id);
        expect(updatedBranch.gitBranch).toEqual(branchName);
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
          gitBranch: branchName,
        });

        expect(originalBranch.gitBranch).toEqual(branchName);

        const adoptedBranch = await Branch(testId, {
          project: project.id,
          branchName: branchName,
          gitBranch: branchName,
          adopt: true,
        });

        expect(adoptedBranch.id).toEqual(originalBranch.id);
        expect(adoptedBranch.gitBranch).toEqual(branchName);

        const response = await api.get(`/projects/${project.id}/branches`);
        expect(response.ok).toBe(true);
        const branches = (await response.json()) as any[];
        const branchesWithName = branches.filter(
          (b: any) => b.git_branch === branchName,
        );
        expect(branchesWithName).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
