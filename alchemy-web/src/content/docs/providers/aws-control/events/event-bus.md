---
title: EventBus
description: Learn how to create, update, and manage AWS Events EventBuses using Alchemy Cloud Control.
---


The EventBus resource lets you manage [AWS EventBuses](https://docs.aws.amazon.com/events/latest/userguide/) for event-driven architectures, allowing you to receive and process events from various sources.

## Minimal Example

Create a basic EventBus with a name and a description:

```ts
import AWS from "alchemy/aws/control";

const myEventBus = await AWS.Events.EventBus("myEventBus", {
  Name: "MyCustomEventBus",
  Description: "This EventBus handles custom application events."
});
```

## Advanced Configuration

Configure an EventBus with a policy to control access and a dead-letter queue:

```ts
const advancedEventBus = await AWS.Events.EventBus("advancedEventBus", {
  Name: "AdvancedEventBus",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Action: "events:PutEvents",
        Resource: "*"
      }
    ]
  }),
  DeadLetterConfig: {
    Arn: "arn:aws:sqs:us-west-2:123456789012:myDeadLetterQueue"
  }
});
```

## Event Source Name Configuration

Create an EventBus that specifies an event source name for better event management:

```ts
const sourceNameEventBus = await AWS.Events.EventBus("sourceNameEventBus", {
  Name: "SourceNameEventBus",
  EventSourceName: "com.mycompany.myapp"
});
```

## Encryption with KMS

Set up an EventBus with KMS encryption for enhanced security:

```ts
const encryptedEventBus = await AWS.Events.EventBus("encryptedEventBus", {
  Name: "EncryptedEventBus",
  KmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Description: "This EventBus uses KMS for encryption."
});
```

## Tagging Resources

Create an EventBus with tags for better resource management:

```ts
const taggedEventBus = await AWS.Events.EventBus("taggedEventBus", {
  Name: "TaggedEventBus",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyApplication"
    }
  ]
});
```
