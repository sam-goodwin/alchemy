import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { SchemaValidation } from "../../src/cloudflare/schema-validation.ts";
import { Zone } from "../../src/cloudflare/zone.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";
import "../../src/test/vitest.ts";

const api = await createCloudflareApi();
const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("SchemaValidation", () => {
  test("create, update, and delete schema validation", async (scope) => {
    const testZoneName = `${BRANCH_PREFIX}-schema-test.com`;
    const testSchemaId = `${BRANCH_PREFIX}-test-schema`;

    let zone: Zone | undefined;
    let schema: SchemaValidation | undefined;

    try {
      // Create a test zone first
      zone = await Zone(testZoneName, {
        name: testZoneName,
        type: "full",
      });

      expect(zone.id).toBeDefined();
      expect(zone.name).toBe(testZoneName);

      // Initial OpenAPI schema
      const initialSchema = {
        openapi: "3.0.0",
        info: {
          title: "Test API",
          version: "1.0.0",
        },
        paths: {
          "/api/health": {
            get: {
              responses: {
                "200": {
                  description: "Health check endpoint",
                },
              },
            },
          },
        },
      };

      // Create schema validation
      schema = await SchemaValidation(testSchemaId, {
        zone: zone,
        name: "Test Schema",
        kind: "openapi_v3",
        source: JSON.stringify(initialSchema),
        validationEnabled: true,
      });

      expect(schema.id).toBeDefined();
      expect(schema.zoneId).toBe(zone.id);
      expect(schema.name).toBe("Test Schema");
      expect(schema.kind).toBe("openapi_v3");
      expect(schema.validationEnabled).toBe(true);
      expect(schema.createdAt).toBeDefined();

      // Verify schema exists via API
      const getResponse = await api.get(
        `/zones/${zone.id}/api_gateway/schemas/${schema.id}`,
      );
      expect(getResponse.status).toBe(200);

      const schemaData = ((await getResponse.json()) as any).result;
      expect(schemaData.schema_id).toBe(schema.id);
      expect(schemaData.name).toBe("Test Schema");
      expect(schemaData.validation_enabled).toBe(true);

      // Update schema with new content
      const updatedSchema = {
        openapi: "3.0.0",
        info: {
          title: "Updated Test API",
          version: "2.0.0",
        },
        paths: {
          "/api/health": {
            get: {
              responses: {
                "200": {
                  description: "Health check endpoint",
                },
              },
            },
          },
          "/api/users": {
            get: {
              responses: {
                "200": {
                  description: "Get users",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      schema = await SchemaValidation(testSchemaId, {
        zone: zone,
        name: "Test Schema",
        kind: "openapi_v3",
        source: JSON.stringify(updatedSchema),
        validationEnabled: false,
      });

      expect(schema.validationEnabled).toBe(false);
      expect(schema.updatedAt).toBeDefined();

      // Verify update via API
      const updatedGetResponse = await api.get(
        `/zones/${zone.id}/api_gateway/schemas/${schema.id}`,
      );
      expect(updatedGetResponse.status).toBe(200);

      const updatedSchemaData = ((await updatedGetResponse.json()) as any)
        .result;
      expect(updatedSchemaData.validation_enabled).toBe(false);
    } finally {
      await destroy(scope);

      // Verify schema deletion
      if (schema && zone) {
        await assertSchemaValidationDoesNotExist(api, zone.id, schema.id);
      }
    }
  });

  test("create schema validation with zone ID string", async (scope) => {
    const testZoneName = `${BRANCH_PREFIX}-schema-string-test.com`;
    const testSchemaId = `${BRANCH_PREFIX}-test-schema-string`;

    let zone: Zone | undefined;
    let schema: SchemaValidation | undefined;

    try {
      // Create a test zone first
      zone = await Zone(testZoneName, {
        name: testZoneName,
        type: "full",
      });

      const basicSchema = {
        openapi: "3.0.0",
        info: {
          title: "Basic API",
          version: "1.0.0",
        },
        paths: {
          "/api/ping": {
            get: {
              responses: {
                "200": {
                  description: "Pong",
                },
              },
            },
          },
        },
      };

      // Create schema validation using zone ID string
      schema = await SchemaValidation(testSchemaId, {
        zone: zone.id, // Use zone ID string instead of zone resource
        name: "Basic Schema",
        kind: "openapi_v3",
        source: JSON.stringify(basicSchema),
      });

      expect(schema.id).toBeDefined();
      expect(schema.zoneId).toBe(zone.id);
      expect(schema.name).toBe("Basic Schema");
      expect(schema.validationEnabled).toBe(true); // Should default to true
    } finally {
      await destroy(scope);
    }
  });

  test("validate schema format", async (scope) => {
    const testZoneName = `${BRANCH_PREFIX}-schema-validation-test.com`;
    const testSchemaId = `${BRANCH_PREFIX}-invalid-schema`;

    let zone: Zone | undefined;

    try {
      zone = await Zone(testZoneName, {
        name: testZoneName,
        type: "full",
      });

      // Test invalid JSON
      await expect(
        SchemaValidation(testSchemaId, {
          zone: zone,
          name: "Invalid Schema",
          kind: "openapi_v3",
          source: "invalid json",
        }),
      ).rejects.toThrow("Invalid OpenAPI schema");

      // Test non-OpenAPI JSON
      await expect(
        SchemaValidation(testSchemaId, {
          zone: zone,
          name: "Non-OpenAPI Schema",
          kind: "openapi_v3",
          source: JSON.stringify({ notOpenAPI: true }),
        }),
      ).rejects.toThrow("Schema must be a valid OpenAPI v3 specification");
    } finally {
      await destroy(scope);
    }
  });
});

async function assertSchemaValidationDoesNotExist(
  api: any,
  zoneId: string,
  schemaId: string,
): Promise<void> {
  const response = await api.get(
    `/zones/${zoneId}/api_gateway/schemas/${schemaId}`,
  );

  if (response.status !== 404) {
    throw new Error(
      `Expected schema validation ${schemaId} to not exist, but API returned status ${response.status}`,
    );
  }
}
