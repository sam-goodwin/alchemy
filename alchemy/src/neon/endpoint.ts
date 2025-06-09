import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions, type NeonApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Branch } from "./branch.ts";
import type { NeonRegion, EndpointType, EndpointState, PoolerMode, ComputeProvisioner, NeonOperation } from "./types.ts";

/**
 * Properties for creating or updating a Neon endpoint
 */
export interface EndpointProps extends NeonApiOptions {
  /**
   * The project containing the branch
   */
  project: string | Project;

  /**
   * The branch where the endpoint will be created
   */
  branch: string | Branch;

  /**
   * Type of endpoint (read-write or read-only)
   */
  type: EndpointType;

  /**
   * Compute provisioner to use
   */
  computeProvisioner?: ComputeProvisioner;

  /**
   * PostgreSQL settings for the endpoint
   */
  settings?: {
    pgSettings?: Record<string, string>;
  };

  /**
   * Whether connection pooling is enabled
   */
  poolerEnabled?: boolean;

  /**
   * Connection pooling mode
   */
  poolerMode?: PoolerMode;

  /**
   * Whether the endpoint is disabled
   */
  disabled?: boolean;

  /**
   * Whether passwordless access is enabled
   */
  passwordlessAccess?: boolean;

  /**
   * Timeout in seconds before the endpoint suspends
   */
  suspendTimeoutSeconds?: number;

  /**
   * Provisioner type
   */
  provisioner?: ComputeProvisioner;

  /**
   * Region where the endpoint should be created
   */
  regionId?: string;

  /**
   * Whether to adopt an existing endpoint if it already exists
   * @default false
   */
  adopt?: boolean;
}

/**
 * Response structure for endpoint API operations
 */

/**
 * A Neon endpoint for database connections
 */
export interface Endpoint
  extends Resource<"neon::Endpoint">,
    Omit<EndpointProps, "apiKey"> {
  /**
   * Hostname for connecting to the endpoint
   */
  host: string;

  /**
   * The endpoint ID
   */
  id: string;

  /**
   * The project containing this endpoint
   */
  project: string | Project;

  /**
   * The branch containing this endpoint
   */
  branch: string | Branch;

  /**
   * Minimum autoscaling compute units
   */
  autoscalingLimitMinCu: number;

  /**
   * Maximum autoscaling compute units
   */
  autoscalingLimitMaxCu: number;

  /**
   * Region ID where the endpoint is located
   */
  regionId: string;

  /**
   * Type of endpoint (read_write, read_only)
   */
  type: EndpointType;

  /**
   * Current state of the endpoint
   */
  currentState: EndpointState;

  /**
   * Pending state of the endpoint
   */
  pendingState?: EndpointState;

  /**
   * Whether connection pooling is enabled
   */
  poolerEnabled: boolean;

  /**
   * Connection pooling mode
   */
  poolerMode?: PoolerMode;

  /**
   * Whether the endpoint is disabled
   */
  disabled: boolean;

  /**
   * Whether passwordless access is enabled
   */
  passwordlessAccess: boolean;

  /**
   * Last activity timestamp
   */
  lastActive?: string;

  /**
   * Time at which the endpoint was created
   */
  createdAt: string;

  /**
   * Time at which the endpoint was last updated
   */
  updatedAt: string;

  /**
   * Proxy hostname for the endpoint
   */
  proxyHost?: string;

  /**
   * Suspend timeout in seconds
   */
  suspendTimeoutSeconds?: number;

  /**
   * Provisioner type
   */
  provisioner?: ComputeProvisioner;
}

/**
 * Creates a Neon endpoint for database connections.
 *
 * @example
 * // Create a basic read-write endpoint:
 * const endpoint = await Endpoint("main-endpoint", {
 *   project: project,
 *   branch: branch,
 *   type: "read_write"
 * });
 *
 * @example
 * // Create a read-only endpoint with connection pooling:
 * const endpoint = await Endpoint("readonly-endpoint", {
 *   project: project,
 *   branch: branch,
 *   type: "read_only",
 *   poolerEnabled: true,
 *   poolerMode: "transaction"
 * });
 *
 * @example
 * // Create an endpoint with custom PostgreSQL settings:
 * const endpoint = await Endpoint("custom-endpoint", {
 *   project: project,
 *   branch: branch,
 *   type: "read_write",
 *   settings: {
 *     pgSettings: {
 *       "shared_preload_libraries": "pg_stat_statements"
 *     }
 *   }
 * });
 *
 * @example
 * // Adopt an existing endpoint if it already exists:
 * const endpoint = await Endpoint("existing-endpoint", {
 *   project: project,
 *   branch: branch,
 *   type: "read_write",
 *   adopt: true
 * });
 */
