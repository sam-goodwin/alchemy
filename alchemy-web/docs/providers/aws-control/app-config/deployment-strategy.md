---
title: Managing AWS AppConfig DeploymentStrategys with Alchemy
description: Learn how to create, update, and manage AWS AppConfig DeploymentStrategys using Alchemy Cloud Control.
---

# DeploymentStrategy

The DeploymentStrategy resource lets you manage AWS AppConfig Deployment Strategys, which define how to deploy application configurations across different environments. For more information, refer to the [AWS AppConfig DeploymentStrategys](https://docs.aws.amazon.com/appconfig/latest/userguide/).

## Minimal Example

Create a basic deployment strategy with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("BasicDeploymentStrategy", {
  Name: "BasicDeployment",
  DeploymentDurationInMinutes: 30,
  GrowthType: "Linear",
  GrowthFactor: 10,
  ReplicateTo: "SSM_DOCUMENT",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a deployment strategy with additional optional parameters for a more controlled rollout.

```ts
const AdvancedDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("AdvancedDeploymentStrategy", {
  Name: "AdvancedDeployment",
  DeploymentDurationInMinutes: 60,
  GrowthType: "Linear",
  GrowthFactor: 20,
  FinalBakeTimeInMinutes: 15,
  ReplicateTo: "SSM_DOCUMENT",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "ReleaseManagement" }
  ]
});
```

## Custom Deployment with Final Bake Time

Create a deployment strategy that uses a final bake time for added safety during deployments.

```ts
const SafeDeploymentStrategy = await AWS.AppConfig.DeploymentStrategy("SafeDeploymentStrategy", {
  Name: "SafeDeployment",
  DeploymentDurationInMinutes: 45,
  GrowthType: "Exponential",
  GrowthFactor: 30,
  FinalBakeTimeInMinutes: 30,
  ReplicateTo: "SSM_DOCUMENT",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "QualityAssurance" }
  ]
});
```