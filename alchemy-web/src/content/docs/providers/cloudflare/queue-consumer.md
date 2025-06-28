---
title: QueueConsumer
description: Learn how to configure Cloudflare Queue Consumers using Alchemy to process messages from your Cloudflare Queues.
---

Creates a consumer for a [Cloudflare Queue](https://developers.cloudflare.com/queues/platform/consumers/) that processes messages using a Worker.

## Minimal Example

Create a basic queue consumer with default settings.

```ts
import { Queue, QueueConsumer } from "alchemy/cloudflare";

const queue = await Queue("notifications", {
  name: "notifications",
});

const consumer = await QueueConsumer("notification-processor", {
  queue,
  scriptName: "notification-worker",
});
```

## Custom Settings

Configure batch size, concurrency, retries and other settings.

```ts
import { Queue, QueueConsumer } from "alchemy/cloudflare";

const consumer = await QueueConsumer("batch-processor", {
  queue,
  scriptName: "batch-worker",
  settings: {
    batchSize: 50, // Process 50 messages at once
    maxConcurrency: 10, // Allow 10 concurrent invocations
    maxRetries: 5, // Retry failed messages up to 5 times
    maxWaitTimeMs: 2000, // Wait up to 2 seconds to fill a batch
    retryDelay: 60, // Wait 60 seconds before retrying failed messages
  },
});
```

## Bind to a Worker

Bind a queue consumer to a worker.

```ts
import { Worker, QueueConsumer } from "alchemy/cloudflare";

const consumer = await QueueConsumer("my-consumer", {
  queue,
  scriptName: "my-worker",
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    myConsumer: consumer,
  },
});
```

## Preferred: Configure via Worker eventSources

The recommended approach is to configure queue consumers through Worker `eventSources`:

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("task-queue", {
  name: "task-queue",
});

await Worker("task-processor", {
  entrypoint: "./src/processor.ts",
  // Configure queue consumer via eventSources
  eventSources: [{
    queue,
    settings: {
      batchSize: 20,           // Process 20 messages at once
      maxConcurrency: 4,       // Allow 4 concurrent invocations
      maxRetries: 3,           // Retry failed messages up to 3 times
      maxWaitTimeMs: 1000,     // Wait up to 1 second to fill a batch
      retryDelay: 45,          // Wait 45 seconds before retrying failed messages
      deadLetterQueue: "failed-tasks" // Send failed messages to DLQ
    }
  }]
});
```

## Combined Producer and Consumer

Configure a Worker as both a queue producer and consumer:

```ts
const queue = await Queue("workflow-queue", {
  name: "workflow-queue",
});

await Worker("workflow-processor", {
  entrypoint: "./src/workflow.ts",
  bindings: {
    QUEUE: queue // Producer: bind queue for sending messages
  },
  eventSources: [{ // Consumer: configure processing settings
    queue,
    settings: {
      batchSize: 5,
      maxConcurrency: 2,
      maxWaitTimeMs: 3000,
      maxRetries: 2,
      retryDelay: 60
    }
  }]
});
```
