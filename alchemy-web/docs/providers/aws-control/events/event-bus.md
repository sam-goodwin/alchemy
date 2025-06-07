---
title: Managing AWS Events EventBuss with Alchemy
description: Learn how to create, update, and manage AWS Events EventBuss using Alchemy Cloud Control.
---

# EventBus

The EventBus resource lets you manage [AWS Events EventBusses](https://docs.aws.amazon.com/events/latest/userguide/) for handling event-driven architectures and integrating different components of your applications.

## Minimal Example

Create a basic event bus with just the required properties:

```ts
import AWS from "alchemy/aws/control";

const defaultEventBus = await AWS.Events.EventBus("DefaultEventBus", {
  Name: "MyEventBus"
});
```

## Enhanced Configuration

Configure an event bus with a policy and tags for better management:

```ts
const taggedEventBus = await AWS.Events.EventBus("TaggedEventBus", {
  Name: "MyTaggedEventBus",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "events:PutEvents",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "aws:SourceArn": "arn:aws:events:us-west-2:123456789012:event-bus/MyTaggedEventBus"
          }
        }
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration with KMS Key

Create an event bus that uses a KMS key for encryption:

```ts
const encryptedEventBus = await AWS.Events.EventBus("EncryptedEventBus", {
  Name: "MyEncryptedEventBus",
  KmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key",
  Description: "An event bus with KMS encryption"
});
```

## Event Source Configuration

Set up an event bus with a specific event source name:

```ts
const sourceConfiguredEventBus = await AWS.Events.EventBus("SourceConfiguredEventBus", {
  Name: "MySourceConfiguredEventBus",
  EventSourceName: "com.example.myapp"
});
```

## Dead Letter Queue Configuration

Create an event bus with a dead letter queue:

```ts
const deadLetterEventBus = await AWS.Events.EventBus("DeadLetterEventBus", {
  Name: "MyDeadLetterEventBus",
  DeadLetterConfig: {
    Arn: "arn:aws:sqs:us-west-2:123456789012:my-dead-letter-queue"
  }
});
```