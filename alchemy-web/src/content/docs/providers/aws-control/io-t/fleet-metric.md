---
title: FleetMetric
description: Learn how to create, update, and manage AWS IoT FleetMetrics using Alchemy Cloud Control.
---


The FleetMetric resource allows you to create and manage [AWS IoT FleetMetrics](https://docs.aws.amazon.com/iot/latest/userguide/), which are used to define metrics for monitoring your IoT fleet.

## Minimal Example

Create a basic FleetMetric with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const fleetMetric = await AWS.IoT.FleetMetric("myFleetMetric", {
  MetricName: "DeviceTemperature",
  IndexName: "TemperatureIndex",
  Description: "Metric for monitoring device temperature",
  QueryString: "SELECT avg(temperature) FROM 'iot/topic'",
  Period: 60,
  Unit: "Celsius"
});
```

## Advanced Configuration

Configure a FleetMetric with aggregation settings for more complex metrics:

```ts
const advancedFleetMetric = await AWS.IoT.FleetMetric("advancedFleetMetric", {
  MetricName: "DeviceHumidity",
  IndexName: "HumidityIndex",
  Description: "Metric for monitoring device humidity",
  QueryString: "SELECT avg(humidity) FROM 'iot/humidity/topic'",
  Period: 300,
  Unit: "Percent",
  AggregationType: "Average",
  AggregationField: "humidity"
});
```

## Using Tags for Management

Create a FleetMetric with tags to help organize and manage your resources:

```ts
const taggedFleetMetric = await AWS.IoT.FleetMetric("taggedFleetMetric", {
  MetricName: "DeviceBatteryLevel",
  IndexName: "BatteryIndex",
  Description: "Metric for monitoring device battery levels",
  QueryString: "SELECT avg(battery_level) FROM 'iot/battery/topic'",
  Period: 120,
  Unit: "Percent",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing FleetMetric instead of failing when it already exists, set the `adopt` property to `true`:

```ts
const adoptFleetMetric = await AWS.IoT.FleetMetric("adoptFleetMetric", {
  MetricName: "DeviceStatus",
  IndexName: "StatusIndex",
  Description: "Metric for monitoring device status",
  QueryString: "SELECT count(*) FROM 'iot/status/topic'",
  Period: 60,
  Unit: "Count",
  adopt: true
});
```
