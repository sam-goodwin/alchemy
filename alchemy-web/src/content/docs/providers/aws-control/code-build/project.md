---
title: Project
description: Learn how to create, update, and manage AWS CodeBuild Projects using Alchemy Cloud Control.
---


The Project resource lets you manage [AWS CodeBuild Projects](https://docs.aws.amazon.com/codebuild/latest/userguide/) for building and testing your applications.

## Minimal Example

Create a basic CodeBuild project with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.CodeBuild.Project("basic-project", {
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/user/repo.git"
  },
  Artifacts: {
    Type: "S3",
    Location: "my-artifact-bucket",
    Path: "artifacts/",
    Name: "build-output.zip"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER"
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  QueuedTimeoutInMinutes: 30
});
```

## Advanced Configuration

Configure a CodeBuild project with a VPC configuration and logging settings for better security and observability.

```ts
const advancedProject = await AWS.CodeBuild.Project("advanced-project", {
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/user/repo.git"
  },
  Artifacts: {
    Type: "S3",
    Location: "my-artifact-bucket",
    Path: "artifacts/",
    Name: "build-output.zip"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_MEDIUM",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER",
    EnvironmentVariables: [
      {
        Name: "ENV_VAR",
        Value: "value"
      }
    ]
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  VpcConfig: {
    VpcId: "vpc-1a2b3c4d",
    Subnets: [
      "subnet-1a2b3c4d",
      "subnet-2a3b4c5d"
    ],
    SecurityGroupIds: [
      "sg-1a2b3c4d"
    ]
  },
  LogsConfig: {
    CloudWatchLogs: {
      Status: "ENABLED",
      GroupName: "/aws/codebuild/advanced-project",
      StreamName: "build-log"
    },
    S3Logs: {
      Status: "DISABLED"
    }
  }
});
```

## Custom Build Specifications

Define a project with a custom build specification file to control the build process.

```ts
const customBuildSpecProject = await AWS.CodeBuild.Project("custom-build-spec", {
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/user/repo.git",
    BuildSpec: "buildspec.yml"  // Custom buildspec file
  },
  Artifacts: {
    Type: "S3",
    Location: "my-artifact-bucket",
    Name: "custom-build-output.zip"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER"
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role"
});
```

## Multi-Source Build

Set up a project that supports multiple source repositories, allowing more complex build workflows.

```ts
const multiSourceProject = await AWS.CodeBuild.Project("multi-source-project", {
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/user/repo.git"
  },
  SecondarySources: [
    {
      Type: "S3",
      Location: "my-secondary-source-bucket",
      BuildSpec: "secondary-buildspec.yml"
    }
  ],
  Artifacts: {
    Type: "S3",
    Location: "my-artifact-bucket",
    Name: "multi-source-output.zip"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_MEDIUM",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER"
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role"
});
```
