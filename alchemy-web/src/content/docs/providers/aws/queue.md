---
title: Queue
description: Learn how to create, configure, and manage AWS Simple Queue Service (SQS) queues using Alchemy for message queuing.
---


The Queue resource lets you create and manage [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) queues for reliable message delivery between distributed application components.

## Minimal Example

Create a standard SQS queue with default settings:

```ts
import { Queue } from "alchemy/aws";

const queue = await Queue("my-queue", {
  queueName: "my-queue",
  tags: {
    Environment: "production"
  }
});
```

## FIFO Queue

Create a FIFO queue with content-based deduplication:

```ts
import { Queue } from "alchemy/aws";

const fifoQueue = await Queue("orders-queue", {
  queueName: "orders-queue.fifo", 
  fifo: true,
  contentBasedDeduplication: true,
  visibilityTimeout: 30
});
```

## Custom Queue Configuration

Create a queue with custom message handling settings:

```ts
import { Queue } from "alchemy/aws";

const customQueue = await Queue("large-messages", {
  queueName: "large-messages",
  messageRetentionPeriod: 345600, // 4 days
  maximumMessageSize: 262144,     // 256 KB
  visibilityTimeout: 60,
  delaySeconds: 5,
  receiveMessageWaitTimeSeconds: 20
});
```
