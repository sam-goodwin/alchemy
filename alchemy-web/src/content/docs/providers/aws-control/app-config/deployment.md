---
title: Deployment
description: Learn how to create, update, and manage AWS AppConfig Deployments using Alchemy Cloud Control.
---


The Deployment resource allows you to manage [AWS AppConfig Deployments](https://docs.aws.amazon.com/appconfig/latest/userguide/) for your applications, enabling you to deploy application configurations to your environments efficiently.

## Minimal Example

Create a basic AppConfig Deployment with required properties and common optional ones like KMS key identifier and description.

```ts
import AWS from "alchemy/aws/control";

const appConfigDeployment = await AWS.AppConfig.Deployment("myAppConfigDeployment", {
  DeploymentStrategyId: "myDeploymentStrategy",
  ConfigurationProfileId: "myConfigurationProfile",
  EnvironmentId: "myEnvironment",
  ConfigurationVersion: "1.0.0",
  ApplicationId: "myApplication",
  KmsKeyIdentifier: "arn:aws:kms:us-east-1:123456789012:key/my-key",
  Description: "Deploying configuration version 1.0.0 to my environment"
});
```

## Advanced Configuration

Configure a Deployment with dynamic extension parameters to customize the deployment behavior.

```ts
import AWS from "alchemy/aws/control";

const dynamicDeployment = await AWS.AppConfig.Deployment("dynamicDeployment", {
  DeploymentStrategyId: "myDeploymentStrategy",
  ConfigurationProfileId: "myConfigurationProfile",
  EnvironmentId: "myEnvironment",
  ConfigurationVersion: "1.0.1",
  ApplicationId: "myApplication",
  DynamicExtensionParameters: [
    {
      Name: "myParameter",
      Value: "myValue"
    },
    {
      Name: "anotherParameter",
      Value: "anotherValue"
    }
  ]
});
```

## Deployment with Tags

Create a Deployment and assign tags to manage resources effectively.

```ts
import AWS from "alchemy/aws/control";

const taggedDeployment = await AWS.AppConfig.Deployment("taggedDeployment", {
  DeploymentStrategyId: "myDeploymentStrategy",
  ConfigurationProfileId: "myConfigurationProfile",
  EnvironmentId: "myEnvironment",
  ConfigurationVersion: "1.0.2",
  ApplicationId: "myApplication",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Adoption of Existing Resource

Create a Deployment that adopts an existing resource instead of failing if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingDeployment = await AWS.AppConfig.Deployment("adoptExistingDeployment", {
  DeploymentStrategyId: "myDeploymentStrategy",
  ConfigurationProfileId: "myConfigurationProfile",
  EnvironmentId: "myEnvironment",
  ConfigurationVersion: "1.0.3",
  ApplicationId: "myApplication",
  adopt: true // Allow adoption of existing deployment
});
```
