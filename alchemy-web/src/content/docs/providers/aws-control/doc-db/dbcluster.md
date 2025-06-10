---
title: DBCluster
description: Learn how to create, update, and manage AWS DocDB DBClusters using Alchemy Cloud Control.
---


The DBCluster resource allows you to create and manage [AWS DocumentDB (with MongoDB compatibility) DBClusters](https://docs.aws.amazon.com/docdb/latest/userguide/), providing a scalable and highly available database solution.

## Minimal Example

Create a basic DBCluster with required properties and a common optional setting for storage encryption.

```ts
import AWS from "alchemy/aws/control";

const docDBCluster = await AWS.DocDB.DBCluster("myDocDBCluster", {
  DBClusterIdentifier: "my-docdb-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword123!",
  StorageEncrypted: true,
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group"
});
```

## Advanced Configuration

Configure a DBCluster with advanced settings such as backup retention period and maintenance windows.

```ts
const advancedDocDBCluster = await AWS.DocDB.DBCluster("advancedDocDBCluster", {
  DBClusterIdentifier: "advanced-docdb-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "anotherSecurePassword456!",
  StorageEncrypted: true,
  BackupRetentionPeriod: 7,
  PreferredBackupWindow: "03:00-03:30",
  PreferredMaintenanceWindow: "sun:05:00-sun:05:30",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group"
});
```

## Restoring from Snapshot

This example demonstrates how to restore a DBCluster from a snapshot.

```ts
const restoredDocDBCluster = await AWS.DocDB.DBCluster("restoredDocDBCluster", {
  DBClusterIdentifier: "restored-docdb-cluster",
  SnapshotIdentifier: "my-snapshot-id",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group"
});
```

## Using Serverless Configuration

Create a DBCluster using serverless V2 scaling configuration for optimal resource management.

```ts
const serverlessDocDBCluster = await AWS.DocDB.DBCluster("serverlessDocDBCluster", {
  DBClusterIdentifier: "serverless-docdb-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword789!",
  ServerlessV2ScalingConfiguration: {
    MinCapacity: 2,
    MaxCapacity: 8
  },
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group"
});
```
