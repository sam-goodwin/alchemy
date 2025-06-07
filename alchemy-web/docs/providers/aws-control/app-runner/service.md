---
title: Managing AWS AppRunner Services with Alchemy
description: Learn how to create, update, and manage AWS AppRunner Services using Alchemy Cloud Control.
---

# Service

The Service resource lets you create and manage [AWS AppRunner Services](https://docs.aws.amazon.com/apprunner/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const service = await AWS.AppRunner.Service("service-example", {
  SourceConfiguration: "example-sourceconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a service with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedService = await AWS.AppRunner.Service("advanced-service", {
  SourceConfiguration: "example-sourceconfiguration",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

