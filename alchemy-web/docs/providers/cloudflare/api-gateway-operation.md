---
title: Cloudflare API Gateway Operation
description: Learn how to configure API endpoints with Cloudflare API Shield security features like schema validation and sequence mitigation.
---

# API Gateway Operation

A [Cloudflare API Gateway Operation](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/) represents an API endpoint with its associated API Shield security features like schema validation and sequence mitigation.

## Minimal Example

Create a simple API operation without any shield features:

```ts
import { ApiGatewayOperation } from "alchemy/cloudflare";

const basicOperation = await ApiGatewayOperation("users-get", {
  zone: "api.example.com",
  endpoint: "/api/users",
  host: "api.example.com",
  method: "GET"
});
```

## Operation with Schema Validation

Create an operation with schema validation enabled:

```ts
import { SchemaValidation, ApiGatewayOperation } from "alchemy/cloudflare";

const schema = await SchemaValidation("users-schema", {
  zone: "api.example.com",
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

const operation = await ApiGatewayOperation("users-get", {
  zone: "api.example.com",
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

## Comprehensive API Shield Configuration

Create an operation with multiple API Shield features:

```ts
import { ApiGatewayOperation } from "alchemy/cloudflare";

const operation = await ApiGatewayOperation("api-post-users", {
  zone: "api.example.com",
  endpoint: "/api/users",
  host: "api.example.com",
  method: "POST",
  features: {
    schemaValidation: {
      enabled: true,
      schema: "schema-id-123", // Reference by schema ID
      mitigationAction: "block"
    },
    sequenceMitigation: {
      enabled: true,
      mitigationAction: "log"
    },
    parameterSchemas: {
      "user_id": {
        type: "string",
        pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
      },
      "limit": {
        type: "integer",
        minimum: 1,
        maximum: 100
      }
    }
  }
});
```

## Multiple Operations for an API

Create multiple operations for different endpoints of the same API:

```ts
import { Zone, ApiGatewayOperation } from "alchemy/cloudflare";

const zone = await Zone("api.example.com", { name: "api.example.com" });

const getUsers = await ApiGatewayOperation("get-users", {
  zone: zone,
  endpoint: "/api/users",
  host: "api.example.com",
  method: "GET",
  features: {
    schemaValidation: { enabled: true, mitigationAction: "log" }
  }
});

const createUser = await ApiGatewayOperation("create-user", {
  zone: zone,
  endpoint: "/api/users",
  host: "api.example.com",
  method: "POST",
  features: {
    schemaValidation: { enabled: true, mitigationAction: "block" },
    sequenceMitigation: { enabled: true, mitigationAction: "log" }
  }
});

const deleteUser = await ApiGatewayOperation("delete-user", {
  zone: zone,
  endpoint: "/api/users/{id}",
  host: "api.example.com",
  method: "DELETE",
  features: {
    parameterSchemas: {
      "id": {
        type: "string",
        pattern: "^[0-9]+$"
      }
    }
  }
});
```

## REST API with Full CRUD Operations

Configure a complete REST API with different shield features for each operation:

```ts
import { 
  Zone, 
  SchemaValidation, 
  ApiGatewayOperation 
} from "alchemy/cloudflare";

const zone = await Zone("api.example.com", { name: "api.example.com" });

// Create schemas for different operations
const getUsersSchema = await SchemaValidation("get-users-schema", {
  zone: zone,
  name: "Get Users Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "Get Users API", version: "1.0.0" },
    paths: {
      "/api/users": {
        get: {
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer" } }
          ],
          responses: { "200": { description: "Users list" } }
        }
      }
    }
  })
});

const createUserSchema = await SchemaValidation("create-user-schema", {
  zone: zone,
  name: "Create User Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "Create User API", version: "1.0.0" },
    paths: {
      "/api/users": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "name"],
                  properties: {
                    email: { type: "string", format: "email" },
                    name: { type: "string", minLength: 1 }
                  }
                }
              }
            }
          },
          responses: { "201": { description: "User created" } }
        }
      }
    }
  })
});

