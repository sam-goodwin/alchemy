import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions, type NeonApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Branch } from "./branch.ts";

/**
 * Properties for creating or updating a Neon database
 */
export interface DatabaseProps extends NeonApiOptions {
  /**
   * The project containing the branch
   */
  project: string | Project;

  /**
   * The branch where the database will be created
   */
  branch: string | Branch;

  /**
   * Name of the database
   */
  name: string;

  /**
   * Name of the role that will own the database
   */
  ownerName: string;

  /**
   * Whether to adopt an existing database if it already exists
   * @default false
   */
  adopt?: boolean;
}

/**
 * A Neon database within a branch
 */
export interface Database
  extends Resource<"neon::Database">,
    Omit<DatabaseProps, "apiKey"> {
  /**
   * The database ID
   */
  id: number;

  /**
   * The project containing this database
   */
  project: string | Project;

  /**
   * The branch containing this database
   */
  branch: string | Branch;

  /**
   * Name of the database
   */
  name: string;

  /**
   * Name of the role that owns the database
   */
  ownerName: string;

  /**
   * Time at which the database was created
   */
  createdAt: string;

  /**
   * Time at which the database was last updated
   */
  updatedAt: string;
}

/**
 * Creates a Neon database within a branch.
 *
 * @example
 * // Create a basic database with default owner:
 * const database = await Database("my-database", {
 *   project: project,
 *   branch: branch,
 *   name: "myapp_db",
 *   ownerName: "neondb_owner"
 * });
 *
 * @example
 * // Create a database with a custom owner role:
 * const database = await Database("custom-db", {
 *   project: project,
 *   branch: branch,
 *   name: "analytics_db",
 *   ownerName: "analytics_user"
 * });
 *
 * @example
 * // Adopt an existing database if it already exists:
 * const database = await Database("existing-db", {
 *   project: project,
 *   branch: branch,
 *   name: "legacy_db",
 *   ownerName: "neondb_owner",
 *   adopt: true
 * });
 */
export const Database = Resource(
  "neon::Database",
  async function (
    this: Context<Database>,
    _id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const api = createNeonApi(props);
    const databaseId = this.output?.id;
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const branchId =
      typeof props.branch === "string" ? props.branch : props.branch.id;

    if (this.phase === "delete") {
      if (!databaseId) {
        return this.destroy();
      }

      try {
        const deleteResponse = await api.delete(
          `/projects/${projectId}/branches/${branchId}/databases/${props.name}`,
        );

        if (deleteResponse.status === 404) {
          return this.destroy();
        }

        if (!deleteResponse.ok) {
          await handleApiError(
            deleteResponse,
            "delete",
            "database",
            props.name,
          );
        }
      } catch (error: unknown) {
        if ((error as { status?: number }).status === 404) {
          return this.destroy();
        }
        throw error;
      }

      return this.destroy();
    }

    let response: NeonDatabaseApiResponse;

    try {
      if (this.phase === "update" && databaseId) {
        const updatePayload: UpdateDatabasePayload = {
          database: {
            name: props.name,
            owner_name: props.ownerName,
          },
        };

        const updateResponse = await api.patch(
          `/projects/${projectId}/branches/${branchId}/databases/${props.name}`,
          updatePayload,
        );

        if (!updateResponse.ok) {
          await handleApiError(
            updateResponse,
            "update",
            "database",
            props.name,
          );
        }

        response = await updateResponse.json();
      } else {
        if (props.adopt) {
          const listResponse = await api.get(
            `/projects/${projectId}/branches/${branchId}/databases`,
          );
          if (!listResponse.ok) {
            await handleApiError(listResponse, "list", "database");
          }

          const listData: ListDatabasesResponse = await listResponse.json();
          const existingDatabase = listData.databases?.find(
            (db: NeonDatabaseType) => db.name === props.name,
          );

          if (existingDatabase) {
            response = { database: existingDatabase };
          } else {
            response = await createNewDatabase(api, projectId, branchId, props);
          }
        } else {
          response = await createNewDatabase(api, projectId, branchId, props);
        }
      }

      const database = response.database;
      return this({
        project: props.project,
        branch: props.branch,
        name: props.name,
        ownerName: props.ownerName,
        adopt: props.adopt,
        id: database.id,
        createdAt: database.createdAt,
        updatedAt: database.updatedAt,
        baseUrl: props.baseUrl,
      });
    } catch (error: unknown) {
      if ((error as { status?: number }).status === 404) {
        throw new Error(`Branch ${branchId} not found in project ${projectId}`);
      }
      throw error;
    }
  },
);

async function createNewDatabase(
  api: NeonApi,
  projectId: string,
  branchId: string,
  props: NeonDatabaseProps,
): Promise<NeonDatabaseApiResponse> {
  const createPayload: CreateDatabasePayload = {
    database: {
      name: props.name,
      owner_name: props.ownerName,
    },
  };

  const createResponse = await api.post(
    `/projects/${projectId}/branches/${branchId}/databases`,
    createPayload,
  );

  if (!createResponse.ok) {
    await handleApiError(createResponse, "create", "database");
  }

  return await createResponse.json();
}

interface NeonDatabaseType {
  id: number;
  branchId: string;
  name: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

interface NeonDatabaseApiResponse {
  database: NeonDatabaseType;
}

interface CreateDatabasePayload {
  database: {
    name: string;
    owner_name: string;
  };
}

interface UpdateDatabasePayload {
  database: {
    name: string;
    owner_name: string;
  };
}

interface ListDatabasesResponse {
  databases?: NeonDatabaseType[];
}
