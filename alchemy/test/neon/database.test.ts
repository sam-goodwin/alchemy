import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createNeonApi } from "../../src/neon/api.ts";
import { Branch } from "../../src/neon/index.ts";
import { Database } from "../../src/neon/index.ts";
import { Project } from "../../src/neon/project.ts";
import { BRANCH_PREFIX } from "../util.ts";
import "../../src/test/vitest.ts";

const api = createNeonApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Database Resource", () => {
  const testId = `${BRANCH_PREFIX}-neon-database`;

  const generateDatabaseName = () => `test_db_${testId}`.replace(/-/g, "_");

  test("create, update, and delete neon database", async (scope) => {
    let project: Project;
    let branch: Branch;
    let database: Database;

    try {
      project = await Project(`${testId}-project`, {
        name: `Test Project ${testId}`,
        regionId: "aws-us-east-1",
        pgVersion: 15,
      });

      branch = await Branch(`${testId}-branch`, {
        project: project.id,
        name: `Test Branch ${testId}`,
      });

      const databaseName = generateDatabaseName();
      database = await Database(testId, {
        project: project.id,
        branch: branch.id,
        name: databaseName,
        ownerName: project.roles[0].name,
      });

      expect(database).toMatchObject({
        id: expect.any(Number),
        name: databaseName,
        ownerName: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      const listResponse = await api.get(
        `/projects/${project.id}/branches/${branch.id}/databases`,
      );
      expect(listResponse.status).toEqual(200);

      const responseData = await listResponse.json();
      const foundDatabase = responseData.databases.find(
        (db: { name: string }) => db.name === databaseName,
      );
      expect(foundDatabase).toBeTruthy();
      expect(foundDatabase.name).toEqual(databaseName);

      const updatedOwner = project.roles[0].name;
      database = await Database(testId, {
        project: project.id,
        branch: branch.id,
        name: databaseName,
        ownerName: updatedOwner,
      });

      expect(database).toMatchObject({
        id: expect.any(Number),
        ownerName: updatedOwner,
      });
    } finally {
      await destroy(scope);

      if (database?.name && project?.id && branch?.id) {
        const listDeletedResponse = await api.get(
          `/projects/${project.id}/branches/${branch.id}/databases`,
        );
        if (listDeletedResponse.ok) {
          const deletedData = await listDeletedResponse.json();
          const foundDeleted = deletedData.databases?.find(
            (db: { name: string }) => db.name === database!.name,
          );
          expect(foundDeleted).toBeFalsy();
        }
      }
    }
  });

  test("adopt existing database", async (scope) => {
    let project: Project;
    let branch: Branch;
    let database: Database;

    try {
      project = await Project(`${testId}-project-adopt`, {
        name: `Test Project Adopt ${testId}`,
        regionId: "aws-us-east-1",
        pgVersion: 15,
      });

      branch = await Branch(`${testId}-branch-adopt`, {
        project: project.id,
        name: `Test Branch Adopt ${testId}`,
      });

      const databaseName = generateDatabaseName();
      const createResponse = await api.post(
        `/projects/${project.id}/branches/${branch.id}/databases`,
        {
          database: {
            name: databaseName,
            owner_name: project.roles[0].name,
          },
        },
      );
      expect(createResponse.status).toEqual(201);
      const createdDatabase = await createResponse.json();

      database = await Database(`${testId}-adopt`, {
        project: project.id,
        branch: branch.id,
        name: databaseName,
        ownerName: project.roles[0].name,
        adopt: true,
      });

      expect(database).toMatchObject({
        id: createdDatabase.database.id,
        name: databaseName,
      });
    } finally {
      await destroy(scope);
    }
  });
});
