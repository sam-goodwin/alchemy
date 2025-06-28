import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { assertOrganizationSlug, getTursoApi } from "./api.ts";

export interface GroupProps {
  /**
   * Array of location codes where databases will be replicated.
   * See available locations at https://docs.turso.tech/api-reference/locations
   */
  locations: string[];

  /**
   * Primary location for the group.
   * Must be one of the locations in the locations array.
   */
  primary?: string;

  /**
   * Prevents accidental deletion of the group.
   * @default false
   */
  delete_protection?: boolean;
}

export interface Group extends Resource<"turso::group"> {
  /**
   * The name of the group.
   */
  groupName: string;

  /**
   * Unique identifier for the group.
   */
  uuid: string;

  /**
   * LibSQL version used by the group.
   */
  version: string;

  /**
   * Array of location codes where databases are replicated.
   */
  locations: string[];

  /**
   * Primary location for the group.
   */
  primary: string;

  /**
   * Whether the group is archived.
   */
  archived: boolean;
}

interface TursoGroupResponse {
  group: {
    uuid: string;
    name: string;
    locations: string[];
    primary: string;
    archived: boolean;
    version: string;
  };
}

interface TursoGroupsResponse {
  groups: Array<{
    uuid: string;
    name: string;
    locations: string[];
    primary: string;
    archived: boolean;
    version: string;
  }>;
}

/**
 * Creates and manages a Turso database group for replication and placement configuration.
 *
 * @example
 * ## Basic Group
 *
 * Create a group with databases in a single region:
 *
 * ```ts
 * const group = await Group("my-group", {
 *   locations: ["iad"],
 * });
 * ```
 *
 * @example
 * ## Multi-Region Group
 *
 * Create a group with databases replicated across multiple regions:
 *
 * ```ts
 * const globalGroup = await Group("global", {
 *   locations: ["iad", "lhr", "syd"],
 *   primary: "iad",
 *   delete_protection: true,
 * });
 * ```
 *
 * @example
 * ## Group with Databases
 *
 * Create a group and use it for database placement:
 *
 * ```ts
 * const productionGroup = await Group("production", {
 *   locations: ["iad", "lhr"],
 *   primary: "iad",
 * });
 *
 * const db = await Database("my-db", {
 *   group: productionGroup,
 * });
 * ```
 */
export const Group = Resource(
  "turso::group",
  async function (
    this: Context,
    id: string,
    props: GroupProps,
  ): Promise<Group> {
    const api = getTursoApi();
    const orgSlug = assertOrganizationSlug();
    const groupName = id;

    // Validate inputs
    if (!props.locations || props.locations.length === 0) {
      throw new Error("At least one location is required");
    }

    if (props.primary && !props.locations.includes(props.primary)) {
      throw new Error(
        `Primary location '${props.primary}' must be in the locations array`,
      );
    }

    try {
      // Check if group exists
      const existingGroup = await api
        .get<TursoGroupResponse>(
          `/v1/organizations/${orgSlug}/groups/${groupName}`,
        )
        .catch(() => null);

      if (existingGroup) {
        // Update existing group
        const currentGroup = existingGroup.group;

        // Check for location changes
        const locationsChanged =
          JSON.stringify([...props.locations].sort()) !==
          JSON.stringify([...currentGroup.locations].sort());

        const primaryChanged =
          props.primary && props.primary !== currentGroup.primary;

        if (locationsChanged || primaryChanged) {
          // Update group configuration
          await api.patch<TursoGroupResponse>(
            `/v1/organizations/${orgSlug}/groups/${groupName}/configuration`,
            {
              locations: props.locations,
              primary: props.primary || props.locations[0],
            },
          );
        }

        // Get updated group
        const updatedGroup = await api.get<TursoGroupResponse>(
          `/v1/organizations/${orgSlug}/groups/${groupName}`,
        );

        return {
          type: "turso::group",
          groupName: updatedGroup.group.name,
          uuid: updatedGroup.group.uuid,
          version: updatedGroup.group.version,
          locations: updatedGroup.group.locations,
          primary: updatedGroup.group.primary,
          archived: updatedGroup.group.archived,
        };
      } else {
        // Create new group
        const response = await api.post<TursoGroupResponse>(
          `/v1/organizations/${orgSlug}/groups`,
          {
            name: groupName,
            location: props.primary || props.locations[0],
            extensions:
              props.locations.length > 1
                ? props.locations.filter(
                    (loc) => loc !== (props.primary || props.locations[0]),
                  )
                : undefined,
          },
        );

        return {
          type: "turso::group",
          groupName: response.group.name,
          uuid: response.group.uuid,
          version: response.group.version,
          locations: response.group.locations,
          primary: response.group.primary,
          archived: response.group.archived,
        };
      }
    } catch (error: any) {
      if (error.statusCode === 409) {
        throw new Error(
          `Group '${groupName}' already exists and cannot be created`,
        );
      }
      throw error;
    }
  },
);
