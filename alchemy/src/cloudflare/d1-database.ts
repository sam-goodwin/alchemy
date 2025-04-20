import type { Context } from "../context";
import { Resource } from "../resource";
import {
  CloudflareApi,
  createCloudflareApi,
  type CloudflareApiOptions,
} from "./api";
import { CloudflareApiError, handleApiError } from "./api-error";
import { applyMigrations, listMigrationsFiles } from "./d1-migrations";

/**
 * Properties for creating or updating a D1 Database
 */
export interface D1DatabaseProps extends CloudflareApiOptions {
  /**
   * Name of the database
   */
  name: string;

  /**
   * Optional primary location hint for the database
   * Indicates the primary geographical location data will be stored
   */
  primaryLocationHint?:
    | "wnam"
    | "enam"
    | "weur"
    | "eeur"
    | "apac"
    | "auto"
    | string;

  /**
   * Read replication configuration
   * Only mutable property during updates
   */
  readReplication?: {
    /**
     * Read replication mode
     * - auto: Automatic read replication
     * - disabled: No read replication
     */
    mode: "auto" | "disabled";
  };

  /**
   * Whether to delete the database.
   * If set to false, the database will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;

  /**
   * Whether to adopt an existing database with the same name if it exists
   * If true and a database with the same name exists, it will be adopted rather than creating a new one
   *
   * @default false
   */
  adopt?: boolean;

  /**
   * These files will be generated internally with the D1Database wrapper function when migrationsDir is specified
   *
   * @private
   */
  migrationsFiles?: Array<{ id: string; sql: string }>;

  /**
   * Name of the table used to track migrations. Only used if migrationsDir is specified. Defaults to 'd1_migrations'
   * This is analogous to wrangler's `migrations_table`.
   */
  migrationsTable?: string;

  /**
   * Directory containing migration SQL files. If not set, no migrations will be applied.
   * This is analogous to wrangler's `migrations_dir`.
   */
  migrationsDir?: string;
}

/**
 * Output returned after D1 Database creation/update
 */
export interface D1Database
  extends Resource<"cloudflare::D1Database">,
    D1DatabaseProps {
  type: "d1";
  /**
   * The unique ID of the database (UUID)
   */
  id: string;

  /**
   * File size of the database
   */
  fileSize: number;

  /**
   * Number of tables in the database
   */
  numTables: number;

  /**
   * Version of the database
   */
  version: string;

  /**
   * Read replication configuration
   */
  readReplication?: {
    /**
     * Read replication mode
     */
    mode: "auto" | "disabled";
  };
}

export async function D1Database(
  id: string,
  props: Omit<D1DatabaseProps, "migrationsFiles">
) {
  const migrationsFiles = props.migrationsDir
    ? await listMigrationsFiles(props.migrationsDir)
    : [];

  return D1DatabaseResource(id, {
    ...props,
    migrationsFiles,
  });
}

/**
 * Creates and manages Cloudflare D1 Databases.
 *
 * D1 Databases provide serverless SQL databases built on SQLite with
 * automatic data replication for high availability.
 *
 * @example
 * // Create a basic D1 database with default settings
 * const basicDatabase = await D1Database("my-app-db", {
 *   name: "my-app-db"
 * });
 *
 * @example
 * // Create a database with location hint for optimal performance
 * const westUsDatabase = await D1Database("west-us-db", {
 *   name: "west-us-db",
 *   primaryLocationHint: "wnam"
 * });
 *
 * @example
 * // Adopt an existing database if it already exists instead of failing
 * const existingDb = await D1Database("existing-db", {
 *   name: "existing-db",
 *   adopt: true,
 *   readReplication: {
 *     mode: "auto"
 *   }
 * });
 *
 * @example
 * // Create a database with migrations
 * const dbWithMigrations = await D1Database("mydb", {
 *   name: "mydb",
 *   migrationsDir: "./migrations",
 * });
 *
 * @see https://developers.cloudflare.com/d1/
 */
