---
title: Queue
description: Learn how to create, configure, and manage Cloudflare Queues using Alchemy for reliable message delivery.
---

The Queue component lets you add [Cloudflare Queue](https://developers.cloudflare.com/queues/) to your app for reliable message delivery between workers.

## Minimal Example

Create a basic queue with default settings.

```ts
import { Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue",
});
```

## Queue with Custom Settings

Configure queue behavior with delivery delay and message retention.

```ts
import { Queue } from "alchemy/cloudflare";

const queue = await Queue("delayed-queue", {
  name: "delayed-queue",
  settings: {
    deliveryDelay: 30, // 30 second delay
    messageRetentionPeriod: 86400, // Store messages for 1 day
    deliveryPaused: false,
  },
});
```

## Bind to a Worker

Attach a queue to a worker for processing messages.

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("my-queue", {
  name: "my-queue",
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    MY_QUEUE: queue,
  },
});
```

## Queue with Dead Letter Queue

Configure a dead letter queue for handling failed messages.

```ts
import { Queue } from "alchemy/cloudflare";

// Create the dead letter queue first
const dlq = await Queue("dlq", {
  name: "failed-messages-dlq",
});

// Create main queue with DLQ reference
const queue = await Queue("main-queue", {
  name: "main-queue",
  dlq: dlq, // or dlq: "failed-messages-dlq"
});
```

## Configure Queue Consumer

Configure how a Worker consumes messages from the queue using eventSources:

```ts
import { Worker, Queue } from "alchemy/cloudflare";

const queue = await Queue("processing-queue", {
  name: "processing-queue",
});

await Worker("processor", {
  entrypoint: "./src/processor.ts",
  eventSources: [{
    queue,
    settings: {
      batchSize: 10,           // Process 10 messages at once
      maxConcurrency: 3,       // Allow 3 concurrent invocations
      maxRetries: 5,           // Retry failed messages up to 5 times  
      maxWaitTimeMs: 2000,     // Wait up to 2 seconds to fill a batch
      retryDelay: 30,          // Wait 30 seconds before retrying failed messages
      deadLetterQueue: "failed-queue" // Send failed messages to DLQ
    }
  }]
});
```

### Consumer Settings Options

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `batchSize` | `number` | 10 | Number of messages to deliver in a batch |
| `maxConcurrency` | `number` | 2 | Maximum number of concurrent consumer worker invocations |
| `maxRetries` | `number` | 3 | Maximum number of retries for each message |
| `maxWaitTimeMs` | `number` | 500 | Maximum time in milliseconds to wait for batch to fill |
| `retryDelay` | `number` | 30 | Time in seconds to delay retry after a failure |
| `deadLetterQueue` | `string \| Queue` | - | Dead letter queue for messages that exceed max retries |
