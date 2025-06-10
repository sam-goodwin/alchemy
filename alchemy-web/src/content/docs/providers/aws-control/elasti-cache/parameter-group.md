---
title: ParameterGroup
description: Learn how to create, update, and manage AWS ElastiCache ParameterGroups using Alchemy Cloud Control.
---


The ParameterGroup resource allows you to manage [AWS ElastiCache ParameterGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for configuring cache settings in your ElastiCache clusters.

## Minimal Example

Create a basic ElastiCache ParameterGroup with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicParameterGroup = await AWS.ElastiCache.ParameterGroup("basic-param-group", {
  Description: "Basic parameter group for Redis",
  CacheParameterGroupFamily: "redis6.x",
  Properties: {
    maxmemory-policy: "volatile-lru",
    timeout: "300"
  }
});
```

## Advanced Configuration

Configure a ParameterGroup with additional settings for performance optimization:

```ts
const advancedParameterGroup = await AWS.ElastiCache.ParameterGroup("advanced-param-group", {
  Description: "Advanced parameter group for Redis with optimized settings",
  CacheParameterGroupFamily: "redis6.x",
  Properties: {
    maxmemory-policy: "allkeys-lru",
    timeout: "200",
    notify-keyspace-events: "KEA"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## Using Tags for Organization

Create a ParameterGroup and organize it with tags for better management:

```ts
const taggedParameterGroup = await AWS.ElastiCache.ParameterGroup("tagged-param-group", {
  Description: "Parameter group with tags for better organization",
  CacheParameterGroupFamily: "redis6.x",
  Properties: {
    maxmemory-policy: "volatile-lru",
    maxclients: "1000"
  },
  Tags: [
    { Key: "Project", Value: "CacheOptimization" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```
