---
title: Managing AWS AppConfig Deployments with Alchemy
description: Learn how to create, update, and manage AWS AppConfig Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource lets you manage [AWS AppConfig Deployments](https://docs.aws.amazon.com/appconfig/latest/userguide/) for your applications, enabling you to deploy configurations to your application environments seamlessly.

## Minimal Example

Create a basic AppConfig Deployment with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const appConfigDeployment = await AWS.AppConfig.Deployment("MyAppConfigDeployment", {
  ApplicationId: "my-application-id",
  ConfigurationProfileId: "my-configuration-profile-id",
  EnvironmentId: "my-environment-id",
  DeploymentStrategyId: "my-deployment-strategy-id",
  ConfigurationVersion: "1.0.0",
  Description: "Initial deployment of application configuration",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an AppConfig Deployment with advanced options including KMS key and dynamic extension parameters.

```ts
const advancedAppConfigDeployment = await AWS.AppConfig.Deployment("AdvancedAppConfigDeployment", {
  ApplicationId: "my-application-id",
  ConfigurationProfileId: "my-configuration-profile-id",
  EnvironmentId: "my-environment-id",
  DeploymentStrategyId: "my-deployment-strategy-id",
  ConfigurationVersion: "1.0.1",
  KmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  DynamicExtensionParameters: [
    { ParameterName: "FeatureFlag", ParameterValue: "Enabled" },
    { ParameterName: "Timeout", ParameterValue: "30" }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Using Adoption

Deploy an AppConfig resource and adopt an existing deployment if it already exists.

```ts
const adoptedAppConfigDeployment = await AWS.AppConfig.Deployment("AdoptedAppConfigDeployment", {
  ApplicationId: "my-application-id",
  ConfigurationProfileId: "my-configuration-profile-id",
  EnvironmentId: "my-environment-id",
  DeploymentStrategyId: "my-deployment-strategy-id",
  ConfigurationVersion: "1.0.2",
  Description: "Adopting an existing deployment",
  adopt: true // Will not fail if the resource already exists
});
```