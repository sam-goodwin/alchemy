---
title: KVNamespace
description: Learn how to create and manage Cloudflare KV Namespaces using Alchemy for key-value data storage at the edge.
---


A [Cloudflare KV Namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) is a key-value store that can be used to store data for your application.

## Minimal Example

Create a basic KV namespace for storing user data.

```ts
import { KVNamespace } from "alchemy/cloudflare";

const users = await KVNamespace("users", {
  title: "user-data"
});
```

## With Initial Values and TTL

Create a KV namespace with initial values and expiration.

```ts
import { KVNamespace } from "alchemy/cloudflare";

const sessions = await KVNamespace("sessions", {
  title: "user-sessions", 
  values: [{
    key: "session_123",
    value: { userId: "user_456", role: "admin" },
    expirationTtl: 3600 // Expires in 1 hour
  }]
});
```

## With Metadata

Create a KV namespace with metadata for caching.

```ts
import { KVNamespace } from "alchemy/cloudflare";

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

## Bind to a Worker

Bind a KV namespace to a Worker for data access.

```ts
import { Worker, KVNamespace } from "alchemy/cloudflare";

const store = await KVNamespace("store", {
  title: "data-store"
});

await Worker("api", {
  name: "api-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    STORE: store
  }
});
```
