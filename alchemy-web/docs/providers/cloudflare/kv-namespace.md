---
title: Cloudflare KV Namespace with Alchemy
description: A Cloudflare KV Namespace is a key-value store that can be used to store data for your application.
---

# KVNamespace

A [Cloudflare KV Namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) is a key-value store that can be used to store data for your application.

## Examples

### A basic KV namespace for storing user data

```typescript
import { KVNamespace } from "alchemy/cloudflare";

// Create a basic KV namespace for storing user data
const users = await KVNamespace("users", {
  title: "user-data"
});
```

---

### A KV namespace with initial values and TTL

```typescript
// Create a KV namespace with initial values and TTL
const sessions = await KVNamespace("sessions", {
  title: "user-sessions",
  values: [{
    key: "session_123",
    value: { userId: "user_456", role: "admin" },
    expirationTtl: 3600 // Expires in 1 hour
  }]
});
```

---

### A KV namespace with metadata for caching

```typescript
// Create a KV namespace with metadata for caching
const assets = await KVNamespace("assets", {
  title: "static-assets",
  values: [{
    key: "main.js",
    value: "content...",
    metadata: {
      contentType: "application/javascript",
      etag: "abc123"
    }
  }]
});
```

---

### Adopt an existing namespace if it already exists instead of failing

```typescript
// Adopt an existing namespace if it already exists instead of failing
const existingNamespace = await KVNamespace("existing-ns", {
  title: "existing-namespace",
  adopt: true,
  values: [{
    key: "config",
    value: { setting: "updated-value" }
  }]
});
```

---

### When removing from Alchemy state, keep the namespace in Cloudflare

```typescript
// When removing from Alchemy state, keep the namespace in Cloudflare
const preservedNamespace = await KVNamespace("preserve-ns", {
  title: "preserved-namespace",
  delete: false
});
```


## Properties

### KVNamespace

*Note: This includes all properties from KVNamespaceProps.*

*Note: This includes properties from dependent resources: CloudflareApiOptions.*

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `accountId` | `string` | No | Account ID to use (overrides CLOUDFLARE_ACCOUNT_ID env var) If not provided, will be automatically retrieved from the Cloudflare API (From CloudflareApiOptions) |  |
| `adopt` | `boolean` | No | Whether to adopt an existing namespace with the same title if it exists If true and a namespace with the same title exists, it will be adopted rather than creating a new one | false |
| `apiKey` | `Secret` | No | API Key to use (overrides CLOUDFLARE_API_KEY env var) (From CloudflareApiOptions) |  |
| `apiToken` | `Secret` | No | API Token to use (overrides CLOUDFLARE_API_TOKEN env var) (From CloudflareApiOptions) |  |
| `baseUrl` | `string` | No | Base URL for Cloudflare API (From CloudflareApiOptions) | https://api.cloudflare.com/client/v4 |
| `delete` | `boolean` | No | Whether to delete the namespace. If set to false, the namespace will remain but the resource will be removed from state | true |
| `email` | `string` | No | Email to use with API Key authentication If not provided, will attempt to discover from Cloudflare API (From CloudflareApiOptions) |  |
| `title` | `string` | No | Title of the namespace |  |
| `values` | `KVPair[]` | No | KV pairs to store in the namespace Only used for initial setup or updates |  |


## Dependent Types

*These types are used by this resource and may provide additional configuration options:*

### CloudflareApiOptions

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `baseUrl` | `string` | No | Base URL for Cloudflare API | https://api.cloudflare.com/client/v4 |
| `apiKey` | `Secret` | No | API Key to use (overrides CLOUDFLARE_API_KEY env var) |  |
| `apiToken` | `Secret` | No | API Token to use (overrides CLOUDFLARE_API_TOKEN env var) |  |
| `accountId` | `string` | No | Account ID to use (overrides CLOUDFLARE_ACCOUNT_ID env var) If not provided, will be automatically retrieved from the Cloudflare API |  |
| `email` | `string` | No | Email to use with API Key authentication If not provided, will attempt to discover from Cloudflare API |  |


## Supporting Types

### CloudflareKVNamespace

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `id` | `string` | Yes |  |  |
| `title` | `string` | Yes |  |  |
| `supports_url_encoding` | `boolean` | No |  |  |
| `created_on` | `string` | No |  |  |

### KVNamespaceResource

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `type` | `"kv_namespace"` | Yes |  |  |
| `namespaceId` | `string` | Yes | The ID of the namespace |  |
| `createdAt` | `number` | Yes | Time at which the namespace was created |  |
| `modifiedAt` | `number` | Yes | Time at which the namespace was last modified |  |

### KVPair

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `key` | `string` | Yes | Key name |  |
| `value` | `string \| object` | Yes | Value to store (string or JSON object) |  |
| `expiration` | `number` | No | Optional expiration in seconds from now |  |
| `expirationTtl` | `number` | No | Optional expiration timestamp in seconds since epoch |  |
| `metadata` | `any` | No | Optional metadata for the key |  |

