---
title: CustomMetric
description: Learn how to create, update, and manage AWS IoT CustomMetrics using Alchemy Cloud Control.
---


The CustomMetric resource allows you to manage [AWS IoT CustomMetrics](https://docs.aws.amazon.com/iot/latest/userguide/) for monitoring and analyzing IoT data. You can create and configure metrics to suit your IoT applications.

## Minimal Example

Create a basic CustomMetric with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMetric = await AWS.IoT.CustomMetric("basicMetric", {
  MetricName: "Temperature",
  MetricType: "Custom",
  DisplayName: "Temperature Sensor Metric"
});
```

## Advanced Configuration

Configure a CustomMetric with additional settings, including tags for better resource management.

```ts
const advancedMetric = await AWS.IoT.CustomMetric("advancedMetric", {
  MetricName: "Humidity",
  MetricType: "Custom",
  DisplayName: "Humidity Sensor Metric",
  Tags: [
    { Key: "Environment", Value: "Greenhouse" },
    { Key: "Location", Value: "North Wing" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Monitoring Air Quality

Create a CustomMetric specifically for monitoring air quality with multiple tags for categorization.

```ts
const airQualityMetric = await AWS.IoT.CustomMetric("airQualityMetric", {
  MetricName: "AirQualityIndex",
  MetricType: "Custom",
  DisplayName: "Air Quality Index Metric",
  Tags: [
    { Key: "Type", Value: "Pollution" },
    { Key: "Region", Value: "Urban" }
  ]
});
```

## Use Case: Tracking Device Performance

Set up a CustomMetric to track the performance of IoT devices in a smart home setting.

```ts
const devicePerformanceMetric = await AWS.IoT.CustomMetric("devicePerformanceMetric", {
  MetricName: "DeviceUptime",
  MetricType: "Custom",
  DisplayName: "Device Uptime Metric",
  Tags: [
    { Key: "Device", Value: "SmartThermostat" },
    { Key: "Status", Value: "Active" }
  ]
});
```
