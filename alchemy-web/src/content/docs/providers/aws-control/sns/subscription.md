---
title: Subscription
description: Learn how to create, update, and manage AWS SNS Subscriptions using Alchemy Cloud Control.
---


The Subscription resource lets you manage [AWS SNS Subscriptions](https://docs.aws.amazon.com/sns/latest/userguide/) for receiving messages from SNS topics. Subscriptions can be configured with various protocols to deliver messages to endpoints.

## Minimal Example

Create a basic SNS subscription to an existing topic with essential properties.

```ts
import AWS from "alchemy/aws/control";

const snsSubscription = await AWS.SNS.Subscription("mySnsSubscription", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Protocol: "email",
  Endpoint: "user@example.com"
});
```

## Advanced Configuration

Configure an SNS subscription with additional options such as message filtering and delivery policies.

```ts
const advancedSnsSubscription = await AWS.SNS.Subscription("advancedSnsSubscription", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Protocol: "https",
  Endpoint: "https://example.com/notifications",
  FilterPolicy: {
    eventType: ["order_placed", "order_shipped"]
  },
  DeliveryPolicy: {
    healthyRetryPolicy: {
      numRetries: 3,
      minDelayTarget: 20,
      maxDelayTarget: 20,
      numNoDelayRetries: 0,
      numMinDelayRetries: 0,
      backoffFunction: "linear"
    }
  }
});
```

## Raw Message Delivery

Create a subscription that delivers raw messages without JSON formatting.

```ts
const rawMessageSnsSubscription = await AWS.SNS.Subscription("rawMessageSubscription", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Protocol: "sqs",
  Endpoint: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
  RawMessageDelivery: true
});
```

## Replay Policy

Configure a subscription with a replay policy for message retention and replay capabilities.

```ts
const replayPolicySnsSubscription = await AWS.SNS.Subscription("replayPolicySubscription", {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Protocol: "lambda",
  Endpoint: "arn:aws:lambda:us-east-1:123456789012:function:myFunction",
  ReplayPolicy: {
    maxReplayDuration: "PT1H", // ISO 8601 duration format
    maxReplayMessages: 100
  }
});
```
