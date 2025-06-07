---
title: Managing AWS Neptune DBClusters with Alchemy
description: Learn how to create, update, and manage AWS Neptune DBClusters using Alchemy Cloud Control.
---

# DBCluster

The DBCluster resource allows you to manage [AWS Neptune DBClusters](https://docs.aws.amazon.com/neptune/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Neptune DBCluster with essential configurations.

```ts
import AWS from "alchemy/aws/control";

const basicDBCluster = await AWS.Neptune.DBCluster("BasicDBCluster", {
  DBClusterIdentifier: "my-neptune-cluster",
  EngineVersion: "1.0.2.0",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-neptune-subnet-group",
  StorageEncrypted: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a Neptune DBCluster with additional options for backup and maintenance.

```ts
const advancedDBCluster = await AWS.Neptune.DBCluster("AdvancedDBCluster", {
  DBClusterIdentifier: "my-advanced-neptune-cluster",
  EngineVersion: "1.0.2.0",
  BackupRetentionPeriod: 7,
  PreferredBackupWindow: "00:00-00:30",
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  EnableCloudwatchLogsExports: ["audit", "error"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Snapshot Restoration

Restore a DBCluster from a specific snapshot.

```ts
const restoreDBCluster = await AWS.Neptune.DBCluster("RestoreDBCluster", {
  DBClusterIdentifier: "my-restored-neptune-cluster",
  SnapshotIdentifier: "my-snapshot-id",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-neptune-subnet-group",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Serverless Scaling Configuration

Create a DBCluster with serverless scaling options.

```ts
const serverlessDBCluster = await AWS.Neptune.DBCluster("ServerlessDBCluster", {
  DBClusterIdentifier: "my-serverless-neptune-cluster",
  EngineVersion: "1.0.2.0",
  ServerlessScalingConfiguration: {
    MinCapacity: 2,
    MaxCapacity: 8
  },
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```