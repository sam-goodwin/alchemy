---
title: Managing AWS IoT FleetMetrics with Alchemy
description: Learn how to create, update, and manage AWS IoT FleetMetrics using Alchemy Cloud Control.
---

# FleetMetric

The FleetMetric resource lets you create and manage [AWS IoT FleetMetrics](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fleetmetric = await AWS.IoT.FleetMetric("fleetmetric-example", {
  MetricName: "fleetmetric-metric",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A fleetmetric resource managed by Alchemy",
});
```

## Advanced Configuration

Create a fleetmetric with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFleetMetric = await AWS.IoT.FleetMetric("advanced-fleetmetric", {
  MetricName: "fleetmetric-metric",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A fleetmetric resource managed by Alchemy",
});
```

