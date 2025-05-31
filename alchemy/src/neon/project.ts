import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions } from "./api.ts";

/**
 * A Neon region where projects can be provisioned
 */
export type NeonRegion =
  | "aws-us-east-1"
  | "aws-us-east-2"
  | "aws-us-west-2"
  | "aws-eu-central-1"
  | "aws-eu-west-2"
  | "aws-ap-southeast-1"
  | "aws-ap-southeast-2"
  | "aws-sa-east-1"
  | "azure-eastus2"
  | "azure-westus3"
  | "azure-gwc";

/**
 * Properties for creating or updating a Neon project
 */
export interface NeonProjectProps extends NeonApiOptions {
  /**
   * Name of the project
   */
  name: string;

  /**
   * Region where the project will be provisioned
   * @default "aws-us-east-1"
   */
  region_id?: NeonRegion;

  /**
   * PostgreSQL version to use
   * If not specified, Neon will use its default version
   */
  pg_version?: 14 | 15 | 16 | 17;

  /**
   * Whether to create a default branch and endpoint
   * @default true
   */
  default_endpoint?: boolean;

  /**
   * Default branch name
   * @default "main"
   */
  default_branch_name?: string;

  /**
   * Existing project ID to update
   * Used internally during update operations
   * @internal
   */
  existing_project_id?: string;
}

/**
 * A Neon database
 */
export interface NeonDatabase {
  /**
   * Database ID
   */
  id: number;

  /**
   * ID of the branch this database belongs to
   */
  branch_id: string;

  /**
   * Database name
   */
  name: string;

  /**
   * Name of the database owner role
   */
  owner_name: string;

  /**
   * Time at which the database was created
   */
  created_at: string;

  /**
   * Time at which the database was last updated
   */
  updated_at: string;
}

/**
 * A Neon database role
 */
export interface NeonRole {
  /**
   * ID of the branch this role belongs to
   */
  branch_id: string;

  /**
   * Role name
   */
  name: string;

  /**
   * Role password (only included during creation)
   */
  password?: string;

  /**
   * Whether this role is protected from deletion
   */
  protected: boolean;

  /**
   * Time at which the role was created
   */
  created_at: string;

  /**
   * Time at which the role was last updated
   */
  updated_at: string;
}

/**
 * A Neon branch
 */
export interface NeonBranch {
  /**
   * Branch ID
   */
  id: string;

  /**
   * ID of the project this branch belongs to
   */
  project_id: string;

  /**
   * Branch name
   */
  name: string;

  /**
   * Current state of the branch
   */
  current_state: string;

  /**
   * Pending state of the branch
   */
  pending_state: string;

  /**
   * Time at which the branch was created
   */
  created_at: string;

  /**
   * Time at which the branch was last updated
   */
  updated_at: string;
}

/**
 * A Neon compute endpoint
 */
export interface NeonEndpoint {
  /**
   * Endpoint ID
   */
  id: string;

  /**
   * Host for connecting to this endpoint
   */
  host: string;

  /**
   * ID of the project this endpoint belongs to
   */
  project_id: string;

  /**
   * ID of the branch this endpoint belongs to
   */
  branch_id: string;

  /**
   * Endpoint type (read_write, read_only)
   */
  type: string;

  /**
   * Current state of the endpoint
   */
  current_state: string;

  /**
   * Pending state of the endpoint
   */
  pending_state: string;

  /**
   * Region ID where this endpoint is provisioned
   */
  region_id: string;

  /**
   * Minimum compute units for autoscaling
   */
  autoscaling_limit_min_cu: number;

  /**
   * Maximum compute units for autoscaling
   */
  autoscaling_limit_max_cu: number;

  /**
   * Whether connection pooler is enabled
   */
  pooler_enabled: boolean;

  /**
   * Connection pooler mode
   */
  pooler_mode: string;

  /**
   * Whether this endpoint is disabled
   */
  disabled: boolean;

