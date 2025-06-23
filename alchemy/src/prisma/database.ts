import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { alchemy } from "../alchemy.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createPrismaApi, type PrismaApiOptions } from "./api.ts";
import type { Project } from "./project.ts";

/**
 * Properties for creating or updating a Prisma database
 */
export interface DatabaseProps extends PrismaApiOptions {
  /**
   * The project that this database belongs to
   */
  project: string | Project;

  /**
   * Name of the database
   */
  name: string;

  /**
   * Region where the database will be deployed
   * @default "us-east-1"
   */
  region?:
    | "us-east-1"
    | "us-west-1"
    | "eu-west-3"
    | "ap-northeast-1"
    | "ap-southeast-1";

  /**
   * Whether this is the default database for the project
   * @default false
   */
  isDefault?: boolean;
}

/**
 * A Prisma database connection/API key
 */
export interface DatabaseConnection {
  /**
   * Connection ID
   */
  id: string;

  /**
   * Connection name
   */
  name: string;

  /**
   * Time at which the connection was created
   */
  createdAt: string;

  /**
   * Database connection string
   */
  connectionString: Secret;
}

/**
 * Output returned after Prisma database creation/update
 */
export interface Database extends Resource<"prisma::Database"> {
  /**
   * The ID of the database
   */
  id: string;

  /**
   * The ID of the project this database belongs to
   */
  projectId: string;

  /**
   * Name of the database
   */
  name: string;

  /**
   * Region where the database is deployed
   */
  region: string | null;

  /**
   * Whether this is the default database for the project
   */
  isDefault: boolean;

  /**
   * Database connection string (only available during creation)
   */
  connectionString?: Secret;

  /**
   * Database status
   */
  status?: string;

  /**
   * API keys/connections for this database
   */
  apiKeys?: DatabaseConnection[];

  /**
   * Time at which the database was created
   */
  createdAt: string;
}

/**
 * Creates a Prisma database within a project for data storage and management.
 *
 * @example
 * ## Create a basic database
 *
 * ```ts
 * const database = await Database("my-database", {
 *   project: project,
 *   name: "my-app-db",
 *   region: "us-east-1"
 * });
 * ```
 *
 * @example
 * ## Create a default database
 *
 * ```ts
 * const database = await Database("default-db", {
 *   project: "project-123",
 *   name: "production",
 *   region: "us-east-1",
 *   isDefault: true
 * });
 * ```
 *
 * @example
 * ## Create database with custom region
 *
 * ```ts
 * const database = await Database("eu-database", {
 *   project: project,
 *   name: "eu-production",
 *   region: "eu-west-3"
 * });
 * ```
 */
export const Database = Resource(
  "prisma::Database",
  async function (
    this: Context<Database>,
    id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const api = createPrismaApi(props);
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const databaseId = this.output?.id;

    if (this.phase === "delete") {
      try {
        if (databaseId) {
          await deleteDatabase(api, projectId, databaseId, id);
        }
      } catch (error) {
        logger.error(`Error deleting Prisma database ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let database: {
        id: string;
        name: string;
        region: string | null;
        isDefault: boolean;
        connectionString?: string;
        status?: string;
        apiKeys?: any[];
        createdAt: string;
      };

      if (this.phase === "update" && databaseId) {
        // For databases, we can't update most properties as they're immutable
        // Just return the current state
        database = await getDatabase(api, projectId, databaseId, id);
      } else {
        // Check if database already exists
        if (databaseId) {
          database = await getDatabaseOrCreate(
            api,
            projectId,
            databaseId,
            props,
            id,
          );
        } else {
          // No output ID, create new database
          database = await createNewDatabase(api, projectId, props);
        }
      }

      return this({
        id: database.id,
        projectId: projectId,
        name: database.name,
        region: database.region,
        isDefault: database.isDefault,
        connectionString: database.connectionString
          ? alchemy.secret(database.connectionString)
          : undefined,
        status: database.status,
        apiKeys: database.apiKeys?.map((key: any) => ({
          ...key,
          connectionString: alchemy.secret(key.connectionString),
        })),
        createdAt: database.createdAt,
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Prisma database '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to delete a Prisma database
 */
async function deleteDatabase(
  api: any,
  projectId: string,
  databaseId: string,
  resourceId: string,
): Promise<void> {
  const deleteResponse = await api.delete(
    `/projects/${projectId}/databases/${databaseId}`,
  );
  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    await handleApiError(deleteResponse, "delete", "database", resourceId);
  }
}

/**
 * Helper function to get a Prisma database
 */
async function getDatabase(
  api: any,
  projectId: string,
  databaseId: string,
  resourceId: string,
): Promise<any> {
  const getResponse = await api.get(
    `/projects/${projectId}/databases/${databaseId}`,
  );
  if (!getResponse.ok) {
    await handleApiError(getResponse, "get", "database", resourceId);
  }
  return await getResponse.json();
}

/**
 * Helper function to get a database or create it if it doesn't exist
 */
async function getDatabaseOrCreate(
  api: any,
  projectId: string,
  databaseId: string,
  props: DatabaseProps,
  resourceId: string,
): Promise<any> {
  const getResponse = await api.get(
    `/projects/${projectId}/databases/${databaseId}`,
  );
  if (getResponse.ok) {
    return await getResponse.json();
  } else if (getResponse.status !== 404) {
    await handleApiError(getResponse, "get", "database", resourceId);
  } else {
    // Database doesn't exist, create new
    return await createNewDatabase(api, projectId, props);
  }
}

/**
 * Helper function to create a new Prisma database
 */
async function createNewDatabase(
  api: any,
  projectId: string,
  props: DatabaseProps,
): Promise<any> {
  const databaseResponse = await api.post(`/projects/${projectId}/databases`, {
    name: props.name,
    region: props.region || "us-east-1",
    isDefault: props.isDefault || false,
  });

  if (!databaseResponse.ok) {
    await handleApiError(databaseResponse, "create", "database");
  }

  return await databaseResponse.json();
}
