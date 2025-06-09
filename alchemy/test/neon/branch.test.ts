import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createNeonApi } from "../../src/neon/api.ts";
import { Branch } from "../../src/neon/index.ts";
import { Project } from "../../src/neon/project.ts";
import { BRANCH_PREFIX } from "../util.ts";
import "../../src/test/vitest.ts";

const api = createNeonApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Branch Resource", () => {
  const testId = `${BRANCH_PREFIX}-neon-branch`;

  const generateBranchName = () => `Test Branch ${testId}`;

  test("create, update, and delete neon branch", async (scope) => {
    let project: Project;
    let branch: Branch;

    try {
      project = await Project(`${testId}-project`, {
        name: `Test Project ${testId}`,
        regionId: "aws-us-east-1",
        pgVersion: 15,
      });

      const branchName = generateBranchName();
      branch = await Branch(testId, {
        project: project.id,
        name: branchName,
      });

      expect(branch).toMatchObject({
        id: expect.any(String),
        name: branchName,
        currentState: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      const getResponse = await api.get(
        `/projects/${project.id}/branches/${branch.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.branch.name).toEqual(branchName);

      expect(branch.currentState).toEqual("ready");

      const updatedName = `${generateBranchName()}-updated`;
      branch = await Branch(testId, {
        project: project.id,
        name: updatedName,
      });

      expect(branch).toMatchObject({
        id: expect.any(String),
        name: updatedName,
      });

      const getUpdatedResponse = await api.get(
        `/projects/${project.id}/branches/${branch.id}`,
      );
      const updatedData = await getUpdatedResponse.json();
      expect(updatedData.branch.name).toEqual(updatedName);
    } finally {
      await destroy(scope);

      if (branch?.id && project?.id) {
        const getDeletedResponse = await api.get(
          `/projects/${project.id}/branches/${branch.id}`,
        );
        expect(getDeletedResponse.status).toEqual(404);
      }
    }
  });

  test("adopt existing branch", async (scope) => {
    let project: Project;
    let branch: Branch;

    try {
      project = await Project(`${testId}-project-adopt`, {
        name: `Test Project Adopt ${testId}`,
        regionId: "aws-us-east-1",
        pgVersion: 15,
      });

      const branchName = generateBranchName();
      const createResponse = await api.post(
        `/projects/${project.id}/branches`,
        {
          branch: { name: branchName },
        },
      );
      expect(createResponse.status).toEqual(201);
      const createdBranch = await createResponse.json();

      branch = await Branch(`${testId}-adopt`, {
        project: project.id,
        name: branchName,
        adopt: true,
      });

      expect(branch).toMatchObject({
        id: createdBranch.branch.id,
        name: branchName,
      });
    } finally {
      await destroy(scope);
    }
  });
});
