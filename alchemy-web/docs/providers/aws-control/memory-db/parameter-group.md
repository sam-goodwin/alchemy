---
title: Managing AWS MemoryDB ParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB ParameterGroups using Alchemy Cloud Control.
---

# ParameterGroup

The ParameterGroup resource lets you manage [AWS MemoryDB ParameterGroups](https://docs.aws.amazon.com/memorydb/latest/userguide/) which are used to specify configuration settings for your MemoryDB clusters.

## Minimal Example

Create a basic MemoryDB ParameterGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicParameterGroup = await AWS.MemoryDB.ParameterGroup("BasicParameterGroup", {
  ParameterGroupName: "default",
  Family: "memorydb.redis",
  Description: "Default parameter group for MemoryDB"
});
```

## Advanced Configuration

Configure a ParameterGroup with specific parameters for fine-tuning performance.

```ts
const AdvancedParameterGroup = await AWS.MemoryDB.ParameterGroup("AdvancedParameterGroup", {
  ParameterGroupName: "custom-advanced",
  Family: "memorydb.redis",
  Description: "Advanced parameter group for MemoryDB with custom settings",
  Parameters: {
    "maxmemory-policy": "volatile-lru",
    "notify-keyspace-events": "Ex"
  }
});
```

## Tagging for Resource Management

Create a ParameterGroup and associate it with tags for better resource management.

```ts
const TaggedParameterGroup = await AWS.MemoryDB.ParameterGroup("TaggedParameterGroup", {
  ParameterGroupName: "tagged-group",
  Family: "memorydb.redis",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Parameter Group for Cluster Optimization

Set up a ParameterGroup that optimizes memory usage for a specific workload.

```ts
const OptimizedParameterGroup = await AWS.MemoryDB.ParameterGroup("OptimizedParameterGroup", {
  ParameterGroupName: "optimized-cluster",
  Family: "memorydb.redis",
  Parameters: {
    "maxmemory-samples": "5",
    "maxmemory": "2gb"
  }
});
```