import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Project", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete project",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-project-test`;
      const orgName = `${BRANCH_PREFIX}-test-org`;
      const projectName = `${BRANCH_PREFIX}-test-project`;

      try {
        const organization = await Organization("test-org", {
          name: orgName,
        });

        expect(organization.id).toBeTruthy();

        const project = await Project(testId, {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        expect(project.id).toBeTruthy();
        expect(project.name).toEqual(projectName);
        expect(project.organizationId).toEqual(organization.id);
        expect(project.region).toEqual("us-east-1");

        const response = await api.get("/projects");
        expect(response.ok).toBe(true);
        const projects = (await response.json()) as any[];
        const createdProject = projects.find(
          (p: any) => p.name === projectName,
        );
        expect(createdProject).toBeDefined();
        expect(createdProject.id).toEqual(project.id);

        const updatedProjectName = `${projectName}-updated`;
        const updatedProject = await Project(testId, {
          organizationId: organization.id,
          name: updatedProjectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        expect(updatedProject.id).toEqual(project.id);
        expect(updatedProject.name).toEqual(updatedProjectName);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing project",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-org`;
      const projectName = `${BRANCH_PREFIX}-adopt-project`;

      try {
        const organization = await Organization("adopt-org", {
          name: orgName,
        });

        const originalProject = await Project("original", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        expect(originalProject.name).toEqual(projectName);

        const adoptedProject = await Project(testId, {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
          adopt: true,
        });

        expect(adoptedProject.id).toEqual(originalProject.id);
        expect(adoptedProject.name).toEqual(projectName);

        const response = await api.get("/projects");
        expect(response.ok).toBe(true);
        const projects = (await response.json()) as any[];
        const projectsWithName = projects.filter(
          (p: any) => p.name === projectName,
        );
        expect(projectsWithName).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "pause and restore project",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-pause-test`;
      const orgName = `${BRANCH_PREFIX}-pause-org`;
      const projectName = `${BRANCH_PREFIX}-pause-project`;

      try {
        const organization = await Organization("pause-org", {
          name: orgName,
        });

        const project = await Project(testId, {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        expect(project.status).toBeDefined();

        const pauseResponse = await api.post(
          `/projects/${project.id}/pause`,
          {},
        );
        expect(pauseResponse.ok).toBe(true);

        const restoreResponse = await api.post(
          `/projects/${project.id}/restore`,
          {},
        );
        expect(restoreResponse.ok).toBe(true);

        const finalResponse = await api.get(`/projects/${project.id}`);
        expect(finalResponse.ok).toBe(true);
        const finalProject = (await finalResponse.json()) as any;
        expect(finalProject.id).toEqual(project.id);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});
