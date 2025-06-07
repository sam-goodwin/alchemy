---
title: Managing AWS MWAA Environments with Alchemy
description: Learn how to create, update, and manage AWS MWAA Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you create and manage [AWS MWAA Environments](https://docs.aws.amazon.com/mwaa/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mwaa-environment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environment = await AWS.MWAA.Environment("environment-example", {
  Name: "environment-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a environment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironment = await AWS.MWAA.Environment("advanced-environment", {
  Name: "environment-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

