---
title: Managing AWS SQS Queues with Alchemy
description: Learn how to create, update, and manage AWS SQS Queues using Alchemy Cloud Control.
---

# Queue

The Queue resource allows you to manage [AWS SQS Queues](https://docs.aws.amazon.com/sqs/latest/userguide/) for message queuing services in a distributed system.

## Minimal Example

Create a basic SQS queue with default settings and a specified message retention period:

```ts
import AWS from "alchemy/aws/control";

const basicQueue = await AWS.SQS.Queue("BasicQueue", {
  QueueName: "MySimpleQueue",
  MessageRetentionPeriod: 86400 // 1 Day
});
```

## Advanced Configuration

Configure an SQS queue with additional options such as FIFO support and delay seconds:

```ts
const advancedQueue = await AWS.SQS.Queue("AdvancedQueue", {
  QueueName: "MyFifoQueue.fifo",
  FifoQueue: true,
  ContentBasedDeduplication: true,
  DelaySeconds: 5,
  MessageRetentionPeriod: 1209600 // 14 Days
});
```

## Encryption with KMS

Create a queue that uses AWS KMS for server-side encryption:

```ts
const encryptedQueue = await AWS.SQS.Queue("EncryptedQueue", {
  QueueName: "MyEncryptedQueue",
  KmsMasterKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-ab12-ab12-ab12-abcd1234ef56",
  SqsManagedSseEnabled: true,
  MessageRetentionPeriod: 86400 // 1 Day
});
```

## Redrive Policy Configuration

Set up a dead-letter queue by configuring a redrive policy:

```ts
const deadLetterQueue = await AWS.SQS.Queue("DeadLetterQueue", {
  QueueName: "MyDeadLetterQueue",
  MessageRetentionPeriod: 1209600, // 14 Days
});

const mainQueue = await AWS.SQS.Queue("MainQueue", {
  QueueName: "MyMainQueue",
  RedrivePolicy: JSON.stringify({
    deadLetterTargetArn: deadLetterQueue.Arn,
    maxReceiveCount: 5
  }),
  MessageRetentionPeriod: 86400 // 1 Day
});
```

## Tagging Resources

Create a queue with tags for better resource management:

```ts
const taggedQueue = await AWS.SQS.Queue("TaggedQueue", {
  QueueName: "MyTaggedQueue",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Messaging" }
  ],
  MessageRetentionPeriod: 86400 // 1 Day
});
```