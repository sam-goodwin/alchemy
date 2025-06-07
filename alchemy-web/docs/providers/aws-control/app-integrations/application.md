---
title: Managing AWS AppIntegrations Applications with Alchemy
description: Learn how to create, update, and manage AWS AppIntegrations Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS AppIntegrations Applications](https://docs.aws.amazon.com/appintegrations/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appintegrations-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.AppIntegrations.Application("application-example", {
  ApplicationSourceConfig: "example-applicationsourceconfig",
  Description: "A application resource managed by Alchemy",
  Namespace: "application-space",
  Name: "application-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.AppIntegrations.Application("advanced-application", {
  ApplicationSourceConfig: "example-applicationsourceconfig",
  Description: "A application resource managed by Alchemy",
  Namespace: "application-space",
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

