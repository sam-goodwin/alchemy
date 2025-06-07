---
title: Managing AWS ElastiCache ParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache ParameterGroups using Alchemy Cloud Control.
---

# ParameterGroup

The ParameterGroup resource allows you to manage [AWS ElastiCache ParameterGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) and configure various parameters for cache engines like Redis or Memcached.

## Minimal Example

Create a basic ElastiCache ParameterGroup with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicParameterGroup = await AWS.ElastiCache.ParameterGroup("BasicParameterGroup", {
  Description: "Basic parameter group for Redis with default settings",
  CacheParameterGroupFamily: "redis-6.x",
  Properties: {
    maxmemory: "2GB",
    notify: "all"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a ParameterGroup with advanced settings to optimize Redis performance.

```ts
const advancedParameterGroup = await AWS.ElastiCache.ParameterGroup("AdvancedParameterGroup", {
  Description: "Advanced parameter group for Redis with performance optimizations",
  CacheParameterGroupFamily: "redis-6.x",
  Properties: {
    maxmemory: "4GB",
    notify: "all",
    keyspace: "on",
    events: {
      keyspace_notifications: "all"
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Performance" }
  ]
});
```

## Using Custom Properties

Create a ParameterGroup with custom properties specific to your application's needs.

```ts
const customParameterGroup = await AWS.ElastiCache.ParameterGroup("CustomParameterGroup", {
  Description: "Custom parameter group tailored for specific application needs",
  CacheParameterGroupFamily: "memcached-1.6",
  Properties: {
    maxmemory: "6GB",
    notify: "some"
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Backend" }
  ]
});
```