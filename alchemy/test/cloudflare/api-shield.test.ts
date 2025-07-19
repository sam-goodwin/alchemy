import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { getOperations } from "../../src/cloudflare/api-gateway-operation.ts";
import {
  ApiShield,
  getGlobalSettingsForZone,
} from "../../src/cloudflare/api-shield.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Schema } from "../../src/cloudflare/schema.ts";
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

describe.sequential("ApiShield", () => {
  test("create and update schema validation with default actions", async (scope) => {
    let schema: Schema<string>;
    let shield: ApiShield;

    try {
      // Create schema first using existing zone
      schema = await Schema(`${BRANCH_PREFIX}-api-shield-schema`, {
        zone: ZONE_NAME,
        schema: `
openapi: 3.0.0
info:
  title: API Shield Test API
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
      responses:
        '200':
          description: User details
    delete:
      operationId: deleteUser
      responses:
        '204':
          description: User deleted
`,
        name: "api-shield-test-schema",
        enabled: true,
      });

      // Create schema validation using the schema
      shield = await ApiShield(`${BRANCH_PREFIX}-validation`, {
        zone: ZONE_NAME,
        schema,
        defaultMitigation: "none",
      });

      // expect(shield).toMatchObject({
      //   zoneId: zoneId,
      //   operations: expect.arrayContaining([
      //     expect.objectContaining({
      //       method: "delete",
      //       endpoint: "/users/{id}",
      //       mitigation: "none",
      //     }),
      //     expect.objectContaining({
      //       method: "get",
      //       endpoint: "/users",
      //       mitigation: "none",
      //     }),
      //     expect.objectContaining({
      //       method: "get",
      //       endpoint: "/users/{id}",
      //       mitigation: "none",
      //     }),
      //     expect.objectContaining({
      //       method: "post",
      //       endpoint: "/users",
      //       mitigation: "none",
      //     }),
      //   ]),
      // });

      // Verify that operations were created correctly from the schema
      await expectOperations(shield, [
        { method: "delete", endpoint: "/users/{id}", mitigation: "none" },
        { method: "get", endpoint: "/users", mitigation: "none" },
        { method: "get", endpoint: "/users/{id}", mitigation: "none" },
        { method: "post", endpoint: "/users", mitigation: "none" },
      ]);

      await assertZoneOperations(zoneId, [
        {
          method: "GET",
          host: "alchemy-test.us",
          endpoint: "/users",
          mitigation: "none",
        },
        {
          method: "POST",
          host: "alchemy-test.us",
          endpoint: "/users",
          mitigation: "none",
        },
        {
          method: "DELETE",
          host: "alchemy-test.us",
          endpoint: "/users/{var1}",
          mitigation: "none",
        },
        {
          method: "GET",
          host: "alchemy-test.us",
          endpoint: "/users/{var1}",
          mitigation: "none",
        },
      ]);

      // Update with operation overrides using path-based configuration
      shield = await ApiShield(`${BRANCH_PREFIX}-validation`, {
        zone: ZONE_NAME,
        schema,
        defaultMitigation: "none",
        mitigations: {
          "/users": {
            get: "none",
            post: "block",
          },
          "/users/{id}": {
            get: "none",
            delete: "block",
          },
        },
        unknownOperationMitigation: "none",
      });

      await expectOperations(shield, [
        { method: "delete", endpoint: "/users/{id}", mitigation: "block" },
        { method: "get", endpoint: "/users", mitigation: "none" },
        { method: "get", endpoint: "/users/{id}", mitigation: "none" },
        { method: "post", endpoint: "/users", mitigation: "block" },
      ]);

      // Verify global settings
      const globalSettings = await getGlobalSettingsForZone(api, zoneId);
      expect(globalSettings.validation_default_mitigation_action).toBe("none");
      expect(globalSettings.validation_override_mitigation_action).toBe("none");
    } finally {
      console.log("destroying scope");
      await destroy(scope);
    }
  });

  test("mixed action configuration with partial route overrides", async (scope) => {
    let schema: Schema<string>;
    let shield: ApiShield;

    try {
      // Create schema with mixed operations
      schema = await Schema(`${BRANCH_PREFIX}-mixed-schema`, {
        zone: ZONE_NAME,
        schema: `
openapi: 3.0.0
info:
  title: Mixed Actions API
  version: 1.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /users:
    get:
      operationId: getUsers
      responses:
        '200':
          description: Success
    post:
      operationId: createUser
      responses:
        '201':
          description: Success
  /products:
    get:
      operationId: getProducts
      responses:
        '200':
          description: Success
    post:
      operationId: createProduct
      responses:
        '201':
          description: Success
  /admin:
    get:
      operationId: getAdmin
      responses:
        '200':
          description: Success
    post:
      operationId: adminAction
      responses:
        '200':
          description: Success
`,
        name: "mixed-actions-schema",
        enabled: true,
      });

      // Create schema validation with mixed action configuration
      shield = await ApiShield(`${BRANCH_PREFIX}-mixed-validation`, {
        zone: ZONE_NAME,
        schema,
        defaultMitigation: "none", // Default action
        mitigations: {
          // Override specific routes/methods
          "/users": "none", // Blanket action for all methods on /users
          "/admin": "block", // Block all admin operations
          "/products": {
            get: "none", // Allow product reads
            post: "block", // Block product creation
          },
        },
      });

      // Verify mixed actions:
      // - /users/* should be "none" (blanket override)
      // - /admin/* should be "block" (blanket override)
      // - /products/get should be "none", /products/post should be "block" (per-method)
      await expectOperations(shield, [
        { method: "get", endpoint: "/admin", mitigation: "block" }, // Blanket admin block
        { method: "get", endpoint: "/products", mitigation: "none" }, // Per-method override
        { method: "get", endpoint: "/users", mitigation: "none" }, // Blanket override
        { method: "post", endpoint: "/admin", mitigation: "block" }, // Blanket admin block
        { method: "post", endpoint: "/products", mitigation: "block" }, // Per-method override
        { method: "post", endpoint: "/users", mitigation: "none" }, // Blanket override
      ]);
    } finally {
      await destroy(scope);
    }
  });

  test("schema change with operation removal", async (scope) => {
    let schema: Schema<string>;
    let updatedSchema: Schema<string>;
    let shield: ApiShield;

    try {
      // Create initial schema with multiple operations
      schema = await Schema(`${BRANCH_PREFIX}-change-schema`, {
        zone: ZONE_NAME,
        schema: `
openapi: 3.0.0
info:
  title: Initial API
  version: 1.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /users:
    get:
      operationId: getUsers
      responses:
        '200':
          description: Success
    post:
      operationId: createUser
      responses:
        '201':
          description: Success
  /products:
    get:
      operationId: getProducts
      responses:
        '200':
          description: Success
    delete:
      operationId: deleteProduct
      responses:
        '204':
          description: Success
  /legacy:
    get:
      operationId: getLegacy
      responses:
        '200':
          description: Success
`,
        name: "change-schema",
        enabled: true,
      });

      // Create initial validation
      shield = await ApiShield(`${BRANCH_PREFIX}-change-validation`, {
        zone: ZONE_NAME,
        schema,
        defaultMitigation: "none",
      });

      // Verify all initial operations are created
      await expectOperations(shield, [
        { method: "delete", endpoint: "/products", mitigation: "none" },
        { method: "get", endpoint: "/legacy", mitigation: "none" },
        { method: "get", endpoint: "/products", mitigation: "none" },
        { method: "get", endpoint: "/users", mitigation: "none" },
        { method: "post", endpoint: "/users", mitigation: "none" },
      ]);

      // Create updated schema with reduced operations (remove /legacy endpoint)
      updatedSchema = await Schema(`${BRANCH_PREFIX}-updated-change-schema`, {
        zone: ZONE_NAME,
        schema: `
openapi: 3.0.0
info:
  title: Updated API
  version: 2.0.0
servers:
  - url: https://${ZONE_NAME}
paths:
  /users:
    get:
      operationId: getUsers
      responses:
        '200':
          description: Success
    post:
      operationId: createUser
      responses:
        '201':
          description: Success
  /products:
    get:
      operationId: getProducts
      responses:
        '200':
          description: Success
    delete:
      operationId: deleteProduct
      responses:
        '204':
          description: Success
`,
        name: "updated-change-schema",
        enabled: true,
      });

      // Update validation with the new schema
      shield = await ApiShield(`${BRANCH_PREFIX}-change-validation`, {
        zone: ZONE_NAME,
        schema: updatedSchema,
        defaultMitigation: "none",
        mitigations: {
          "/products": {
            delete: "block", // Override delete action
          },
        },
      });

      // Verify only the remaining operations exist with updated actions
      await expectOperations(shield, [
        { method: "delete", endpoint: "/products", mitigation: "block" }, // Overridden action
        { method: "get", endpoint: "/products", mitigation: "none" }, // Default action
        { method: "get", endpoint: "/users", mitigation: "none" }, // Default action
        { method: "post", endpoint: "/users", mitigation: "none" }, // Default action
      ]);
    } finally {
      await destroy(scope);
    }
  });
});

