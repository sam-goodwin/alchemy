---
title: Managing AWS PCS Queues with Alchemy
description: Learn how to create, update, and manage AWS PCS Queues using Alchemy Cloud Control.
---

# Queue

The Queue resource lets you create and manage [AWS PCS Queues](https://docs.aws.amazon.com/pcs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcs-queue.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const queue = await AWS.PCS.Queue("queue-example", {
  ClusterId: "example-clusterid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a queue with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedQueue = await AWS.PCS.Queue("advanced-queue", {
  ClusterId: "example-clusterid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

