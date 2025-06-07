---
title: Managing AWS M2 Environments with Alchemy
description: Learn how to create, update, and manage AWS M2 Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you create and manage [AWS M2 Environments](https://docs.aws.amazon.com/m2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-m2-environment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environment = await AWS.M2.Environment("environment-example", {
  Name: "environment-",
  EngineType: "example-enginetype",
  InstanceType: "example-instancetype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A environment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a environment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironment = await AWS.M2.Environment("advanced-environment", {
  Name: "environment-",
  EngineType: "example-enginetype",
  InstanceType: "example-instancetype",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A environment resource managed by Alchemy",
});
```

