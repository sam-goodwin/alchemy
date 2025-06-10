---
title: MultiRegionCluster
description: Learn how to create, update, and manage AWS MemoryDB MultiRegionClusters using Alchemy Cloud Control.
---


The MultiRegionCluster resource allows you to create and manage [AWS MemoryDB MultiRegionClusters](https://docs.aws.amazon.com/memorydb/latest/userguide/) which provide a fully managed, Redis-compatible in-memory database service across multiple AWS regions.

## Minimal Example

Create a basic MultiRegionCluster with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const multiRegionCluster = await AWS.MemoryDB.MultiRegionCluster("myMultiRegionCluster", {
  NodeType: "db.t4g.small",
  MultiRegionParameterGroupName: "myParameterGroup",
  Description: "A simple MultiRegionCluster for demo purposes",
  TLSEnabled: true
});
```

## Advanced Configuration

Configure a MultiRegionCluster with additional advanced settings such as engine version and tags.

```ts
const advancedMultiRegionCluster = await AWS.MemoryDB.MultiRegionCluster("advancedCluster", {
  NodeType: "db.r5.large",
  MultiRegionParameterGroupName: "advancedParameterGroup",
  EngineVersion: "7.0",
  MultiRegionClusterNameSuffix: "prod",
  TLSEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataEngineering" }
  ],
  NumShards: 5
});
```

## Utilize Update Strategy

Create a MultiRegionCluster that specifies an update strategy for managing changes in the cluster.

```ts
const updateStrategyCluster = await AWS.MemoryDB.MultiRegionCluster("updateStrategyCluster", {
  NodeType: "db.m5.large",
  MultiRegionParameterGroupName: "updateStrategyGroup",
  UpdateStrategy: "rollback",
  Description: "Cluster with a rollback update strategy",
  TLSEnabled: true
});
```

## Adopt Existing Resource

Create a MultiRegionCluster that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingCluster = await AWS.MemoryDB.MultiRegionCluster("existingCluster", {
  NodeType: "db.t3.medium",
  MultiRegionParameterGroupName: "adoptedParameterGroup",
  adopt: true,
  Description: "Adopting an existing MultiRegionCluster"
});
```
