---
title: Cluster
description: Learn how to create, update, and manage AWS MemoryDB Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS MemoryDB Clusters](https://docs.aws.amazon.com/memorydb/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic MemoryDB cluster with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const memoryDBCluster = await AWS.MemoryDB.Cluster("myMemoryDBCluster", {
  ACLName: "myACL",
  ClusterName: "my-cluster",
  NodeType: "db.t3.medium",
  NumShards: 2,
  NumReplicasPerShard: 1,
  Port: 6379,
  TLSEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MemoryDBDemo" }
  ]
});
```

## Advanced Configuration

Configure a MemoryDB cluster with more advanced settings including parameter groups and snapshot options.

```ts
const advancedMemoryDBCluster = await AWS.MemoryDB.Cluster("advancedMemoryDBCluster", {
  ACLName: "myACL",
  ClusterName: "advanced-cluster",
  NodeType: "db.r5.large",
  NumShards: 3,
  NumReplicasPerShard: 2,
  Port: 6379,
  TLSEnabled: true,
  ParameterGroupName: "default.memorydb5.0",
  FinalSnapshotName: "finalSnapshotBeforeDeletion",
  SnapshotRetentionLimit: 7,
  MaintenanceWindow: "sun:23:00-sun:23:30"
});
```

## Cluster with Snapshot

Create a MemoryDB cluster that uses snapshots for backup.

```ts
const snapshotMemoryDBCluster = await AWS.MemoryDB.Cluster("snapshotMemoryDBCluster", {
  ACLName: "myACL",
  ClusterName: "snapshot-cluster",
  NodeType: "db.t3.medium",
  NumShards: 2,
  Port: 6379,
  SnapshotName: "initialSnapshot",
  SnapshotWindow: "03:00-04:00",
  SnapshotRetentionLimit: 5
});
```

## Multi-Region Cluster

Set up a multi-region MemoryDB cluster.

```ts
const multiRegionMemoryDBCluster = await AWS.MemoryDB.Cluster("multiRegionMemoryDBCluster", {
  ACLName: "myACL",
  ClusterName: "multi-region-cluster",
  NodeType: "db.r5.large",
  NumShards: 3,
  NumReplicasPerShard: 1,
  Port: 6379,
  TLSEnabled: true,
  MultiRegionClusterName: "myGlobalCluster"
});
```
