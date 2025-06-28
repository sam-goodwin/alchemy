import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.ts";
import type { SchemaValidation } from "./schema-validation.ts";
import type { Zone } from "./zone.ts";

/**
 * HTTP methods supported by API Gateway Operations
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

/**
 * Mitigation actions for API Shield features
 */
export type MitigationAction = "block" | "log";

/**
 * Properties for creating or updating an API Gateway Operation
 */
export interface ApiGatewayOperationProps extends CloudflareApiOptions {
  /**
   * The zone where this operation will be applied
   * Can be a Zone resource or zone ID string
   */
  zone: string | Zone;

  /**
   * The API endpoint path (e.g., "/api/users", "/v1/health")
   */
  endpoint: string;

  /**
   * The hostname for this operation
   */
  host: string;

  /**
   * The HTTP method for this operation
   */
  method: HttpMethod;

  /**
   * API Shield features configuration
   */
  features?: {
    /**
     * Schema validation configuration
     */
    schemaValidation?: {
      /**
       * Whether schema validation is enabled
       */
      enabled: boolean;

      /**
       * The schema to use for validation
       * Can be a SchemaValidation resource or schema ID string
       */
      schema?: string | SchemaValidation;

      /**
       * Action to take when schema validation fails
       * @default "log"
       */
      mitigationAction?: MitigationAction;
    };

    /**
     * Sequence mitigation configuration
     */
    sequenceMitigation?: {
      /**
       * Whether sequence mitigation is enabled
       */
      enabled: boolean;

      /**
       * Action to take when sequence violations are detected
       * @default "log"
       */
      mitigationAction?: MitigationAction;
    };

    /**
     * Parameter validation schemas
     * Key-value pairs where keys are parameter names and values are JSON schemas
     */
    parameterSchemas?: Record<string, any>;
  };
}

/**
 * Output returned after API Gateway Operation creation/update
 */
export interface ApiGatewayOperation
  extends Resource<"cloudflare::ApiGatewayOperation"> {
  /**
   * The ID of the operation
   */
  id: string;

  /**
   * The zone ID where this operation is applied
   */
  zoneId: string;

  /**
   * The API endpoint path
   */
  endpoint: string;

  /**
   * The hostname for this operation
   */
  host: string;

  /**
   * The HTTP method for this operation
   */
  method: HttpMethod;

  /**
   * Configured API Shield features
   */
  features: {
    schemaValidation?: {
      enabled: boolean;
      schemaId?: string;
      mitigationAction: MitigationAction;
    };
    sequenceMitigation?: {
      enabled: boolean;
      mitigationAction: MitigationAction;
    };
    parameterSchemas?: Record<string, any>;
  };

  /**
   * Time at which the operation was created
   */
  createdAt: string;

  /**
   * Time at which the operation was last modified
   */
  updatedAt: string;
}

