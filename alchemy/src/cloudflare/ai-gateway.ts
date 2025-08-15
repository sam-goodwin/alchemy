import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.ts";

/**
 * Properties for creating or updating a Cloudflare AI Gateway.
 */
export interface AiGatewayProps extends CloudflareApiOptions {
  /**
   * Invalidate cache on update.
   * @default true
   */
  cacheInvalidateOnUpdate?: boolean;

  /**
   * Cache TTL in seconds. Set to 0 to disable caching.
   * @default 0
   * @minimum 0
   */
  cacheTtl?: number;

  /**
   * Collect logs for the gateway.
   * @default true
   */
  collectLogs?: boolean;

  /**
   * Rate limiting interval in seconds. Set to 0 to disable rate limiting.
   * @default 0
   * @minimum 0
   */
  rateLimitingInterval?: number;

  /**
   * Rate limiting limit per interval. Set to 0 to disable rate limiting.
   * @default 0
   * @minimum 0
   */
  rateLimitingLimit?: number;

  /**
   * Rate limiting technique.
   * @default "fixed"
   */
  rateLimitingTechnique?: "fixed" | "sliding";

  /**
   * Enable authentication for the gateway.
   * @default false
   */
  authentication?: boolean;

  /**
   * Log retention limit in requests.
   * @default undefined
   * @minimum 10000
   * @maximum 10000000
   */
  logManagement?: number;

  /**
   * Strategy for handling log limits.
   * @default undefined
   */
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST";

  /**
   * Enable logpush for the gateway.
   * @default false
   */
  logpush?: boolean;

  /**
   * Public key for logpush encryption.
   * @default undefined
   * @minLength 16
   * @maxLength 1024
   */
  logpushPublicKey?: string;
}

/**
 * Output returned after Cloudflare AI Gateway creation/update.
 * IMPORTANT: The interface name MUST match the exported resource name.
 */
export interface AiGateway
  extends Resource<"cloudflare::AiGateway">,
    AiGatewayProps {
  /**
   * The ID (name) of the gateway.
   */
  id: string;

  /**
   * Cloudflare account ID associated with the gateway.
   */
  accountId: string;

  /**
   * Cloudflare account tag associated with the gateway.
   */
  accountTag: string;

  /**
   * Time at which the gateway was created (ISO 8601 format).
   */
  createdAt: string;

  /**
   * The internal UUID of the gateway.
   */
  internalId: string;

  /**
   * Time at which the gateway was last modified (ISO 8601 format).
   */
  modifiedAt: string;

  /**
   * Resource type identifier for binding.
   * @internal
   */
  type: "ai_gateway";
}

/**
 * Represents a Cloudflare AI Gateway.
 *
 * @example
 * // Create a basic AI Gateway with default settings:
 * const basicGateway = await AiGateway("my-ai-gateway", {});
 *
 * @example
 * // Create an AI Gateway with authentication and rate limiting:
 * const secureGateway = await AiGateway("secure-ai-gateway", {
 *   authentication: true,
 *   rateLimitingInterval: 60, // 60 seconds
 *   rateLimitingLimit: 100,   // 100 requests
 *   rateLimitingTechnique: "sliding"
 * });
 *
 * @example
 * // Create an AI Gateway with logging enabled and logpush:
 * const loggingGateway = await AiGateway("logging-ai-gateway", {
 *   collectLogs: true,
 *   logpush: true,
 *   logpushPublicKey: "mypublickey..." // Replace with actual public key
 * });
 */
