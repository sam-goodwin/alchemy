import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { OrganizationMember } from "../../src/turso/organization-member.ts";
import { getTursoApi, assertOrganizationSlug } from "../../src/turso/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Turso OrganizationMember", () => {
  // Note: These tests require valid Turso usernames to work
  // In a real scenario, you would need to use actual usernames
  // or mock the API responses for testing

  test.skip("add and update member role", async (scope) => {
    const memberId = `${BRANCH_PREFIX}-member`;
    const username = "test-user"; // This needs to be a real Turso username
    let member: OrganizationMember;

    try {
      // Add member with default role
      member = await OrganizationMember(memberId, {
        username: username,
      });

      expect(member).toMatchObject({
        type: "turso::organization-member",
        username: username,
        role: "member",
      });
      expect(member.email).toBeDefined();

      // Update to admin role
      member = await OrganizationMember(memberId, {
        username: username,
        role: "admin",
      });

      expect(member).toMatchObject({
        username: username,
        role: "admin",
      });
    } finally {
      await destroy(scope);
      await assertMemberDoesNotExist(username);
    }
  });

  test.skip("add admin member", async (scope) => {
    const memberId = `${BRANCH_PREFIX}-admin`;
    const username = "test-admin"; // This needs to be a real Turso username
    let member: OrganizationMember;

    try {
      // Add member as admin
      member = await OrganizationMember(memberId, {
        username: username,
        role: "admin",
      });

      expect(member).toMatchObject({
        type: "turso::organization-member",
        username: username,
        role: "admin",
      });
    } finally {
      await destroy(scope);
      await assertMemberDoesNotExist(username);
    }
  });

  test("validate invalid role", async (scope) => {
    const memberId = `${BRANCH_PREFIX}-invalid`;

    await expect(
      OrganizationMember(memberId, {
        username: "someuser",
        role: "invalid" as any,
      }),
    ).rejects.toThrow("Invalid role 'invalid'. Must be 'admin' or 'member'");
  });

  test("handle non-existent user", async (scope) => {
    const memberId = `${BRANCH_PREFIX}-nonexistent`;
    const nonExistentUser = "this-user-definitely-does-not-exist-123456789";

    await expect(
      OrganizationMember(memberId, {
        username: nonExistentUser,
      }),
    ).rejects.toThrow(/not found/);
  });
});

async function assertMemberDoesNotExist(username: string) {
  const api = getTursoApi();
  const orgSlug = assertOrganizationSlug();

  try {
    await api.get(`/v1/organizations/${orgSlug}/members/${username}`);
    throw new Error(
      `Member '${username}' still exists when it should have been removed`,
    );
  } catch (error: any) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}
