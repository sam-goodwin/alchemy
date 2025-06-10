---
title: Queue
description: Learn how to create, update, and manage AWS SQS Queues using Alchemy Cloud Control.
---


The Queue resource allows you to manage [AWS SQS Queues](https://docs.aws.amazon.com/sqs/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic SQS queue with default settings and a visibility timeout.

```ts
import AWS from "alchemy/aws/control";

const basicQueue = await AWS.SQS.Queue("basicQueue", {
  QueueName: "BasicQueue",
  VisibilityTimeout: 30, // Message visibility timeout in seconds
  DelaySeconds: 0 // No initial delay for messages
});
```

## Advanced Configuration

Configure a FIFO queue with content-based deduplication and a message retention period.

```ts
const fifoQueue = await AWS.SQS.Queue("fifoQueue", {
  QueueName: "MyFifoQueue.fifo",
  FifoQueue: true,
  ContentBasedDeduplication: true,
  MessageRetentionPeriod: 86400 // Message retention for 1 day
});
```

## KMS Encryption

Create a queue with server-side encryption using a KMS key.

```ts
const encryptedQueue = await AWS.SQS.Queue("encryptedQueue", {
  QueueName: "EncryptedQueue",
  KmsMasterKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd-1234-ef56-7890-abcd1234ef56", // Replace with your KMS ARN
  SqsManagedSseEnabled: true,
  ReceiveMessageWaitTimeSeconds: 20 // Long polling for receiving messages
});
```

## Redrive Policy

Set up a dead letter queue with a redrive policy to handle message failures.

```ts
const deadLetterQueue = await AWS.SQS.Queue("deadLetterQueue", {
  QueueName: "DeadLetterQueue",
  MessageRetentionPeriod: 1209600 // 14 days
});

const mainQueue = await AWS.SQS.Queue("mainQueue", {
  QueueName: "MainQueue",
  RedrivePolicy: JSON.stringify({
    deadLetterTargetArn: deadLetterQueue.Arn,
    maxReceiveCount: 5 // Maximum times a message can be received before being sent to dead letter queue
  }),
  VisibilityTimeout: 30
});
```
