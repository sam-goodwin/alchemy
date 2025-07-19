import { unlink, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import type { OpenAPIV3 } from "openapi-types";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Schema, getSchema } from "../../src/cloudflare/schema.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import { findZoneForHostname } from "../../src/cloudflare/zone.ts";
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
  quiet: false,
});

const api = await createCloudflareApi({});

// Use existing zone instead of creating new ones
const ZONE_NAME = "alchemy-test.us";

const zoneId = (await findZoneForHostname(api, ZONE_NAME)).zoneId;

describe.sequential("Schema", () => {
  test("create and update schema with inline YAML", async (scope) => {
    let schema: Schema<string> | Schema<OpenAPIV3.Document> | undefined;
    let initialSchemaId: string | undefined;

    try {
      // Create schema with inline YAML using existing zone
      schema = await Schema(`${BRANCH_PREFIX}-yaml-schema`, {
        zone: ZONE_NAME,
        name: "test-api-schema",
        enabled: true,
        schema: `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /users:
    get:
      operationId: getUsers
      responses:
        '200':
          description: List of users
    post:
      operationId: createUser
      responses:
        '201':
          description: User created
  /users/{id}:
    get:
      operationId: getUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User details
    delete:
      operationId: deleteUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: User deleted
`,
      });
      initialSchemaId = schema.id;

      expect(schema.id).toBeTruthy();
      expect(schema).toMatchObject({
        name: "test-api-schema",
        kind: "openapi_v3",
        enabled: true,
        content: {
          info: {
            title: "Test API",
          },
        },
      });

      // Verify schema exists in Cloudflare
      await assertSchemaExists(schema.id, true);

      // Update schema validation setting (disable validation)
      schema = await Schema(`${BRANCH_PREFIX}-yaml-schema`, {
        zone: ZONE_NAME,
        schema: schema.content, // Use parsed content
        name: "test-api-schema", // Keep the same name
        enabled: false,
      });

      expect(schema).toMatchObject({
        enabled: false,
        name: "test-api-schema",
      });

      await assertSchemaExists(schema.id, false);
    } finally {
      await destroy(scope);
      await assertSchemaDeleted(initialSchemaId!);
      await assertSchemaDeleted(schema!.id);
    }
  });

  test("create schema from file URL", async (scope) => {
    let schema: Schema<URL>;

    try {
      // Create a temporary schema file
      const schemaPath = `/tmp/${BRANCH_PREFIX}-test-schema.yaml`;
      await writeFile(
        schemaPath,
        `
openapi: 3.0.0
info:
  title: File Test API
  version: 2.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /products:
    get:
      operationId: listProducts
      responses:
        '200':
          description: Product list
  /orders:
    post:
      operationId: createOrder
      responses:
        '201':
          description: Order created
`,
      );

      // Create schema from file URL using existing zone
      const fileUrl = new URL(`file://${schemaPath}`);
      schema = await Schema(`${BRANCH_PREFIX}-file-schema`, {
        zone: ZONE_NAME,
        name: "file-based-schema",
        enabled: false,
        schema: fileUrl,
      });

      expect(schema.id).toBeTruthy();
      expect(schema).toMatchObject({
        name: "file-based-schema",
        enabled: false,
        content: {
          info: {
            title: "File Test API",
          },
        },
      });

      // Clean up temp file
      await unlink(schemaPath);
    } finally {
      await destroy(scope);
    }
  });

  test("create schema with typed OpenAPI object", async (scope) => {
    let schema: Schema<OpenAPIV3.Document>;

    try {
      // Define a typed OpenAPI schema
      const apiSchema: OpenAPIV3.Document = {
        openapi: "3.0.0",
        info: {
          title: "Typed API",
          version: "1.0.0",
        },
        servers: [{ url: `https://${ZONE_NAME}` }],
        paths: {
          "/health": {
            get: {
              operationId: "healthCheck",
              responses: {
                "200": {
                  description: "Health check response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: { type: "string" },
                          timestamp: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/products": {
            get: {
              operationId: "listProducts",
              responses: {
                "200": {
                  description: "Product list",
                },
              },
            },
            post: {
              operationId: "createProduct",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                      },
                      required: ["name", "price"],
                    },
                  },
                },
              },
              responses: {
                "201": {
                  description: "Product created",
                },
              },
            },
          },
        },
      };

      // Create schema with typed object using existing zone
      schema = await Schema(`${BRANCH_PREFIX}-typed-schema`, {
        zone: ZONE_NAME,
        name: "typed-api-schema",
        kind: "openapi_v3",
        schema: apiSchema,
        enabled: true,
      });

      expect(schema.id).toBeTruthy();
      expect(schema).toMatchObject({
        name: "typed-api-schema",
        kind: "openapi_v3",
        enabled: true,
        content: apiSchema,
      });
    } finally {
      await destroy(scope);
    }
  });

  test("create schema with URL source", async (scope) => {
    let schema: Schema<URL>;

    try {
      // Create a temporary local HTTP server to serve the schema
      const schemaContent = `
openapi: 3.0.0
info:
  title: URL Test API
  version: 1.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /remote:
    get:
      operationId: getRemote
      responses:
        '200':
          description: Remote endpoint
`;

      const server = createServer((_req, res) => {
        res.writeHead(200, { "Content-Type": "text/yaml" });
        res.end(schemaContent);
      });

      await new Promise<void>((resolve) => {
        server.listen(0, () => resolve());
      });

      const address = server.address();
      if (!address || typeof address === "string") {
        throw new Error("Failed to start test server");
      }

      const schemaUrl = new URL(`http://localhost:${address.port}/schema.yaml`);

      try {
        // Create schema from URL using existing zone
        schema = await Schema(`${BRANCH_PREFIX}-url-schema`, {
          zone: ZONE_NAME,
          schema: schemaUrl,
          name: "url-based-schema",
          enabled: true,
        });

        expect(schema.id).toBeTruthy();
        expect(schema).toMatchObject({
          name: "url-based-schema",
          enabled: true,
          content: {
            info: {
              title: "URL Test API",
            },
          },
        });
      } finally {
        server.close();
      }
    } finally {
      await destroy(scope);
    }
  });

  test("error handling for invalid schema", async (scope) => {
    try {
      // Test invalid YAML
      await expect(
        Schema(`${BRANCH_PREFIX}-invalid-yaml`, {
          zone: ZONE_NAME,
          schema: "invalid: yaml: content: [unclosed",
          name: "invalid-schema",
        }),
      ).rejects.toThrow();

      // Test invalid URL (this should fail when fetching)
      await expect(
        Schema(`${BRANCH_PREFIX}-invalid-url`, {
          zone: ZONE_NAME,
          schema: new URL("http://non-existent-domain-12345.com/schema.yaml"),
          name: "invalid-url-schema",
        }),
      ).rejects.toThrow();
    } finally {
      await destroy(scope);
    }
  });
});

async function assertSchemaExists(id: string, enabled: boolean) {
  const cloudflareSchema = await getSchema(api, zoneId, id);
  expect(cloudflareSchema).toBeTruthy();
  expect(cloudflareSchema?.validationEnabled).toBe(enabled);
}

async function assertSchemaDeleted(id: string) {
  const cloudflareSchema = await getSchema(api, zoneId, id);
  expect(cloudflareSchema).toBe(null);
}
