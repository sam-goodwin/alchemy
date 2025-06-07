---
title: Managing AWS Lightsail Alarms with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Alarms using Alchemy Cloud Control.
---

# Alarm

The Alarm resource lets you manage [AWS Lightsail Alarms](https://docs.aws.amazon.com/lightsail/latest/userguide/) to monitor your Lightsail resources based on specified metrics and conditions.

## Minimal Example

Create a basic Lightsail Alarm with required properties and some common optional settings:

```ts
import AWS from "alchemy/aws/control";

const basicAlarm = await AWS.Lightsail.Alarm("BasicAlarm", {
  AlarmName: "CPUUsageAlarm",
  MetricName: "CPUUtilization",
  ComparisonOperator: "GreaterThanThreshold",
  Threshold: 80,
  EvaluationPeriods: 1,
  MonitoredResourceName: "MyLightsailInstance",
  NotificationEnabled: true,
  ContactProtocols: ["Email"],
  TreatMissingData: "missing"
});
```

## Advanced Configuration

Configure an alarm with more advanced settings, such as multiple notification triggers and custom datapoints to alarm.

```ts
const advancedAlarm = await AWS.Lightsail.Alarm("AdvancedAlarm", {
  AlarmName: "DiskUsageAlarm",
  MetricName: "DiskUtilization",
  ComparisonOperator: "GreaterThanThreshold",
  Threshold: 75,
  EvaluationPeriods: 5,
  MonitoredResourceName: "MyLightsailInstance",
  NotificationEnabled: true,
  ContactProtocols: ["SMS"],
  DatapointsToAlarm: 3,
  NotificationTriggers: ["ALARM", "OK"],
  TreatMissingData: "breaching"
});
```

## Example with Resource Adoption

Create an alarm while adopting an existing resource to prevent failures if the resource already exists.

```ts
const adoptAlarm = await AWS.Lightsail.Alarm("AdoptAlarm", {
  AlarmName: "NetworkTrafficAlarm",
  MetricName: "NetworkIn",
  ComparisonOperator: "GreaterThanThreshold",
  Threshold: 1000000,
  EvaluationPeriods: 2,
  MonitoredResourceName: "MyLightsailInstance",
  NotificationEnabled: true,
  adopt: true
});
```