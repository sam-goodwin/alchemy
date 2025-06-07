---
title: Managing AWS FinSpace Environments with Alchemy
description: Learn how to create, update, and manage AWS FinSpace Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you create and manage [AWS FinSpace Environments](https://docs.aws.amazon.com/finspace/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-finspace-environment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environment = await AWS.FinSpace.Environment("environment-example", {
  Name: "environment-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A environment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a environment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironment = await AWS.FinSpace.Environment("advanced-environment", {
  Name: "environment-",
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

