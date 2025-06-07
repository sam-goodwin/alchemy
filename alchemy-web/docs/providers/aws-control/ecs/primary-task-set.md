---
title: Managing AWS ECS PrimaryTaskSets with Alchemy
description: Learn how to create, update, and manage AWS ECS PrimaryTaskSets using Alchemy Cloud Control.
---

# PrimaryTaskSet

The PrimaryTaskSet resource lets you manage [AWS ECS PrimaryTaskSets](https://docs.aws.amazon.com/ecs/latest/userguide/) within your Elastic Container Service. This resource helps in handling task sets that are part of a service in ECS, allowing you to manage deployments effectively.

## Minimal Example

This example demonstrates the creation of a basic PrimaryTaskSet with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicPrimaryTaskSet = await AWS.ECS.PrimaryTaskSet("BasicTaskSet", {
  TaskSetId: "example-task-set-id",
  Cluster: "example-cluster",
  Service: "example-service"
});
```

## Advanced Configuration

In this example, we show how to create a PrimaryTaskSet with additional properties such as adoption of existing resources.

```ts
const advancedPrimaryTaskSet = await AWS.ECS.PrimaryTaskSet("AdvancedTaskSet", {
  TaskSetId: "advanced-task-set-id",
  Cluster: "advanced-cluster",
  Service: "advanced-service",
  adopt: true // Adopts existing PrimaryTaskSet if it already exists
});
```

## Specific Use Case: Deployment Updates

This example demonstrates how to update a PrimaryTaskSet during a deployment process.

```ts
const deploymentPrimaryTaskSet = await AWS.ECS.PrimaryTaskSet("DeploymentTaskSet", {
  TaskSetId: "deployment-task-set-id",
  Cluster: "deployment-cluster",
  Service: "deployment-service",
  adopt: false // This will fail if the task set already exists
});
```

## Additional Properties

Here’s how to create a PrimaryTaskSet with monitoring properties, although the example does not include specific monitoring settings as they are not part of this resource.

```ts
const monitoredPrimaryTaskSet = await AWS.ECS.PrimaryTaskSet("MonitoredTaskSet", {
  TaskSetId: "monitored-task-set-id",
  Cluster: "monitored-cluster",
  Service: "monitored-service"
  // Additional monitoring properties can be added here if needed
});
```