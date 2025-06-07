---
title: Managing AWS RefactorSpaces Applications with Alchemy
description: Learn how to create, update, and manage AWS RefactorSpaces Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS RefactorSpaces Applications](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-refactorspaces-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.RefactorSpaces.Application("application-example", {
  EnvironmentIdentifier: "example-environmentidentifier",
  VpcId: "example-vpcid",
  ProxyType: "example-proxytype",
  Name: "application-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.RefactorSpaces.Application("advanced-application", {
  EnvironmentIdentifier: "example-environmentidentifier",
  VpcId: "example-vpcid",
  ProxyType: "example-proxytype",
  Name: "application-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

