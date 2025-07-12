---
title: Cloudflare API Shield Schema Validation
description: Learn how to manage OpenAPI v3 schemas for validating API requests against your API specifications using Cloudflare API Shield.
---

# Schema Validation

A [Cloudflare API Shield Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) resource manages OpenAPI v3 schemas for validating API requests against your defined API specifications.

## Minimal Example

Create a basic schema validation for a simple API:

```ts
import { SchemaValidation } from "alchemy/cloudflare";

const schema = await SchemaValidation("api-schema", {
  zone: "example.com",
  name: "My API Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    paths: {
      "/api/users": {
        get: {
          responses: { "200": { description: "Success" } }
        }
      }
    }
  }),
  validationEnabled: true
});
```

## Schema with Zone Resource Reference

Reference an existing Zone resource:

```ts
import { Zone, SchemaValidation } from "alchemy/cloudflare";

const zone = await Zone("example.com", { name: "example.com" });

const schema = await SchemaValidation("api-schema", {
  zone: zone,
  name: "My API Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    paths: {
      "/api/health": {
        get: {
          responses: { "200": { description: "Health check" } }
        }
      }
    }
  })
});
```

## Complex API Schema

Create a comprehensive schema for a REST API with request/response validation:

```ts
import { SchemaValidation } from "alchemy/cloudflare";

const complexSchema = await SchemaValidation("rest-api-schema", {
  zone: "api.example.com",
  name: "REST API Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "My REST API",
      version: "2.0.0",
      description: "A comprehensive REST API"
    },
    paths: {
      "/api/users": {
        get: {
          parameters: [
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", minimum: 1, maximum: 100 }
            }
          ],
          responses: {
            "200": {
              description: "Users list",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          }
        },
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateUser" }
              }
            }
          },
          responses: {
            "201": { description: "User created" }
          }
        }
      }
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            name: { type: "string" }
          }
        },
        CreateUser: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: { type: "string", format: "email" },
            name: { type: "string", minLength: 1 }
          }
        }
      }
    }
  }),
  validationEnabled: true
});
```

## Disable Validation

Create a schema but disable validation (useful for testing):

```ts
import { SchemaValidation } from "alchemy/cloudflare";

const testSchema = await SchemaValidation("test-schema", {
  zone: "staging.example.com",
  name: "Test Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "Test API", version: "1.0.0" },
    paths: {
      "/test": {
        get: {
          responses: { "200": { description: "Test endpoint" } }
        }
      }
    }
  }),
  validationEnabled: false
});
```

## Using with API Gateway Operations

Combine with API Gateway Operations for comprehensive API protection:

```ts
import { 
  Zone, 
  SchemaValidation, 
  ApiGatewayOperation 
} from "alchemy/cloudflare";

const zone = await Zone("api.example.com", { name: "api.example.com" });

// Create the schema
const schema = await SchemaValidation("users-schema", {
  zone: zone,
  name: "Users API Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "Users API", version: "1.0.0" },
    paths: {
      "/api/users": {
        get: {
          responses: { "200": { description: "Users list" } }
        }
      }
    }
  })
});

// Configure the API operation to use the schema
const operation = await ApiGatewayOperation("users-get", {
  zone: zone,
  endpoint: "/api/users",
  host: "api.example.com",
  method: "GET",
  features: {
    schemaValidation: {
      enabled: true,
      schema: schema,
      mitigationAction: "block"
    }
  }
});
```

## Properties

### Input Properties

- **zone** (required): The zone where this schema will be applied. Can be a Zone resource or zone ID string.
- **name** (required): The name of the schema for identification.
- **kind** (required): The kind of schema. Currently only "openapi_v3" is supported.
- **source** (required): The OpenAPI v3 schema content as a JSON string.
- **validationEnabled** (optional): Whether validation is enabled for this schema. Defaults to true.

### Output Properties

- **id**: The unique identifier of the schema.
- **zoneId**: The zone ID where this schema is applied.
- **name**: The name of the schema.
- **kind**: The kind of schema ("openapi_v3").
- **source**: The OpenAPI v3 schema content.
- **validationEnabled**: Whether validation is enabled.
- **createdAt**: Time at which the schema was created.
- **updatedAt**: Time at which the schema was last modified.

## Notes

- Schema name and kind are immutable after creation
- The OpenAPI schema is validated for proper v3 format during creation
- Schemas can be referenced by API Gateway Operations for request validation
- Validation can be toggled on/off without recreating the schema

> [!TIP]
> Use Schema Validation with [API Gateway Operations](./api-gateway-operation.md) to implement comprehensive API security and validation.