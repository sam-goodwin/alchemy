import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Group } from "../../src/turso/group.ts";
import { getTursoApi, assertOrganizationSlug } from "../../src/turso/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Turso Group", () => {
  test("create and update group", async (scope) => {
    const groupId = `${BRANCH_PREFIX}-test-group`;
    let group: Group;

    try {
      // Create a group with single location
      group = await Group(groupId, {
        locations: ["iad"],
      });

      expect(group).toMatchObject({
        type: "turso::group",
        groupName: groupId,
        locations: ["iad"],
        primary: "iad",
        archived: false,
      });
      expect(group.uuid).toBeDefined();
      expect(group.version).toBeDefined();

      // Update to add more locations
      group = await Group(groupId, {
        locations: ["iad", "lhr"],
        primary: "iad",
      });

      expect(group).toMatchObject({
        locations: expect.arrayContaining(["iad", "lhr"]),
        primary: "iad",
      });
    } finally {
      await destroy(scope);
      await assertGroupDoesNotExist(groupId);
    }
  });

  test("create group with multiple locations", async (scope) => {
    const groupId = `${BRANCH_PREFIX}-multi-region`;
    let group: Group;

    try {
      // Create a multi-region group
      group = await Group(groupId, {
        locations: ["iad", "lhr", "syd"],
        primary: "lhr",
        delete_protection: true,
      });

      expect(group).toMatchObject({
        type: "turso::group",
        groupName: groupId,
        locations: expect.arrayContaining(["iad", "lhr", "syd"]),
        primary: "lhr",
      });
    } finally {
      await destroy(scope);
      await assertGroupDoesNotExist(groupId);
    }
  });

  test("validate primary location must be in locations array", async (scope) => {
    const groupId = `${BRANCH_PREFIX}-invalid-primary`;

    await expect(
      Group(groupId, {
        locations: ["iad"],
        primary: "lhr", // Not in locations array
      }),
    ).rejects.toThrow("Primary location 'lhr' must be in the locations array");
  });

  test("validate at least one location is required", async (scope) => {
    const groupId = `${BRANCH_PREFIX}-no-locations`;

    await expect(
      Group(groupId, {
        locations: [],
      }),
    ).rejects.toThrow("At least one location is required");
  });
});

async function assertGroupDoesNotExist(groupName: string) {
  const api = getTursoApi();
  const orgSlug = assertOrganizationSlug();

  try {
    await api.get(`/v1/organizations/${orgSlug}/groups/${groupName}`);
    throw new Error(
      `Group '${groupName}' still exists when it should have been deleted`,
    );
  } catch (error: any) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}