  /**
   * Whether passwordless access is enabled
   */
  passwordless_access: boolean;

  /**
   * Time at which the endpoint was created
   */
  created_at: string;

  /**
   * Time at which the endpoint was last updated
   */
  updated_at: string;

  /**
   * Proxy host for this endpoint
   */
  proxy_host: string;

  /**
   * Endpoint settings
   */
  settings: {
    /**
     * PostgreSQL settings
     */
    pg_settings: Record<string, any>;
  };
}

/**
 * A Neon connection URI
 */
export interface NeonConnectionUri {
  /**
   * Connection URI string
   */
  connection_uri: Secret;

  /**
   * Connection parameters
   */
  connection_parameters: {
    database: string;
    host: string;
    port: number;
    user: string;
    password: Secret;
  };
}

/**
 * A Neon operation
 */
export interface NeonOperation {
  /**
   * Operation ID
   */
  id: string;

  /**
   * ID of the project this operation belongs to
   */
  project_id: string;

  /**
   * ID of the branch this operation affects, if applicable
   */
  branch_id?: string;

  /**
   * ID of the endpoint this operation affects, if applicable
   */
  endpoint_id?: string;

  /**
   * Action being performed
   */
  action: string;

  /**
   * Current status of the operation
   */
  status: string;

  /**
   * Number of failures encountered
   */
  failures_count: number;

  /**
   * Time at which the operation was created
   */
  created_at: string;

  /**
   * Time at which the operation was last updated
   */
  updated_at: string;
}

/**
 * API response structure for Neon projects
 */
interface NeonApiResponse {
  project: {
    id: string;
    name: string;
    region_id: string;
    pg_version: number;
    created_at: string;
    updated_at: string;
    proxy_host?: string;
    [key: string]: any;
  };
  connection_uris?: Array<{
    connection_uri: string;
    connection_parameters: {
      database: string;
      host: string;
      port: number;
      user: string;
      password: string;
    };
  }>;
  roles?: Array<{
    branch_id: string;
    name: string;
    password?: string;
    protected: boolean;
    created_at: string;
    updated_at: string;
  }>;
  databases?: Array<{
    id: number;
    branch_id: string;
    name: string;
    owner_name: string;
    created_at: string;
    updated_at: string;
  }>;
  operations?: Array<{
    id: string;
    project_id: string;
    branch_id?: string;
    endpoint_id?: string;
    action: string;
    status: string;
    failures_count: number;
    created_at: string;
    updated_at: string;
  }>;
  branch?: {
    id: string;
    project_id: string;
    name: string;
    current_state: string;
    pending_state: string;
    created_at: string;
    updated_at: string;
  };
  endpoints?: Array<{
    id: string;
    host: string;
    project_id: string;
    branch_id: string;
    type: string;
    current_state: string;
    pending_state: string;
    region_id: string;
    autoscaling_limit_min_cu: number;
    autoscaling_limit_max_cu: number;
    pooler_enabled: boolean;
    pooler_mode: string;
    disabled: boolean;
    passwordless_access: boolean;
    created_at: string;
    updated_at: string;
    proxy_host: string;
    settings: {
      pg_settings: Record<string, any>;
    };
  }>;
}

/**
 * Output returned after Neon project creation/update
 * IMPORTANT: The interface name MUST match the exported resource name
 */
export interface NeonProject
  extends Resource<"neon::Project">,
    Omit<NeonProjectProps, "apiKey" | "existing_project_id"> {
  /**
   * The ID of the project
   */
  id: string;

  /**
   * Time at which the project was created
   */
  created_at: string;

  /**
   * Time at which the project was last updated
   */
  updated_at: string;

  /**
   * Hostname for proxy access
   */
  proxy_host?: string;

  /**
   * Connection URIs for the databases
   */
  connection_uris: [NeonConnectionUri, ...NeonConnectionUri[]];

  /**
   * Database roles created with the project
   */
  roles: [NeonRole, ...NeonRole[]];

  /**
   * Databases created with the project
   */
  databases?: [NeonDatabase, ...NeonDatabase[]];

  /**
   * Default branch information
   */
  branch?: NeonBranch;

  /**
   * Compute endpoints for the project
   */
  endpoints: [NeonEndpoint, ...NeonEndpoint[]];
}

