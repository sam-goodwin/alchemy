---
title: VersionMetadata
description: Learn how to use Cloudflare Version Metadata binding with Alchemy to access version information at runtime.
---

The [Version Metadata binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) provides access to version information about your Worker at runtime.

## Minimal Example

Create a basic version metadata binding:

```ts
import { Worker, VersionMetadata } from "alchemy/cloudflare";

const worker = await Worker("versioned-worker", {
  name: "versioned-worker",
  entrypoint: "./src/worker.ts",
  bindings: {
    VERSION: VersionMetadata(),
  },
});
```

## Worker Runtime Usage

Access version information in your Worker:

```ts
// src/worker.ts
export default {
  async fetch(request: Request, env: any) {
    const version = env.VERSION;
    
    return new Response(JSON.stringify({
      workerVersion: version.workerVersion,
      deploymentId: version.deploymentId,
      lastDeployedAt: version.lastDeployedAt,
    }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
```

## Available Properties

The version metadata binding provides the following properties at runtime:

- `workerVersion`: The version tag of the Worker
- `deploymentId`: A unique identifier for the current deployment
- `lastDeployedAt`: Timestamp of when the Worker was last deployed 