export const Endpoint = Resource(
  "neon::Endpoint",
  async function (
    this: Context<Endpoint>,
    _id: string,
    props: EndpointProps,
  ): Promise<Endpoint> {
    const api = createNeonApi(props);
    const endpointId = this.output?.id;
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const branchId =
      typeof props.branch === "string" ? props.branch : props.branch.id;

    if (this.phase === "delete") {
      if (!endpointId) {
        return this.destroy();
      }

      try {
        const deleteResponse = await api.delete(
          `/projects/${projectId}/endpoints/${endpointId}`,
        );

        if (deleteResponse.status === 404) {
          return this.destroy();
        }

        if (!deleteResponse.ok) {
          await handleApiError(
            deleteResponse,
            "delete",
            "endpoint",
            endpointId,
          );
        }

        const deleteData: NeonEndpointApiResponse = await deleteResponse.json();
        if (deleteData.operations && deleteData.operations.length > 0) {
          await waitForOperations(api, deleteData.operations);
        }
      } catch (error: unknown) {
        if ((error as { status?: number }).status === 404) {
          return this.destroy();
        }
        throw error;
      }

      return this.destroy();
    }

    let response: NeonEndpointApiResponse;

    try {
      if (this.phase === "update" && endpointId) {
        const updatePayload: UpdateEndpointPayload = {
          endpoint: {},
        };

        if (branchId !== undefined) {
          updatePayload.endpoint.branch_id = branchId;
        }
        if (props.settings !== undefined) {
          updatePayload.endpoint.settings = {
            pg_settings: props.settings.pgSettings,
          };
        }
        if (props.poolerEnabled !== undefined) {
          updatePayload.endpoint.pooler_enabled = props.poolerEnabled;
        }
        if (props.poolerMode !== undefined) {
          updatePayload.endpoint.pooler_mode = props.poolerMode;
        }
        if (props.disabled !== undefined) {
          updatePayload.endpoint.disabled = props.disabled;
        }
        if (props.passwordlessAccess !== undefined) {
          updatePayload.endpoint.passwordless_access = props.passwordlessAccess;
        }
        if (props.suspendTimeoutSeconds !== undefined) {
          updatePayload.endpoint.suspend_timeout_seconds =
            props.suspendTimeoutSeconds;
        }

        if (Object.keys(updatePayload.endpoint).length > 0) {
          const updateResponse = await api.patch(
            `/projects/${projectId}/endpoints/${endpointId}`,
            updatePayload,
          );

          if (!updateResponse.ok) {
            await handleApiError(
              updateResponse,
              "update",
              "endpoint",
              endpointId,
            );
          }

          response = await updateResponse.json();
        } else {
          const getResponse = await api.get(
            `/projects/${projectId}/endpoints/${endpointId}`,
          );
          if (!getResponse.ok) {
            await handleApiError(getResponse, "get", "endpoint", endpointId);
          }
          response = await getResponse.json();
        }
      } else {
        if (props.adopt) {
          const listResponse = await api.get(
            `/projects/${projectId}/endpoints`,
          );
          if (!listResponse.ok) {
            await handleApiError(listResponse, "list", "endpoint");
          }

          const listData: ListEndpointsResponse = await listResponse.json();
          const existingEndpoint = listData.endpoints?.find(
            (ep: NeonEndpointType) =>
              ep.branchId === branchId && ep.type === props.type,
          );

          if (existingEndpoint) {
            response = { endpoint: existingEndpoint };
          } else {
            response = await createNewEndpoint(api, projectId, branchId, props);
          }
        } else {
          response = await createNewEndpoint(api, projectId, branchId, props);
        }
      }

      if (response.operations && response.operations.length > 0) {
        await waitForOperations(api, response.operations);
      }

      if (response.endpoint?.id) {
        const getResponse = await api.get(
          `/projects/${projectId}/endpoints/${response.endpoint.id}`,
        );
        if (!getResponse.ok) {
          await handleApiError(
            getResponse,
            "get",
            "endpoint",
            response.endpoint.id,
          );
        }
        const finalData: NeonEndpointApiResponse = await getResponse.json();
        response = finalData;
      }

      const endpoint = response.endpoint;
      return this({
        project: props.project,
        branch: props.branch,
        type: props.type,
        computeProvisioner: props.computeProvisioner,
        settings: props.settings,
        poolerEnabled: endpoint.poolerEnabled,
        poolerMode: endpoint.poolerMode,
        disabled: endpoint.disabled,
        passwordlessAccess: endpoint.passwordlessAccess,
        suspendTimeoutSeconds: endpoint.suspendTimeoutSeconds,
        provisioner: endpoint.provisioner,
        regionId: endpoint.regionId,
        adopt: props.adopt,

        host: endpoint.host,
        id: endpoint.id,
        autoscalingLimitMinCu: endpoint.autoscalingLimitMinCu,
        autoscalingLimitMaxCu: endpoint.autoscalingLimitMaxCu,
        currentState: endpoint.currentState,
        pendingState: endpoint.pendingState,
        lastActive: endpoint.lastActive,
        createdAt: endpoint.createdAt,
        updatedAt: endpoint.updatedAt,
        proxyHost: endpoint.proxyHost,
        baseUrl: props.baseUrl,
      });
    } catch (error: unknown) {
      if ((error as { status?: number }).status === 404) {
        throw new Error(`Project ${projectId} not found`);
      }
      throw error;
    }
  },
);

