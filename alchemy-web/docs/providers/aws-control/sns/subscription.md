---
title: Managing AWS SNS Subscriptions with Alchemy
description: Learn how to create, update, and manage AWS SNS Subscriptions using Alchemy Cloud Control.
---

# Subscription

The Subscription resource allows you to manage [AWS SNS Subscriptions](https://docs.aws.amazon.com/sns/latest/userguide/) for receiving messages from SNS topics. This resource provides a way to configure endpoints that will receive published messages.

## Minimal Example

Create a basic SNS subscription with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicSubscription = await AWS.SNS.Subscription("BasicSubscription", {
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Protocol: "email",
  Endpoint: "user@example.com"
});
```

## Advanced Configuration

Configure a subscription with advanced settings such as a delivery policy and a raw message delivery option.

```ts
const AdvancedSubscription = await AWS.SNS.Subscription("AdvancedSubscription", {
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Protocol: "https",
  Endpoint: "https://example.com/receive",
  RawMessageDelivery: true,
  DeliveryPolicy: {
    healthyRetryPolicy: {
      numRetries: 3,
      minDelayTarget: 20,
      maxDelayTarget: 200,
      numMaxDelayRetries: 3,
      numNoDelayRetries: 0,
      numMinDelayRetries: 0
    }
  }
});
```

## Filter Policy Configuration

Set up a subscription with a filter policy to receive messages selectively based on attributes.

```ts
const FilteredSubscription = await AWS.SNS.Subscription("FilteredSubscription", {
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Protocol: "sqs",
  Endpoint: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
  FilterPolicy: {
    store: ["example_corp"],
    event: ["order_placed", "order_shipped"]
  }
});
```

## Redrive Policy Example

Create a subscription with a redrive policy to handle message failures.

```ts
const RedriveSubscription = await AWS.SNS.Subscription("RedriveSubscription", {
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Protocol: "sqs",
  Endpoint: "arn:aws:sqs:us-west-2:123456789012:MyDeadLetterQueue",
  RedrivePolicy: JSON.stringify({
    deadLetterTargetArn: "arn:aws:sqs:us-west-2:123456789012:MyDeadLetterQueue",
    maxReceiveCount: 5
  })
});
```