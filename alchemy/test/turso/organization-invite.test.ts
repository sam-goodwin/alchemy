import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { OrganizationInvite } from "../../src/turso/organization-invite.ts";
import { getTursoApi, assertOrganizationSlug } from "../../src/turso/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Turso OrganizationInvite", () => {
  test("create and update invite", async (scope) => {
    const inviteId = `${BRANCH_PREFIX}-invite`;
    const email = `${BRANCH_PREFIX}@example.com`;
    let invite: OrganizationInvite;

    try {
      // Create invite with default role
      invite = await OrganizationInvite(inviteId, {
        email: email,
      });

      expect(invite).toMatchObject({
        type: "turso::organization-invite",
        email: email,
        role: "member",
      });
      expect(invite.expires_at).toBeDefined();

      // Update to admin role (will delete and recreate)
      invite = await OrganizationInvite(inviteId, {
        email: email,
        role: "admin",
      });

      expect(invite).toMatchObject({
        email: email,
        role: "admin",
      });
    } finally {
      await destroy(scope);
      await assertInviteDoesNotExist(email);
    }
  });

  test("create admin invite", async (scope) => {
    const inviteId = `${BRANCH_PREFIX}-admin-invite`;
    const email = `${BRANCH_PREFIX}-admin@example.com`;
    let invite: OrganizationInvite;

    try {
      // Create invite as admin
      invite = await OrganizationInvite(inviteId, {
        email: email,
        role: "admin",
      });

      expect(invite).toMatchObject({
        type: "turso::organization-invite",
        email: email,
        role: "admin",
      });
    } finally {
      await destroy(scope);
      await assertInviteDoesNotExist(email);
    }
  });

  test("multiple invites with different emails", async (scope) => {
    const emails = [
      `${BRANCH_PREFIX}-dev1@example.com`,
      `${BRANCH_PREFIX}-dev2@example.com`,
      `${BRANCH_PREFIX}-lead@example.com`,
    ];
    let invites: OrganizationInvite[] = [];

    try {
      // Create multiple invites
      invites = await Promise.all([
        OrganizationInvite("invite1", {
          email: emails[0],
          role: "member",
        }),
        OrganizationInvite("invite2", {
          email: emails[1],
          role: "member",
        }),
        OrganizationInvite("invite3", {
          email: emails[2],
          role: "admin",
        }),
      ]);

      expect(invites).toHaveLength(3);
      expect(invites[0].email).toBe(emails[0]);
      expect(invites[1].email).toBe(emails[1]);
      expect(invites[2].email).toBe(emails[2]);
      expect(invites[2].role).toBe("admin");
    } finally {
      await destroy(scope);
      for (const email of emails) {
        await assertInviteDoesNotExist(email);
      }
    }
  });

  test("validate invalid email", async (scope) => {
    const inviteId = `${BRANCH_PREFIX}-invalid-email`;

    await expect(
      OrganizationInvite(inviteId, {
        email: "not-an-email",
      }),
    ).rejects.toThrow("Invalid email address");

    await expect(
      OrganizationInvite(inviteId, {
        email: "",
      }),
    ).rejects.toThrow("Invalid email address");
  });

  test("validate invalid role", async (scope) => {
    const inviteId = `${BRANCH_PREFIX}-invalid-role`;

    await expect(
      OrganizationInvite(inviteId, {
        email: "test@example.com",
        role: "invalid" as any,
      }),
    ).rejects.toThrow("Invalid role 'invalid'. Must be 'admin' or 'member'");
  });
});

async function assertInviteDoesNotExist(email: string) {
  const api = getTursoApi();
  const orgSlug = assertOrganizationSlug();

  try {
    const response = await api.get<{ invites: Array<{ email: string }> }>(
      `/v1/organizations/${orgSlug}/invites`,
    );

    const inviteExists = response.invites.some(
      (invite) => invite.email === email,
    );
    if (inviteExists) {
      throw new Error(
        `Invite for '${email}' still exists when it should have been deleted`,
      );
    }
  } catch (error: any) {
    // If we can't list invites, that's fine - the invite might not exist
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}
