---
title: Managing AWS SSO Applications with Alchemy
description: Learn how to create, update, and manage AWS SSO Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS SSO Applications](https://docs.aws.amazon.com/sso/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.SSO.Application("application-example", {
  ApplicationProviderArn: "example-applicationproviderarn",
  InstanceArn: "example-instancearn",
  Name: "application-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A application resource managed by Alchemy",
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.SSO.Application("advanced-application", {
  ApplicationProviderArn: "example-applicationproviderarn",
  InstanceArn: "example-instancearn",
  Name: "application-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A application resource managed by Alchemy",
});
```

