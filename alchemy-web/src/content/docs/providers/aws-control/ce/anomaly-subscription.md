---
title: AnomalySubscription
description: Learn how to create, update, and manage AWS CE AnomalySubscriptions using Alchemy Cloud Control.
---


The AnomalySubscription resource allows you to create and manage AWS Cost Explorer Anomaly Subscriptions for monitoring cost anomalies in your AWS account. For more details, refer to the [AWS CE AnomalySubscriptions documentation](https://docs.aws.amazon.com/ce/latest/userguide/).

## Minimal Example

Create a basic AnomalySubscription with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAnomalySubscription = await AWS.CE.AnomalySubscription("basicAnomalySubscription", {
  MonitorArnList: [
    "arn:aws:ce::123456789012:monitor:example-monitor"
  ],
  Frequency: "DAILY",
  SubscriptionName: "DailyCostAnomalyAlert",
  Subscribers: [
    {
      Address: "alert@example.com",
      Type: "EMAIL"
    }
  ]
});
```

## Advanced Configuration

Configure an AnomalySubscription with additional options such as resource tags and a threshold.

```ts
const advancedAnomalySubscription = await AWS.CE.AnomalySubscription("advancedAnomalySubscription", {
  MonitorArnList: [
    "arn:aws:ce::123456789012:monitor:example-monitor"
  ],
  ResourceTags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  Frequency: "WEEKLY",
  SubscriptionName: "WeeklyCostAnomalyAlert",
  Subscribers: [
    {
      Address: "dev-team@example.com",
      Type: "EMAIL"
    }
  ],
  Threshold: 100,
  ThresholdExpression: "GreaterThan"
});
```

## Using Multiple Subscribers

Demonstrate how to set up an AnomalySubscription with multiple subscribers to receive notifications.

```ts
const multiSubscriberAnomalySubscription = await AWS.CE.AnomalySubscription("multiSubscriberAnomalySubscription", {
  MonitorArnList: [
    "arn:aws:ce::123456789012:monitor:example-monitor"
  ],
  Frequency: "DAILY",
  SubscriptionName: "TeamCostAnomalyAlerts",
  Subscribers: [
    {
      Address: "team-lead@example.com",
      Type: "EMAIL"
    },
    {
      Address: "devops-team@example.com",
      Type: "EMAIL"
    }
  ],
  Threshold: 50
});
```

## Adopting Existing Resources

Create an AnomalySubscription that adopts an existing resource if it already exists.

```ts
const adoptExistingAnomalySubscription = await AWS.CE.AnomalySubscription("adoptExistingAnomalySubscription", {
  MonitorArnList: [
    "arn:aws:ce::123456789012:monitor:example-monitor"
  ],
  Frequency: "MONTHLY",
  SubscriptionName: "MonthlyCostAnomalyAdoption",
  Subscribers: [
    {
      Address: "alert-team@example.com",
      Type: "EMAIL"
    }
  ],
  adopt: true
});
```
