---
title: MaintenanceWindowTask
description: Learn how to create, update, and manage AWS SSM MaintenanceWindowTasks using Alchemy Cloud Control.
---


The MaintenanceWindowTask resource lets you create and manage tasks that can be executed during specified maintenance windows in AWS Systems Manager. For more detailed information, refer to the [AWS SSM MaintenanceWindowTasks documentation](https://docs.aws.amazon.com/ssm/latest/userguide/).

## Minimal Example

Create a basic MaintenanceWindowTask with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const maintenanceTask = await AWS.SSM.MaintenanceWindowTask("basicMaintenanceTask", {
  WindowId: "mw-1234567890abcdef0",
  TaskArn: "arn:aws:ssm:us-east-1:123456789012:task:MyTask",
  TaskType: "RUN_COMMAND",
  Priority: 1,
  MaxConcurrency: "1",
  MaxErrors: "1"
});
```

## Advanced Configuration

Configure a MaintenanceWindowTask with additional properties for logging and task parameters.

```ts
const advancedMaintenanceTask = await AWS.SSM.MaintenanceWindowTask("advancedMaintenanceTask", {
  WindowId: "mw-0987654321fedcba0",
  TaskArn: "arn:aws:ssm:us-east-1:123456789012:task:AnotherTask",
  TaskType: "RUN_COMMAND",
  Priority: 2,
  Targets: [{
    Key: "InstanceIds",
    Values: ["i-1234567890abcdef0"]
  }],
  TaskInvocationParameters: {
    RunCommand: {
      DocumentName: "AWS-RunShellScript",
      Parameters: {
        commands: ["echo Hello World"]
      }
    }
  },
  LoggingInfo: {
    S3BucketName: "my-logging-bucket",
    S3BucketOwner: "123456789012",
    S3KeyPrefix: "maintenance-logs"
  }
});
```

## Using IAM Role

Demonstrate how to specify a Service Role ARN for the task execution.

```ts
const taskWithServiceRole = await AWS.SSM.MaintenanceWindowTask("taskWithServiceRole", {
  WindowId: "mw-1122334455667788",
  TaskArn: "arn:aws:ssm:us-east-1:123456789012:task:ServiceRoleTask",
  TaskType: "RUN_COMMAND",
  Priority: 3,
  ServiceRoleArn: "arn:aws:iam::123456789012:role/MyMaintenanceWindowRole"
});
```

## Cleanup Behavior

Show how to specify cutoff behavior for task execution.

```ts
const taskWithCutoffBehavior = await AWS.SSM.MaintenanceWindowTask("taskWithCutoffBehavior", {
  WindowId: "mw-2233445566778899",
  TaskArn: "arn:aws:ssm:us-east-1:123456789012:task:CutoffBehaviorTask",
  TaskType: "RUN_COMMAND",
  Priority: 4,
  CutoffBehavior: "CANCEL_TASK"
});
```
