import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Zone } from "./zone.ts";

/**
 * Specifies the mitigation action to apply when a request does not conform to
 * the schema for this operation:
 * - `"log"`: Log the request.
 * - `"block"`: Deny access to the site.
 * - `"none"`: Skip mitigation for this operation.
 * - `null`: Clear any mitigation action.
 */
export type Mitigation = "none" | "log" | "block" | null;

/**
 * HTTP methods supported by API Gateway
 */
export type HTTPMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options"
  | "trace";

/**
 * Properties for creating or updating an API Operation
 */
export interface ApiGatewayOperationProps extends CloudflareApiOptions {
  /**
   * The zone this operation belongs to
   */
  zone: string | Zone;

  /**
   * The API endpoint path (can contain path variables like /users/{id})
   */
  endpoint: string;

  /**
   * The host for this operation
   */
  host: string;

  /**
   * The HTTP method (GET, POST, PUT, DELETE, etc.)
   */
  method: string;

  /**
   * Validation action for this operation
   * @default "none"
   */
  action?: Mitigation;
}

/**
 * API Operation output
 */
export interface ApiGatewayOperation
  extends Resource<"cloudflare::ApiGatewayOperation"> {
  /**
   * Zone ID
   */
  zoneId: string;

  /**
   * Zone name
   */
  zoneName: string;

  /**
   * Operation ID assigned by Cloudflare
   */
  operationId: string;

  /**
   * The API endpoint path
   */
  endpoint: string;

  /**
   * The host for this operation
   */
  host: string;

  /**
   * The HTTP method
   */
  method: string;

  /**
   * The mitigation action for this operation
   */
  action: Mitigation;
}

/**
 * Cloudflare API Gateway Operation manages individual API endpoints that can be
 * monitored, secured, and configured through Cloudflare's API Shield.
 *
 * Operations are the building blocks for API management, representing specific
 * HTTP method + endpoint + host combinations that your API exposes.
 *
 * @example
 * ## Basic API operation
 *
 * Create a simple GET endpoint for user retrieval
 *
 * const getUserOp = await ApiGatewayOperation("get-users", {
 *   zone: myZone,
 *   endpoint: "/users",
 *   host: "api.example.com",
 *   method: "GET"
 * });
 *
 * @example
 * ## API operation with path parameters
 *
 * Create an operation that includes path variables
 *
 * const getUserByIdOp = await ApiGatewayOperation("get-user-by-id", {
 *   zone: "api.example.com",
 *   endpoint: "/users/{id}",
 *   host: "api.example.com",
 *   method: "GET"
 * });
 *
 * @example
 * ## RESTful CRUD operations
 *
 * Create a complete set of CRUD operations for a resource
 *
 * const createUserOp = await ApiGatewayOperation("create-user", {
 *   zone: myZone,
 *   endpoint: "/users",
 *   host: "api.example.com",
 *   method: "POST"
 * });
 *
 * const updateUserOp = await ApiGatewayOperation("update-user", {
 *   zone: myZone,
 *   endpoint: "/users/{id}",
 *   host: "api.example.com",
 *   method: "PUT"
 * });
 *
 * const deleteUserOp = await ApiGatewayOperation("delete-user", {
 *   zone: myZone,
 *   endpoint: "/users/{id}",
 *   host: "api.example.com",
 *   method: "DELETE"
 * });
 *
 * @see https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/
 * @see https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/
 */
export const ApiGatewayOperation = Resource(
  "cloudflare::ApiGatewayOperation",
  async function (
    this: Context<ApiGatewayOperation>,
    _id: string,
    props: ApiGatewayOperationProps,
  ): Promise<ApiGatewayOperation> {
    const api = await createCloudflareApi(props);

    // Resolve zone ID and name
    const zoneId = typeof props.zone === "string" ? props.zone : props.zone.id;
    const zoneName =
      typeof props.zone === "string" ? props.zone : props.zone.name;

    if (this.phase === "delete") {
      if (this.output?.operationId) {
        await deleteOperation(api, zoneId, this.output.operationId);
      }
      return this.destroy();
    }
    let operationId: string;
    if (this.phase === "update") {
      if (
        props.endpoint !== this.output?.endpoint ||
        props.host !== this.output?.host ||
        props.method !== this.output?.method
      ) {
        // delete and then re-create (cloudflare doesn't allow updating these properties)
        this.replace(true);
      }
      if (props.action !== this.output?.action) {
        // we can update the mitigation action
        await updateOperationSettings(api, zoneId, this.output.operationId, {
          mitigation_action: props.action ?? null,
        });
      }
      operationId = this.output.operationId;
    } else {
      const operation = await createOperation(api, zoneId, props);
      operationId = operation.operation_id;

      if (props.action) {
        await updateOperationSettings(api, zoneId, operationId, {
          mitigation_action: props.action ?? "none",
        });
      }
    }

    return this({
      zoneId,
      zoneName,
      operationId,
      endpoint: props.endpoint,
      host: props.host,
      method: props.method.toUpperCase(),
      action: props.action ?? null,
    });
  },
);

async function createOperation(
  api: CloudflareApi,
  zoneId: string,
  props: ApiGatewayOperationProps,
) {
  // Create the operation
  const response = await api.post(
    `/zones/${zoneId}/api_gateway/operations/item`,
    {
      endpoint: props.endpoint,
      host: props.host,
      method: props.method.toUpperCase(),
    },
  );

  if (!response.ok) {
    await handleApiError(
      response,
      "creating",
      "operation",
      `${props.method} ${props.endpoint}`,
    );
  }

  const data = (await response.json()) as {
    result: {
      operation_id: string;
      endpoint: string;
      host: string;
      method: string;
      last_updated: string;
    };
  };

  return data.result;
}

async function deleteOperation(
  api: CloudflareApi,
  zoneId: string,
  operationId: string,
) {
  const deleteResponse = await api.delete(
    `/zones/${zoneId}/api_gateway/operations/${operationId}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    await handleApiError(deleteResponse, "deleting", "operation", operationId);
  }
}

/**
 * Update validation settings for a specific operation
 */
async function updateOperationSettings(
  api: CloudflareApi,
  zoneId: string,
  operationId: string,
  params: {
    mitigation_action: Mitigation;
  },
): Promise<void> {
  const response = await api.put(
    `/zones/${zoneId}/schema_validation/settings/operations/${operationId}`,
    params,
  );

  if (!response.ok) {
    await handleApiError(
      response,
      "updating",
      "operation settings",
      operationId,
    );
  }
}

export interface CloudflareOperation {
  operation_id: string;
  method: string;
  host: string;
  endpoint: string;
  mitigation_action: Mitigation;
}

export async function getOperations(
  api: CloudflareApi,
  zoneId: string,
): Promise<CloudflareOperation[]> {
  const response = await api.get(`/zones/${zoneId}/api_gateway/operations`);

  if (!response.ok) {
    await handleApiError(response, "getting", "operations");
  }

  const data = (await response.json()) as { result: CloudflareOperation[] };
  return data.result;
}