// Configure operations
const operations = await Promise.all([
  // GET /api/users - with schema validation
  ApiGatewayOperation("get-users", {
    zone: zone,
    endpoint: "/api/users",
    host: "api.example.com",
    method: "GET",
    features: {
      schemaValidation: {
        enabled: true,
        schema: getUsersSchema,
        mitigationAction: "log"
      }
    }
  }),

  // POST /api/users - with strict validation and sequence monitoring
  ApiGatewayOperation("create-user", {
    zone: zone,
    endpoint: "/api/users",
    host: "api.example.com",
    method: "POST",
    features: {
      schemaValidation: {
        enabled: true,
        schema: createUserSchema,
        mitigationAction: "block"
      },
      sequenceMitigation: {
        enabled: true,
        mitigationAction: "log"
      }
    }
  }),

  // PUT /api/users/{id} - with parameter validation
  ApiGatewayOperation("update-user", {
    zone: zone,
    endpoint: "/api/users/{id}",
    host: "api.example.com",
    method: "PUT",
    features: {
      parameterSchemas: {
        "id": {
          type: "string",
          pattern: "^[0-9]+$"
        }
      },
      sequenceMitigation: {
        enabled: true,
        mitigationAction: "log"
      }
    }
  }),

  // DELETE /api/users/{id} - with parameter validation only
  ApiGatewayOperation("delete-user", {
    zone: zone,
    endpoint: "/api/users/{id}",
    host: "api.example.com",
    method: "DELETE",
    features: {
      parameterSchemas: {
        "id": {
          type: "string",
          pattern: "^[0-9]+$"
        }
      }
    }
  })
]);
```

## Mitigation Actions

Configure different actions when security features detect violations:

```ts
import { ApiGatewayOperation } from "alchemy/cloudflare";

// Block requests that fail validation (strict mode)
const strictOperation = await ApiGatewayOperation("strict-api", {
  zone: "api.example.com",
  endpoint: "/api/critical",
  host: "api.example.com",
  method: "POST",
  features: {
    schemaValidation: {
      enabled: true,
      schema: "critical-schema-id",
      mitigationAction: "block" // Block invalid requests
    },
    sequenceMitigation: {
      enabled: true,
      mitigationAction: "block" // Block sequence violations
    }
  }
});

// Log violations but allow requests (monitoring mode)
const monitoringOperation = await ApiGatewayOperation("monitoring-api", {
  zone: "api.example.com",
  endpoint: "/api/monitoring",
  host: "api.example.com",
  method: "GET",
  features: {
    schemaValidation: {
      enabled: true,
      schema: "monitoring-schema-id",
      mitigationAction: "log" // Log but don't block
    },
    sequenceMitigation: {
      enabled: true,
      mitigationAction: "log" // Log but don't block
    }
  }
});
```

## Properties

### Input Properties

- **zone** (required): The zone where this operation will be applied. Can be a Zone resource or zone ID string.
- **endpoint** (required): The API endpoint path (e.g., "/api/users", "/v1/health").
- **host** (required): The hostname for this operation.
- **method** (required): The HTTP method ("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS").
- **features** (optional): API Shield features configuration:
  - **schemaValidation**: Schema validation configuration
    - **enabled**: Whether schema validation is enabled
    - **schema**: The schema to use (SchemaValidation resource or schema ID string)
    - **mitigationAction**: Action to take on validation failure ("log" or "block", defaults to "log")
  - **sequenceMitigation**: Sequence mitigation configuration
    - **enabled**: Whether sequence mitigation is enabled
    - **mitigationAction**: Action to take on sequence violations ("log" or "block", defaults to "log")
  - **parameterSchemas**: Parameter validation schemas (key-value pairs of parameter names to JSON schemas)

### Output Properties

- **id**: The unique identifier of the operation.
- **zoneId**: The zone ID where this operation is applied.
- **endpoint**: The API endpoint path.
- **host**: The hostname for this operation.
- **method**: The HTTP method for this operation.
- **features**: Configured API Shield features with their current settings.
- **createdAt**: Time at which the operation was created.
- **updatedAt**: Time at which the operation was last modified.

## HTTP Methods

Supported HTTP methods:
- `GET` - Retrieve data
- `POST` - Create new resources
- `PUT` - Update existing resources
- `DELETE` - Remove resources
- `PATCH` - Partial updates
- `HEAD` - Headers only
- `OPTIONS` - CORS preflight requests

## Mitigation Actions

- **log**: Log security violations but allow the request to proceed
- **block**: Block requests that trigger security violations

## Notes

- Endpoint, host, and method are immutable after operation creation
- Multiple operations can be created for the same endpoint with different methods
- Schema validation requires a valid OpenAPI v3 schema
- Parameter schemas use standard JSON Schema format
- Sequence mitigation helps detect API abuse patterns

> [!TIP]
> Use API Gateway Operations with [Schema Validation](./schema-validation.md) resources for comprehensive API security and validation.

> [!TIP]
> Start with "log" mitigation action to monitor your API behavior before switching to "block" mode.