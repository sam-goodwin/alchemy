---
title: Managing AWS Cloud9 EnvironmentEC2s with Alchemy
description: Learn how to create, update, and manage AWS Cloud9 EnvironmentEC2s using Alchemy Cloud Control.
---

# EnvironmentEC2

The EnvironmentEC2 resource allows you to create and manage AWS Cloud9 development environments that run on Amazon EC2 instances. For more information, visit the [AWS Cloud9 EnvironmentEC2s](https://docs.aws.amazon.com/cloud9/latest/userguide/) documentation.

## Minimal Example

Create a basic Cloud9 environment with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicEnvironment = await AWS.Cloud9.EnvironmentEC2("BasicEnvironment", {
  ImageId: "amazonlinux",
  InstanceType: "t2.micro",
  AutomaticStopTimeMinutes: 30,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a Cloud9 environment with additional settings such as a description and owner ARN.

```ts
const AdvancedEnvironment = await AWS.Cloud9.EnvironmentEC2("AdvancedEnvironment", {
  ImageId: "ubuntu:latest",
  InstanceType: "t2.large",
  Description: "Development environment for the web application",
  OwnerArn: "arn:aws:iam::123456789012:user/developer",
  ConnectionType: "CONNECT_SSH",
  AutomaticStopTimeMinutes: 60,
  Tags: [
    { Key: "Project", Value: "WebApp" },
    { Key: "Environment", Value: "staging" }
  ]
});
```

## Custom VPC Configuration

Set up a Cloud9 environment in a specific VPC and subnet.

```ts
const VPCEnvironment = await AWS.Cloud9.EnvironmentEC2("VPCEnvironment", {
  ImageId: "amazonlinux",
  InstanceType: "t2.micro",
  SubnetId: "subnet-0abcd1234efgh5678",
  AutomaticStopTimeMinutes: 45,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "Admin" }
  ]
});
```

## Repository Integration

Create a Cloud9 environment that integrates with a Git repository.

```ts
const RepoIntegratedEnvironment = await AWS.Cloud9.EnvironmentEC2("RepoIntegratedEnvironment", {
  ImageId: "ubuntu:latest",
  InstanceType: "t2.medium",
  Repositories: [
    {
      RepositoryUrl: "https://github.com/myorg/myrepo.git",
      PathComponent: "src"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Development" }
  ]
});
```