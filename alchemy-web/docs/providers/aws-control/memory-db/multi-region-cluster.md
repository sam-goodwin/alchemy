---
title: Managing AWS MemoryDB MultiRegionClusters with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB MultiRegionClusters using Alchemy Cloud Control.
---

# MultiRegionCluster

The MultiRegionCluster resource allows you to create and manage [AWS MemoryDB MultiRegionClusters](https://docs.aws.amazon.com/memorydb/latest/userguide/) which provide a highly available in-memory database service with multi-region capabilities.

## Minimal Example

Create a basic MultiRegionCluster with required properties and a couple of optional ones:

```ts
import AWS from "alchemy/aws/control";

const BasicCluster = await AWS.MemoryDB.MultiRegionCluster("BasicCluster", {
  NodeType: "db.t4g.small",
  MultiRegionParameterGroupName: "Default",
  Description: "Basic MemoryDB MultiRegionCluster for testing"
});
```

## Advanced Configuration

Configure a MultiRegionCluster with additional settings for enhanced performance and security:

```ts
const AdvancedCluster = await AWS.MemoryDB.MultiRegionCluster("AdvancedCluster", {
  NodeType: "db.t4g.medium",
  MultiRegionParameterGroupName: "AdvancedParameterGroup",
  EngineVersion: "7.0",
  TLSEnabled: true,
  MultiRegionClusterNameSuffix: "-prod",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Cluster with Shards

Create a MultiRegionCluster configured with multiple shards for improved scalability:

```ts
const ShardedCluster = await AWS.MemoryDB.MultiRegionCluster("ShardedCluster", {
  NodeType: "db.r6g.large",
  MultiRegionParameterGroupName: "ShardedParameterGroup",
  NumShards: 3,
  UpdateStrategy: "IMMEDIATE",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "MemoryDBMigration" }
  ]
});
```

## Cluster with Custom Engine Version

Create a MultiRegionCluster that specifies a custom engine version and additional tags:

```ts
const CustomEngineCluster = await AWS.MemoryDB.MultiRegionCluster("CustomEngineCluster", {
  NodeType: "db.r5.large",
  EngineVersion: "6.x",
  Description: "MemoryDB MultiRegionCluster with custom engine version",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```