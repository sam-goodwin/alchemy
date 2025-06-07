---
title: Managing AWS SSM MaintenanceWindowTasks with Alchemy
description: Learn how to create, update, and manage AWS SSM MaintenanceWindowTasks using Alchemy Cloud Control.
---

# MaintenanceWindowTask

The MaintenanceWindowTask resource lets you create and manage [AWS SSM MaintenanceWindowTasks](https://docs.aws.amazon.com/ssm/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-maintenancewindowtask.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const maintenancewindowtask = await AWS.SSM.MaintenanceWindowTask("maintenancewindowtask-example", {
  Priority: 1,
  TaskArn: "example-taskarn",
  WindowId: "example-windowid",
  TaskType: "example-tasktype",
  Description: "A maintenancewindowtask resource managed by Alchemy",
});
```

## Advanced Configuration

Create a maintenancewindowtask with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMaintenanceWindowTask = await AWS.SSM.MaintenanceWindowTask(
  "advanced-maintenancewindowtask",
  {
    Priority: 1,
    TaskArn: "example-taskarn",
    WindowId: "example-windowid",
    TaskType: "example-tasktype",
    Description: "A maintenancewindowtask resource managed by Alchemy",
  }
);
```

