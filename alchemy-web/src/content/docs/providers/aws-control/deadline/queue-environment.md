---
title: QueueEnvironment
description: Learn how to create, update, and manage AWS Deadline QueueEnvironments using Alchemy Cloud Control.
---


The QueueEnvironment resource allows you to create and manage [AWS Deadline QueueEnvironments](https://docs.aws.amazon.com/deadline/latest/userguide/) for rendering jobs efficiently in a Deadline environment.

## Minimal Example

Create a basic QueueEnvironment with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicQueueEnvironment = await AWS.Deadline.QueueEnvironment("basicQueueEnvironment", {
  Priority: 10,
  QueueId: "myQueue123",
  TemplateType: "default",
  FarmId: "farmA",
  Template: "myTemplate",
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Set up a QueueEnvironment with a higher priority and additional configuration.

```ts
const advancedQueueEnvironment = await AWS.Deadline.QueueEnvironment("advancedQueueEnvironment", {
  Priority: 5,
  QueueId: "highPriorityQueue",
  TemplateType: "render",
  FarmId: "farmB",
  Template: "renderTemplate",
  adopt: false // Optional: do not adopt if it exists
});
```

## QueueEnvironment for High-Volume Rendering

Configure a QueueEnvironment specifically for high-volume rendering tasks.

```ts
const highVolumeQueueEnvironment = await AWS.Deadline.QueueEnvironment("highVolumeQueueEnvironment", {
  Priority: 1,
  QueueId: "renderQueueHighVolume",
  TemplateType: "highVolume",
  FarmId: "farmC",
  Template: "highVolumeTemplate",
  adopt: true // Adopt existing resource to avoid errors
});
```

## Using QueueEnvironment with Custom Farm Settings

Create a QueueEnvironment that utilizes custom farm settings for specialized rendering needs.

```ts
const customFarmQueueEnvironment = await AWS.Deadline.QueueEnvironment("customFarmQueueEnvironment", {
  Priority: 7,
  QueueId: "customFarmQueue",
  TemplateType: "custom",
  FarmId: "customFarmID",
  Template: "customRenderingTemplate",
  adopt: false // Do not adopt if already exists
});
```
