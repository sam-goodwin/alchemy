---
title: Managing AWS AppSync Apis with Alchemy
description: Learn how to create, update, and manage AWS AppSync Apis using Alchemy Cloud Control.
---

# Api

The Api resource lets you create and manage [AWS AppSync Apis](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-api.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const api = await AWS.AppSync.Api("api-example", {
  Name: "api-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a api with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApi = await AWS.AppSync.Api("advanced-api", {
  Name: "api-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

