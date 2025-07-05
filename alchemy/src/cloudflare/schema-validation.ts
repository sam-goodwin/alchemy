import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.ts";
import type { Zone } from "./zone.ts";

/**
 * Properties for creating or updating a Schema Validation
 */
export interface SchemaValidationProps extends CloudflareApiOptions {
  /**
   * The zone where this schema will be applied
   * Can be a Zone resource or zone ID string
   */
  zone: string | Zone;

  /**
   * The name of the schema
   */
  name: string;

  /**
   * The kind of schema
   * Currently only "openapi_v3" is supported
   */
  kind: "openapi_v3";

  /**
   * The OpenAPI v3 schema content as a JSON string
   */
  source: string;

  /**
   * Whether validation is enabled for this schema
   * @default true
   */
  validationEnabled?: boolean;
}

/**
 * Output returned after Schema Validation creation/update
 */
export interface SchemaValidation
  extends Resource<"cloudflare::SchemaValidation"> {
  /**
   * The ID of the schema
   */
  id: string;

  /**
   * The zone ID where this schema is applied
   */
  zoneId: string;

  /**
   * The name of the schema
   */
  name: string;

  /**
   * The kind of schema
   */
  kind: "openapi_v3";

  /**
   * The OpenAPI v3 schema content
   */
  source: string;

  /**
   * Whether validation is enabled for this schema
   */
  validationEnabled: boolean;

  /**
   * Time at which the schema was created
   */
  createdAt: string;

  /**
   * Time at which the schema was last modified
   */
  updatedAt: string;
}

/**
 * A Cloudflare API Shield Schema Validation resource manages OpenAPI v3 schemas
 * for validating API requests against your defined API specifications.
 *
 * @example
 * ## Basic Schema Validation
 *
 * Create a schema validation for a simple API:
 *
 * ```ts
 * const schema = await SchemaValidation("api-schema", {
 *   zone: "example.com",
 *   name: "My API Schema",
 *   kind: "openapi_v3",
 *   source: JSON.stringify({
 *     openapi: "3.0.0",
 *     info: { title: "My API", version: "1.0.0" },
 *     paths: {
 *       "/api/users": {
 *         get: {
 *           responses: { "200": { description: "Success" } }
 *         }
 *       }
 *     }
 *   }),
 *   validationEnabled: true
 * });
 * ```
 *
 * @example
 * ## Schema with Zone Resource Reference
 *
 * Reference an existing Zone resource:
 *
 * ```ts
 * const zone = await Zone("example.com", { name: "example.com" });
 *
 * const schema = await SchemaValidation("api-schema", {
 *   zone: zone,
 *   name: "My API Schema",
 *   kind: "openapi_v3",
 *   source: JSON.stringify({
 *     openapi: "3.0.0",
 *     info: { title: "My API", version: "1.0.0" },
 *     paths: {
 *       "/api/health": {
 *         get: {
 *           responses: { "200": { description: "Health check" } }
 *         }
 *       }
 *     }
 *   })
 * });
 * ```
 *
 * @example
 * ## Complex API Schema
 *
 * Create a comprehensive schema for a REST API:
 *
 * ```ts
 * const complexSchema = await SchemaValidation("rest-api-schema", {
 *   zone: "api.example.com",
 *   name: "REST API Schema",
 *   kind: "openapi_v3",
 *   source: JSON.stringify({
 *     openapi: "3.0.0",
 *     info: {
 *       title: "My REST API",
 *       version: "2.0.0",
 *       description: "A comprehensive REST API"
 *     },
 *     paths: {
 *       "/api/users": {
 *         get: {
 *           parameters: [
 *             {
 *               name: "limit",
 *               in: "query",
 *               schema: { type: "integer", minimum: 1, maximum: 100 }
 *             }
 *           ],
 *           responses: {
 *             "200": {
 *               description: "Users list",
 *               content: {
 *                 "application/json": {
 *                   schema: {
 *                     type: "array",
 *                     items: { $ref: "#/components/schemas/User" }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         post: {
 *           requestBody: {
 *             content: {
 *               "application/json": {
 *                 schema: { $ref: "#/components/schemas/CreateUser" }
 *               }
 *             }
 *           },
 *           responses: {
 *             "201": { description: "User created" }
 *           }
 *         }
 *       }
 *     },
 *     components: {
 *       schemas: {
 *         User: {
 *           type: "object",
 *           properties: {
 *             id: { type: "string" },
 *             email: { type: "string", format: "email" },
 *             name: { type: "string" }
 *           }
 *         },
 *         CreateUser: {
 *           type: "object",
 *           required: ["email", "name"],
 *           properties: {
 *             email: { type: "string", format: "email" },
 *             name: { type: "string", minLength: 1 }
 *           }
 *         }
 *       }
 *     }
 *   }),
 *   validationEnabled: true
 * });
 * ```
 *
 * @see https://developers.cloudflare.com/api-shield/security/schema-validation/
 * @see https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/
 */
