---
title: Managing AWS Redshift EventSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS Redshift EventSubscriptions using Alchemy Cloud Control.
---

# EventSubscription

The EventSubscription resource allows you to manage [AWS Redshift EventSubscriptions](https://docs.aws.amazon.com/redshift/latest/userguide/) for monitoring significant events in your Redshift clusters.

## Minimal Example

Create a simple EventSubscription with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicEventSubscription = await AWS.Redshift.EventSubscription("BasicEventSubscription", {
  SubscriptionName: "MyRedshiftEventSubscription",
  SourceType: "cluster",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  EventCategories: ["configuration", "management"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataAnalytics" }
  ]
});
```

## Advanced Configuration

Configure an EventSubscription with additional options such as severity and specific source IDs.

```ts
const AdvancedEventSubscription = await AWS.Redshift.EventSubscription("AdvancedEventSubscription", {
  SubscriptionName: "AdvancedRedshiftEventSubscription",
  SourceType: "cluster",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  EventCategories: ["error", "notification"],
  Severity: "ERROR",
  SourceIds: ["my-cluster-id"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Specific Use Case: Error Monitoring

Set up an EventSubscription specifically for monitoring error events in your Redshift clusters.

```ts
const ErrorMonitoringEventSubscription = await AWS.Redshift.EventSubscription("ErrorMonitoringEventSubscription", {
  SubscriptionName: "ErrorMonitoringRedshiftEventSubscription",
  SourceType: "cluster",
  Enabled: true,
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:ErrorNotifications",
  EventCategories: ["error"],
  Severity: "ERROR",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "UseCase", Value: "ErrorMonitoring" }
  ]
});
```