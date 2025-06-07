---
title: Managing AWS CodeBuild Projects with Alchemy
description: Learn how to create, update, and manage AWS CodeBuild Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you manage [AWS CodeBuild Projects](https://docs.aws.amazon.com/codebuild/latest/userguide/) for building and testing your code in a scalable and efficient manner.

## Minimal Example

Create a basic CodeBuild project with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicBuildProject = await AWS.CodeBuild.Project("BasicBuildProject", {
  Name: "MyBuildProject",
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/myuser/myrepo.git"
  },
  Artifacts: {
    Type: "NO_ARTIFACTS"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER"
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Build" }
  ]
});
```

## Advanced Configuration

Configure a CodeBuild project with advanced settings, including VPC configuration and logging options.

```ts
const AdvancedBuildProject = await AWS.CodeBuild.Project("AdvancedBuildProject", {
  Name: "MyAdvancedBuildProject",
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/myuser/myrepo.git"
  },
  Artifacts: {
    Type: "NO_ARTIFACTS"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_LARGE",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER",
    EnvironmentVariables: [
      { Name: "NODE_ENV", Value: "production" }
    ]
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  VpcConfig: {
    VpcId: "vpc-0abc123def456ghij",
    Subnets: ["subnet-0abc123def456ghij"],
    SecurityGroupIds: ["sg-0abc123def456ghij"]
  },
  LogsConfig: {
    CloudWatchLogs: {
      Status: "ENABLED",
      GroupName: "BuildLogs",
      StreamName: "MyBuildProjectLogs"
    },
    S3Logs: {
      Status: "DISABLED"
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Continuous Integration with Triggers

Create a CodeBuild project that integrates with GitHub and triggers builds on code changes.

```ts
const CIProject = await AWS.CodeBuild.Project("CIProject", {
  Name: "MyCIProject",
  Source: {
    Type: "GITHUB",
    Location: "https://github.com/myuser/myrepo.git",
    BuildSpec: "buildspec.yml"
  },
  Artifacts: {
    Type: "NO_ARTIFACTS"
  },
  Environment: {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/standard:5.0",
    Type: "LINUX_CONTAINER"
  },
  ServiceRole: "arn:aws:iam::123456789012:role/service-role/codebuild-service-role",
  Triggers: {
    Webhook: true,
    FilterGroups: [
      [
        {
          Pattern: "PUSH",
          Type: "EVENT"
        }
      ]
    ]
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "CI" }
  ]
});
```