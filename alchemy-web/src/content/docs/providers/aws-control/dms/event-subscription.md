---
title: EventSubscription
description: Learn how to create, update, and manage AWS DMS EventSubscriptions using Alchemy Cloud Control.
---


The EventSubscription resource allows you to manage [AWS DMS EventSubscriptions](https://docs.aws.amazon.com/dms/latest/userguide/) for real-time notifications about database migration events.

## Minimal Example

Create a basic DMS EventSubscription with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.DMS.EventSubscription("basicEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:my-topic",
  SourceType: "replication-instance",
  Enabled: true
});
```

## Advanced Configuration

Configure an EventSubscription with multiple event categories and source IDs.

```ts
const advancedEventSubscription = await AWS.DMS.EventSubscription("advancedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:my-topic",
  SourceType: "endpoint",
  EventCategories: ["creation", "deletion", "failover"],
  SourceIds: ["my-source-id-1", "my-source-id-2"],
  Enabled: true,
  SubscriptionName: "MyAdvancedSubscription"
});
```

## Using Tags

Add tags to your EventSubscription for better management and organization.

```ts
const taggedEventSubscription = await AWS.DMS.EventSubscription("taggedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:my-topic",
  SourceType: "replication-instance",
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "DatabaseMigration" }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing EventSubscription, set the `adopt` property to true.

```ts
const existingEventSubscription = await AWS.DMS.EventSubscription("existingEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:my-topic",
  SourceType: "endpoint",
  Enabled: true,
  adopt: true
});
```
