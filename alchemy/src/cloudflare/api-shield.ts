import type { OpenAPIV3 } from "openapi-types";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import {
  ApiGatewayOperation,
  type HTTPMethod,
  type Mitigation,
} from "./api-gateway-operation.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { ApiSchema, Schema } from "./schema.ts";
import type { Zone } from "./zone.ts";
import { findZoneForHostname } from "./zone.ts";

/**
 * Properties for creating or updating Schema Validation
 */
export interface ApiShieldProps extends CloudflareApiOptions {
  /**
   * The zone to configure schema validation for
   */
  zone: string | Zone;

  /**
   * The schema resource to use for validation
   *
   * @example
   * const apiSchema = await Schema("my-schema", {
   *   zone: myZone,
   *   schema: `
   *     openapi: 3.0.0
   *     info:
   *       title: My API
   *       version: 1.0.0
   *     paths:
   *       /users:
   *         get:
   *           operationId: getUsers
   *           responses:
   *             '200':
   *               description: Success
   *   `
   * });
   *
   * await ApiShield("my-validation", {
   *   zone: myZone,
   *   schema: apiSchema
   * });
   */
  schema: Schema<ApiSchema>;

  /**
   * Per-operation validation overrides using OpenAPI-style path structure
   *
   * Can specify mitigations per HTTP method or a blanket action for all methods on a path:
   *
   * @example
   * // Per-method configuration
   * {
   *   "/users": {
   *     get: "none",
   *     post: "block"
   *   },
   *   "/users/{id}": {
   *     delete: "block"
   *   }
   * }
   *
   * @example
   * // Blanket action for all methods on a path
   * {
   *   "/users": "none",
   *   "/users/{id}": "block",
   *   "/admin": "block"
   * }
   */
  mitigations?: Record<
    string,
    Mitigation | Partial<Record<HTTPMethod, Mitigation>>
  >;

  /**
   * Default validation action for all operations
   * @default "none"
   */
  defaultMitigation?: Mitigation;

  /**
   * Action for requests that don't match any operation
   * @default "none"
   */
  unknownOperationMitigation?: Mitigation;
}

/**
 * Global validation settings
 */
export interface ValidationSettings {
  /**
   * Default mitigation action
   */
  defaultMitigation: Mitigation;

  /**
   * Override mitigation action for specific operations
   */
  overrideMitigation?: Mitigation;
}

/**
 * Schema Validation output
 */
export interface ApiShield extends Resource<"cloudflare::ApiShield"> {
  /**
   * Zone ID
   */
  zoneId: string;

  /**
   * The API Schema's API Gateway Operations (and their respective mitigation actions)
   */
  operations: ApiGatewayOperation[];
}

