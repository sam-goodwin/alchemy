---
title: Managing AWS DMS EventSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS DMS EventSubscriptions using Alchemy Cloud Control.
---

# EventSubscription

The EventSubscription resource lets you manage AWS Database Migration Service (DMS) Event Subscriptions, which allow you to receive notifications about events in your DMS resources. For more information, refer to the [AWS DMS EventSubscriptions documentation](https://docs.aws.amazon.com/dms/latest/userguide/).

## Minimal Example

Create an EventSubscription with the required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const DmsEventSubscription = await AWS.DMS.EventSubscription("MyDmsEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyDmsSNSTopic",
  SourceType: "replication-instance",
  Enabled: true,
  SubscriptionName: "MySubscription",
  EventCategories: ["failure", "deletion"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure an EventSubscription with additional settings for source IDs and more event categories.

```ts
const AdvancedDmsEventSubscription = await AWS.DMS.EventSubscription("AdvancedDmsEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:AdvancedDmsSNSTopic",
  SourceType: "endpoint",
  Enabled: true,
  SubscriptionName: "AdvancedSubscription",
  EventCategories: ["migration-failure", "configuration-change", "availability"],
  SourceIds: ["my-endpoint-id"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Applications" }
  ]
});
```

## Using the Adoption Flag

Create an EventSubscription that adopts an existing resource if it already exists, avoiding failure.

```ts
const AdoptDmsEventSubscription = await AWS.DMS.EventSubscription("AdoptDmsEventSubscription", {
  SnsTopicArn: "arn:aws:sns:eu-west-1:123456789012:AdoptDmsSNSTopic",
  SourceType: "replication-instance",
  Enabled: true,
  SubscriptionName: "AdoptedSubscription",
  EventCategories: ["failure", "deletion"],
  adopt: true // If true, adopts existing resource instead of failing when resource already exists
});
```