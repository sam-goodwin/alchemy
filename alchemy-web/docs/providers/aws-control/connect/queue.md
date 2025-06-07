---
title: Managing AWS Connect Queues with Alchemy
description: Learn how to create, update, and manage AWS Connect Queues using Alchemy Cloud Control.
---

# Queue

The Queue resource lets you create and manage [AWS Connect Queues](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-queue.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const queue = await AWS.Connect.Queue("queue-example", {
  HoursOfOperationArn: "example-hoursofoperationarn",
  InstanceArn: "example-instancearn",
  Name: "queue-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A queue resource managed by Alchemy",
});
```

## Advanced Configuration

Create a queue with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedQueue = await AWS.Connect.Queue("advanced-queue", {
  HoursOfOperationArn: "example-hoursofoperationarn",
  InstanceArn: "example-instancearn",
  Name: "queue-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A queue resource managed by Alchemy",
});
```

