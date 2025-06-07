import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions, type NeonApi } from "./api.ts";
import type { NeonRegion, NeonPgVersion, NeonOperation } from "./types.ts";

// Forward declarations for interfaces that will be imported from their respective files
import type { Branch } from "./branch.ts";
import type { Database } from "./database.ts";
import type { Endpoint } from "./endpoint.ts";
import type { Role } from "./role.ts";

/**
 * Properties for creating or updating a Neon project
 */
export interface ProjectProps extends NeonApiOptions {
  /**
   * Name of the project
   */
  name: string;

  /**
   * Region where the project will be provisioned
   * @default "aws-us-east-1"
   */
  regionId?: NeonRegion;

  /**
   * PostgreSQL version to use
   * @default 16
   */
  pgVersion?: NeonPgVersion;

  /**
   * Whether to create a default branch and endpoint
   * @default true
   */
  defaultEndpoint?: boolean;

  /**
   * Default branch name
   * @default "main"
   */
  defaultBranchName?: string;

  /**
   * Existing project ID to update
   * Used internally during update operations
   * @internal
   */
  existingProjectId?: string;
}


/**
 * A Neon connection URI
 */
export interface NeonConnectionUri {
  /**
   * Connection URI string
   */
  connectionUri: Secret;

  /**
   * Connection parameters
   */
  connectionParameters: {
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
  projectId: string;

  /**
   * ID of the branch this operation affects, if applicable
   */
  branchId?: string;

  /**
   * ID of the endpoint this operation affects, if applicable
   */
  endpointId?: string;

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
  failuresCount: number;

  /**
   * Time at which the operation was created
   */
  createdAt: string;

  /**
   * Time at which the operation was last updated
   */
  updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
    proxy_host?: string;
    computeTimeSeconds?: number;
    activeTimeSeconds?: number;
    cpuUsedSec?: number;
    writtenDataBytes?: number;
    dataTransferBytes?: number;
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
    branchId: string;
    name: string;
    password?: string;
    protected: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  databases?: Array<{
    id: number;
    branchId: string;
    name: string;
    ownerName: string;
    createdAt: string;
    updatedAt: string;
  }>;
  operations?: Array<{
    id: string;
    projectId: string;
    branchId?: string;
    endpointId?: string;
    action: string;
    status: string;
    failuresCount: number;
    createdAt: string;
    updatedAt: string;
  }>;
  branch?: {
    id: string;
    projectId: string;
    name: string;
    currentState: string;
    pendingState: string;
    createdAt: string;
    updatedAt: string;
  };
  endpoints?: Array<{
    id: string;
    host: string;
    projectId: string;
    branchId: string;
    type: string;
    currentState: string;
    pendingState: string;
    regionId: string;
    autoscalingLimitMinCu: number;
    autoscalingLimitMaxCu: number;
    poolerEnabled: boolean;
    poolerMode: string;
    disabled: boolean;
    passwordlessAccess: boolean;
    createdAt: string;
    updatedAt: string;
    proxyHost: string;
    settings: {
      pg_settings: Record<string, string>;
    };
  }>;
}

/**
 * Output returned after Neon project creation/update
 * IMPORTANT: The interface name MUST match the exported resource name
 */
export interface Project
  extends Resource<"neon::Project">,
    Omit<ProjectProps, "apiKey" | "existingProjectId"> {
  /**
   * The ID of the project
   */
  id: string;

  /**
   * Time at which the project was created
   */
  createdAt: string;

  /**
   * Time at which the project was last updated
   */
  updatedAt: string;

  /**
   * Hostname for proxy access
   */
  proxyHost?: string;

  /**
   * Connection URIs for the databases
   */
  connectionUris: [NeonConnectionUri, ...NeonConnectionUri[]];

  /**
   * Database roles created with the project
   */
  roles: [Role, ...Role[]];

  /**
   * Databases created with the project
   */
  databases?: [Database, ...Database[]];

  /**
   * Default branch information
   */
  branch?: Branch;

  /**
   * Compute endpoints for the project
   */
  endpoints: [Endpoint, ...Endpoint[]];
}

/**
 * Creates a Neon serverless PostgreSQL project.
 *
 * @example
 * // Create a basic Neon project with default settings:
 * const project = await Project("my-project", {
 *   name: "My Project"
 * });
 *
 * @example
 * // Create a Neon project in a specific region with a specific PostgreSQL version:
 * const euProject = await Project("my-eu-project", {
 *   name: "My EU Project",
 *   regionId: "aws-eu-west-1",
 *   pgVersion: 16,
 *   apiKey: alchemy.secret(process.env.NEON_API_KEY)
 * });
 *
 * @example
 * // Create a Neon project with a custom default branch name:
 * const devProject = await Project("dev-project", {
 *   name: "Development Project",
 *   defaultBranchName: "development"
 * });
 */
export const Project = Resource(
  "neon::Project",
  async function (
    this: Context<Project>,
    id: string,
    props: ProjectProps,
  ): Promise<Project> {
    const api = createNeonApi(props);
    const projectId = props.existingProjectId || this.output?.id;

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
        regionId: response.project.region_id as NeonRegion,
        pgVersion: response.project.pg_version as NeonPgVersion,
        createdAt: response.project.createdAt,
        updatedAt: response.project.updatedAt,
        proxyHost: response.project.proxy_host,
        // Pass through the provided props except apiKey (which is sensitive)
        defaultEndpoint: props.defaultEndpoint,
        defaultBranchName: props.defaultBranchName,
        baseUrl: props.baseUrl,
        // Add all available data
        // @ts-ignore - api ensures they're non-empty
        connectionUris: response.connection_uris,
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
  api: NeonApi,
  props: NeonProjectProps,
): Promise<NeonApiResponse> {
  const defaultEndpoint = props.defaultEndpoint ?? true;
  const projectResponse = await api.post("/projects", {
    project: {
      name: props.name,
      region_id: props.regionId || "aws-us-east-1",
      pg_version: props.pgVersion || 16,
      default_endpoint: defaultEndpoint,
      branch: defaultEndpoint
        ? { name: props.defaultBranchName || "main" }
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
  api: NeonApi,
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
    responseData.branch = {
      ...branchData.branch,
      pendingState: (branchData.branch as any).pending_state || "ready",
    };

    // Also fetch the latest endpoint details for this branch
    const endpointData = await getEndpointDetails(api, projectId, branchId);

    // Update with the latest endpoint data if available
    if (endpointData.endpoints && endpointData.endpoints.length > 0) {
      responseData.endpoints = endpointData.endpoints.map((ep) => ({
        id: ep.id,
        host: ep.host,
        projectId: ep.projectId,
        branchId: ep.branchId,
        type: ep.type,
        currentState: ep.currentState,
        pendingState: (ep as any).pending_state || "active",
        regionId: ep.regionId,
        autoscalingLimitMinCu: ep.autoscalingLimitMinCu,
        autoscalingLimitMaxCu: ep.autoscalingLimitMaxCu,
        poolerEnabled: ep.poolerEnabled,
        poolerMode: ep.poolerMode,
        disabled: ep.disabled,
        passwordlessAccess: ep.passwordlessAccess,
        createdAt: ep.createdAt,
        updatedAt: ep.updatedAt,
        proxyHost: ep.proxyHost,
        settings: {
          pgSettings: ep.settings?.pgSettings || {},
          pg_settings: ep.settings?.pgSettings || {},
        },
      }));
    }
  }

  // Preserve all data from the original response
  // Only update properties that might have changed during operations
  return {
    ...responseData,
    connection_uris: (
      updatedData.connection_uris || responseData.connection_uris
    )?.map((uri) => ({
      connectionUri: alchemy.secret(uri.connection_uri),
      connectionParameters: {
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
  api: NeonApi,
  operations: Array<{
    id: string;
    projectId: string;
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
        `/projects/${operation.projectId}/operations/${operation.id}`,
      );

      if (operationResponse.ok) {
        const operationData: { operation?: { status?: string } } =
          await operationResponse.json();
        operationStatus = operationData.operation?.status || "unknown";
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
  api: NeonApi,
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
  api: NeonApi,
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
  api: NeonApi,
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