async function createNewEndpoint(
  api: NeonApi,
  projectId: string,
  branchId: string,
  props: NeonEndpointProps,
): Promise<NeonEndpointApiResponse> {
  const createPayload: CreateEndpointPayload = {
    endpoint: {
      branch_id: branchId,
      type: props.type,
    },
  };

  if (props.computeProvisioner !== undefined) {
    createPayload.endpoint.compute_provisioner = props.computeProvisioner;
  }
  if (props.settings !== undefined) {
    createPayload.endpoint.settings = {
      pg_settings: props.settings.pgSettings,
    };
  }
  if (props.poolerEnabled !== undefined) {
    createPayload.endpoint.pooler_enabled = props.poolerEnabled;
  }
  if (props.poolerMode !== undefined) {
    createPayload.endpoint.pooler_mode = props.poolerMode;
  }
  if (props.disabled !== undefined) {
    createPayload.endpoint.disabled = props.disabled;
  }
  if (props.passwordlessAccess !== undefined) {
    createPayload.endpoint.passwordless_access = props.passwordlessAccess;
  }
  if (props.suspendTimeoutSeconds !== undefined) {
    createPayload.endpoint.suspend_timeout_seconds =
      props.suspendTimeoutSeconds;
  }
  if (props.provisioner !== undefined) {
    createPayload.endpoint.provisioner = props.provisioner;
  }
  if (props.regionId !== undefined) {
    createPayload.endpoint.region_id = props.regionId;
  }

  const createResponse = await api.post(
    `/projects/${projectId}/endpoints`,
    createPayload,
  );

  if (!createResponse.ok) {
    await handleApiError(createResponse, "create", "endpoint");
  }

  return await createResponse.json();
}

async function waitForOperations(
  api: NeonApi,
  operations: Array<{
    id: string;
    project_id: string;
    branch_id?: string;
    endpoint_id?: string;
    action: string;
    status: "running" | "finished" | "failed" | "scheduling";
    error?: string;
    failures_count: number;
    createdAt: string;
    updatedAt: string;
  }>,
): Promise<void> {
  const maxWaitTime = 300000;
  const pollInterval = 2000;

  for (const operation of operations) {
    let totalWaitTime = 0;

    while (totalWaitTime < maxWaitTime) {
      const opResponse = await api.get(
        `/projects/${operation.project_id}/operations/${operation.id}`,
      );

      if (!opResponse.ok) {
        await handleApiError(opResponse, "get", "operation", operation.id);
      }

      const opData: {
        operation: {
          id: string;
          project_id: string;
          branch_id?: string;
          endpoint_id?: string;
          action: string;
          status: "running" | "finished" | "failed" | "scheduling";
          error?: string;
          failures_count: number;
          createdAt: string;
          updatedAt: string;
        };
      } = await opResponse.json();
      const currentOp = opData.operation;

      if (currentOp.status === "finished") {
        break;
      }

      if (currentOp.status === "failed") {
        throw new Error(
          `Operation ${operation.id} (${operation.action}) failed: ${currentOp.error || "Unknown error"}`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      totalWaitTime += pollInterval;
    }

    if (totalWaitTime >= maxWaitTime) {
      throw new Error(
        `Timeout waiting for operation ${operation.id} (${operation.action}) to complete`,
      );
    }
  }

  return;
}

interface NeonEndpointType {
  host: string;
  id: string;
  projectId: string;
  branchId: string;
  autoscalingLimitMinCu: number;
  autoscalingLimitMaxCu: number;
  regionId: string;
  type: EndpointType;
  currentState: EndpointState;
  pendingState?: EndpointState;
  poolerEnabled: boolean;
  poolerMode: PoolerMode;
  disabled: boolean;
  passwordlessAccess: boolean;
  lastActive?: string;
  createdAt: string;
  updatedAt: string;
  proxyHost?: string;
  suspendTimeoutSeconds?: number;
  provisioner?: ComputeProvisioner;
}

interface NeonEndpointApiResponse {
  endpoint: NeonEndpointType;
  operations?: Array<{
    id: string;
    project_id: string;
    branch_id?: string;
    endpoint_id?: string;
    action: string;
    status: "running" | "finished" | "failed" | "scheduling";
    error?: string;
    failures_count: number;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface CreateEndpointPayload {
  endpoint: {
    branch_id: string;
    type: EndpointType;
    compute_provisioner?: ComputeProvisioner;
    settings?: {
      pg_settings?: Record<string, string>;
    };
    pooler_enabled?: boolean;
    pooler_mode?: PoolerMode;
    disabled?: boolean;
    passwordless_access?: boolean;
    suspend_timeout_seconds?: number;
    provisioner?: ComputeProvisioner;
    region_id?: string;
  };
}

interface UpdateEndpointPayload {
  endpoint: {
    branch_id?: string;
    settings?: {
      pg_settings?: Record<string, string>;
    };
    pooler_enabled?: boolean;
    pooler_mode?: PoolerMode;
    disabled?: boolean;
    passwordless_access?: boolean;
    suspend_timeout_seconds?: number;
  };
}

interface ListEndpointsResponse {
  endpoints?: NeonEndpointType[];
}