// Helper function for clean operation testing
async function expectOperations(
  shield: ApiShield,
  expected: Array<{ method: string; endpoint: string; mitigation: string }>,
) {
  const operations = await getOperations(api, shield.zoneId);
  // console.log({
  //   actual: operations,
  //   expected,
  // });
  // Sort operations for consistent comparison
  const sorted = operations.sort((a, b) => {
    const aKey = `${a.endpoint}-${a.method}`;
    const bKey = `${b.endpoint}-${b.method}`;
    return aKey.localeCompare(bKey);
  });

  // Sort expected operations the same way
  const sortedExpected = expected.sort((a, b) =>
    `${a.endpoint}-${a.method}`.localeCompare(`${b.endpoint}-${b.method}`),
  );

  // Check length
  expect(sorted.length).toBe(sortedExpected.length);

  // Check each operation
  for (let i = 0; i < sorted.length; i++) {
    const actual = sorted[i];
    const exp = sortedExpected[i];

    expect(actual.method.toLowerCase()).toBe(exp.method.toLowerCase());
    expect(actual.endpoint).toBe(exp.endpoint);

    expect(actual.mitigation_action).toBe(exp.mitigation);
    expect(actual.operation_id).toBeTruthy();
  }
}

async function assertZoneOperations(zoneId: string, operations: any[]) {
  let startTime = Date.now();
  // Also verify that operations exist in Cloudflare
  let cloudflareOperations = await getOperations(api, zoneId);
  while (cloudflareOperations.length !== operations.length) {
    // loop for eventual consistency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cloudflareOperations = await getOperations(api, zoneId);
    if (Date.now() - startTime > 30000) {
      throw new Error("Timeout waiting for operations to be created");
    }
  }
  cloudflareOperations.sort((a, b) => {
    const endpointCompare = a.endpoint.localeCompare(b.endpoint);
    if (endpointCompare !== 0) return endpointCompare;
    return a.method.localeCompare(b.method);
  });
  expect(cloudflareOperations).toMatchObject(operations);
}
