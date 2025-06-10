---
title: Application
description: Learn how to create, update, and manage AWS CodeDeploy Applications using Alchemy Cloud Control.
---


The Application resource allows you to create and manage [AWS CodeDeploy Applications](https://docs.aws.amazon.com/codedeploy/latest/userguide/) for deploying applications to various compute platforms.

## Minimal Example

Create a basic CodeDeploy application with a specified name and compute platform.

```ts
import AWS from "alchemy/aws/control";

const codeDeployApplication = await AWS.CodeDeploy.Application("myCodeDeployApp", {
  ApplicationName: "MyAwesomeApp",
  ComputePlatform: "Server"
});
```

## Advanced Configuration

Configure a CodeDeploy application with tags for better resource management.

```ts
const taggedCodeDeployApplication = await AWS.CodeDeploy.Application("myTaggedApp", {
  ApplicationName: "MyAwesomeAppWithTags",
  ComputePlatform: "Lambda",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Resource Adoption

Create a CodeDeploy application while adopting an existing resource if it already exists.

```ts
const adoptExistingApplication = await AWS.CodeDeploy.Application("myAdoptedApp", {
  ApplicationName: "MyExistingApp",
  ComputePlatform: "ECS",
  adopt: true
});
```

## Full Metadata

Create a CodeDeploy application and retrieve its metadata, including ARN and timestamps.

```ts
const fullMetadataApplication = await AWS.CodeDeploy.Application("myFullMetadataApp", {
  ApplicationName: "MyFullMetadataApp",
  ComputePlatform: "Server",
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});

// Access application metadata
console.log(`Application ARN: ${fullMetadataApplication.Arn}`);
console.log(`Created Time: ${fullMetadataApplication.CreationTime}`);
console.log(`Last Updated Time: ${fullMetadataApplication.LastUpdateTime}`);
```
