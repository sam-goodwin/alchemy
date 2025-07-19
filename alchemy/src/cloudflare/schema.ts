import { readFile } from "node:fs/promises";
import type { OpenAPIV3 } from "openapi-types";
import * as yaml from "yaml";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Zone } from "./zone.ts";
import { findZoneForHostname } from "./zone.ts";

/**
 * Schema format type
 */
export type SchemaKind = "openapi_v3";

export type ApiSchema = URL | string | OpenAPIV3.Document;

/**
 * Properties for creating or updating a Schema
 */
export interface SchemaProps<Schema extends ApiSchema>
  extends CloudflareApiOptions {
  /**
   * The zone to upload the schema to
   */
  zone: string | Zone;

  /**
   * OpenAPI v3.0.x schema content (YAML string, JSON string, or OpenAPI object)
   * Provide either this or schemaFile
   *
   * Note: Cloudflare only supports OpenAPI v3.0.x, not v3.1
   */
  schema: Schema;

  /**
   * Name for the schema
   * @default resource id
   */
  name?: string;

  /**
   * Schema format
   * @default "openapi_v3"
   */
  kind?: SchemaKind;

  /**
   * Enable validation immediately after upload
   *
   * Warning: will trigger a replace when disabling validation.
   *
   * @default true
   */
  enabled?: boolean;
}

/**
 * Schema output
 */
export interface Schema<SchemaType extends ApiSchema>
  extends Resource<"cloudflare::Schema"> {
  /**
   * Schema ID
   */
  id: string;

  /**
   * Name for the schema
   */
  name: string;

  /**
   * The API Schema
   */
  schema: SchemaType extends OpenAPIV3.Document ? SchemaType : undefined;

  /**
   * Schema kind/format
   */
  kind: SchemaKind;

  /**
   * Source of the schema
   */
  source: string;

  /**
   * Whether validation is enabled
   */
  enabled: boolean;

  /**
   * When the schema was created
   */
  createdAt: string;

  /**
   * Parsed schema content
   */
  content: OpenAPIV3.Document;
}

/**
 * Cloudflare API Gateway Schema manages OpenAPI v3 schemas for API validation.
 *
 * @example
 * ## Basic schema upload with inline YAML
 *
 * const apiSchema = await Schema("my-api-schema", {
 *   zone: myZone,
 *   name: "my-api-v1"
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
 *   `,
 * });
 *
 * @example
 * ## Schema upload from file
 *
 * const fileSchema = await Schema("api-schema-from-file", {
 *   zone: "example.com",
 *   schemaFile: "./openapi.yaml",
 *   name: "production-api-v2",
 *   enabled: false  // Upload but don't enable validation yet
 * });
 *
 * @example
 * ## Schema with typed OpenAPI object
 *
 * import type { OpenAPIV3 } from "openapi-types";
 *
 * const typedSchema: OpenAPIV3.Document = {
 *   openapi: "3.0.0",
 *   info: { title: "Typed API", version: "1.0.0" },
 *   paths: {
 *     "/health": {
 *       get: {
 *         operationId: "healthCheck",
 *         responses: { "200": { description: "OK" } }
 *       }
 *     }
 *   }
 * };
 *
 * const schema = await Schema("typed-schema", {
 *   zone: myZone,
 *   schema: typedSchema
 * });
 */
export const Schema = Resource("cloudflare::Schema", async function <
  SchemaType extends ApiSchema,
>(this: Context<Schema<SchemaType>>, id: string, props: SchemaProps<SchemaType>): Promise<
  Schema<SchemaType>
> {
  const api = await createCloudflareApi(props);

  // Resolve zone ID and name
  const zoneId =
    typeof props.zone === "string"
      ? (await findZoneForHostname(api, props.zone)).zoneId
      : props.zone.id;

  if (this.phase === "delete") {
    if (this.output?.id) {
      await deleteSchema(api, zoneId, this.output.id);
    }
    return this.destroy();
  }

  // Load schema content
  const { content: schemaContent, parsed: parsedSchema } =
    await loadSchemaContent(props);

  let schemaDetails: CloudflareSchemaDetails;

  if (this.phase === "update" && this.output?.id) {
    // Check if we need to replace due to name, schema content change, or disabling validation
    const needsReplace =
      props.name !== this.output.name ||
      JSON.stringify(parsedSchema) !== JSON.stringify(this.output.content) ||
      (this.output.enabled === true && props.enabled === false);

    if (needsReplace) {
      // Name, schema content changed, or trying to disable validation - need to replace
      this.replace();
    }

    // Update existing schema (can only update validation_enabled)
    schemaDetails = await updateSchema(api, zoneId, this.output.id, {
      validation_enabled: props.enabled !== false,
    });
  } else {
    // Create new schema
    schemaDetails = await uploadSchema(api, zoneId, {
      file: schemaContent,
      name: props.name || id,
      kind: props.kind || "openapi_v3",
      validation_enabled: props.enabled !== false,
    });
  }

  return this({
    id: schemaDetails.id,
    name: schemaDetails.name,
    schema: parsedSchema as any,
    kind: schemaDetails.kind,
    source: schemaDetails.source,
    enabled: schemaDetails.validationEnabled,
    createdAt: schemaDetails.createdAt,
    content: parsedSchema,
  });
});

