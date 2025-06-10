---
title: CompositeAlarm
description: Learn how to create, update, and manage AWS CloudWatch CompositeAlarms using Alchemy Cloud Control.
---


The CompositeAlarm resource lets you manage AWS CloudWatch CompositeAlarms, which are alarms that can combine multiple other alarms into a single alarm state. For more details, refer to the [AWS CloudWatch CompositeAlarms documentation](https://docs.aws.amazon.com/cloudwatch/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic CompositeAlarm with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCompositeAlarm = await AWS.CloudWatch.CompositeAlarm("basicCompositeAlarm", {
  AlarmName: "HighCPUUsageAlarm",
  AlarmRule: "ALARM(HighCPUAlarm) OR ALARM(HighMemoryAlarm)",
  AlarmActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"]
});
```

## Advanced Configuration

In this example, we configure a CompositeAlarm with additional settings like description and insufficient data actions.

```ts
const advancedCompositeAlarm = await AWS.CloudWatch.CompositeAlarm("advancedCompositeAlarm", {
  AlarmName: "CombinedResourceAlarms",
  AlarmDescription: "Alarm that triggers if any of the resource alarms are in ALARM state.",
  AlarmRule: "ALARM(EC2InstanceAlarm) OR ALARM(RDSInstanceAlarm)",
  InsufficientDataActions: ["arn:aws:sns:us-east-1:123456789012:AlertMe"],
  OKActions: ["arn:aws:sns:us-east-1:123456789012:ResetAlarm"]
});
```

## Using Actions Suppressor

This example shows how to use the Actions Suppressor feature to avoid triggering actions too frequently.

```ts
const compositeAlarmWithSuppression = await AWS.CloudWatch.CompositeAlarm("compositeAlarmWithSuppression", {
  AlarmName: "FrequentAlertSuppressor",
  AlarmRule: "ALARM(LoadBalancerHighLatency) OR ALARM(HighErrorRate)",
  ActionsSuppressor: "SuppressAlerts",
  ActionsSuppressorWaitPeriod: 300,
  ActionsEnabled: true
});
```

## Tagging Alarms

Here we create a CompositeAlarm and apply tags for better organization and management.

```ts
const taggedCompositeAlarm = await AWS.CloudWatch.CompositeAlarm("taggedCompositeAlarm", {
  AlarmName: "ResourceHealthCheckAlarm",
  AlarmRule: "ALARM(DiskSpaceAlarm) OR ALARM(NetworkLatencyAlarm)",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```
