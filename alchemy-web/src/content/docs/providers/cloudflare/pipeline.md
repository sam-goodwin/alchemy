---
title: Pipeline
description: Learn how to define and manage Cloudflare Pipelines using Alchemy for orchestrating complex data workflows.
---

The [Pipeline](https://developers.cloudflare.com/workers/configuration/pipelines/) resource lets you create and manage Cloudflare Pipelines for collecting, transforming and routing data.

## Minimal Example

Create a basic pipeline with an R2 bucket destination:

```ts
import { Pipeline, R2Bucket } from "alchemy/cloudflare";

const bucket = await R2Bucket("logs-bucket", {
  name: "logs-bucket"
});

const pipeline = await Pipeline("logs-pipeline", {
  name: "logs-pipeline", 
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: bucket.name,
      prefix: "app-logs"
    },
    credentials: {
      accessKeyId: alchemy.secret(process.env.R2_ACCESS_KEY_ID!),
      secretAccessKey: alchemy.secret(process.env.R2_SECRET_ACCESS_KEY!)
    }
  }
});
```

## Custom Source Configuration

Configure a pipeline with custom HTTP source settings:

```ts
import { Pipeline } from "alchemy/cloudflare";

const customPipeline = await Pipeline("custom-pipeline", {
  name: "custom-pipeline",
  source: [{
    type: "http",
    format: "json", 
    authentication: true,
    cors: {
      origins: ["https://example.com"]
    }
  }],
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: "my-bucket",
      prefix: "data"
    },
    credentials: {
      accessKeyId: alchemy.secret(process.env.R2_ACCESS_KEY_ID!),
      secretAccessKey: alchemy.secret(process.env.R2_SECRET_ACCESS_KEY!)
    },
    compression: {
      type: "gzip"
    }
  }
});
```

## Bind to a Worker

Use the pipeline in a worker:

```ts
import { Worker, Pipeline } from "alchemy/cloudflare";

const pipeline = await Pipeline("logs-pipeline", {
  name: "logs-pipeline",
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: "logs-bucket",
      prefix: "app-logs"
    },
    credentials: {
      accessKeyId: alchemy.secret(process.env.R2_ACCESS_KEY_ID!),
      secretAccessKey: alchemy.secret(process.env.R2_SECRET_ACCESS_KEY!)
    }
  }
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    PIPELINE: pipeline
  }
});
```