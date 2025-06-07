---
title: Managing AWS DocDB EventSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS DocDB EventSubscriptions using Alchemy Cloud Control.
---

# EventSubscription

The EventSubscription resource lets you manage [AWS DocDB EventSubscriptions](https://docs.aws.amazon.com/docdb/latest/userguide/) for monitoring and responding to events in your Amazon DocumentDB clusters.

## Minimal Example

Create a basic EventSubscription with required properties and a common optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.DocDB.EventSubscription("BasicEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true
});
```

## Advanced Configuration

Configure an EventSubscription with specific event categories and multiple source IDs.

```ts
const advancedEventSubscription = await AWS.DocDB.EventSubscription("AdvancedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["availability", "deletion"],
  SourceIds: ["my-docdb-instance-1", "my-docdb-instance-2"]
});
```

## Adoption of Existing Resource

If you need to adopt an existing EventSubscription instead of creating a new one, set the `adopt` property to true.

```ts
const adoptedEventSubscription = await AWS.DocDB.EventSubscription("AdoptedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  adopt: true
});
```

## Custom Subscription Name

You can customize the subscription name for better identification in your AWS account.

```ts
const namedEventSubscription = await AWS.DocDB.EventSubscription("NamedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  SubscriptionName: "MyCustomSubscription"
});
```