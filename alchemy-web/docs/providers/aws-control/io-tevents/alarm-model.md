---
title: Managing AWS IoTEvents AlarmModels with Alchemy
description: Learn how to create, update, and manage AWS IoTEvents AlarmModels using Alchemy Cloud Control.
---

# AlarmModel

The AlarmModel resource lets you create and manage [AWS IoTEvents AlarmModels](https://docs.aws.amazon.com/iotevents/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alarmmodel = await AWS.IoTEvents.AlarmModel("alarmmodel-example", {
  AlarmRule: "example-alarmrule",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a alarmmodel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAlarmModel = await AWS.IoTEvents.AlarmModel("advanced-alarmmodel", {
  AlarmRule: "example-alarmrule",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