/**
 * A Cloudflare API Gateway Operation represents an API endpoint with its associated
 * API Shield security features like schema validation and sequence mitigation.
 *
 * @example
 * ## Basic API Operation
 *
 * Create a simple API operation without any shield features:
 *
 * ```ts
 * const basicOperation = await ApiGatewayOperation("users-get", {
 *   zone: "api.example.com",
 *   endpoint: "/api/users",
 *   host: "api.example.com",
 *   method: "GET"
 * });
 * ```
 *
 * @example
 * ## Operation with Schema Validation
 *
 * Create an operation with schema validation enabled:
 *
 * ```ts
 * const schema = await SchemaValidation("users-schema", {
 *   zone: "api.example.com",
 *   name: "Users API Schema",
 *   kind: "openapi_v3",
 *   source: JSON.stringify({
 *     openapi: "3.0.0",
 *     info: { title: "Users API", version: "1.0.0" },
 *     paths: {
 *       "/api/users": {
 *         get: {
 *           responses: { "200": { description: "Users list" } }
 *         }
 *       }
 *     }
 *   })
 * });
 *
 * const operation = await ApiGatewayOperation("users-get", {
 *   zone: "api.example.com",
 *   endpoint: "/api/users",
 *   host: "api.example.com",
 *   method: "GET",
 *   features: {
 *     schemaValidation: {
 *       enabled: true,
 *       schema: schema,
 *       mitigationAction: "block"
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Comprehensive API Shield Configuration
 *
 * Create an operation with multiple API Shield features:
 *
 * ```ts
 * const operation = await ApiGatewayOperation("api-post-users", {
 *   zone: "api.example.com",
 *   endpoint: "/api/users",
 *   host: "api.example.com",
 *   method: "POST",
 *   features: {
 *     schemaValidation: {
 *       enabled: true,
 *       schema: "schema-id-123",
 *       mitigationAction: "block"
 *     },
 *     sequenceMitigation: {
 *       enabled: true,
 *       mitigationAction: "log"
 *     },
 *     parameterSchemas: {
 *       "user_id": {
 *         type: "string",
 *         pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
 *       },
 *       "limit": {
 *         type: "integer",
 *         minimum: 1,
 *         maximum: 100
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Multiple Operations for an API
 *
 * Create multiple operations for different endpoints:
 *
 * ```ts
 * const zone = await Zone("api.example.com", { name: "api.example.com" });
 *
 * const getUsers = await ApiGatewayOperation("get-users", {
 *   zone: zone,
 *   endpoint: "/api/users",
 *   host: "api.example.com",
 *   method: "GET",
 *   features: {
 *     schemaValidation: { enabled: true, mitigationAction: "log" }
 *   }
 * });
 *
 * const createUser = await ApiGatewayOperation("create-user", {
 *   zone: zone,
 *   endpoint: "/api/users",
 *   host: "api.example.com",
 *   method: "POST",
 *   features: {
 *     schemaValidation: { enabled: true, mitigationAction: "block" },
 *     sequenceMitigation: { enabled: true, mitigationAction: "log" }
 *   }
 * });
 *
 * const deleteUser = await ApiGatewayOperation("delete-user", {
 *   zone: zone,
 *   endpoint: "/api/users/{id}",
 *   host: "api.example.com",
 *   method: "DELETE",
 *   features: {
 *     parameterSchemas: {
 *       "id": {
 *         type: "string",
 *         pattern: "^[0-9]+$"
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @see https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/
 * @see https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/
 */
export const ApiGatewayOperation = Resource(
  "cloudflare::ApiGatewayOperation",
  async function (
    this: Context<ApiGatewayOperation>,
    id: string,
    props: ApiGatewayOperationProps,
  ): Promise<ApiGatewayOperation> {
    const api = await createCloudflareApi(props);

    // Resolve zone ID from Zone resource or string
    const zoneId = typeof props.zone === "string" ? props.zone : props.zone.id;

    if (this.phase === "delete") {
      if (this.output?.id) {
        const deleteResponse = await api.delete(
          `/zones/${zoneId}/api_gateway/operations/${this.output.id}`,
        );

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          await handleApiError(
            deleteResponse,
            "delete",
            "api gateway operation",
            this.output.id,
          );
        }
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      // Validate that immutable properties haven't changed
      if (this.output.endpoint !== props.endpoint) {
        throw new Error(
          `Cannot change operation endpoint from '${this.output.endpoint}' to '${props.endpoint}'. Endpoint is immutable after creation.`,
        );
      }

      if (this.output.host !== props.host) {
        throw new Error(
          `Cannot change operation host from '${this.output.host}' to '${props.host}'. Host is immutable after creation.`,
        );
      }

      if (this.output.method !== props.method) {
        throw new Error(
          `Cannot change operation method from '${this.output.method}' to '${props.method}'. Method is immutable after creation.`,
        );
      }

      // Update the operation - use the single operation endpoint for updates too
      const updatePayload = createOperationPayload(props);
      const updateResponse = await api.put(
        `/zones/${zoneId}/api_gateway/operations/${this.output.id}`,
        updatePayload,
      );

      if (!updateResponse.ok) {
        await handleApiError(
          updateResponse,
          "update",
          "api gateway operation",
          this.output.id,
        );
      }

      const updateData = (
        (await updateResponse.json()) as {
          result: CloudflareApiGatewayOperation;
        }
      ).result;

      return this(mapApiResponseToOutput(updateData, zoneId));
    }

    // Validate HTTP method
    const validMethods: HttpMethod[] = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "HEAD",
      "OPTIONS",
    ];
    if (!validMethods.includes(props.method)) {
      throw new Error(
        `Invalid HTTP method: ${props.method}. Must be one of: ${validMethods.join(", ")}`,
      );
    }

    // Create new operation
    const createPayload = createOperationPayload(props);
    const response = await api.post(
      `/zones/${zoneId}/api_gateway/operations/item`,
      createPayload,
    );

    if (!response.ok) {
      await handleApiError(response, "create", "api gateway operation", id);
    }

    const operationData = (
      (await response.json()) as {
        result: CloudflareApiGatewayOperation;
      }
    ).result;

    return this(mapApiResponseToOutput(operationData, zoneId));
  },
);

