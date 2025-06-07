---
title: Managing AWS Deadline Queues with Alchemy
description: Learn how to create, update, and manage AWS Deadline Queues using Alchemy Cloud Control.
---

# Queue

The Queue resource lets you create and manage [AWS Deadline Queues](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-queue.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const queue = await AWS.Deadline.Queue("queue-example", {
  DisplayName: "queue-display",
  FarmId: "example-farmid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A queue resource managed by Alchemy",
});
```

## Advanced Configuration

Create a queue with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedQueue = await AWS.Deadline.Queue("advanced-queue", {
  DisplayName: "queue-display",
  FarmId: "example-farmid",
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

