---
title: QueuePolicy
description: Learn how to create, update, and manage AWS SQS QueuePolicies using Alchemy Cloud Control.
---


The QueuePolicy resource allows you to manage the permissions for Amazon SQS queues, enabling you to control access and define who can send messages to your queues. For detailed information, refer to the [AWS SQS QueuePolicies documentation](https://docs.aws.amazon.com/sqs/latest/userguide/).

## Minimal Example

Create a basic SQS QueuePolicy that allows specific AWS accounts to send messages to an SQS queue.

```ts
import AWS from "alchemy/aws/control";

const queuePolicy = await AWS.SQS.QueuePolicy("basicQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::123456789012:root"
          ]
        },
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-east-1:123456789012:myQueue"
      }
    ]
  },
  Queues: [
    "arn:aws:sqs:us-east-1:123456789012:myQueue"
  ],
  adopt: true
});
```

## Advanced Configuration

Configure a queue policy that allows multiple principals and conditions to send messages based on specific attributes.

```ts
const advancedQueuePolicy = await AWS.SQS.QueuePolicy("advancedQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::123456789012:role/MyRole",
            "arn:aws:iam::987654321098:root"
          ]
        },
        Action: "SQS:SendMessage",
        Resource: "arn:aws:sqs:us-east-1:123456789012:myQueue",
        Condition: {
          "StringEquals": {
            "aws:SourceArn": "arn:aws:lambda:us-east-1:123456789012:function:myFunction"
          }
        }
      }
    ]
  },
  Queues: [
    "arn:aws:sqs:us-east-1:123456789012:myQueue"
  ],
  adopt: false
});
```

## Example with Multiple Queues

Create a policy that applies to multiple SQS queues, allowing a specific IAM role to send messages.

```ts
const multiQueuePolicy = await AWS.SQS.QueuePolicy("multiQueuePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "SQS:SendMessage",
        Resource: [
          "arn:aws:sqs:us-east-1:123456789012:myQueue1",
          "arn:aws:sqs:us-east-1:123456789012:myQueue2"
        ]
      }
    ]
  },
  Queues: [
    "arn:aws:sqs:us-east-1:123456789012:myQueue1",
    "arn:aws:sqs:us-east-1:123456789012:myQueue2"
  ]
});
```

These examples demonstrate how to effectively manage SQS QueuePolicies using Alchemy, enabling you to control access to your SQS resources with precision.
