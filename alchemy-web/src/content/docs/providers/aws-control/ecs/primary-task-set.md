---
title: PrimaryTaskSet
description: Learn how to create, update, and manage AWS ECS PrimaryTaskSets using Alchemy Cloud Control.
---


The PrimaryTaskSet resource allows you to manage [AWS ECS PrimaryTaskSets](https://docs.aws.amazon.com/ecs/latest/userguide/) for your containerized applications. This resource is essential for managing the task sets that are running under an Amazon ECS service.

## Minimal Example

Create a basic PrimaryTaskSet with required properties.

```ts
import AWS from "alchemy/aws/control";

const primaryTaskSet = await AWS.ECS.PrimaryTaskSet("myPrimaryTaskSet", {
  TaskSetId: "my-task-set-id",
  Cluster: "my-cluster-name",
  Service: "my-service-name",
  adopt: true // Allows adoption of existing resource
});
```

## Advanced Configuration

Configure a PrimaryTaskSet with additional optional properties.

```ts
const advancedTaskSet = await AWS.ECS.PrimaryTaskSet("advancedTaskSet", {
  TaskSetId: "advanced-task-set-id",
  Cluster: "production-cluster",
  Service: "production-service",
  adopt: true // Adopt existing resource
});
```

## Updating a PrimaryTaskSet

Demonstrate updating an existing PrimaryTaskSet with new properties.

```ts
const updatedTaskSet = await AWS.ECS.PrimaryTaskSet("updatedTaskSet", {
  TaskSetId: "my-task-set-id",
  Cluster: "my-cluster-name",
  Service: "my-service-name",
  adopt: false // Do not adopt existing resource
});
```

## Complete TaskSet Management

Show how to create and manage a PrimaryTaskSet with realistic values and configurations.

```ts
const completeTaskSet = await AWS.ECS.PrimaryTaskSet("completeTaskSet", {
  TaskSetId: "complete-task-set-id",
  Cluster: "production-cluster",
  Service: "web-service",
  adopt: true // Allows adoption of existing resource
});
```
