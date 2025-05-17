import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { SentryApi } from "./api.js";

/**
 * Properties for creating or updating a Team
 */
export interface TeamProps {
  /**
   * The name for the team
   */
  name: string;

  /**
   * Uniquely identifies a team and is used for the interface
   */
  slug?: string;

  /**
   * The organization ID or slug that owns the team
   */
  organization: string;

  /**
   * Whether to adopt an existing team with the same slug if it exists
   * If true and a team with the same slug exists, it will be adopted rather than creating a new one
   *
   * @default false
   */
  adopt?: boolean;
}

/**
 * Output returned after Team creation/update
 */
export interface Team extends Resource<"sentry::Team">, TeamProps {
  /**
   * The ID of the team
   */
  id: string;

  /**
   * Time at which the team was created
   */
  dateCreated: string;

  /**
   * Whether the current user is a member of the team
   */
  isMember: boolean;

  /**
   * The role of the current user in the team
   */
  teamRole: string;

  /**
   * Team flags
   */
  flags: {
    "idp:provisioned": boolean;
  };

  /**
   * Access permissions for the team
   */
  access: string[];

  /**
   * Whether the current user has access to the team
   */
  hasAccess: boolean;

  /**
   * Whether the team membership is pending
   */
  isPending: boolean;

  /**
   * Number of members in the team
   */
  memberCount: number;

  /**
   * Team avatar information
   */
  avatar: {
    avatarType: string;
    avatarUuid: string | null;
  };
}

/**
 * Create and manage Sentry teams
 *
 * @example
 * // Create a new team:
 * const team = await Team("my-team", {
 *   name: "My Team",
 *   slug: "my-team"
 * });
 */
export const Team = Resource(
  "sentry::Team",
  async function (
    this: Context<Team>,
    id: string,
    props: TeamProps,
  ): Promise<Team> {
    const api = new SentryApi();

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          const response = await api.delete(
            `/teams/${props.organization}/${this.output.slug || this.output.id}/`,
          );
          if (!response.ok && response.status !== 404) {
            console.error("Error deleting team:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error deleting team:", error);
      }
      return this.destroy();
    } else {
      try {
        let response;

        if (this.phase === "update" && this.output?.id) {
          response = await api.put(
            `/teams/${props.organization}/${this.output.slug || this.output.id}/`,
            props,
          );
        } else {
          try {
            response = await api.post(
              `/organizations/${props.organization}/teams/`,
              props,
            );
          } catch (error) {
            // Check if this is a "team already exists" error and adopt is enabled
            if (
              props.adopt &&
              error instanceof Error &&
              error.message.includes("already exists")
            ) {
              console.log(
                `Team '${props.slug || props.name}' already exists, adopting it`,
              );
              // Find the existing team by slug
              const existingTeam = await findTeamBySlug(
                api,
                props.organization,
                props.slug || props.name,
              );
              if (!existingTeam) {
                throw new Error(
                  `Failed to find existing team '${props.slug || props.name}' for adoption`,
                );
              }
              response = await api.get(
                `/organizations/${props.organization}/teams/${existingTeam.slug}/`,
              );
            } else {
              throw error;
            }
          }
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = (await response.json()) as Omit<Team, keyof TeamProps>;
        return this({
          ...props,
          id: data.id,
          dateCreated: data.dateCreated,
          isMember: data.isMember,
          teamRole: data.teamRole,
          flags: data.flags,
          access: data.access,
          hasAccess: data.hasAccess,
          isPending: data.isPending,
          memberCount: data.memberCount,
          avatar: data.avatar,
        });
      } catch (error) {
        console.error("Error creating/updating team:", error);
        throw error;
      }
    }
  },
);

/**
 * Find a team by slug
 */
async function findTeamBySlug(
  api: SentryApi,
  organization: string,
  slug: string,
): Promise<{ id: string; slug: string } | null> {
  const response = await api.get(`/teams/${organization}/${slug}/`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const teams = (await response.json()) as Array<{ id: string; slug: string }>;
  const team = teams.find((t) => t.slug === slug);
  return team ? { id: team.id, slug: team.slug } : null;
}
