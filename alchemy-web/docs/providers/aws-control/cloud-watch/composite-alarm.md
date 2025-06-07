---
title: Managing AWS CloudWatch CompositeAlarms with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch CompositeAlarms using Alchemy Cloud Control.
---

# CompositeAlarm

The CompositeAlarm resource lets you create and manage [AWS CloudWatch CompositeAlarms](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-compositealarm.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const compositealarm = await AWS.CloudWatch.CompositeAlarm("compositealarm-example", {
  AlarmRule: "example-alarmrule",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a compositealarm with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCompositeAlarm = await AWS.CloudWatch.CompositeAlarm("advanced-compositealarm", {
  AlarmRule: "example-alarmrule",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

