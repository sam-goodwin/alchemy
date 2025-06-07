---
title: Managing AWS RDS EventSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS RDS EventSubscriptions using Alchemy Cloud Control.
---

# EventSubscription

The EventSubscription resource lets you manage [AWS RDS EventSubscriptions](https://docs.aws.amazon.com/rds/latest/userguide/) for monitoring specific events in your Amazon RDS instances.

## Minimal Example

Create a basic RDS EventSubscription to monitor instance events.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.RDS.EventSubscription("BasicEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["availability", "deletion"],
  SubscriptionName: "MyFirstEventSubscription",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an EventSubscription with specific source identifiers and additional tags.

```ts
const advancedEventSubscription = await AWS.RDS.EventSubscription("AdvancedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: ["failure", "configuration change"],
  SourceIds: ["my-db-instance-1", "my-db-instance-2"],
  SubscriptionName: "AdvancedSubscription",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DatabaseAdmin" }
  ]
});
```

## Monitoring Multiple Event Categories

Setup an EventSubscription to monitor a wider range of event categories for better visibility.

```ts
const multiCategoryEventSubscription = await AWS.RDS.EventSubscription("MultiCategoryEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  EventCategories: [
    "availability",
    "deletion",
    "failover",
    "maintenance"
  ],
  SubscriptionName: "ComprehensiveEventSubscription",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Monitoring" }
  ]
});
```

## Adopting Existing Resources

Create an EventSubscription that adopts an existing resource if it already exists.

```ts
const adoptEventSubscription = await AWS.RDS.EventSubscription("AdoptExistingEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  SubscriptionName: "ExistingSubscription",
  adopt: true // Adopts the existing resource if it exists
});
```