/**
 * Cloudflare Schema Validation protects your API endpoints by validating incoming requests
 * against an OpenAPI v3 schema. It can log or block requests that don't match your schema,
 * helping prevent malformed requests and potential security issues.
 *
 * @example
 * ## Basic schema validation with inline YAML
 *
 * Enable schema validation with a simple OpenAPI schema as YAML string
 *
 * const apiSchema = await Schema("my-schema", {
 *   zone: myZone,
 *   schema: `
 *     openapi: 3.0.0
 *     info:
 *       title: My API
 *       version: 1.0.0
 *     servers:
 *       - url: https://api.example.com
 *     paths:
 *       /users:
 *         get:
 *           operationId: getUsers
 *           responses:
 *             '200':
 *               description: Success
 *       /users/{id}:
 *         get:
 *           operationId: getUser
 *           parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                 type: string
 *   `,
 * });
 *
 * const shield = await ApiShield("api-validation", {
 *   zone: myZone,
 *   schema: apiSchema,
 *   defaultAction: "none"
 * });
 *
 * @example
 * ## API Shield with typed OpenAPI object
 *
 * Use strongly-typed OpenAPI v3 objects for better IDE support
 *
 * import type { OpenAPIV3 } from "openapi-types";
 *
 * const apiSchema: OpenAPIV3.Document = {
 *   openapi: "3.0.0",
 *   info: {
 *     title: "My API",
 *     version: "1.0.0",
 *   },
 *   servers: [
 *     { url: "https://api.example.com" }
 *   ],
 *   paths: {
 *     "/users": {
 *       get: {
 *         operationId: "getUsers",
 *         responses: {
 *           "200": {
 *             description: "Success",
 *             content: {
 *               "application/json": {
 *                 schema: {
 *                   type: "array",
 *                   items: {
 *                     type: "object",
 *                     properties: {
 *                       id: { type: "string" },
 *                       name: { type: "string" }
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * };
 *
 * const schema = await Schema("my-schema", {
 *   zone: myZone,
 *   schema: apiSchema,
 * });
 *
 * const shield = await ApiShield("api-validation", {
 *   zone: myZone,
 *   schema: schema,
 *   defaultAction: "none"
 * });
 *
 * @example
 * ## API Shield with file
 *
 * Load schema from an external file with custom settings
 *
 * const schema = await Schema("my-schema", {
 *   zone: "example.com",
 *   schema: new URL("file:///path/to/openapi.yaml"),
 *   name: "production-api-v2",
 * });
 *
 * const shield = await ApiShield("api-validation", {
 *   zone: "example.com",
 *   schema: schema,
 *   defaultAction: "none",
 *   mitigations: {
 *     "/users": {
 *       get: "none",        // No mitigation for read operations
 *       post: "log",        // Log violations for writes (requires paid plan)
 *     },
 *     "/users/{id}": {
 *       delete: "block"     // Block destructive operations (requires paid plan)
 *     }
 *   },
 *   unknownOperationAction: "none"
 * });
 *
 * @example
 * ## Monitor API traffic without impact
 *
 * Use validation in monitoring mode to understand traffic patterns
 *
 * const schema = await Schema("my-schema", {
 *   zone: myZone,
 *   schema: new URL("file:///path/to/api-schema.json"),
 * });
 *
 * const monitoring = await ApiShield("api-monitoring", {
 *   zone: myZone,
 *   schema: schema,
 *   defaultAction: "none"
 * });
 *
 * @example
 * ## Log schema violations
 *
 * Track non-compliant requests without blocking (requires paid plan)
 *
 * const schema = await Schema("my-schema", {
 *   zone: myZone,
 *   schema: new URL("file:///path/to/api-schema.json"),
 * });
 *
 * const withLogging = await ApiShield("api-logging", {
 *   zone: myZone,
 *   schema: schema,
 *   defaultAction: "log"
 * });
 *
 * @example
 * ## Protect critical endpoints with blanket mitigations
 *
 * Apply mitigations to entire paths or specific methods (requires paid plan)
 *
 * const schema = await Schema("my-schema", {
 *   zone: myZone,
 *   schema: new URL("file:///path/to/api-schema.json"),
 * });
 *
 * const protection = await ApiShield("api-protection", {
 *   zone: myZone,
 *   schema: schema,
 *   defaultAction: "log",
 *   mitigations: {
 *     "/admin": "block",              // Block all methods on admin endpoints
 *     "/payments": {
 *       post: "block",                // Block payment creation
 *       put: "block"                  // Block payment updates
 *     },
 *     "/users/{id}": {
 *       delete: "block"               // Block user deletion
 *     },
 *     "/public": "none",              // Allow all methods on public endpoints
 *     "/products": "none"             // Allow all methods on products
 *   }
 * });
 *
 * @see https://developers.cloudflare.com/api-shield/security/schema-validation/
 */
