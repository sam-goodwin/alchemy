import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { assertOrganizationSlug, getTursoApi } from "./api.ts";

export interface OrganizationInviteProps {
  /**
   * The email address to send the invitation to.
   */
  email: string;

  /**
   * The role to assign when the invitation is accepted.
   * @default "member"
   */
  role?: "admin" | "member";
}

export interface OrganizationInvite
  extends Resource<"turso::organization-invite"> {
  /**
   * The email address the invitation was sent to.
   */
  email: string;

  /**
   * The role that will be assigned when accepted.
   */
  role: "admin" | "member";

  /**
   * When the invitation expires.
   */
  expires_at: string;
}

interface TursoInviteResponse {
  invited: {
    email: string;
    role: "admin" | "member";
    expires_at: string;
  };
}

interface TursoInvitesResponse {
  invites: Array<{
    email: string;
    role: "admin" | "member";
    expires_at: string;
  }>;
}

/**
 * Manages invitations to join a Turso organization.
 *
 * @example
 * ## Basic Invitation
 *
 * Invite a new member with default permissions:
 *
 * ```ts
 * const invite = await OrganizationInvite("john-invite", {
 *   email: "john@example.com",
 * });
 * ```
 *
 * @example
 * ## Admin Invitation
 *
 * Invite someone as an admin:
 *
 * ```ts
 * const adminInvite = await OrganizationInvite("admin-invite", {
 *   email: "admin@example.com",
 *   role: "admin",
 * });
 * ```
 *
 * @example
 * ## Batch Invitations
 *
 * Send multiple invitations:
 *
 * ```ts
 * const teamInvites = await Promise.all([
 *   OrganizationInvite("dev1", {
 *     email: "dev1@example.com",
 *     role: "member",
 *   }),
 *   OrganizationInvite("dev2", {
 *     email: "dev2@example.com",
 *     role: "member",
 *   }),
 *   OrganizationInvite("lead", {
 *     email: "lead@example.com",
 *     role: "admin",
 *   }),
 * ]);
 * ```
 */
export const OrganizationInvite = Resource(
  "turso::organization-invite",
  async function (
    this: Context,
    id: string,
    props: OrganizationInviteProps,
  ): Promise<OrganizationInvite> {
    const api = getTursoApi();
    const orgSlug = assertOrganizationSlug();
    const email = props.email;
    const role = props.role || "member";

    // Validate email
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address");
    }

    // Validate role
    if (role !== "admin" && role !== "member") {
      throw new Error(`Invalid role '${role}'. Must be 'admin' or 'member'`);
    }

    try {
      // Check if invite exists
      const existingInvites = await api.get<TursoInvitesResponse>(
        `/v1/organizations/${orgSlug}/invites`,
      );

      const existingInvite = existingInvites.invites.find(
        (invite) => invite.email === email,
      );

      if (existingInvite) {
        // Can't update invites, so if role is different, we need to delete and recreate
        if (existingInvite.role !== role) {
          // Delete existing invite
          await api.delete(`/v1/organizations/${orgSlug}/invites/${email}`);

          // Create new invite with updated role
          const response = await api.post<TursoInviteResponse>(
            `/v1/organizations/${orgSlug}/invites`,
            {
              email,
              role,
            },
          );

          return {
            type: "turso::organization-invite",
            email: response.invited.email,
            role: response.invited.role,
            expires_at: response.invited.expires_at,
          };
        } else {
          // Invite exists with same role, return it
          return {
            type: "turso::organization-invite",
            email: existingInvite.email,
            role: existingInvite.role,
            expires_at: existingInvite.expires_at,
          };
        }
      } else {
        // Create new invite
        const response = await api.post<TursoInviteResponse>(
          `/v1/organizations/${orgSlug}/invites`,
          {
            email,
            role,
          },
        );

        return {
          type: "turso::organization-invite",
          email: response.invited.email,
          role: response.invited.role,
          expires_at: response.invited.expires_at,
        };
      }
    } catch (error: any) {
      if (error.statusCode === 409) {
        throw new Error(
          `User with email '${email}' is already a member of the organization`,
        );
      }
      throw error;
    }
  },
);
