# Cloudflare

Cloudflare is a global cloud platform that provides a wide range of network, security, and performance services. Alchemy provides comprehensive resource support for Cloudflare's services including Workers, DNS, storage, security features, and more.

[Official Cloudflare Documentation](https://developers.cloudflare.com/)

## Resources

- [Account API Token](./account-api-token.md) - Manage API tokens for Cloudflare account access
- [Account ID](./account-id.md) - Reference Cloudflare account identifiers
- [AI Gateway](./ai-gateway.md) - Proxy and manage AI model requests
- [AI](./ai.md) - Cloudflare AI services and models
- [Analytics Engine](./analytics-engine.md) - Real-time analytics and metrics storage
- [API Gateway Operation](./api-gateway-operation.md) - Configure API endpoints with Shield security features
- [Assets](./assets.md) - Static asset hosting and management
- [Browser Rendering](./browser-rendering.md) - Headless browser automation service
- [Bucket](./bucket.md) - R2 object storage buckets
- [Container](./container.md) - Container registry and management
- [Custom Domain](./custom-domain.md) - Custom domain configuration for Workers
- [D1 Database](./d1-database.md) - Serverless SQL database
- [Dispatch Namespace](./dispatch-namespace.md) - Workers for Platforms namespaces
- [DNS Records](./dns-records.md) - DNS record management
- [Durable Object Namespace](./durable-object-namespace.md) - Durable object storage and coordination
- [Email Address](./email-address.md) - Email routing addresses
- [Email Catch All](./email-catch-all.md) - Catch-all email forwarding rules
- [Email Routing](./email-routing.md) - Email routing configuration
- [Email Rule](./email-rule.md) - Email processing and routing rules
- [Hyperdrive](./hyperdrive.md) - Database connection pooling and acceleration
- [Images](./images.md) - Image optimization and transformation
- [KV Namespace](./kv-namespace.md) - Key-value storage
- [Nuxt](./nuxt.md) - Nuxt.js application deployment
- [Permission Groups](./permission-groups.md) - Access control and permission management
- [Pipeline](./pipeline.md) - CI/CD pipeline configuration
- [Queue Consumer](./queue-consumer.md) - Message queue consumers
- [Queue](./queue.md) - Message queues for async processing
- [Redwood](./redwood.md) - RedwoodJS application deployment
- [Route](./route.md) - Worker routing rules
- [Schema Validation](./schema-validation.md) - API Shield OpenAPI schema validation
- [Secret Key](./secret-key.md) - Secret encryption key management
- [Secret](./secret.md) - Secret value storage
- [Secrets Store](./secrets-store.md) - Centralized secrets management
- [Tanstack Start](./tanstack-start.md) - TanStack Start application deployment
- [Vite](./vite.md) - Vite application deployment
- [Website](./website.md) - Static website hosting
- [Worker](./worker.md) - Serverless functions at the edge
- [Workflow](./workflow.md) - Workflow orchestration and automation
- [Wrangler.json](./wrangler.json.md) - Wrangler configuration files
- [Zone](./zone.md) - DNS zone management

## Example Usage

```ts
import {
  Zone,
  Worker,
  KVNamespace,
  SchemaValidation,
  ApiGatewayOperation,
} from "alchemy/cloudflare";

// Create a zone for your domain
const zone = await Zone("my-zone", {
  name: "example.com",
  type: "full",
});

// Create a KV namespace for caching
const cache = await KVNamespace("api-cache", {
  title: "API Cache Storage",
});

// Create an API schema for validation
const apiSchema = await SchemaValidation("api-schema", {
  zone: zone,
  name: "My API Schema",
  kind: "openapi_v3",
  source: JSON.stringify({
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    paths: {
      "/api/users": {
        get: {
          responses: { "200": { description: "Users list" } }
        }
      }
    }
  }),
});

// Configure an API operation with Shield protection
const apiOperation = await ApiGatewayOperation("users-api", {
  zone: zone,
  endpoint: "/api/users",
  host: "api.example.com",
  method: "GET",
  features: {
    schemaValidation: {
      enabled: true,
      schema: apiSchema,
      mitigationAction: "block"
    }
  }
});

// Deploy a Worker with bindings
const apiWorker = await Worker("api-worker", {
  name: "api-service",
  entrypoint: "./src/api.ts",
  bindings: {
    CACHE: cache,
  },
  routes: [
    {
      pattern: "api.example.com/*",
      zoneId: zone.id,
    },
  ],
});
```