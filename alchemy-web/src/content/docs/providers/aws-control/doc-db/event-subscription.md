---
title: EventSubscription
description: Learn how to create, update, and manage AWS DocDB EventSubscriptions using Alchemy Cloud Control.
---


The EventSubscription resource lets you manage [AWS DocDB EventSubscriptions](https://docs.aws.amazon.com/docdb/latest/userguide/) for monitoring events related to your Amazon DocumentDB clusters.

## Minimal Example

Create a basic event subscription with the required SNS topic ARN and a subscription name.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.DocDB.EventSubscription("basicSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  SubscriptionName: "mySubscription",
  Enabled: true
});
```

## Advanced Configuration

Configure an event subscription with specific event categories and source IDs to tailor notifications.

```ts
const advancedEventSubscription = await AWS.DocDB.EventSubscription("advancedSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  SubscriptionName: "advancedSubscription",
  Enabled: true,
  EventCategories: ["creation", "deletion"],
  SourceIds: ["cluster-1", "cluster-2"]
});
```

## Adopt Existing Resource

If you want to adopt an existing event subscription instead of failing when it already exists, you can set the adopt property to true.

```ts
const adoptEventSubscription = await AWS.DocDB.EventSubscription("existingSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  SubscriptionName: "existingSubscription",
  Enabled: true,
  adopt: true
});
```
