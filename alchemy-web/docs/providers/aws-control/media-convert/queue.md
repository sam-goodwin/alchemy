---
title: Managing AWS MediaConvert Queues with Alchemy
description: Learn how to create, update, and manage AWS MediaConvert Queues using Alchemy Cloud Control.
---

# Queue

The Queue resource lets you manage [AWS MediaConvert Queues](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) for processing media jobs. Queues are used to manage the rate at which jobs are processed.

## Minimal Example

Create a basic MediaConvert queue with a specified name and status.

```ts
import AWS from "alchemy/aws/control";

const MediaConvertQueue = await AWS.MediaConvert.Queue("BasicQueue", {
  Name: "MyFirstQueue",
  Status: "ACTIVE",
  Description: "This is my first MediaConvert queue."
});
```

## Advanced Configuration

Configure a MediaConvert queue with additional properties such as pricing plan and tags.

```ts
const AdvancedMediaConvertQueue = await AWS.MediaConvert.Queue("AdvancedQueue", {
  Name: "MyAdvancedQueue",
  Status: "ACTIVE",
  PricingPlan: "REQUESTER pays",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Media" }
  ],
  ConcurrentJobs: 5
});
```

## Custom Queue with Resource Handling

Create a queue that adopts an existing resource, useful for managing resources across different environments.

```ts
const AdoptedMediaConvertQueue = await AWS.MediaConvert.Queue("AdoptedQueue", {
  Name: "AdoptedQueue",
  Status: "ACTIVE",
  Description: "This queue adopts an existing resource.",
  adopt: true
});
```

## Queue with Specific Job Handling

Set up a queue that limits the number of concurrent jobs and includes a description.

```ts
const LimitedConcurrentQueue = await AWS.MediaConvert.Queue("LimitedQueue", {
  Name: "LimitedConcurrentQueue",
  Status: "ACTIVE",
  Description: "This queue handles limited concurrent jobs.",
  ConcurrentJobs: 2
});
```