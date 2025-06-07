---
title: Managing AWS ApplicationInsights Applications with Alchemy
description: Learn how to create, update, and manage AWS ApplicationInsights Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS ApplicationInsights Applications](https://docs.aws.amazon.com/applicationinsights/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-applicationinsights-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.ApplicationInsights.Application("application-example", {
  ResourceGroupName: "application-resourcegroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.ApplicationInsights.Application("advanced-application", {
  ResourceGroupName: "application-resourcegroup",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

