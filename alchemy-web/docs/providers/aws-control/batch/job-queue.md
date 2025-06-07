---
title: Managing AWS Batch JobQueues with Alchemy
description: Learn how to create, update, and manage AWS Batch JobQueues using Alchemy Cloud Control.
---

# JobQueue

The JobQueue resource lets you create and manage [AWS Batch JobQueues](https://docs.aws.amazon.com/batch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const jobqueue = await AWS.Batch.JobQueue("jobqueue-example", {
  ComputeEnvironmentOrder: [],
  Priority: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a jobqueue with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedJobQueue = await AWS.Batch.JobQueue("advanced-jobqueue", {
  ComputeEnvironmentOrder: [],
  Priority: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

