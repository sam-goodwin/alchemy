---
title: Managing AWS Neptune EventSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS Neptune EventSubscriptions using Alchemy Cloud Control.
---

# EventSubscription

The EventSubscription resource lets you manage [AWS Neptune EventSubscriptions](https://docs.aws.amazon.com/neptune/latest/userguide/) for monitoring and responding to events in your Neptune database cluster.

## Minimal Example

Create a basic EventSubscription with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.Neptune.EventSubscription("BasicEventSubscription", {
  SourceType: "db-instance",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  EventCategories: ["availability", "configuration change"]
});
```

## Advanced Configuration

Configure an EventSubscription with more advanced options, including multiple source IDs and the ability to adopt existing resources.

```ts
const advancedEventSubscription = await AWS.Neptune.EventSubscription("AdvancedEventSubscription", {
  SourceType: "db-cluster",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyAdvancedSNSTopic",
  EventCategories: ["deletion", "failover"],
  SourceIds: ["my-db-cluster-1", "my-db-cluster-2"],
  adopt: true
});
```

## Customizing Notification Settings

Set up an EventSubscription with specific event categories to receive notifications on critical changes.

```ts
const customNotificationEventSubscription = await AWS.Neptune.EventSubscription("CustomNotificationEventSubscription", {
  SourceType: "db-instance",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyCustomSNSTopic",
  EventCategories: ["failure", "maintenance", "notification"]
});
```

## Enabling and Disabling Subscriptions

Create an EventSubscription that can be enabled or disabled as necessary.

```ts
const toggleableEventSubscription = await AWS.Neptune.EventSubscription("ToggleableEventSubscription", {
  SourceType: "db-cluster",
  Enabled: false, // Initially disabled
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyToggleableSNSTopic",
  EventCategories: ["configuration change", "deletion"]
});

// Later, you can enable it by updating the Enabled property
await AWS.Neptune.EventSubscription("ToggleableEventSubscription", {
  Enabled: true
});
```