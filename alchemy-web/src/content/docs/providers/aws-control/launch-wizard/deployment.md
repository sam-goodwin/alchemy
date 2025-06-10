---
title: Deployment
description: Learn how to create, update, and manage AWS LaunchWizard Deployments using Alchemy Cloud Control.
---


The Deployment resource allows you to manage [AWS LaunchWizard Deployments](https://docs.aws.amazon.com/launchwizard/latest/userguide/) for deploying applications with minimal effort. It simplifies the process by automating the deployment of resources based on predefined specifications.

## Minimal Example

Create a basic LaunchWizard Deployment with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicDeployment = await AWS.LaunchWizard.Deployment("basicDeployment", {
  WorkloadName: "MyWebApp",
  DeploymentPatternName: "Single-AZ",
  Name: "MyWebAppDeployment",
  Specifications: {
    InstanceType: "t3.medium",
    Database: {
      Engine: "mysql",
      Version: "8.0",
      Storage: 20
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a more advanced LaunchWizard Deployment with an additional optional property to adopt existing resources.

```ts
const advancedDeployment = await AWS.LaunchWizard.Deployment("advancedDeployment", {
  WorkloadName: "MyDatabaseApp",
  DeploymentPatternName: "Multi-AZ",
  Name: "MyDatabaseAppDeployment",
  Specifications: {
    InstanceType: "m5.large",
    Database: {
      Engine: "postgres",
      Version: "13",
      Storage: 50
    },
    LoadBalancers: [
      {
        Type: "Application",
        Name: "MyAppLoadBalancer"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevelopmentTeam" }
  ],
  adopt: true
});
```

## Deploying with Custom Specifications

Demonstrate how to create a deployment with custom specifications for specific workloads.

```ts
const customDeployment = await AWS.LaunchWizard.Deployment("customDeployment", {
  WorkloadName: "MyCustomApp",
  DeploymentPatternName: "Canary",
  Name: "MyCustomAppDeployment",
  Specifications: {
    InstanceType: "c5.xlarge",
    Database: {
      Engine: "oracle",
      Version: "19c",
      Storage: 100
    },
    SecurityGroups: [
      {
        GroupId: "sg-0123456789abcdef0",
        Ingress: [
          {
            IpProtocol: "tcp",
            FromPort: 80,
            ToPort: 80,
            CidrIp: "0.0.0.0/0"
          }
        ]
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Project", Value: "MyCustomProject" }
  ]
});
```
