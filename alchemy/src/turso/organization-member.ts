import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { assertOrganizationSlug, getTursoApi } from "./api.ts";

export interface OrganizationMemberProps {
  /**
   * The username of the member to add.
   * This must be an existing Turso user.
   */
  username: string;

  /**
   * The role to assign to the member.
   * @default "member"
   */
  role?: "admin" | "member";
}

export interface OrganizationMember
  extends Resource<"turso::organization-member"> {
  /**
   * The username of the member.
   */
  username: string;

  /**
   * The member's role in the organization.
   */
  role: "admin" | "member" | "owner";

  /**
   * The member's email address.
   */
  email: string;
}

interface TursoMemberResponse {
  member: {
    username: string;
    role: "admin" | "member" | "owner";
    email: string;
  };
}

interface TursoMembersResponse {
  members: Array<{
    username: string;
    role: "admin" | "member" | "owner";
    email: string;
  }>;
}

/**
 * Manages organization membership and roles in Turso.
 *
 * @example
 * ## Add a Member
 *
 * Add a new member with default permissions:
 *
 * ```ts
 * const member = await OrganizationMember("john-doe", {
 *   username: "johndoe",
 * });
 * ```
 *
 * @example
 * ## Add an Admin
 *
 * Add a member with admin privileges:
 *
 * ```ts
 * const admin = await OrganizationMember("jane-admin", {
 *   username: "janesmith",
 *   role: "admin",
 * });
 * ```
 *
 * @example
 * ## Update Member Role
 *
 * Change a member's role by re-applying with new properties:
 *
 * ```ts
 * // First add as member
 * const member = await OrganizationMember("developer", {
 *   username: "devuser",
 *   role: "member",
 * });
 *
 * // Later promote to admin
 * const admin = await OrganizationMember("developer", {
 *   username: "devuser",
 *   role: "admin",
 * });
 * ```
 */
export const OrganizationMember = Resource(
  "turso::organization-member",
  async function (
    this: Context,
    id: string,
    props: OrganizationMemberProps,
  ): Promise<OrganizationMember> {
    const api = getTursoApi();
    const orgSlug = assertOrganizationSlug();
    const username = props.username;
    const role = props.role || "member";

    // Validate role
    if (role !== "admin" && role !== "member") {
      throw new Error(`Invalid role '${role}'. Must be 'admin' or 'member'`);
    }

    try {
      // Check if member exists
      const existingMember = await api
        .get<TursoMemberResponse>(
          `/v1/organizations/${orgSlug}/members/${username}`,
        )
        .catch(() => null);

      if (existingMember) {
        // Update existing member
        const currentMember = existingMember.member;

        // Can't change owner role
        if (currentMember.role === "owner") {
          throw new Error("Cannot modify the role of the organization owner");
        }

        // Check if role needs updating
        if (currentMember.role !== role) {
          await api.patch<TursoMemberResponse>(
            `/v1/organizations/${orgSlug}/members/${username}`,
            { role },
          );
        }

        // Get updated member
        const updatedMember = await api.get<TursoMemberResponse>(
          `/v1/organizations/${orgSlug}/members/${username}`,
        );

        return {
          type: "turso::organization-member",
          username: updatedMember.member.username,
          role: updatedMember.member.role,
          email: updatedMember.member.email,
        };
      } else {
        // Add new member
        const response = await api.post<TursoMemberResponse>(
          `/v1/organizations/${orgSlug}/members`,
          {
            username,
            role,
          },
        );

        return {
          type: "turso::organization-member",
          username: response.member.username,
          role: response.member.role,
          email: response.member.email,
        };
      }
    } catch (error: any) {
      if (error.statusCode === 404) {
        throw new Error(
          `User '${username}' not found. The user must have a Turso account.`,
        );
      }
      if (error.statusCode === 409) {
        throw new Error(
          `User '${username}' is already a member of the organization`,
        );
      }
      throw error;
    }
  },
);
