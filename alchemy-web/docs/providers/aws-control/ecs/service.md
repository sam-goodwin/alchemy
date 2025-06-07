---
title: Managing AWS ECS Services with Alchemy
description: Learn how to create, update, and manage AWS ECS Services using Alchemy Cloud Control.
---

# Service

The Service resource lets you create and manage [AWS ECS Services](https://docs.aws.amazon.com/ecs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const service = await AWS.ECS.Service("service-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a service with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedService = await AWS.ECS.Service("advanced-service", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

