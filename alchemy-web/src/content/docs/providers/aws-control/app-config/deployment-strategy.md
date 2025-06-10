---
title: DeploymentStrategy
description: Learn how to create, update, and manage AWS AppConfig DeploymentStrategys using Alchemy Cloud Control.
---


The DeploymentStrategy resource lets you manage [AWS AppConfig DeploymentStrategies](https://docs.aws.amazon.com/appconfig/latest/userguide/) for deploying application configurations in a controlled manner. 

## Minimal Example

Create a basic deployment strategy with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("basicDeploymentStrategy", {
  Name: "BasicDeployment",
  ReplicateTo: "NONE", // This indicates that the deployment will not be replicated
  DeploymentDurationInMinutes: 30,
  GrowthFactor: 10,
  Description: "A basic deployment strategy for testing purposes."
});
```

## Advanced Configuration

Configure a deployment strategy with advanced settings including growth type and final bake time.

```ts
const advancedDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("advancedDeploymentStrategy", {
  Name: "AdvancedDeployment",
  ReplicateTo: "SSM_DOCUMENT", // This indicates that deployment will be replicated to SSM Document
  DeploymentDurationInMinutes: 60,
  GrowthFactor: 20,
  GrowthType: "LINEAR", // Use linear growth for deployment
  FinalBakeTimeInMinutes: 15,
  Description: "An advanced deployment strategy for gradual rollout."
});
```

## Custom Tags

Create a deployment strategy with custom tags for better resource management.

```ts
const taggedDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("taggedDeploymentStrategy", {
  Name: "TaggedDeployment",
  ReplicateTo: "APPLICATION", // Indicates deployment will be replicated to the application
  DeploymentDurationInMinutes: 45,
  GrowthFactor: 15,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  Description: "A deployment strategy with tags for better tracking."
});
```
