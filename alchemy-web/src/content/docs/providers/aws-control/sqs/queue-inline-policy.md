---
title: QueueInlinePolicy
description: Learn how to create, update, and manage AWS SQS QueueInlinePolicys using Alchemy Cloud Control.
---


The QueueInlinePolicy resource allows you to attach inline IAM policies to Amazon SQS queues, providing fine-grained access control for the queue. For more information, refer to the [AWS SQS QueueInlinePolicys documentation](https://docs.aws.amazon.com/sqs/latest/userguide/).

## Minimal Example

Create a basic inline policy for an SQS queue that allows sending messages:

```ts
import AWS from "alchemy/aws/control";

const queueInlinePolicy = await AWS.SQS.QueueInlinePolicy("basicPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: "*"
      }
    ]
  },
  Queue: "MyQueue"
});
```

## Advanced Configuration

Attach a more complex inline policy that allows multiple actions on the SQS queue:

```ts
const advancedPolicy = await AWS.SQS.QueueInlinePolicy("advancedPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "SQS:SendMessage",
          "SQS:ReceiveMessage",
          "SQS:DeleteMessage"
        ],
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/MyUser"
        }
      }
    ]
  },
  Queue: "MyQueue",
  adopt: true // Adopt existing resource if it already exists
});
```

## Policy with Conditions

Demonstrate how to add conditions to the policy for additional security:

```ts
const conditionalPolicy = await AWS.SQS.QueueInlinePolicy("conditionalPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: "*",
        Condition: {
          "StringEquals": {
            "aws:SourceAccount": "123456789012"
          }
        }
      }
    ]
  },
  Queue: "MyQueue"
});
```

## Multi-Queue Management

Create inline policies for multiple SQS queues in a single deployment:

```ts
const firstQueuePolicy = await AWS.SQS.QueueInlinePolicy("firstQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:FirstQueue",
        Principal: "*"
      }
    ]
  },
  Queue: "FirstQueue"
});

const secondQueuePolicy = await AWS.SQS.QueueInlinePolicy("secondQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "SQS:ReceiveMessage",
          "SQS:DeleteMessage"
        ],
        Resource: "arn:aws:sqs:us-west-2:123456789012:SecondQueue",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/AnotherUser"
        }
      }
    ]
  },
  Queue: "SecondQueue"
});
```