export const ApiShield = Resource(
  "cloudflare::ApiShield",
  {
    // delete the api gateway operations in parallel
    destroyStrategy: "parallel",
  },
  async function (
    this: Context<ApiShield>,
    id: string,
    props: ApiShieldProps,
  ): Promise<ApiShield> {
    const api = await createCloudflareApi(props);

    // Resolve zone ID and name
    const zoneId =
      typeof props.zone === "string"
        ? (await findZoneForHostname(api, props.zone)).zoneId
        : props.zone.id;

    if (this.phase === "delete") {
      // Reset settings to default
      try {
        await updateGlobalSettings(api, zoneId, {
          validation_default_mitigation_action: "none",
        });
      } catch (error) {
        console.error("Error resetting global settings:", error);
      }

      return this.destroy();
    }

    // Update global settings
    const defaultAction = props.defaultMitigation || "none";
    await updateGlobalSettings(api, zoneId, {
      validation_default_mitigation_action: defaultAction,
      validation_override_mitigation_action: props.unknownOperationMitigation,
    });

    return this({
      zoneId,
      operations: await Promise.all(
        parseSchemaOperations(props.schema.content).map(async (parsedOp) => {
          let operationAction = defaultAction;
          if (props.mitigations) {
            const pathActions = props.mitigations[parsedOp.endpoint];
            if (typeof pathActions === "string") {
              // Blanket action for all methods on this path
              operationAction = pathActions;
            } else if (pathActions && typeof pathActions === "object") {
              // Per-method configuration
              const methodAction =
                pathActions[parsedOp.method.toLowerCase() as HTTPMethod];
              if (methodAction) {
                operationAction = methodAction;
              }
            }
          }
          return ApiGatewayOperation(
            // Create a deterministic ID for the operation
            `${id}-${parsedOp.method.toLowerCase()}-${parsedOp.endpoint.replace(/[^a-z0-9]/gi, "-")}`,
            {
              zone: zoneId,
              endpoint: parsedOp.endpoint,
              host: parsedOp.host,
              method: parsedOp.method,
              action: operationAction,
            },
          );
        }),
      ),
    });
  },
);

// Helper functions for API calls

async function getGlobalSettings(
  api: CloudflareApi,
  zoneId: string,
): Promise<CloudflareGlobalSettings> {
  const response = await api.get(
    `/zones/${zoneId}/api_gateway/settings/schema_validation`,
  );

  if (!response.ok) {
    await handleApiError(response, "getting", "global settings");
  }

  const data = (await response.json()) as { result: CloudflareGlobalSettings };
  return data.result;
}

async function updateGlobalSettings(
  api: CloudflareApi,
  zoneId: string,
  params: Partial<CloudflareGlobalSettings>,
): Promise<void> {
  const response = await api.put(
    `/zones/${zoneId}/api_gateway/settings/schema_validation`,
    params,
  );

  if (!response.ok) {
    await handleApiError(response, "updating", "global settings");
  }
}

/**
 * Get global schema validation settings for a zone
 */
export async function getGlobalSettingsForZone(
  api: CloudflareApi,
  zoneId: string,
): Promise<CloudflareGlobalSettings> {
  return getGlobalSettings(api, zoneId);
}

// Cloudflare API response types

export interface CloudflareGlobalSettings {
  validation_default_mitigation_action: Mitigation;
  validation_override_mitigation_action?: Mitigation;
}

/**
 * Extract operations from an OpenAPI schema
 */
export function parseSchemaOperations(schema: OpenAPIV3.Document): Array<{
  method: string;
  endpoint: string;
  operationId?: string;
  host: string;
}> {
  const operations: Array<{
    method: string;
    endpoint: string;
    operationId?: string;
    host: string;
  }> = [];

  if (!schema?.paths) {
    return operations;
  }

  // Determine the host from servers
  const defaultHost = extractHostFromSchema(schema);

  // Extract operations from each path
  for (const [path, pathItem] of Object.entries(schema.paths)) {
    if (!pathItem || typeof pathItem !== "object") continue;

    // Check each HTTP method
    for (const method of [
      "get",
      "post",
      "put",
      "patch",
      "delete",
      "head",
      "options",
      "trace",
    ]) {
      const operation = pathItem[method as keyof typeof pathItem];
      if (
        operation &&
        typeof operation === "object" &&
        !Array.isArray(operation)
      ) {
        // Determine host for this operation (operation-level servers override global)
        const operationHost = (operation as any).servers?.[0]?.url
          ? extractHostFromUrl((operation as any).servers[0].url)
          : defaultHost;

        operations.push({
          method: method.toUpperCase(),
          endpoint: path,
          operationId: (operation as any).operationId,
          host: operationHost,
        });
      }
    }
  }

  return operations;
}

/**
 * Extract host from OpenAPI schema servers
 */
function extractHostFromSchema(schema: OpenAPIV3.Document): string {
  if (schema.servers && schema.servers.length > 0) {
    return extractHostFromUrl(schema.servers[0].url);
  }

  // Fallback to a default host
  return "api.example.com";
}

/**
 * Extract hostname from a URL
 */
function extractHostFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    // If URL parsing fails, return the URL as-is (might be relative)
    return url;
  }
}
