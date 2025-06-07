---
title: Managing AWS SQS QueueInlinePolicys with Alchemy
description: Learn how to create, update, and manage AWS SQS QueueInlinePolicys using Alchemy Cloud Control.
---

# QueueInlinePolicy

The QueueInlinePolicy resource allows you to manage inline policies for AWS SQS Queues. This resource helps in defining specific permissions for actions on SQS queues using IAM policy documents. For more details, refer to the [AWS SQS QueueInlinePolicys documentation](https://docs.aws.amazon.com/sqs/latest/userguide/).

## Minimal Example

Create a basic inline policy for an SQS queue with required properties.

```ts
import AWS from "alchemy/aws/control";

const InlinePolicy = await AWS.SQS.QueueInlinePolicy("MyQueueInlinePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sqs:SendMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: {
          Service: "lambda.amazonaws.com"
        }
      }
    ]
  },
  Queue: "MyQueue"
});
```

## Advanced Configuration

Define a more complex inline policy with multiple actions and conditions.

```ts
const AdvancedInlinePolicy = await AWS.SQS.QueueInlinePolicy("MyAdvancedQueueInlinePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "sqs:SendMessage",
          "sqs:ReceiveMessage"
        ],
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Condition: {
          "StringEquals": {
            "aws:SourceArn": "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction"
          }
        }
      }
    ]
  },
  Queue: "MyQueue"
});
```

## Binding a Queue to Multiple Services

You can associate an inline policy with multiple AWS services by defining different permissions within a single policy document.

```ts
const MultiServiceInlinePolicy = await AWS.SQS.QueueInlinePolicy("MyMultiServiceQueueInlinePolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "sqs:SendMessage",
          "sqs:DeleteMessage"
        ],
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: {
          Service: "ec2.amazonaws.com"
        }
      },
      {
        Effect: "Allow",
        Action: "sqs:ReceiveMessage",
        Resource: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
        Principal: {
          Service: "lambda.amazonaws.com"
        }
      }
    ]
  },
  Queue: "MyQueue"
});
```