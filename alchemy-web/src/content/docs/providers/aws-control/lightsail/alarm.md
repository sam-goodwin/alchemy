---
title: Alarm
description: Learn how to create, update, and manage AWS Lightsail Alarms using Alchemy Cloud Control.
---


The Alarm resource allows you to manage [AWS Lightsail Alarms](https://docs.aws.amazon.com/lightsail/latest/userguide/) for monitoring your Lightsail resources. You can set thresholds for various metrics to receive notifications when those thresholds are breached.

## Minimal Example

Create a basic alarm that monitors CPU utilization:

```ts
import AWS from "alchemy/aws/control";

const cpuAlarm = await AWS.Lightsail.Alarm("cpu-utilization-alarm", {
  MetricName: "CPUUtilization",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "missing",
  AlarmName: "HighCPUUtilization",
  MonitoredResourceName: "my-lightsail-instance",
  EvaluationPeriods: 1,
  NotificationEnabled: true,
  Threshold: 80
});
```

## Advanced Configuration

Configure an alarm that monitors network in/out traffic with multiple notification protocols:

```ts
const networkAlarm = await AWS.Lightsail.Alarm("network-traffic-alarm", {
  MetricName: "NetworkIn",
  ComparisonOperator: "GreaterThanThreshold",
  AlarmName: "HighNetworkInTraffic",
  MonitoredResourceName: "my-lightsail-instance",
  EvaluationPeriods: 2,
  Threshold: 1000000,
  NotificationEnabled: true,
  ContactProtocols: ["Email", "SMS"],
  NotificationTriggers: ["Alarm"]
});
```

## Alarm with Datapoints Configuration

Create an alarm that triggers when there are multiple data points that exceed the threshold:

```ts
const multiDataPointAlarm = await AWS.Lightsail.Alarm("multi-data-point-alarm", {
  MetricName: "DiskReadOps",
  ComparisonOperator: "GreaterThanThreshold",
  AlarmName: "HighDiskReadOperations",
  MonitoredResourceName: "my-lightsail-instance",
  EvaluationPeriods: 3,
  DatapointsToAlarm: 2,
  NotificationEnabled: true,
  Threshold: 5000
});
```

## Alarm with Missing Data Treatment

Set up an alarm that treats missing data as "breaching" the threshold:

```ts
const missingDataAlarm = await AWS.Lightsail.Alarm("missing-data-alarm", {
  MetricName: "CPUUtilization",
  ComparisonOperator: "GreaterThanThreshold",
  AlarmName: "CPUUtilizationMissingData",
  MonitoredResourceName: "my-lightsail-instance",
  EvaluationPeriods: 1,
  Threshold: 70,
  TreatMissingData: "breaching"
});
```
