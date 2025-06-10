---
title: JobQueue
description: Learn how to create, update, and manage AWS Batch JobQueues using Alchemy Cloud Control.
---


The JobQueue resource allows you to manage [AWS Batch JobQueues](https://docs.aws.amazon.com/batch/latest/userguide/) which are used for submitting and managing jobs in AWS Batch. 

## Minimal Example

Create a basic JobQueue with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const jobQueue = await AWS.Batch.JobQueue("primary-job-queue", {
  ComputeEnvironmentOrder: [
    {
      ComputeEnvironment: "my-compute-environment",
      Order: 1
    }
  ],
  Priority: 1,
  JobQueueName: "PrimaryJobQueue"
});
```

## Advanced Configuration

Configure a JobQueue with a specific scheduling policy and state.

```ts
const advancedJobQueue = await AWS.Batch.JobQueue("advanced-job-queue", {
  ComputeEnvironmentOrder: [
    {
      ComputeEnvironment: "my-compute-environment",
      Order: 1
    },
    {
      ComputeEnvironment: "my-secondary-compute-environment",
      Order: 2
    }
  ],
  Priority: 10,
  State: "ENABLED",
  SchedulingPolicyArn: "arn:aws:batch:us-west-2:123456789012:scheduling-policy/my-scheduling-policy"
});
```

## Job State Time Limit Actions

Create a JobQueue with job state time limit actions to manage jobs that exceed time limits.

```ts
const jobStateLimitQueue = await AWS.Batch.JobQueue("job-state-limit-queue", {
  ComputeEnvironmentOrder: [
    {
      ComputeEnvironment: "my-compute-environment",
      Order: 1
    }
  ],
  Priority: 5,
  JobStateTimeLimitActions: [
    {
      Action: "CANCEL",
      Timeout: 3600 // Cancel jobs that exceed 1 hour
    }
  ],
  JobQueueName: "JobStateLimitQueue"
});
```
