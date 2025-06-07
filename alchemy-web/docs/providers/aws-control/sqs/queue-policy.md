---
title: Managing AWS SQS QueuePolicies with Alchemy
description: Learn how to create, update, and manage AWS SQS QueuePolicies using Alchemy Cloud Control.
---

# QueuePolicy

The QueuePolicy resource allows you to manage [AWS SQS QueuePolicies](https://docs.aws.amazon.com/sqs/latest/userguide/) for your Amazon Simple Queue Service (SQS) queues. This resource enables you to set permissions for your queues, allowing you to control access and manage security effectively.

## Minimal Example

Create a basic SQS QueuePolicy that allows specific actions on a queue.

```ts
import AWS from "alchemy/aws/control";

const BasicQueuePolicy = await AWS.SQS.QueuePolicy("BasicQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "SQS:SendMessage",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "AWS:SourceAccount": "123456789012"
          }
        }
      }
    ]
  },
  Queues: ["MyQueue"]
});
```

## Advanced Configuration

Configure a QueuePolicy with multiple statements and conditions for enhanced security.

```ts
const AdvancedQueuePolicy = await AWS.SQS.QueuePolicy("AdvancedQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "SQS:ReceiveMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Condition: {
          "StringEquals": {
            "AWS:SourceAccount": "123456789012"
          }
        }
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "SQS:DeleteMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Condition: {
          "StringEquals": {
            "AWS:SourceAccount": "987654321098"
          }
        }
      }
    ]
  },
  Queues: ["MyQueue"]
});
```

## Restrict Access by IP

Set a QueuePolicy that restricts access based on IP address.

```ts
const IpRestrictedQueuePolicy = await AWS.SQS.QueuePolicy("IpRestrictedQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  },
  Queues: ["MyQueue"]
});
```