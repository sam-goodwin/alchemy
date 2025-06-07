---
title: Managing AWS SageMaker MonitoringSchedules with Alchemy
description: Learn how to create, update, and manage AWS SageMaker MonitoringSchedules using Alchemy Cloud Control.
---

# MonitoringSchedule

The MonitoringSchedule resource lets you create and manage [AWS SageMaker MonitoringSchedules](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const monitoringschedule = await AWS.SageMaker.MonitoringSchedule("monitoringschedule-example", {
  MonitoringScheduleConfig: "example-monitoringscheduleconfig",
  MonitoringScheduleName: "monitoringschedule-monitoringschedule",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a monitoringschedule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMonitoringSchedule = await AWS.SageMaker.MonitoringSchedule(
  "advanced-monitoringschedule",
  {
    MonitoringScheduleConfig: "example-monitoringscheduleconfig",
    MonitoringScheduleName: "monitoringschedule-monitoringschedule",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

