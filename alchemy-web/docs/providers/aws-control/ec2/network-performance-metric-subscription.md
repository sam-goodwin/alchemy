---
title: Managing AWS EC2 NetworkPerformanceMetricSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkPerformanceMetricSubscriptions using Alchemy Cloud Control.
---

# NetworkPerformanceMetricSubscription

The NetworkPerformanceMetricSubscription resource lets you create and manage [AWS EC2 NetworkPerformanceMetricSubscriptions](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkperformancemetricsubscription.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkperformancemetricsubscription = await AWS.EC2.NetworkPerformanceMetricSubscription(
  "networkperformancemetricsubscription-example",
  {
    Destination: "example-destination",
    Statistic: "example-statistic",
    Metric: "example-metric",
    Source: "example-source",
  }
);
```

