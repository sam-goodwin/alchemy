import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { type Secret, secret } from "../secret.ts";
import { createRailwayApi, type RailwayApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Environment } from "./environment.ts";

export interface DatabaseProps {
  /**
   * The name of the database
   */
  name: string;

  /**
   * The project this database belongs to. Can be a Project resource or project ID string
   */
  project: string | Project;

  /**
   * The environment this database belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * The type of database to create
   */
  type: "postgresql" | "mysql" | "redis" | "mongodb";

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Database
  extends Resource<"railway::Database">,
    Omit<DatabaseProps, "project" | "environment"> {
  /**
   * The unique identifier of the database
   */
  id: string;

  /**
   * The ID of the project this database belongs to
   */
  projectId: string;

  /**
   * The ID of the environment this database belongs to
   */
  environmentId: string;

  /**
   * The connection string for the database
   */
  connectionString: Secret;

  /**
   * The hostname of the database
   */
  host: string;

  /**
   * The port number of the database
   */
  port: number;

  /**
   * The username for database authentication
   */
  username: string;

  /**
   * The password for database authentication
   */
  password: Secret;

  /**
   * The name of the database
   */
  databaseName: string;

  /**
   * The timestamp when the database was created
   */
  createdAt: string;

  /**
   * The timestamp when the database was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const DATABASE_CREATE_MUTATION = `
  mutation DatabaseCreate($input: DatabaseCreateInput!) {
    databaseCreate(input: $input) {
      id
      name
      projectId
      environmentId
      type
      connectionString
      host
      port
      username
      password
      databaseName
      createdAt
      updatedAt
    }
  }
`;

const DATABASE_QUERY = `
  query Database($id: String!) {
    database(id: $id) {
      id
      name
      projectId
      environmentId
      type
      connectionString
      host
      port
      username
      password
      databaseName
      createdAt
      updatedAt
    }
  }
`;

const DATABASE_DELETE_MUTATION = `
  mutation DatabaseDelete($id: String!) {
    databaseDelete(id: $id)
  }
`;

/**
 * Create and manage Railway databases
 *
 * @example
 * ```typescript
 * // Create a PostgreSQL database for your application
 * const postgres = await Database("main-db", {
 *   name: "production-database",
 *   project: project,
 *   environment: environment,
 *   type: "postgresql",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a Redis cache for session storage
 * const redis = await Database("session-cache", {
 *   name: "user-sessions",
 *   project: "project-id-string",
 *   environment: "environment-id-string",
 *   type: "redis",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a MongoDB database for document storage
 * const mongo = await Database("document-store", {
 *   name: "content-database",
 *   project: project,
 *   environment: environment,
 *   type: "mongodb",
 * });
 * ```
 */
export const Database = Resource(
  "railway::Database",
  async function (
    this: Context<Database>,
    _id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      if (this.output?.id) {
        await deleteDatabase(api, this.output.id);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const database = await getDatabase(api, this.output.id);

      return this({
        id: database.id,
        name: database.name,
        projectId: database.projectId,
        environmentId: database.environmentId,
        type: database.type,
        connectionString: secret(database.connectionString),
        host: database.host,
        port: database.port,
        username: database.username,
        password: secret(database.password),
        databaseName: database.databaseName,
        createdAt: database.createdAt,
        updatedAt: database.updatedAt,
      });
    }

    const database = await createDatabase(api, props);

    return this({
      id: database.id,
      name: database.name,
      projectId: database.projectId,
      environmentId: database.environmentId,
      type: database.type,
      connectionString: secret(database.connectionString),
      host: database.host,
      port: database.port,
      username: database.username,
      password: secret(database.password),
      databaseName: database.databaseName,
      createdAt: database.createdAt,
      updatedAt: database.updatedAt,
    });
  },
);

export async function createDatabase(api: RailwayApi, props: DatabaseProps) {
  const projectId =
    typeof props.project === "string" ? props.project : props.project.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  const response = await api.mutate(DATABASE_CREATE_MUTATION, {
    input: {
      name: props.name,
      projectId: projectId,
      environmentId: environmentId,
      type: props.type,
    },
  });

  const database = response.data?.databaseCreate;
  if (!database) {
    throw new Error("Failed to create Railway database");
  }

  return database;
}

export async function getDatabase(api: RailwayApi, id: string) {
  const response = await api.query(DATABASE_QUERY, { id });

  const database = response.data?.database;
  if (!database) {
    throw new Error("Failed to fetch Railway database");
  }

  return database;
}

export async function deleteDatabase(api: RailwayApi, id: string) {
  await api.mutate(DATABASE_DELETE_MUTATION, { id });
}
