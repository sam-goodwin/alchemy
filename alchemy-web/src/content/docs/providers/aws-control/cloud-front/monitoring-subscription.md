---
title: MonitoringSubscription
description: Learn how to create, update, and manage AWS CloudFront MonitoringSubscriptions using Alchemy Cloud Control.
---


The MonitoringSubscription resource lets you manage [AWS CloudFront MonitoringSubscriptions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) to receive real-time monitoring metrics for your CloudFront distributions.

## Minimal Example

Create a basic monitoring subscription for a CloudFront distribution with minimal required properties:

```ts
import AWS from "alchemy/aws/control";

const monitoringSubscription = await AWS.CloudFront.MonitoringSubscription("basicMonitoringSubscription", {
  MonitoringSubscription: {
    // Specify the monitoring subscription configurations
    // For example, you might define here the types of metrics you're interested in
  },
  DistributionId: "EDFDVBD6EXAMPLE",
});
```

## Advanced Configuration

Configure a monitoring subscription with more detailed settings, such as enabling specific metrics:

```ts
const advancedMonitoringSubscription = await AWS.CloudFront.MonitoringSubscription("advancedMonitoringSubscription", {
  MonitoringSubscription: {
    // Configure detailed monitoring settings here
    // Example: specify the metrics to monitor
    Metrics: ["All", "4xx", "5xx", "Latency"]
  },
  DistributionId: "EDFDVBD6EXAMPLE",
  adopt: true // Adopt existing resource if it already exists
});
```

## Real-Time Monitoring for Multiple Distributions

Create monitoring subscriptions for multiple CloudFront distributions to track their performance:

```ts
const monitoringSubscription1 = await AWS.CloudFront.MonitoringSubscription("monitoringSubscription1", {
  MonitoringSubscription: {
    Metrics: ["All"]
  },
  DistributionId: "EDFDVBD6EXAMPLE1",
  adopt: true
});

const monitoringSubscription2 = await AWS.CloudFront.MonitoringSubscription("monitoringSubscription2", {
  MonitoringSubscription: {
    Metrics: ["Latency", "5xx"]
  },
  DistributionId: "EDFDVBD6EXAMPLE2",
  adopt: true
});
```

## Updating an Existing Monitoring Subscription

Show how to update an existing monitoring subscription to change its settings:

```ts
const updatedMonitoringSubscription = await AWS.CloudFront.MonitoringSubscription("updatedMonitoringSubscription", {
  MonitoringSubscription: {
    Metrics: ["4xx", "5xx"]
  },
  DistributionId: "EDFDVBD6EXAMPLE",
  adopt: true // Ensure it adopts if already exists
});
```
