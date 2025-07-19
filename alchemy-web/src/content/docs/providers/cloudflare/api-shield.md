---
title: ApiShield
description: Learn how to protect your APIs by validating incoming requests against OpenAPI schemas using Cloudflare API Shield API Shield.
---

[Cloudflare API Shield](https://developers.cloudflare.com/api-shield/security/schema-validation/) validates incoming API requests against an OpenAPI v3 schema, helping prevent malformed requests and potential security issues.

## Minimal Example

Upload an OpenAPI schema and enable validation with default settings:

```ts
import { ApiShield, Zone } from "alchemy/cloudflare";

const zone = await Zone("my-zone", {
  name: "api.example.com",
});

const shield = await ApiShield("shield", {
  zone,
  schema: `
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
servers:
  - url: https://api.example.com
paths:
  /users:
    get:
      operationId: getUsers
      responses:
        '200':
          description: List of users
  `,
});
```

:::tip
Remember to include the `servers` array in your OpenAPI schema! Cloudflare requires either a global `servers` definition or per-operation servers to construct endpoint URLs.
:::

## Using Typed OpenAPI Objects

Get full TypeScript support by using typed OpenAPI objects instead of YAML strings:

```ts
import type { OpenAPIV3 } from "openapi-types";

const apiSchema: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
  servers: [{ url: "https://api.example.com" }],
  paths: {
    "/products": {
      get: {
        operationId: "listProducts",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" }
        }
      }
    }
  }
};

const shield = await ApiShield("shield", {
  zone,
  schema: apiSchema,  // Alchemy automatically converts to YAML
  defaultAction: "none",
});
```

:::note
Cloudflare only supports OpenAPI v3.0.x, not OpenAPI v3.1.
:::

## Schema from File

Load an OpenAPI schema from an external file:

```ts
const shield = await ApiShield("shield", {
  zone: "api.example.com",
  schemaFile: "./openapi.yaml",
  name: "production-api-v2",
  defaultAction: "none",
});
```

## Understanding Validation Actions

API Shield supports three mitigation actions:

### `none` - Monitor Only (Free)
The default action that takes no action on non-compliant requests. Perfect for understanding your API traffic patterns without affecting users.

```ts
const shield = await ApiShield("monitor-only", {
  zone,
  schemaFile: "./openapi.yaml",
  defaultAction: "none",  // Monitor without blocking
});
```

### `log` - Log Violations (Requires Paid Plan)
Records details about non-compliant requests in your Cloudflare logs while still allowing them through. Great for debugging and gradual rollout.

### `block` - Enforce Schema (Requires Paid Plan)  
Rejects non-compliant requests with a 400 error. Use this for production APIs where schema compliance is critical.

:::tip[Progressive Rollout]
Start with `defaultAction: "none"` to understand your traffic patterns. Then use path-specific actions to gradually increase protection:
1. Begin with `"none"` for all endpoints to monitor traffic
2. Add `"log"` for critical paths to track violations
3. Finally use `"block"` for sensitive operations once you're confident in your schema
:::

## Path-Level Controls

Set different validation actions for specific API paths and methods. Use the exact path patterns from your OpenAPI schema:

```ts
const shield = await ApiShield("shield", {
  zone,
  schemaFile: "./openapi.yaml",
  defaultAction: "none",
  actions: {
    "/users": {
      get: "none",           // No action for read operations
      post: "log",           // Log violations for writes (paid plan)
      delete: "block",       // Block destructive operations (paid plan)
    },
    "/admin": "block",       // Block all methods on admin endpoints
    "/public": "none",       // Allow all methods on public endpoints
  },
  unknownOperationAction: "block", // Block unrecognized endpoints
});
```

:::tip[Path Matching]
The paths in the `actions` object must exactly match the paths defined in your OpenAPI schema. For example, if your schema defines `/users/{id}`, use that exact pattern including the `{id}` parameter placeholder.
:::

## Blanket Actions vs Per-Method Actions

You can configure validation actions in two ways:

### Blanket Actions
Apply the same action to all HTTP methods on a path:

```ts
const shield = await ApiShield("blanket-actions", {
  zone,
  schemaFile: "./openapi.yaml",
  defaultAction: "none",
  actions: {
    "/admin": "block",       // Block ALL methods (GET, POST, PUT, DELETE, etc.)
    "/public": "none",       // Allow ALL methods
    "/internal": "log",      // Log ALL methods
  },
});
```

### Per-Method Actions
Fine-tune actions for specific HTTP methods:

```ts
const shield = await ApiShield("granular-actions", {
  zone,
  schemaFile: "./openapi.yaml",
  defaultAction: "none",
  actions: {
    "/users": {
      get: "none",           // Allow reading users
      post: "log",           // Log user creation
      put: "log",            // Log user updates
      delete: "block",       // Block user deletion
    },
    "/users/{id}/profile": {
      get: "none",
      patch: "log",
    },
  },
});
```

### Mixed Configuration
You can combine both approaches in the same configuration:

```ts
const shield = await ApiShield("mixed-actions", {
  zone,
  schemaFile: "./openapi.yaml",
  defaultAction: "none",
  actions: {
    "/admin": "block",       // Blanket block for admin
    "/public": "none",       // Blanket allow for public
    "/api/v1/users": {       // Granular control for users
      get: "none",
      post: "log",
      delete: "block",
    },
  },
});
```

## Monitoring Without Impact

Use validation in monitoring mode to understand your API traffic:

```ts
const monitoring = await ApiShield("api-monitoring", {
  zone,
  schemaFile: "./api-schema.json",
  defaultAction: "none",
  enableValidation: true,
});
```

## Logging Violations

Track non-compliant requests in your logs without blocking them:

```ts
const withLogging = await ApiShield("api-logging", {
  zone,
  schemaFile: "./api-schema.json",
  defaultAction: "log",  // Requires paid plan
});
```

:::tip
Use Cloudflare's log analytics to identify patterns in schema violations before enabling blocking.
:::

## Protecting Critical Endpoints

Apply stricter validation to sensitive operations while monitoring others:

```ts
const criticalProtection = await ApiShield("api-protection", {
  zone,
  schemaFile: "./api-schema.json",
  defaultAction: "log",
  actions: {
    // Financial operations require strict validation - block all methods
    "/payments": "block",
    "/refunds": "block",
    
    // User management endpoints - selective protection
    "/users/{id}": {
      delete: "block",       // Block user deletion
      put: "block",          // Block user updates
      get: "none",           // Allow user retrieval
    },
    "/users/{id}/role": "block", // Block all role operations
    
    // Public endpoints can be more lenient
    "/users": "none",        // Allow all user listing operations
    "/products": "none",     // Allow all product operations
  },
});
```

## Full API Protection

Enable complete schema enforcement for production APIs:

```ts
const fullProtection = await ApiShield("api-enforcement", {
  zone,
  schemaFile: "./api-schema.json",
  defaultAction: "block",              // Block non-compliant requests
  unknownOperationAction: "block",     // Block undefined endpoints
});
```

## Handling Maintenance Windows

Temporarily disable validation during deployments or troubleshooting:

```ts
const shield = await ApiShield("shield", {
  zone,
  schemaFile: "./openapi.yaml",
  enableValidation: false, // Schema uploaded but validation disabled
  defaultAction: "none",
});
```

:::note
The schema remains uploaded even when validation is disabled, making it easy to re-enable without re-uploading.
:::

## Working with External References

While Cloudflare doesn't support external `$ref` files, you can still organize your schemas:

```ts
// Build your schema programmatically
const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" }
  }
};

const apiSchema: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: { title: "My API", version: "1.0.0" },
  servers: [{ url: "https://api.example.com" }],
  paths: {
    "/users": {
      get: {
        operationId: "getUsers",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: userSchema  // Reuse schema objects
                }
              }
            }
          }
        }
      }
    }
  }
};
```

## Content Type Support

:::important
Cloudflare currently only validates `application/json` request bodies. Other content types like `multipart/form-data` or `application/xml` are not validated.
:::

For APIs using multiple content types:

```ts
const shield = await ApiShield("mixed-content-api", {
  zone,
  schema: apiSchema,
  defaultAction: "none",  // Won't block non-JSON requests
  actions: {
    // Only JSON endpoints will be validated
    "/users": {
      post: "block",            // JSON endpoint for user creation
    },
    "/files/upload": "none",    // Multipart endpoint - won't be validated
  }
});
```