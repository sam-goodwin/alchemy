---
title: DeploymentConfig
description: Learn how to create, update, and manage AWS CodeDeploy DeploymentConfigs using Alchemy Cloud Control.
---


The DeploymentConfig resource lets you manage [AWS CodeDeploy DeploymentConfigs](https://docs.aws.amazon.com/codedeploy/latest/userguide/) for controlling deployment strategies and settings.

## Minimal Example

Create a basic DeploymentConfig with default settings:

```ts
import AWS from "alchemy/aws/control";

const basicDeploymentConfig = await AWS.CodeDeploy.DeploymentConfig("basicDeploymentConfig", {
  DeploymentConfigName: "BasicDeploymentConfig",
  ComputePlatform: "Server",
  MinimumHealthyHosts: {
    Type: "FLEET_PERCENT",
    Value: 100
  }
});
```

## Advanced Configuration

Configure a DeploymentConfig with custom traffic routing and zonal settings:

```ts
const advancedDeploymentConfig = await AWS.CodeDeploy.DeploymentConfig("advancedDeploymentConfig", {
  DeploymentConfigName: "AdvancedDeploymentConfig",
  ComputePlatform: "ECS",
  TrafficRoutingConfig: {
    Type: "TimeBasedCanary",
    TimeBasedCanary: {
      CanaryPercentage: 10,
      TimeBasedCanaryInterval: 5
    }
  },
  ZonalConfig: {
    // Example for Zonal configuration with multiple zones
    ZonalHealth: [
      {
        Zone: "us-east-1a",
        MinimumHealthyHosts: {
          Type: "FLEET_PERCENT",
          Value: 90
        }
      },
      {
        Zone: "us-east-1b",
        MinimumHealthyHosts: {
          Type: "FLEET_PERCENT",
          Value: 90
        }
      }
    ]
  }
});
```

## Custom Traffic Routing

Demonstrate the use of custom traffic routing configuration for blue/green deployments:

```ts
const blueGreenDeploymentConfig = await AWS.CodeDeploy.DeploymentConfig("blueGreenDeploymentConfig", {
  DeploymentConfigName: "BlueGreenDeploymentConfig",
  ComputePlatform: "ECS",
  TrafficRoutingConfig: {
    Type: "BlueGreen",
    BlueGreen: {
      TerminationWaitTimeInMinutes: 10,
      DeploymentReadyOption: {
        ActionOnTimeout: "CONTINUE_DEPLOYMENT"
      }
    }
  }
});
```

## Adoption of Existing Configurations

Create a DeploymentConfig that adopts an existing configuration if it already exists:

```ts
const adoptExistingConfig = await AWS.CodeDeploy.DeploymentConfig("adoptExistingConfig", {
  DeploymentConfigName: "ExistingDeploymentConfig",
  adopt: true,
  MinimumHealthyHosts: {
    Type: "FLEET_PERCENT",
    Value: 95
  }
});
```
