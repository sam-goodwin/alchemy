---
title: Managing AWS CloudWatch Alarms with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch Alarms using Alchemy Cloud Control.
---

# Alarm

The Alarm resource lets you create and manage [AWS CloudWatch Alarms](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-alarm.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alarm = await AWS.CloudWatch.Alarm("alarm-example", {
  ComparisonOperator: "example-comparisonoperator",
  EvaluationPeriods: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a alarm with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAlarm = await AWS.CloudWatch.Alarm("advanced-alarm", {
  ComparisonOperator: "example-comparisonoperator",
  EvaluationPeriods: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

