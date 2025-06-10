---
title: Fleet
description: Learn how to create, update, and manage AWS CodeBuild Fleets using Alchemy Cloud Control.
---


The Fleet resource allows you to manage [AWS CodeBuild Fleets](https://docs.aws.amazon.com/codebuild/latest/userguide/) for building your applications in a scalable and efficient manner.

## Minimal Example

Create a simple CodeBuild Fleet with a service role and a specified compute type.

```ts
import AWS from "alchemy/aws/control";

const codeBuildFleet = await AWS.CodeBuild.Fleet("myCodeBuildFleet", {
  FleetServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  EnvironmentType: "LINUX_CONTAINER",
  ComputeType: "BUILD_GENERAL1_SMALL",
  ImageId: "aws/codebuild/standard:5.0",
  BaseCapacity: 2,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a Fleet with a custom scaling configuration and a proxy setup.

```ts
const advancedCodeBuildFleet = await AWS.CodeBuild.Fleet("advancedCodeBuildFleet", {
  FleetServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  EnvironmentType: "LINUX_CONTAINER",
  ComputeType: "BUILD_GENERAL1_MEDIUM",
  ImageId: "aws/codebuild/standard:5.0",
  BaseCapacity: 3,
  ScalingConfiguration: {
    MinimumCapacity: 2,
    MaximumCapacity: 10,
    TargetCapacity: 5
  },
  FleetProxyConfiguration: {
    Endpoint: "http://proxy.example.com:8080",
    Port: 8080,
    Auth: {
      Type: "Basic",
      Credentials: {
        Username: "proxyUser",
        Password: "proxyPassword"
      }
    }
  }
});
```

## Fleet with VPC Configuration

Set up a Fleet that runs within a specific VPC for enhanced security.

```ts
const vpcConfiguredFleet = await AWS.CodeBuild.Fleet("vpcConfiguredFleet", {
  FleetServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  EnvironmentType: "LINUX_CONTAINER",
  ComputeType: "BUILD_GENERAL1_LARGE",
  ImageId: "aws/codebuild/standard:5.0",
  FleetVpcConfig: {
    VpcId: "vpc-123abc456",
    Subnets: [
      "subnet-123abc456",
      "subnet-456def789"
    ],
    SecurityGroupIds: [
      "sg-123abc456"
    ]
  }
});
```

## Using Tags for Resource Management

Create a Fleet with multiple tags for better organization and management.

```ts
const taggedFleet = await AWS.CodeBuild.Fleet("taggedFleet", {
  FleetServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  EnvironmentType: "LINUX_CONTAINER",
  ComputeType: "BUILD_GENERAL1_SMALL",
  ImageId: "aws/codebuild/standard:5.0",
  Tags: [
    {
      Key: "Project",
      Value: "MyApp"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ]
});
```
