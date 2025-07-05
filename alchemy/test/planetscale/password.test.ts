import { afterAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { PlanetScaleApi } from "../../src/planetscale/api.ts";
import { Branch } from "../../src/planetscale/branch.ts";
import { Database } from "../../src/planetscale/database.ts";
import { Password } from "../../src/planetscale/password.ts";
import { waitForDatabaseReady } from "../../src/planetscale/utils.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import type { Scope } from "../../src/scope.ts";
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe.skipIf(!process.env.PLANETSCALE_TEST)("Password Resource", () => {
  let api: PlanetScaleApi;
  const testDbId = `${BRANCH_PREFIX}-test-database`;
  const testBranchId = `${BRANCH_PREFIX}-test-branch`;
  const organizationId = process.env.PLANETSCALE_ORG_ID || "";
  let testDB: Database;
  let testBranch: Branch;

  const minimalDatabaseConfig = {
    name: "test-db",
    organizationId,
    clusterSize: "PS_10",
  };

  let scope: Scope | undefined;

  test.beforeAll(async (_scope) => {
    api = new PlanetScaleApi();

    testDB = await Database(testDbId, minimalDatabaseConfig);
    await waitForDatabaseReady(api, organizationId, testDB.name);

    testBranch = await Branch(testBranchId, {
      name: testBranchId,
      organizationId,
      databaseName: testDB.name,
      parentBranch: "main",
      isProduction: false,
    });

    scope = _scope;
  });

  afterAll(async () => {
    if (scope) {
      await destroy(scope);
    }
  });

  test("create, update, and delete password", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-password`;

    try {
      // Create a password
      let password = await Password(testId, {
        name: testId,
        organizationId,
        database: testDB.name,
        branch: testBranch.name,
        role: "reader",
      });

      expect(password.id).toBeTruthy();
      expect(password.name).toEqual(testId);
      expect(password.role).toEqual("reader");
      expect(password.host).toBeTruthy();
      expect(password.username).toBeTruthy();
      expect(password.password).toBeTruthy();

      // Verify password was created by querying the API directly
      const getResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testBranch.name}/passwords/${password.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json<any>();
      expect(responseData.name).toEqual(testId);
      expect(responseData.role).toEqual("reader");

      // Update the password (only name and cidrs should trigger update, not replace)
      password = await Password(testId, {
        name: `${testId}-updated`,
        organizationId,
        database: testDB.name,
        branch: testBranch.name,
        role: "reader",
      });

      expect(password.name).toEqual(`${testId}-updated`);

      // Verify password was updated
      const getUpdatedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testBranch.name}/passwords/${password.id}`,
      );
      expect(getUpdatedResponse.status).toEqual(200);

      const updatedData = await getUpdatedResponse.json<any>();
      expect(updatedData.name).toEqual(`${testId}-updated`);
    } finally {
      await destroy(scope);
    }
  });

  test("password gets replaced when properties other than name and cidrs change", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-password-replace`;

    try {
      // Create initial password
      let password = await Password(testId, {
        name: testId,
        organizationId,
        database: testDB.name,
        branch: testBranch.name,
        role: "reader",
        ttl: 3600,
        cidrs: ["0.0.0.0/0"],
      });

      const originalId = password.id;
      expect(password.role).toEqual("reader");
      expect(password.ttl).toEqual(3600);

      // Update password with different role (should trigger replacement)
      password = await Password(testId, {
        name: testId,
        organizationId,
        database: testDB.name,
        branch: testBranch.name,
        role: "writer", // Changed role
        ttl: 3600,
        cidrs: ["0.0.0.0/0"],
      });

      // Should have a new ID due to replacement
      expect(password.id).not.toEqual(originalId);
      expect(password.role).toEqual("writer");

      // Verify old password was deleted and new one created
      const getOldResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testBranch.name}/passwords/${originalId}`,
      );
      expect(getOldResponse.status).toEqual(404);

      const getNewResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testBranch.name}/passwords/${password.id}`,
      );
      expect(getNewResponse.status).toEqual(200);

      const newData = await getNewResponse.json<any>();
      expect(newData.role).toEqual("writer");
    } finally {
      await destroy(scope);
    }
  });
});
