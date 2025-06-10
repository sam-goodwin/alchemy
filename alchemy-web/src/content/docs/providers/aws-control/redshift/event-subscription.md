---
title: EventSubscription
description: Learn how to create, update, and manage AWS Redshift EventSubscriptions using Alchemy Cloud Control.
---


The EventSubscription resource allows you to manage [AWS Redshift EventSubscriptions](https://docs.aws.amazon.com/redshift/latest/userguide/) for monitoring events in your Amazon Redshift clusters.

## Minimal Example

Create a basic EventSubscription with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicEventSubscription = await AWS.Redshift.EventSubscription("basicEventSubscription", {
  SubscriptionName: "my-redshift-events",
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  Enabled: true
});
```

## Advanced Configuration

Configure an EventSubscription with multiple event categories and severity levels.

```ts
const advancedEventSubscription = await AWS.Redshift.EventSubscription("advancedEventSubscription", {
  SubscriptionName: "advanced-redshift-events",
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  Enabled: true,
  EventCategories: ["configuration", "management"],
  Severity: "ERROR"
});
```

## Specific Use Case: Source IDs

Create an EventSubscription for specific source IDs to monitor selected Redshift clusters.

```ts
const specificSourceIdsEventSubscription = await AWS.Redshift.EventSubscription("specificSourceIdsEventSubscription", {
  SubscriptionName: "source-ids-redshift-events",
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  Enabled: true,
  SourceType: "cluster",
  SourceIds: ["cluster-1", "cluster-2"]
});
```

## Specific Use Case: Tagging

Create an EventSubscription and associate it with tags for better resource management.

```ts
const taggedEventSubscription = await AWS.Redshift.EventSubscription("taggedEventSubscription", {
  SubscriptionName: "tagged-redshift-events",
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```