export const AiGateway = Resource(
  "cloudflare::AiGateway",
  async function (
    this: Context<AiGateway>,
    id: string,
    props: AiGatewayProps = {},
  ): Promise<AiGateway> {
    const api = await createCloudflareApi(props);
    const gatewayPath = `/accounts/${api.accountId}/ai-gateway/gateways/${id}`;
    const gatewaysPath = `/accounts/${api.accountId}/ai-gateway/gateways`;

    if (this.phase === "delete") {
      try {
        const deleteResponse = await api.delete(gatewayPath);
        // Only swallow 404 Not Found errors, all other errors should be handled
        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          await handleApiError(deleteResponse, "delete", "ai gateway", id);
        }
      } catch (error) {
        logger.error(`Error deleting AI Gateway ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    // Default values as per Cloudflare documentation examples
    const mergedProps: AiGatewayProps = {
      cacheInvalidateOnUpdate: true,
      cacheTtl: 0,
      collectLogs: true,
      rateLimitingInterval: 0,
      rateLimitingLimit: 0,
      rateLimitingTechnique: "fixed",
      ...props, // User props override defaults
    };

    let response: Response | undefined;
    let apiResource: any;

    try {
      if (this.phase === "update") {
        // Update existing gateway (PUT request)
        const requestBody = mapPropsToApi(id, mergedProps, false);
        response = await api.put(gatewayPath, requestBody);
      } else {
        // Check if gateway exists before creating (to avoid conflict)
        const getResponse = await api.get(gatewayPath);
        if (getResponse.status === 200) {
          // Gateway exists, treat as update (PUT)
          logger.log(
            `AI Gateway '${id}' already exists. Updating existing resource.`,
          );
          const requestBody = mapPropsToApi(id, mergedProps, false);
          response = await api.put(gatewayPath, requestBody);
        } else if (getResponse.status === 404) {
          // Gateway doesn't exist, create new (POST request)
          const requestBody = mapPropsToApi(id, mergedProps, true); // Include 'id' in POST body
          response = await api.post(gatewaysPath, requestBody);
        } else {
          // Unexpected error during GET check
          await handleApiError(getResponse, "get", "ai gateway", id);
        }
      }

      if (!response?.ok) {
        const action = this.phase === "update" ? "update" : "create";
        await handleApiError(response!, action, "ai gateway", id);
      }

      const data: { result: Record<string, any> } = await response!.json();
      apiResource = data.result;
    } catch (error) {
      logger.error(`Error ${this.phase} AI Gateway '${id}':`, error);
      throw error; // Re-throw the error to fail the deployment
    }

    // Construct the output object from API response and merged props
    return this({
      ...mergedProps, // Start with the input props (including defaults)
      id: apiResource.id,
      accountId: apiResource.account_id,
      accountTag: apiResource.account_tag,
      createdAt: apiResource.created_at,
      internalId: apiResource.internal_id,
      modifiedAt: apiResource.modified_at,
      // Update props based on the actual response from the API (Cloudflare might set defaults)
      cacheInvalidateOnUpdate: apiResource.cache_invalidate_on_update,
      cacheTtl: apiResource.cache_ttl,
      collectLogs: apiResource.collect_logs,
      rateLimitingInterval: apiResource.rate_limiting_interval,
      rateLimitingLimit: apiResource.rate_limiting_limit,
      rateLimitingTechnique: apiResource.rate_limiting_technique,
      authentication: apiResource.authentication,
      logManagement: apiResource.log_management,
      logManagementStrategy: apiResource.log_management_strategy,
      logpush: apiResource.logpush,
      logpushPublicKey: apiResource.logpush_public_key,
      type: "ai_gateway",
    });
  },
);

// Helper function to map props to the API request body format
function mapPropsToApi(
  id: string,
  props: AiGatewayProps,
  includeIdInBody = false,
): Record<string, any> {
  const body: Record<string, any> = {};
  if (includeIdInBody) {
    body.id = id;
  }
  if (props.cacheInvalidateOnUpdate !== undefined) {
    body.cache_invalidate_on_update = props.cacheInvalidateOnUpdate;
  }
  if (props.cacheTtl !== undefined) {
    body.cache_ttl = props.cacheTtl;
  }
  if (props.collectLogs !== undefined) {
    body.collect_logs = props.collectLogs;
  }
  if (props.rateLimitingInterval !== undefined) {
    body.rate_limiting_interval = props.rateLimitingInterval;
  }
  if (props.rateLimitingLimit !== undefined) {
    body.rate_limiting_limit = props.rateLimitingLimit;
  }
  if (props.rateLimitingTechnique !== undefined) {
    body.rate_limiting_technique = props.rateLimitingTechnique;
  }
  if (props.authentication !== undefined) {
    body.authentication = props.authentication;
  }
  if (props.logManagement !== undefined) {
    body.log_management = props.logManagement;
  }
  if (props.logManagementStrategy !== undefined) {
    body.log_management_strategy = props.logManagementStrategy;
  }
  if (props.logpush !== undefined) {
    body.logpush = props.logpush;
  }
  if (props.logpushPublicKey !== undefined) {
    body.logpush_public_key = props.logpushPublicKey;
  }
  return body;
}
