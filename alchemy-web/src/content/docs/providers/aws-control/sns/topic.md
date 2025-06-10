---
title: Topic
description: Learn how to create, update, and manage AWS SNS Topics using Alchemy Cloud Control.
---


The Topic resource allows you to manage [AWS SNS Topics](https://docs.aws.amazon.com/sns/latest/userguide/) for sending notifications and messages to subscribers.

## Minimal Example

Create a basic SNS topic with a name and display name.

```ts
import AWS from "alchemy/aws/control";

const basicTopic = await AWS.SNS.Topic("basicTopic", {
  TopicName: "MyFirstSNSTopic",
  DisplayName: "My First SNS Topic"
});
```

## Advanced Configuration

Configure an SNS topic with enhanced settings like FIFO and KMS key.

```ts
const advancedTopic = await AWS.SNS.Topic("advancedTopic", {
  TopicName: "MyAdvancedSNSTopic.fifo",
  FifoTopic: true,
  KmsMasterKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  ContentBasedDeduplication: true
});
```

## Delivery Status Logging

Set up an SNS topic with delivery status logging for monitoring message delivery.

```ts
const loggingTopic = await AWS.SNS.Topic("loggingTopic", {
  TopicName: "MyLoggingSNSTopic",
  DeliveryStatusLogging: [
    {
      Format: "json",
      Label: "MyLoggingLabel",
      LogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup",
      RoleArn: "arn:aws:iam::123456789012:role/MyLoggingRole"
    }
  ]
});
```

## Data Protection Policy

Create an SNS topic with a data protection policy to enforce access controls.

```ts
const protectedTopic = await AWS.SNS.Topic("protectedTopic", {
  TopicName: "MyProtectedSNSTopic",
  DataProtectionPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "SNS:Publish",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:SourceArn": "arn:aws:sns:us-east-1:123456789012:MyProtectedSNSTopic"
          }
        }
      }
    ]
  }
});
```

## Subscriptions Example

Create a topic and subscribe an email endpoint to receive notifications.

```ts
const subscriptionTopic = await AWS.SNS.Topic("subscriptionTopic", {
  TopicName: "MySubscriptionSNSTopic",
  Subscription: [
    {
      Protocol: "email",
      Endpoint: "user@example.com"
    }
  ]
});
```
