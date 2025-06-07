---
title: Managing AWS IoT CustomMetrics with Alchemy
description: Learn how to create, update, and manage AWS IoT CustomMetrics using Alchemy Cloud Control.
---

# CustomMetric

The CustomMetric resource lets you create and manage custom metrics in AWS IoT, allowing for enhanced monitoring and analysis of device data. For more details, refer to the [AWS IoT CustomMetrics documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic custom metric with required properties and one optional display name:

```ts
import AWS from "alchemy/aws/control";

const MyCustomMetric = await AWS.IoT.CustomMetric("MyCustomMetric", {
  MetricName: "Temperature",
  MetricType: "Number",
  DisplayName: "Temperature Sensor Reading"
});
```

## Advanced Configuration

Configure a custom metric with additional tags for better organization and management:

```ts
const AdvancedCustomMetric = await AWS.IoT.CustomMetric("AdvancedCustomMetric", {
  MetricName: "Humidity",
  MetricType: "Number",
  DisplayName: "Humidity Level",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "DeviceType", Value: "Sensor" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing custom metric instead of creating a new one if it already exists:

```ts
const AdoptedCustomMetric = await AWS.IoT.CustomMetric("AdoptedCustomMetric", {
  MetricName: "WindSpeed",
  MetricType: "Number",
  adopt: true
});
```

## Custom Metric with Detailed Properties

Create a custom metric focusing on tracking device performance metrics:

```ts
const PerformanceMetric = await AWS.IoT.CustomMetric("PerformanceMetric", {
  MetricName: "CPUUtilization",
  MetricType: "Number",
  DisplayName: "CPU Utilization Percentage",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```