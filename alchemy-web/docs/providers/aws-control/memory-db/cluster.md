---
title: Managing AWS MemoryDB Clusters with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource allows you to manage [AWS MemoryDB Clusters](https://docs.aws.amazon.com/memorydb/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic MemoryDB cluster with required properties and a few optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicCluster = await AWS.MemoryDB.Cluster("BasicCluster", {
  NodeType: "db.r5.large",
  ACLName: "default",
  ClusterName: "my-memorydb-cluster",
  NumShards: 2,
  NumReplicasPerShard: 1
});
```

## Advanced Configuration

Configure a MemoryDB cluster with additional settings like TLS, snapshots, and tags.

```ts
const advancedCluster = await AWS.MemoryDB.Cluster("AdvancedCluster", {
  NodeType: "db.r5.large",
  ACLName: "default",
  ClusterName: "my-advanced-memorydb-cluster",
  NumShards: 3,
  NumReplicasPerShard: 2,
  TLSEnabled: true,
  SnapshotRetentionLimit: 7,
  SnapshotWindow: "05:00-06:00",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Cluster with KMS Encryption

Create a MemoryDB cluster with KMS encryption enabled for enhanced data security.

```ts
const secureCluster = await AWS.MemoryDB.Cluster("SecureCluster", {
  NodeType: "db.r5.large",
  ACLName: "default",
  ClusterName: "my-secure-memorydb-cluster",
  NumShards: 2,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-ab12-ab12-abcd12345678",
  AutoMinorVersionUpgrade: true
});
```

## Cluster with Specific Maintenance Window

Set up a MemoryDB cluster with a defined maintenance window for updates.

```ts
const maintenanceCluster = await AWS.MemoryDB.Cluster("MaintenanceCluster", {
  NodeType: "db.r5.large",
  ACLName: "default",
  ClusterName: "my-maintenance-window-cluster",
  NumShards: 2,
  MaintenanceWindow: "sun:07:00-sun:08:00"
});
```

## Cluster with Snapshot Configuration

Create a MemoryDB cluster configured to take snapshots.

```ts
const snapshotCluster = await AWS.MemoryDB.Cluster("SnapshotCluster", {
  NodeType: "db.r5.large",
  ACLName: "default",
  ClusterName: "my-snapshot-memorydb-cluster",
  NumShards: 2,
  SnapshotWindow: "06:00-07:00",
  SnapshotRetentionLimit: 14,
  FinalSnapshotName: "final-snapshot-my-cluster"
});
```