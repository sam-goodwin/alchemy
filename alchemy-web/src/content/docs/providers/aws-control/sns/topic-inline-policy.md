---
title: TopicInlinePolicy
description: Learn how to create, update, and manage AWS SNS TopicInlinePolicys using Alchemy Cloud Control.
---


The TopicInlinePolicy resource lets you manage inline policies for Amazon Simple Notification Service (SNS) topics. Inline policies help you define permissions directly associated with the SNS topic. You can find more information in the [AWS SNS TopicInlinePolicys documentation](https://docs.aws.amazon.com/sns/latest/userguide/).

## Minimal Example

Create a basic inline policy for an SNS topic with required properties.

```ts
import AWS from "alchemy/aws/control";

const snsTopicPolicy = await AWS.SNS.TopicInlinePolicy("mySnsTopicPolicy", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:myTopic",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "SNS:Publish",
        Resource: "arn:aws:sns:us-east-1:123456789012:myTopic",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myRole"
        }
      }
    ]
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Define a more complex policy that includes additional permissions and conditions.

```ts
const advancedSnsTopicPolicy = await AWS.SNS.TopicInlinePolicy("advancedSnsTopicPolicy", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:myAdvancedTopic",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["SNS:Publish", "SNS:Subscribe"],
        Resource: "arn:aws:sns:us-east-1:123456789012:myAdvancedTopic",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myAdvancedRole"
        },
        Condition: {
          "StringEquals": {
            "AWS:SourceArn": "arn:aws:sns:us-east-1:123456789012:myAdvancedTopic"
          }
        }
      }
    ]
  }
});
```

## Policy for Multiple Actions

Create a policy that allows multiple actions for different principals.

```ts
const multiActionSnsTopicPolicy = await AWS.SNS.TopicInlinePolicy("multiActionSnsTopicPolicy", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:myMultiActionTopic",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["SNS:Publish", "SNS:Subscribe"],
        Resource: "arn:aws:sns:us-east-1:123456789012:myMultiActionTopic",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myMultiActionRole"
        }
      },
      {
        Effect: "Allow",
        Action: "SNS:DeleteTopic",
        Resource: "arn:aws:sns:us-east-1:123456789012:myMultiActionTopic",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myAdminRole"
        }
      }
    ]
  }
});
```

## Conditional Policy

Define a policy that restricts actions based on specific conditions.

```ts
const conditionalSnsTopicPolicy = await AWS.SNS.TopicInlinePolicy("conditionalSnsTopicPolicy", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:myConditionalTopic",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "SNS:Publish",
        Resource: "arn:aws:sns:us-east-1:123456789012:myConditionalTopic",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myConditionalRole"
        },
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }
});
```
