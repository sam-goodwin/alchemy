---
title: NetworkPerformanceMetricSubscription
description: Learn how to create, update, and manage AWS EC2 NetworkPerformanceMetricSubscriptions using Alchemy Cloud Control.
---


The NetworkPerformanceMetricSubscription resource lets you manage subscriptions for network performance metrics in AWS EC2. This allows you to monitor network performance effectively. For more information, refer to the [AWS EC2 NetworkPerformanceMetricSubscriptions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic NetworkPerformanceMetricSubscription with required properties.

```ts
import AWS from "alchemy/aws/control";

const networkSubscription = await AWS.EC2.NetworkPerformanceMetricSubscription("networkSubscription", {
  Destination: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  Statistic: "Average",
  Metric: "PacketDropCount",
  Source: "i-0abcd1234efgh5678"
});
```

## Advanced Configuration

Configure a NetworkPerformanceMetricSubscription with the adoption of an existing resource.

```ts
const existingNetworkSubscription = await AWS.EC2.NetworkPerformanceMetricSubscription("existingNetworkSubscription", {
  Destination: "arn:aws:sns:us-west-2:123456789012:MyExistingSNSTopic",
  Statistic: "Sum",
  Metric: "BytesIn",
  Source: "i-0abcd1234efgh5678",
  adopt: true
});
```

## Custom Metric Configuration

Subscribe to a custom metric for more specific network performance monitoring.

```ts
const customMetricSubscription = await AWS.EC2.NetworkPerformanceMetricSubscription("customMetricSubscription", {
  Destination: "arn:aws:sns:us-east-1:123456789012:CustomSNSTopic",
  Statistic: "Maximum",
  Metric: "PacketLossCount",
  Source: "i-0abcd1234efgh5678"
});
```
