import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { PlanetScaleClient, type PlanetScaleProps } from "./api/client.gen.ts";
import type { Branch } from "./branch.ts";
import type { Database } from "./database.ts";
import { waitForBranchReady } from "./utils.ts";

/**
 * Properties for creating or updating a PlanetScale PostgreSQL Role
 */
export interface RoleProps extends PlanetScaleProps {
  /**
   * The organization ID where the role will be created
   * Required when using string database name, optional when using Database resource
   */
  organizationId?: string;

  /**
   * The database where the role will be created
   * Can be either a database name (string) or Database resource
   */
  database: string | Database;

  /**
   * The branch where the role will be created
   * Can be either a branch name (string) or Branch resource
   * @default "main"
   */
  branch?: string | Branch;

  /**
   * Time to live in seconds
   */
  ttl?: number;

  /**
   * Roles to inherit from
   */
  inheritedRoles?: Array<
    | "pg_checkpoint"
    | "pg_create_subscription"
    | "pg_maintain"
    | "pg_monitor"
    | "pg_read_all_data"
    | "pg_read_all_settings"
    | "pg_read_all_stats"
    | "pg_signal_backend"
    | "pg_stat_scan_tables"
    | "pg_use_reserved_connections"
    | "pg_write_all_data"
    | "postgres"
  >;
}

export interface Role extends Resource<"planetscale::Role">, RoleProps {
  /**
   * The unique identifier for the role
   */
  id: string;

  /**
   * The name of the role
   */
  name: string;

  /**
   * The timestamp when the role expires (ISO 8601 format)
   */
  expiresAt: string;

  /**
   * The host URL for database connection
   */
  host: string;

  /**
   * The username for database authentication
   */
  username: string;

  /**
   * The encrypted password for database authentication
   */
  password: Secret<string>;

  /**
   * The database name
   */
  databaseName: string;

  /**
   * The direct connection URL for the database.
   */
  connectionUrl: Secret<string>;

  /**
   * The pooled connection URL for the database.
   * Uses PSBouncer on port 6432. Recommended for production.
   * @see https://planetscale.com/docs/postgres/connecting/psbouncer
   */
  connectionUrlPooled: Secret<string>;
}

/**
 * Create and manage database roles for PlanetScale PostgreSQL branches. Database roles provide secure access to your database with specific roles and permissions.
 *
 * For MySQL, use [Passwords](./password.ts) instead.
 *
 * @example
 * ## Basic Role
 *
 * Create a default role with all permissions:
 *
 * ```ts
 * const role = await Role("my-role", {
 *   database: "my-database",
 *   inheritedRoles: ["postgres"],
 * });
 * ```
 *
 * ## Role with TTL
 *
 * Create a role with a TTL of 1 hour:
 *
 * ```ts
 * const role = await Role("my-role", {
 *   database: "my-database",
 *   ttl: 3600,
 * });
 * ```
 *
 * ## Role with Inherited Permissions
 *
 * Create a role with read-only access to all data and settings:
 *
 * ```ts
 * const role = await Role("my-role", {
 *   database: "my-database",
 *   inheritedRoles: ["pg_read_all_data", "pg_read_all_settings"],
 * });
 * ```
 */
export const Role = Resource(
  "planetscale::Role",
  async function (
    this: Context<Role, RoleProps>,
    _id: string,
    props: RoleProps,
  ): Promise<Role> {
    const api = new PlanetScaleClient(props);
    const organization =
      typeof props.branch === "object"
        ? props.branch.organizationId
        : typeof props.database === "object"
          ? props.database.organizationId
          : props.organizationId;
    const database =
      typeof props.database === "string" ? props.database : props.database.name;
    const branch =
      typeof props.branch === "string"
        ? props.branch
        : (props.branch?.name ?? "main");
    if (!organization) {
      throw new Error("Organization ID is required");
    }

    switch (this.phase) {
      case "delete": {
        if (this.output?.id) {
          const res = await api.organizations.databases.branches.roles.delete({
            path: {
              organization,
              database,
              branch,
              id: this.output.id,
            },
            result: "full",
          });
          // TODO: (422 unprocessable): Role is still referenced and cannot be dropped
          if (res.error && res.error.status !== 404) {
            throw new Error("Failed to delete role", { cause: res.error });
          }
        }
        return this.destroy();
      }
      case "create": {
        const { kind, ready } = await api.organizations.databases.branches.get({
          path: {
            organization,
            database,
            name: branch,
          },
        });
        if (kind !== "postgresql") {
          throw new Error(
            `Cannot create a role on MySQL database "${database}". Roles are only supported on PostgreSQL databases. For MySQL databases, please use the Password resource instead.`,
          );
        }
        // Cannot create role until branch is ready
        if (!ready) {
          await waitForBranchReady(api, organization, database, branch);
        }
        const role = await api.organizations.databases.branches.roles.post({
          path: {
            organization,
            database,
            branch,
          },
          body: {
            ttl: props.ttl,
            inherited_roles: props.inheritedRoles,
          },
        });
        return this({
          ...props,
          id: role.id,
          name: role.name,
          host: role.access_host_url,
          username: role.username,
          password: alchemy.secret(role.password),
          expiresAt: role.expires_at,
          databaseName: role.database_name,
          connectionUrl: alchemy.secret(
            `postgresql://${role.username}:${role.password}@${role.access_host_url}:5432/${role.database_name}?sslmode=verify-full`,
          ),
          connectionUrlPooled: alchemy.secret(
            `postgresql://${role.username}:${role.password}@${role.access_host_url}:6432/${role.database_name}?sslmode=verify-full`,
          ),
        });
      }
      case "update": {
        // According to the types, the only property that can be updated is the name.
        // However, I was getting 500 errors when trying to update the name, so we'll just replace.
        return this.replace();
      }
    }
  },
);