/**
 * Creates a Neon serverless PostgreSQL project.
 *
 * @example
 * // Create a basic Neon project with default settings:
 * const project = await NeonProject("my-project", {
 *   name: "My Project"
 * });
 *
 * @example
 * // Create a Neon project in a specific region with a specific PostgreSQL version:
 * const euProject = await NeonProject("my-eu-project", {
 *   name: "My EU Project",
 *   region_id: "aws-eu-west-1",
 *   pg_version: 16,
 *   apiKey: alchemy.secret(process.env.NEON_API_KEY)
 * });
 *
 * @example
 * // Create a Neon project with a custom default branch name:
 * const devProject = await NeonProject("dev-project", {
 *   name: "Development Project",
 *   default_branch_name: "development"
 * });
 */
export const NeonProject = Resource(
  "neon::Project",
  async function (
    this: Context<NeonProject>,
    id: string,
    props: NeonProjectProps,
  ): Promise<NeonProject> {
    const api = createNeonApi(props);
    const projectId = props.existing_project_id || this.output?.id;

    if (this.phase === "delete") {
      try {
        // Check if the project exists before attempting to delete
        if (projectId) {
          const deleteResponse = await api.delete(`/projects/${projectId}`);
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "delete", "project", id);
          }
        }
      } catch (error) {
        console.error(`Error deleting Neon project ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    let response: NeonApiResponse;

    try {
      if (this.phase === "update" && projectId) {
        // Update existing project
        // Neon only allows updating the project name
        if (
          props.pg_version &&
          this.output?.pg_version &&
          props.pg_version !== this.output.pg_version
        ) {
          throw new Error(
            `pg_version cannot be updated after project creation. The project will keep its current PostgreSQL version (${this.output.pg_version}). To use a different version, create a new project.`,
          );
        }

        const projectResponse = await api.patch(`/projects/${projectId}`, {
          project: {
            name: props.name,
          },
        });

        if (!projectResponse.ok) {
          await handleApiError(projectResponse, "update", "project", id);
        }

        const initialData = await projectResponse.json();

        // Reify project properties to get complete data
        response = await getProject(
          api,
          projectId,
          initialData as Partial<NeonApiResponse>,
        );
      } else {
        // Check if a project with this ID already exists
        if (projectId) {
          const getResponse = await api.get(`/projects/${projectId}`);
          if (getResponse.ok) {
            // Project exists, update it
            const existingProject =
              (await getResponse.json()) as NeonApiResponse;
            if (
              props.pg_version &&
              existingProject.project?.pg_version &&
              props.pg_version !== existingProject.project.pg_version
            ) {
              throw new Error(
                `pg_version cannot be updated after project creation. The project will keep its current PostgreSQL version (${existingProject.project.pg_version}). To use a different version, create a new project.`,
              );
            }

            const projectResponse = await api.patch(`/projects/${projectId}`, {
              project: {
                name: props.name,
              },
            });

            if (!projectResponse.ok) {
              await handleApiError(projectResponse, "update", "project", id);
            }

            const initialData = await projectResponse.json();
            // Reify project properties to get complete data
            response = await getProject(
              api,
              projectId,
              initialData as Partial<NeonApiResponse>,
            );
          } else if (getResponse.status !== 404) {
            // Unexpected error during GET check
            await handleApiError(getResponse, "get", "project", id);
            throw new Error("Failed to check if project exists");
          } else {
            // Project doesn't exist, create new
            response = await createNewProject(api, props);
          }
        } else {
          // No output ID, create new project
          response = await createNewProject(api, props);
        }
      }

      // Wait for any pending operations to complete
      if (response.operations && response.operations.length > 0) {
        await waitForOperations(api, response.operations);
      }

      // Get the latest project state after operations complete
      if (response.project?.id) {
        // Reify project properties to get complete data
        response = await getProject(api, response.project.id, response);
      }

      return this({
        id: response.project.id,
        name: response.project.name,
        region_id: response.project.region_id as NeonRegion,
        pg_version: response.project.pg_version as 14 | 15 | 16 | 17,
        created_at: response.project.created_at,
        updated_at: response.project.updated_at,
        proxy_host: response.project.proxy_host,
        // Pass through the provided props except apiKey (which is sensitive)
        default_endpoint: props.default_endpoint,
        default_branch_name: props.default_branch_name,
        baseUrl: props.baseUrl,
        // Add all available data
        // @ts-ignore - api ensures they're non-empty
        connection_uris: response.connection_uris,
        // @ts-ignore
        roles: response.roles,
        // @ts-ignore
        databases: response.databases,
        // @ts-ignore
        branch: response.branch,
        // @ts-ignore
        endpoints: response.endpoints,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Neon project '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to create a new Neon project
 */
async function createNewProject(
  api: any,
  props: NeonProjectProps,
): Promise<NeonApiResponse> {
  const defaultEndpoint = props.default_endpoint ?? true;
  const projectResponse = await api.post("/projects", {
    project: {
      name: props.name,
      region_id: props.region_id || "aws-us-east-1",
      pg_version: props.pg_version,
      default_endpoint: defaultEndpoint,
      branch: defaultEndpoint
        ? { name: props.default_branch_name || "main" }
        : undefined,
    },
  });

  if (!projectResponse.ok) {
    await handleApiError(projectResponse, "create", "project");
  }

  return (await projectResponse.json()) as NeonApiResponse;
}

/**
 * Helper function to get complete project details by fetching all related data
 *
 * @param api The Neon API client
 * @param projectId The project ID
 * @param initialData Initial project data (optional)
 * @returns Complete project data with all related resources
 */
async function getProject(
  api: any,
  projectId: string,
  initialData: Partial<NeonApiResponse> = {},
): Promise<NeonApiResponse> {
  // Get the latest project details
  const updatedData = await getProjectDetails(api, projectId);

  // Start with a copy of the initial data
  const responseData = { ...initialData };

  // Check if we have a branch ID from the initial data
  const branchId = initialData.branch?.id;

  if (branchId) {
    // Get the branch details
    const branchData = await getBranchDetails(api, projectId, branchId);

    // Update with the latest branch data
    responseData.branch = branchData.branch;

    // Also fetch the latest endpoint details for this branch
    const endpointData = await getEndpointDetails(api, projectId, branchId);

    // Update with the latest endpoint data if available
    if (endpointData.endpoints && endpointData.endpoints.length > 0) {
      responseData.endpoints = endpointData.endpoints;
    }
  }

  // Preserve all data from the original response
  // Only update properties that might have changed during operations
  return {
    ...responseData,
    connection_uris: (
      updatedData.connection_uris || responseData.connection_uris
    )?.map((uri) => ({
      connection_uri: alchemy.secret(uri.connection_uri),
      connection_parameters: {
        database: uri.connection_parameters.database,
        host: uri.connection_parameters.host,
        port: uri.connection_parameters.port ?? 5432,
        user: uri.connection_parameters.user ?? "neondb_owner",
        password: alchemy.secret(uri.connection_parameters.password),
      },
    })),
    project: updatedData.project,
    branch: updatedData.branch || responseData.branch,
    endpoints: updatedData.endpoints || responseData.endpoints,
  } as NeonApiResponse;
}

/**
 * Wait for operations to complete
 *
 * @param api The Neon API client
 * @param operations Operations to wait for
 * @throws Error if an operation fails or times out
 * @returns Promise that resolves when all operations complete
 */
async function waitForOperations(
  api: any,
  operations: Array<{
    id: string;
    project_id: string;
    status: string;
    action: string;
  }>,
): Promise<void> {
  const pendingOperations = operations.filter(
    (op) => op.status !== "finished" && op.status !== "failed",
  );

  if (pendingOperations.length === 0) {
    return;
  }

  // Maximum wait time in milliseconds (5 minutes)
  const maxWaitTime = 5 * 60 * 1000;
  // Initial delay between retries in milliseconds
  const initialRetryDelay = 500;
  // Maximum delay between retries
  const maxRetryDelay = 10000;
  // Backoff factor for exponential backoff
  const backoffFactor = 1.5;

  for (const operation of pendingOperations) {
    let totalWaitTime = 0;
    let retryDelay = initialRetryDelay;
    let operationStatus = operation.status;

    while (
      operationStatus !== "finished" &&
      operationStatus !== "failed" &&
      totalWaitTime < maxWaitTime
    ) {
      // Wait before checking again with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      totalWaitTime += retryDelay;

      // Increase delay for next retry with exponential backoff, up to max
      retryDelay = Math.min(retryDelay * backoffFactor, maxRetryDelay);

      // Check operation status
      const operationResponse = await api.get(
        `/projects/${operation.project_id}/operations/${operation.id}`,
      );

      if (operationResponse.ok) {
        const operationData = await operationResponse.json();
        operationStatus = operationData.operation?.status;
      } else {
        throw new Error(
          `Failed to check operation ${operation.id} status: HTTP ${operationResponse.status}`,
        );
      }
    }

    if (operationStatus === "failed") {
      throw new Error(`Operation ${operation.id} (${operation.action}) failed`);
    }
    if (totalWaitTime >= maxWaitTime) {
      throw new Error(
        `Timeout waiting for operation ${operation.id} (${operation.action}) to complete`,
      );
    }
  }

  // Explicitly return when all operations are complete
  return;
}

/**
 * Get the latest project details
 *
 * @param api The Neon API client
 * @param projectId The project ID
 * @returns Project details including branch and endpoints
 * @throws Error if project details cannot be retrieved
 */
async function getProjectDetails(
  api: any,
  projectId: string,
): Promise<NeonApiResponse> {
  const response = await api.get(`/projects/${projectId}`);

  if (!response.ok) {
    throw new Error(`Failed to get project details: HTTP ${response.status}`);
  }

  return (await response.json()) as NeonApiResponse;
}

/**
 * Get the latest branch details
 *
 * @param api The Neon API client
 * @param projectId The project ID
 * @param branchId The branch ID
 * @returns Branch details
 * @throws Error if branch details cannot be retrieved
 */
async function getBranchDetails(
  api: any,
  projectId: string,
  branchId: string,
): Promise<{ branch: NeonBranch }> {
  const response = await api.get(`/projects/${projectId}/branches/${branchId}`);

  if (!response.ok) {
    throw new Error(`Failed to get branch details: HTTP ${response.status}`);
  }

  return (await response.json()) as { branch: NeonBranch };
}

/**
 * Get the latest endpoint details for a branch
 *
 * @param api The Neon API client
 * @param projectId The project ID
 * @param branchId The branch ID
 * @returns Endpoint details for the branch
 * @throws Error if endpoint details cannot be retrieved
 */
async function getEndpointDetails(
  api: any,
  projectId: string,
  branchId: string,
): Promise<{ endpoints: NeonEndpoint[] }> {
  const response = await api.get(
    `/projects/${projectId}/branches/${branchId}/endpoints`,
  );

  if (!response.ok) {
    throw new Error(`Failed to get endpoint details: HTTP ${response.status}`);
  }

  return (await response.json()) as { endpoints: NeonEndpoint[] };
}