export const D1DatabaseResource = Resource(
  "cloudflare::D1Database",
  async function (
    this: Context<D1Database>,
    id: string,
    props: D1DatabaseProps
  ): Promise<D1Database> {
    const api = await createCloudflareApi(props);
    const databaseName = props.name || id;

    if (this.phase === "delete") {
      console.log("Deleting D1 database:", databaseName);
      if (props.delete !== false) {
        // Delete D1 database
        console.log("Deleting D1 database:", databaseName);
        await deleteDatabase(api, this.output?.id);
      }

      // Return void (a deleted database has no content)
      return this.destroy();
    } else {
      let dbData: CloudflareD1Response;

      if (this.phase === "create") {
        console.log("Creating D1 database:", databaseName);
        try {
          dbData = await createDatabase(api, databaseName, props);
        } catch (error) {
          // Check if this is a "database already exists" error and adopt is enabled
          if (
            props.adopt &&
            error instanceof CloudflareApiError &&
            error.message.includes("already exists")
          ) {
            console.log(`Database ${databaseName} already exists, adopting it`);
            // Find the existing database by name
            const databases = await listDatabases(api, databaseName);
            const existingDb = databases.find((db) => db.name === databaseName);

            if (!existingDb) {
              throw new Error(
                `Failed to find existing database '${databaseName}' for adoption`
              );
            }

            // Get the database details using its ID
            dbData = await getDatabase(api, existingDb.id);

            // Update the database with the provided properties
            if (props.readReplication) {
              console.log(
                `Updating adopted database ${databaseName} with new properties`
              );
              dbData = await updateDatabase(api, existingDb.id, props);
            }
          } else {
            // Re-throw the error if adopt is false or it's not a "database already exists" error
            throw error;
          }
        }
      } else {
        // Update operation
        if (this.output?.id) {
          console.log("Updating D1 database:", databaseName);
          // Update the database with new properties
          dbData = await updateDatabase(api, this.output.id, props);
        } else {
          // If no ID exists, fall back to creating a new database
          console.log(
            "No existing database ID found, creating new D1 database:",
            databaseName
          );
          dbData = await createDatabase(api, databaseName, props);
        }
      }

      // Run migrations if provided
      if (props.migrationsFiles && props.migrationsFiles.length > 0) {
        try {
          const migrationsTable = props.migrationsTable || "d1_migrations";
          const databaseId = dbData.result.uuid || this.output?.id;

          if (!databaseId) {
            throw new Error("Database ID not found for migrations");
          }

          await applyMigrations({
            migrationsFiles: props.migrationsFiles,
            migrationsTable,
            accountId: api.accountId,
            databaseId,
            api,
          });
        } catch (migrationErr) {
          console.error("Failed to apply D1 migrations:", migrationErr);
          throw migrationErr;
        }
      }

      return this({
        type: "d1",
        id: dbData.result.uuid || "",
        name: databaseName,
        fileSize: dbData.result.file_size,
        numTables: dbData.result.num_tables,
        version: dbData.result.version,
        readReplication: dbData.result.read_replication,
        primaryLocationHint: props.primaryLocationHint,
        accountId: api.accountId,
      });
    }
  }
);

interface CloudflareD1Response {
  result: {
    uuid?: string;
    name: string;
    file_size: number;
    num_tables: number;
    version: string;
    primary_location_hint?: string;
    read_replication?: {
      mode: "auto" | "disabled";
    };
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Create a new D1 database
 */
export async function createDatabase(
  api: CloudflareApi,
  databaseName: string,
  props: D1DatabaseProps
): Promise<CloudflareD1Response> {
  // Create new D1 database
  const createPayload: any = {
    name: databaseName,
  };

  if (props.primaryLocationHint) {
    createPayload.primary_location_hint = props.primaryLocationHint;
  }

  const createResponse = await api.post(
    `/accounts/${api.accountId}/d1/database`,
    createPayload
  );

  if (!createResponse.ok) {
    return await handleApiError(
      createResponse,
      "creating",
      "D1 database",
      databaseName
    );
  }

  return (await createResponse.json()) as CloudflareD1Response;
}

/**
 * Get a D1 database
 */
export async function getDatabase(
  api: CloudflareApi,
  databaseId?: string
): Promise<CloudflareD1Response> {
  if (!databaseId) {
    throw new Error("Database ID is required");
  }

  const response = await api.get(
    `/accounts/${api.accountId}/d1/database/${databaseId}`
  );

  if (!response.ok) {
    return await handleApiError(response, "getting", "D1 database", databaseId);
  }

  return (await response.json()) as CloudflareD1Response;
}

/**
 * Delete a D1 database
 */
export async function deleteDatabase(
  api: CloudflareApi,
  databaseId?: string
): Promise<void> {
  if (!databaseId) {
    console.log("No database ID provided, skipping delete");
    return;
  }

  // Delete D1 database
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/d1/database/${databaseId}`
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));
    throw new CloudflareApiError(
      `Error deleting D1 database '${databaseId}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse
    );
  }
}

/**
 * List all D1 databases in an account
 */
export async function listDatabases(
  api: CloudflareApi,
  name?: string
): Promise<{ name: string; id: string }[]> {
  // Construct query string if name is provided
  const queryParams = name ? `?name=${encodeURIComponent(name)}` : "";

  const response = await api.get(
    `/accounts/${api.accountId}/d1/database${queryParams}`
  );

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list databases: ${response.statusText}`,
      response
    );
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    result?: Array<{
      name: string;
      uuid: string;
    }>;
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list databases: ${errorMessage}`);
  }

  // Transform API response
  return (data.result || []).map((db) => ({
    name: db.name,
    id: db.uuid,
  }));
}

/**
 * Update a D1 database
 *
 * Note: According to Cloudflare API, only read_replication.mode can be modified during updates.
 */
export async function updateDatabase(
  api: CloudflareApi,
  databaseId: string,
  props: D1DatabaseProps
): Promise<CloudflareD1Response> {
  // Get current database state to check for non-mutable changes
  const currentDB = await getDatabase(api, databaseId);

  // Only read_replication can be modified in update
  if (
    props.primaryLocationHint &&
    props.primaryLocationHint !== currentDB.result.primary_location_hint
  ) {
    throw new Error(
      "Cannot update primaryLocationHint after database creation. Only readReplication.mode can be modified."
    );
  }

  const updatePayload: any = {};

  // Only include read_replication in update payload
  if (props.readReplication) {
    updatePayload.read_replication = {
      mode: props.readReplication.mode,
    };
  }

  const updateResponse = await api.patch(
    `/accounts/${api.accountId}/d1/database/${databaseId}`,
    updatePayload
  );

  if (!updateResponse.ok) {
    return await handleApiError(
      updateResponse,
      "updating",
      "D1 database",
      databaseId
    );
  }

  return (await updateResponse.json()) as CloudflareD1Response;
}
