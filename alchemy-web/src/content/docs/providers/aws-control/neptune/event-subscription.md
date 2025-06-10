---
title: EventSubscription
description: Learn how to create, update, and manage AWS Neptune EventSubscriptions using Alchemy Cloud Control.
---


The EventSubscription resource allows you to manage [AWS Neptune EventSubscriptions](https://docs.aws.amazon.com/neptune/latest/userguide/) that notify you of specific database events. This capability is essential for monitoring and reacting to database changes effectively.

## Minimal Example

Create a basic EventSubscription with essential properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const eventSubscription = await AWS.Neptune.EventSubscription("myEventSubscription", {
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["availability", "configuration"],
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:myTopic"
});
```

## Advanced Configuration

Configure an EventSubscription with multiple source IDs and additional properties:

```ts
const advancedEventSubscription = await AWS.Neptune.EventSubscription("advancedEventSubscription", {
  SourceType: "db-cluster",
  Enabled: true,
  EventCategories: ["failure", "deletion"],
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:myAdvancedTopic",
  SourceIds: ["my-db-cluster-1", "my-db-cluster-2"]
});
```

## Adoption of Existing Resources

If you want to adopt an existing EventSubscription instead of failing when it already exists, you can set the `adopt` property:

```ts
const adoptExistingSubscription = await AWS.Neptune.EventSubscription("existingEventSubscription", {
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["creation", "modification"],
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:myAdoptedTopic",
  adopt: true
});
```

## Multi-Category Notification

Set up an EventSubscription that monitors multiple event categories for a specific source:

```ts
const multiCategorySubscription = await AWS.Neptune.EventSubscription("multiCategorySubscription", {
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["availability", "configuration", "deletion"],
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:multiCategoryTopic",
  SourceIds: ["my-db-instance-1"]
});
```
