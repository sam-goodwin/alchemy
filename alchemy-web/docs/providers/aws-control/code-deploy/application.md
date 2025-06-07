---
title: Managing AWS CodeDeploy Applications with Alchemy
description: Learn how to create, update, and manage AWS CodeDeploy Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you manage [AWS CodeDeploy Applications](https://docs.aws.amazon.com/codedeploy/latest/userguide/) for deploying applications to Amazon EC2 or AWS Lambda.

## Minimal Example

Create a basic CodeDeploy application with a specified name.

```ts
import AWS from "alchemy/aws/control";

const BasicApplication = await AWS.CodeDeploy.Application("BasicApplication", {
  ApplicationName: "MyApp",
  ComputePlatform: "Server"
});
```

## Advanced Configuration

Configure an application with tags for better resource management and identification.

```ts
const TaggedApplication = await AWS.CodeDeploy.Application("TaggedApplication", {
  ApplicationName: "MyAppWithTags",
  ComputePlatform: "Server",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

Create an application while adopting an existing resource instead of failing if it already exists.

```ts
const ExistingApplication = await AWS.CodeDeploy.Application("ExistingApplication", {
  ApplicationName: "MyExistingApp",
  ComputePlatform: "Server",
  adopt: true
});
```