export const SchemaValidation = Resource(
  "cloudflare::SchemaValidation",
  async function (
    this: Context<SchemaValidation>,
    id: string,
    props: SchemaValidationProps,
  ): Promise<SchemaValidation> {
    const api = await createCloudflareApi(props);

    // Resolve zone ID from Zone resource or string
    const zoneId = typeof props.zone === "string" ? props.zone : props.zone.id;

    if (this.phase === "delete") {
      if (this.output?.id) {
        const deleteResponse = await api.delete(
          `/zones/${zoneId}/schema_validation/schemas/${this.output.id}`,
        );

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          await handleApiError(
            deleteResponse,
            "delete",
            "schema validation",
            this.output.id,
          );
        }
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      // Validate that immutable properties haven't changed
      if (this.output.name !== props.name) {
        throw new Error(
          `Cannot change schema name from '${this.output.name}' to '${props.name}'. Name is immutable after creation.`,
        );
      }

      if (this.output.kind !== props.kind) {
        throw new Error(
          `Cannot change schema kind from '${this.output.kind}' to '${props.kind}'. Kind is immutable after creation.`,
        );
      }

      // Update the schema
      const updateResponse = await api.put(
        `/zones/${zoneId}/schema_validation/schemas/${this.output.id}`,
        {
          source: props.source,
          validation_enabled: props.validationEnabled ?? true,
        },
      );

      if (!updateResponse.ok) {
        await handleApiError(
          updateResponse,
          "update",
          "schema validation",
          this.output.id,
        );
      }

      const updateData = (
        (await updateResponse.json()) as {
          result: CloudflareSchemaValidation;
        }
      ).result;

      return this({
        id: updateData.schema_id,
        zoneId: zoneId,
        name: updateData.name,
        kind: updateData.kind,
        source: updateData.source,
        validationEnabled: updateData.validation_enabled,
        createdAt: updateData.created_at,
        updatedAt: updateData.updated_at,
      });
    }

    // Validate OpenAPI schema format
    try {
      const parsedSchema = JSON.parse(props.source);
      if (!parsedSchema.openapi || !parsedSchema.openapi.startsWith("3.")) {
        throw new Error("Schema must be a valid OpenAPI v3 specification");
      }
    } catch (error) {
      throw new Error(
        `Invalid OpenAPI schema: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }

    // Create new schema validation
    const response = await api.post(
      `/zones/${zoneId}/schema_validation/schemas`,
      {
        name: props.name,
        kind: props.kind,
        source: props.source,
        validation_enabled: props.validationEnabled ?? true,
      },
    );

    if (!response.ok) {
      await handleApiError(response, "create", "schema validation", id);
    }

    const schemaData = (
      (await response.json()) as {
        result: CloudflareSchemaValidation;
      }
    ).result;

    return this({
      id: schemaData.schema_id,
      zoneId: zoneId,
      name: schemaData.name,
      kind: schemaData.kind,
      source: schemaData.source,
      validationEnabled: schemaData.validation_enabled,
      createdAt: schemaData.created_at,
      updatedAt: schemaData.updated_at,
    });
  },
);

/**
 * Cloudflare Schema Validation API response format
 */
interface CloudflareSchemaValidation {
  schema_id: string;
  name: string;
  kind: "openapi_v3";
  source: string;
  validation_enabled: boolean;
  created_at: string;
  updated_at: string;
}
