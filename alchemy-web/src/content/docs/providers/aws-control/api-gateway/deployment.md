---
title: Deployment
description: Learn how to create, update, and manage AWS ApiGateway Deployments using Alchemy Cloud Control.
---


The Deployment resource lets you manage [AWS ApiGateway Deployments](https://docs.aws.amazon.com/apigateway/latest/userguide/) for deploying your APIs and managing their versions.

## Minimal Example

Create a basic ApiGateway deployment with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const apiDeployment = await AWS.ApiGateway.Deployment("basicDeployment", {
  RestApiId: "myApiId",
  Description: "Initial deployment of my API",
  StageName: "dev"
});
```

## Advanced Configuration

Configure a deployment with additional options such as canary settings and stage description.

```ts
import AWS from "alchemy/aws/control";

const advancedDeployment = await AWS.ApiGateway.Deployment("advancedDeployment", {
  RestApiId: "myApiId",
  Description: "Deployment with canary settings",
  StageName: "prod",
  DeploymentCanarySettings: {
    PercentTraffic: 10,
    StageVariableOverrides: {
      "myVar": "newValue"
    },
    UseStageCache: true
  },
  StageDescription: {
    MethodSettings: [
      {
        HttpMethod: "*",
        ResourceId: "myResourceId",
        Throttle: {
          BurstLimit: 100,
          RateLimit: 50
        }
      }
    ]
  }
});
```

## Canary Deployment Example

Demonstrate how to set up a canary deployment with specific traffic percentages.

```ts
import AWS from "alchemy/aws/control";

const canaryDeployment = await AWS.ApiGateway.Deployment("canaryDeployment", {
  RestApiId: "myApiId",
  Description: "Deployment with canary traffic",
  StageName: "canary",
  DeploymentCanarySettings: {
    PercentTraffic: 20,
    StageVariableOverrides: {
      "featureFlag": "enabled"
    },
    UseStageCache: false
  }
});
```

## Adoption of Existing Resources

If you need to adopt an existing deployment instead of failing, you can set the `adopt` property.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingDeployment = await AWS.ApiGateway.Deployment("existingDeployment", {
  RestApiId: "myApiId",
  Description: "Adopting an existing deployment",
  StageName: "existingStage",
  adopt: true
});
```
