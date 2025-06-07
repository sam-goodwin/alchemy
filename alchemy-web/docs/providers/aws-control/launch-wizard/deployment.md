---
title: Managing AWS LaunchWizard Deployments with Alchemy
description: Learn how to create, update, and manage AWS LaunchWizard Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource allows you to manage [AWS LaunchWizard Deployments](https://docs.aws.amazon.com/launchwizard/latest/userguide/) for simplifying the deployment of applications on AWS. 

## Minimal Example

Create a basic LaunchWizard Deployment with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const LaunchWizardDeployment = await AWS.LaunchWizard.Deployment("MyWebAppDeployment", {
  WorkloadName: "MyWebApplication",
  DeploymentPatternName: "Standard",
  Name: "MyWebAppDeployment",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a LaunchWizard Deployment with specifications and multiple tags for better management.

```ts
const AdvancedLaunchWizardDeployment = await AWS.LaunchWizard.Deployment("AdvancedWebAppDeployment", {
  WorkloadName: "AdvancedWebApplication",
  DeploymentPatternName: "HighAvailability",
  Name: "AdvancedWebAppDeployment",
  Specifications: {
    InstanceType: "t2.micro",
    NetworkConfiguration: {
      SubnetId: "subnet-0abcd1234efgh5678",
      SecurityGroups: ["sg-0abcd1234efgh5678"]
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Deployment Pattern

Deploy an application using a custom deployment pattern and specify additional workload settings.

```ts
const CustomPatternDeployment = await AWS.LaunchWizard.Deployment("CustomPatternDeployment", {
  WorkloadName: "CustomWebApplication",
  DeploymentPatternName: "CustomPattern",
  Name: "CustomWebAppDeployment",
  Specifications: {
    InstanceType: "t3.medium",
    LoadBalancer: {
      Type: "ApplicationLoadBalancer",
      HealthCheckPath: "/health"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Project", Value: "NewFeature" }
  ]
});
``` 

## Adoption of Existing Resources

Create a deployment that adopts existing resources if they already exist.

```ts
const AdoptExistingDeployment = await AWS.LaunchWizard.Deployment("AdoptExistingResources", {
  WorkloadName: "ExistingWebApplication",
  DeploymentPatternName: "Standard",
  Name: "AdoptExistingWebAppDeployment",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```