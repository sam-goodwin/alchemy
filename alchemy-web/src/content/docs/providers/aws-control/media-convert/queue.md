---
title: Queue
description: Learn how to create, update, and manage AWS MediaConvert Queues using Alchemy Cloud Control.
---


The Queue resource lets you manage [AWS MediaConvert Queues](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) for processing media files using AWS MediaConvert service.

## Minimal Example

Create a basic MediaConvert queue with a specified name and default settings:

```ts
import AWS from "alchemy/aws/control";

const mediaConvertQueue = await AWS.MediaConvert.Queue("basicQueue", {
  name: "StandardQueue",
  status: "ACTIVE",
  description: "A standard queue for processing video files",
  pricingPlan: "ON_DEMAND",
  concurrentJobs: 5
});
```

## Advanced Configuration

Configure a MediaConvert queue with additional options such as tagging and status:

```ts
const advancedQueue = await AWS.MediaConvert.Queue("advancedQueue", {
  name: "AdvancedQueue",
  status: "ACTIVE",
  description: "An advanced queue for high priority video processing",
  pricingPlan: "ON_DEMAND",
  concurrentJobs: 10,
  tags: {
    Project: "VideoProcessing",
    Environment: "Production"
  }
});
```

## Queue with Adoption

Create a MediaConvert queue that adopts an existing resource if it exists:

```ts
const adoptQueue = await AWS.MediaConvert.Queue("adoptedQueue", {
  name: "AdoptedQueue",
  status: "ACTIVE",
  description: "A queue that adopts existing resources",
  concurrentJobs: 3,
  adopt: true
});
```

## Queue with High Throughput

Set up a MediaConvert queue optimized for high throughput:

```ts
const highThroughputQueue = await AWS.MediaConvert.Queue("highThroughputQueue", {
  name: "HighThroughputQueue",
  status: "ACTIVE",
  description: "A queue optimized for high throughput processing",
  pricingPlan: "ON_DEMAND",
  concurrentJobs: 20,
  tags: {
    UseCase: "LiveStreaming",
    Priority: "High"
  }
});
```
