import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { assertOrganizationSlug, getTursoApi } from "./api.ts";
import type { Group } from "./group.ts";

export interface DatabaseProps {
  /**
   * The group to create the database in.
   * Can be a group name string or a Group resource.
   * @default "default"
   */
  group?: string | Group;

  /**
   * Whether this database is a schema database.
   * Schema databases are used as templates for other databases.
   * @default false
   */
  is_schema?: boolean;

  /**
   * Reference to a schema database for consistent schema management.
   * Can be a database name string or a Database resource.
   */
  schema?: string | Database;

  /**
   * Database size limit (e.g., "1GB", "500MB").
   */
  size_limit?: string;

  /**
   * Seed configuration for initializing the database with data.
   */
  seed?: {
    /**
     * Type of seed source.
     */
    type: "database" | "dump";

    /**
     * For type "database": name of the database to copy from.
     * For type "dump": URL of the dump file.
     */
    value: string;

    /**
     * For type "database": optional timestamp for point-in-time recovery.
     */
    timestamp?: string;
  };
}

export interface Database extends Resource<"turso::database"> {
  /**
   * The name of the database.
   */
  databaseName: string;

  /**
   * Unique database identifier.
   */
  DbId: string;

  /**
   * Database hostname for connections.
   */
  Hostname: string;

  /**
   * The group this database belongs to.
   */
  group: string;

  /**
   * Whether this is a schema database.
   */
  is_schema: boolean;

  /**
   * The schema database this database uses (if any).
   */
  schema?: string;

  /**
   * Database regions.
   */
  regions: string[];

  /**
   * Primary region.
   */
  primaryRegion: string;

  /**
   * Whether the database is sleeping.
   */
  sleeping: boolean;
}

interface TursoDatabaseResponse {
  database: {
    DbId: string;
    Hostname: string;
    Name: string;
    group: string;
    is_schema: boolean;
    schema?: string;
    regions: string[];
    primaryRegion: string;
    sleeping: boolean;
  };
}

/**
 * Creates and manages a Turso SQLite database.
 *
 * @example
 * ## Basic Database
 *
 * Create a database in the default group:
 *
 * ```ts
 * const db = await Database("my-database", {});
 * ```
 *
 * @example
 * ## Database with Custom Group
 *
 * Create a database in a specific group:
 *
 * ```ts
 * const group = await Group("production", {
 *   locations: ["iad", "lhr"],
 * });
 *
 * const db = await Database("app-db", {
 *   group: group,
 *   size_limit: "10GB",
 * });
 * ```
 *
 * @example
 * ## Schema Database Pattern
 *
 * Use schema databases for consistent schema management:
 *
 * ```ts
 * // Create a schema database
 * const schemaDb = await Database("schema", {
 *   is_schema: true,
 * });
 *
 * // Create databases that use the schema
 * const appDb = await Database("app", {
 *   schema: schemaDb,
 * });
 *
 * const testDb = await Database("test", {
 *   schema: schemaDb,
 * });
 * ```
 *
 * @example
 * ## Database with Seed Data
 *
 * Initialize a database with data from another database:
 *
 * ```ts
 * const prodDb = await Database("production", {
 *   seed: {
 *     type: "database",
 *     value: "staging-db",
 *     timestamp: "2024-01-01T00:00:00Z",
 *   },
 * });
 * ```
 */
export const Database = Resource(
  "turso::database",
  async function (
    this: Context,
    id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const api = getTursoApi();
    const orgSlug = assertOrganizationSlug();
    const databaseName = id;

    // Resolve group name
    const groupName =
      typeof props.group === "string"
        ? props.group
        : props.group?.groupName || "default";

    // Resolve schema name
    const schemaName =
      typeof props.schema === "string"
        ? props.schema
        : props.schema?.databaseName;

    try {
      // Check if database exists
      const existingDb = await api
        .get<TursoDatabaseResponse>(
          `/v1/organizations/${orgSlug}/databases/${databaseName}`,
        )
        .catch(() => null);

      if (existingDb) {
        // Update existing database
        const currentDb = existingDb.database;

        // Validate immutable properties
        if (currentDb.group !== groupName) {
          throw new Error(
            `Cannot change database group from '${currentDb.group}' to '${groupName}'. Group is immutable after creation.`,
          );
        }

        if (currentDb.is_schema !== (props.is_schema || false)) {
          throw new Error(
            "Cannot change is_schema property. This is immutable after creation.",
          );
        }

        // Check if configuration needs updating
        const needsUpdate =
          (props.size_limit && props.size_limit !== currentDb.size_limit) ||
          (schemaName && schemaName !== currentDb.schema);

        if (needsUpdate) {
          await api.patch<TursoDatabaseResponse>(
            `/v1/organizations/${orgSlug}/databases/${databaseName}/configuration`,
            {
              size_limit: props.size_limit,
              schema_name: schemaName,
            },
          );
        }

        // Get updated database
        const updatedDb = await api.get<TursoDatabaseResponse>(
          `/v1/organizations/${orgSlug}/databases/${databaseName}`,
        );

        return {
          type: "turso::database",
          databaseName: updatedDb.database.Name,
          DbId: updatedDb.database.DbId,
          Hostname: updatedDb.database.Hostname,
          group: updatedDb.database.group,
          is_schema: updatedDb.database.is_schema,
          schema: updatedDb.database.schema,
          regions: updatedDb.database.regions,
          primaryRegion: updatedDb.database.primaryRegion,
          sleeping: updatedDb.database.sleeping,
        };
      } else {
        // Create new database
        const createPayload: any = {
          name: databaseName,
          group: groupName,
          is_schema: props.is_schema,
          size_limit: props.size_limit,
        };

        if (schemaName) {
          createPayload.schema = schemaName;
        }

        if (props.seed) {
          createPayload.seed = props.seed;
        }

        const response = await api.post<TursoDatabaseResponse>(
          `/v1/organizations/${orgSlug}/databases`,
          createPayload,
        );

        return {
          type: "turso::database",
          databaseName: response.database.Name,
          DbId: response.database.DbId,
          Hostname: response.database.Hostname,
          group: response.database.group,
          is_schema: response.database.is_schema,
          schema: response.database.schema,
          regions: response.database.regions,
          primaryRegion: response.database.primaryRegion,
          sleeping: response.database.sleeping,
        };
      }
    } catch (error: any) {
      if (error.statusCode === 409) {
        throw new Error(`Database '${databaseName}' already exists`);
      }
      throw error;
    }
  },
);
