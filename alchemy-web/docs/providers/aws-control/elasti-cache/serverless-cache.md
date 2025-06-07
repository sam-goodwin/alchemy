---
title: Managing AWS ElastiCache ServerlessCaches with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache ServerlessCaches using Alchemy Cloud Control.
---

# ServerlessCache

The ServerlessCache resource lets you create and manage [AWS ElastiCache ServerlessCaches](https://docs.aws.amazon.com/elasticache/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticache-serverlesscache.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serverlesscache = await AWS.ElastiCache.ServerlessCache("serverlesscache-example", {
  ServerlessCacheName: "serverlesscache-serverlesscache",
  Engine: "example-engine",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A serverlesscache resource managed by Alchemy",
});
```

## Advanced Configuration

Create a serverlesscache with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServerlessCache = await AWS.ElastiCache.ServerlessCache("advanced-serverlesscache", {
  ServerlessCacheName: "serverlesscache-serverlesscache",
  Engine: "example-engine",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A serverlesscache resource managed by Alchemy",
});
```

