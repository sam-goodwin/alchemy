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