/**
 * Helper function to create operation payload for API requests
 */
function createOperationPayload(props: ApiGatewayOperationProps): any {
  const payload: any = {
    endpoint: props.endpoint,
    host: props.host,
    method: props.method,
  };

  if (props.features) {
    payload.features = {};

    if (props.features.schemaValidation) {
      payload.features.schema_validation = {
        enabled: props.features.schemaValidation.enabled,
        mitigation_action:
          props.features.schemaValidation.mitigationAction || "log",
      };

      if (props.features.schemaValidation.schema) {
        const schemaId =
          typeof props.features.schemaValidation.schema === "string"
            ? props.features.schemaValidation.schema
            : props.features.schemaValidation.schema.id;
        payload.features.schema_validation.schema_id = schemaId;
      }
    }

    if (props.features.sequenceMitigation) {
      payload.features.sequence_mitigation = {
        enabled: props.features.sequenceMitigation.enabled,
        mitigation_action:
          props.features.sequenceMitigation.mitigationAction || "log",
      };
    }

    if (props.features.parameterSchemas) {
      payload.features.parameter_schemas = props.features.parameterSchemas;
    }
  }

  return payload;
}

/**
 * Helper function to map API response to output format
 */
function mapApiResponseToOutput(
  data: CloudflareApiGatewayOperation,
  zoneId: string,
): Omit<ApiGatewayOperation, keyof Resource<any>> {
  const output: Omit<ApiGatewayOperation, keyof Resource<any>> = {
    id: data.operation_id,
    zoneId: zoneId,
    endpoint: data.endpoint,
    host: data.host,
    method: data.method as HttpMethod,
    features: {},
    createdAt: data.created_at || data.last_updated || new Date().toISOString(),
    updatedAt: data.updated_at || data.last_updated || new Date().toISOString(),
  };

  if (data.features) {
    if (data.features.schema_validation) {
      output.features.schemaValidation = {
        enabled: data.features.schema_validation.enabled,
        mitigationAction: data.features.schema_validation
          .mitigation_action as MitigationAction,
      };

      if (data.features.schema_validation.schema_id) {
        output.features.schemaValidation.schemaId =
          data.features.schema_validation.schema_id;
      }
    }

    if (data.features.sequence_mitigation) {
      output.features.sequenceMitigation = {
        enabled: data.features.sequence_mitigation.enabled,
        mitigationAction: data.features.sequence_mitigation
          .mitigation_action as MitigationAction,
      };
    }

    if (data.features.parameter_schemas) {
      output.features.parameterSchemas = data.features.parameter_schemas;
    }
  }

  return output;
}

/**
 * Cloudflare API Gateway Operation API response format
 */
interface CloudflareApiGatewayOperation {
  operation_id: string;
  endpoint: string;
  host: string;
  method: string;
  features?: {
    schema_validation?: {
      enabled: boolean;
      schema_id?: string;
      mitigation_action: string;
    };
    sequence_mitigation?: {
      enabled: boolean;
      mitigation_action: string;
    };
    parameter_schemas?: Record<string, any>;
  };
  // Note: API response may not include these fields for single operations
  last_updated?: string;
  created_at?: string;
  updated_at?: string;
}
