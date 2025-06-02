---
title: Managing Cloudflare Queues with Alchemy
description: Learn how to create, configure, and manage Cloudflare Queues using Alchemy for reliable message delivery.
---

# Queue

The Queue component lets you add [Cloudflare Queue](https://developers.cloudflare.com/queues/) to your app for reliable message delivery between workers.

## Minimal Example

Create a basic queue with default settings.

```ts
import { Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue"
});
```

## Queue with Custom Settings

Configure queue behavior with delivery delay and message retention.

```ts
import { Queue } from "alchemy/cloudflare";

const queue = await Queue("delayed-queue", {
  name: "delayed-queue",
  deliveryDelay: 30, // 30 second delay
  messageRetentionPeriod: 86400, // Store messages for 1 day
  deliveryPaused: false
});
```

## Bind to a Worker

Attach a queue to a worker for processing messages.

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue"
});

await Worker("my-worker", {
  name: "my-worker", 
  script: "console.log('Hello, world!')",
  bindings: {
    MY_QUEUE: queue
  }
});
```

## Queue Event Sources

You can configure a worker to consume messages from a queue using event sources. There are two forms:

### Simple Queue Consumption

Consume messages from a queue with default settings.

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue"
});

await Worker("my-worker", {
  name: "my-worker",
  entrypoint: "src/worker.ts",
  eventSources: [queue]
});
```

### Queue Consumption with Custom Settings

Configure batch size, concurrency, and retry behavior for queue consumption.

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue"
});

await Worker("my-worker", {
  name: "my-worker",
  entrypoint: "src/worker.ts",
  eventSources: [{
    queue,
    batchSize: 10,
    maxConcurrency: 5,
    maxRetries: 3,
    maxWaitTimeMs: 5000,
    retryDelay: 30
  }]
});
```