// API helper functions

interface CloudflareSchemaDetails {
  id: string;
  name: string;
  kind: SchemaKind;
  source: string;
  validationEnabled: boolean;
  createdAt: string;
}

interface CloudflareSchema {
  schema_id: string;
  name: string;
  kind: string;
  source: string;
  validation_enabled: boolean;
  created_at: string;
  size?: number;
  is_learned?: boolean;
}

async function uploadSchema(
  api: CloudflareApi,
  zoneId: string,
  params: {
    file: string;
    name: string;
    kind: SchemaKind;
    validation_enabled?: boolean;
  },
): Promise<CloudflareSchemaDetails> {
  const body = {
    source: params.file,
    name: params.name,
    kind: params.kind,
    validation_enabled: params.validation_enabled ?? true,
  };

  const response = await api.post(
    `/zones/${zoneId}/schema_validation/schemas`,
    body,
  );

  if (!response.ok) {
    await handleApiError(response, "uploading", "schema", params.name);
  }

  const data = (await response.json()) as {
    result: CloudflareSchema;
  };
  return {
    id: data.result.schema_id,
    name: data.result.name,
    kind: data.result.kind as SchemaKind,
    source: data.result.source,
    validationEnabled: data.result.validation_enabled,
    createdAt: data.result.created_at,
  };
}

async function updateSchema(
  api: CloudflareApi,
  zoneId: string,
  schemaId: string,
  params: {
    validation_enabled: boolean;
  },
): Promise<CloudflareSchemaDetails> {
  const response = await api.patch(
    `/zones/${zoneId}/schema_validation/schemas/${schemaId}`,
    params,
  );

  if (!response.ok) {
    await handleApiError(response, "updating", "schema", schemaId);
  }

  const data = (await response.json()) as { result: CloudflareSchema };
  return {
    id: data.result.schema_id,
    name: data.result.name,
    kind: data.result.kind as SchemaKind,
    source: data.result.source,
    validationEnabled: data.result.validation_enabled,
    createdAt: data.result.created_at,
  };
}

async function deleteSchema(
  api: CloudflareApi,
  zoneId: string,
  schemaId: string,
): Promise<void> {
  const response = await api.delete(
    `/zones/${zoneId}/schema_validation/schemas/${schemaId}`,
  );
  const data = (await response.json()) as {
    success: boolean;
    errors: {
      code: number;
      message: string;
    }[];
  };

  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "deleting", "schema", schemaId);
  } else if (!data.success) {
    throw new CloudflareApiError(data.errors[0].message, response);
  }
}

/**
 * Get schema details
 */
export async function getSchema(
  api: CloudflareApi,
  zoneId: string,
  schemaId: string,
): Promise<CloudflareSchemaDetails | null> {
  const response = await api.get(
    `/zones/${zoneId}/schema_validation/schemas/${schemaId}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    await handleApiError(response, "getting", "schema", schemaId);
  }

  const data = (await response.json()) as { result: CloudflareSchema };
  return {
    id: data.result.schema_id,
    name: data.result.name,
    kind: data.result.kind as SchemaKind,
    source: data.result.source,
    validationEnabled: data.result.validation_enabled,
    createdAt: data.result.created_at,
  };
}

/**
 * Helper function to load schema content from various sources
 */
async function loadSchemaContent<SchemaType extends ApiSchema>(
  props: SchemaProps<SchemaType>,
): Promise<{ content: string; parsed: OpenAPIV3.Document }> {
  // Handle string content (YAML/JSON)
  if (typeof props.schema === "string") {
    const schemaContent = props.schema;
    const parsedSchema = yaml.parse(props.schema);
    return { content: schemaContent, parsed: parsedSchema };
  } else if (props.schema instanceof URL) {
    const schemaContent = await fetchUrl(props.schema);
    const parsedSchema = yaml.parse(schemaContent);
    return { content: schemaContent, parsed: parsedSchema };
  } else if (typeof props.schema === "object") {
    const schemaContent = yaml.stringify(props.schema);
    return {
      content: schemaContent,
      parsed: props.schema as OpenAPIV3.Document,
    };
  } else {
    throw new Error(`Unsupported schema: ${props.schema}`);
  }
}

async function fetchUrl(url: URL): Promise<string> {
  if (url.protocol === "file:") {
    // Read from local filesystem for file:// URLs
    return await readFile(url.pathname, "utf-8");
  } else if (url.protocol === "http:" || url.protocol === "https:") {
    // Fetch from remote for http/https URLs
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(
        `Failed to fetch schema from URL: ${response.statusText}`,
      );
    }
    return await response.text();
  } else {
    throw new Error(
      `Unsupported URL protocol: ${url.protocol}. Only http:, https:, and file: are supported.`,
    );
  }
}
