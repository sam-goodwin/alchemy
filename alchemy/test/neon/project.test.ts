import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createNeonApi } from "../../src/neon/api.ts";
import {
  type Branch,
  type Database,
  type Endpoint,
  Project,
  type Role,
} from "../../src/neon/project.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

// Create API client for verification
const api = createNeonApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Project Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-neon-project`;

  // Helper function to generate a unique project name
  const generateProjectName = () => `Test Project ${testId}}`;

  test("create, update, and delete neon project", async (scope) => {
    let project: Project | undefined;
    try {
      // Create a test Neon project with basic settings
      const projectName = generateProjectName();
      project = await Project(testId, {
        name: projectName,
        regionId: "aws-us-east-1",
        pgVersion: 15,
      });

      expect(project.id).toBeTruthy();
      expect(project.name).toEqual(projectName);
      expect(project.regionId).toEqual("aws-us-east-1");
      expect(project.pgVersion).toEqual(15);
      expect(project.createdAt).toBeTruthy();
      expect(project.updatedAt).toBeTruthy();

      // Verify the additional properties are included
      expect(project.branch).toBeTruthy();
      const branch: Branch = project.branch!;
      expect(branch.name).toBeTruthy();
      expect(branch.id).toBeTruthy();
      expect(branch.projectId).toEqual(project.id);
      expect(branch.currentState).toBeTruthy();

      expect(project.endpoints).toBeTruthy();
      const endpoint: Endpoint = project.endpoints![0];
      expect(endpoint.type).toEqual("read_write");
      expect(endpoint.host).toBeTruthy();
      expect(endpoint.branchId).toBeTruthy();
      expect(endpoint.projectId).toEqual(project.id);

      expect(project.connection_uris).toBeTruthy();
      expect(
        project.connection_uris![0].connection_uri.unencrypted,
      ).toBeTruthy();
      expect(project.connection_uris![0].connection_uri.unencrypted).toContain(
        "postgresql://",
      );

      expect(project.databases).toBeTruthy();
      const database: Database = project.databases![0];
      expect(database.name).toBeTruthy();
      expect(database.id).toBeTruthy();
      expect(database.branchId).toBeTruthy();
      expect(database.ownerName).toBeTruthy();

      expect(project.roles).toBeTruthy();
      const role: Role = project.roles![0];
      expect(role.name).toBeTruthy();
      expect(role.branchId).toBeTruthy();

      // Verify operations are not exposed in the project output
      expect((project as any).operations).toBeUndefined();

      // Verify project was created by querying the API directly
      const getResponse = await api.get(`/projects/${project.id}`);
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.project.name).toEqual(projectName);

      // Check if the branch is in ready state, confirming operations were waited for
      expect(project.branch!.currentState).toEqual("ready");

      // Check if endpoints are active, confirming operations were waited for
      expect(project.endpoints![0].currentState).toEqual("active");

      // Update the project name
      const updatedName = `${generateProjectName()}-updated`;
      project = await Project(testId, {
        name: updatedName,
        regionId: "aws-us-east-1",
        pg_version: 15,
        existingProjectId: project.id,
      });

      expect(project.id).toBeTruthy();
      expect(project.name).toEqual(updatedName);

      // Verify project was updated
      const getUpdatedResponse = await api.get(`/projects/${project.id}`);
      const updatedData: any = await getUpdatedResponse.json();
      expect(updatedData.project.name).toEqual(updatedName);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify project was deleted
      if (project?.id) {
        const getDeletedResponse = await api.get(`/projects/${project.id}`);
        expect(getDeletedResponse.status).toEqual(404);
      }
    }
  });
});
