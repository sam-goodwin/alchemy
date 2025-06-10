---
title: DBCluster
description: Learn how to create, update, and manage AWS Neptune DBClusters using Alchemy Cloud Control.
---


The DBCluster resource lets you manage [AWS Neptune DBClusters](https://docs.aws.amazon.com/neptune/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Neptune DBCluster with essential properties.

```ts
import AWS from "alchemy/aws/control";

const dbCluster = await AWS.Neptune.DBCluster("myDbCluster", {
  DBClusterIdentifier: "my-neptune-cluster",
  EngineVersion: "1.0.0.0",
  BackupRetentionPeriod: 7,
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-neptune-subnet-group",
  StorageEncrypted: true,
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a Neptune DBCluster with additional options for enhanced functionality.

```ts
const advancedDbCluster = await AWS.Neptune.DBCluster("myAdvancedDbCluster", {
  DBClusterIdentifier: "my-advanced-neptune-cluster",
  EngineVersion: "1.0.0.0",
  BackupRetentionPeriod: 14,
  PreferredBackupWindow: "00:00-00:30",
  PreferredMaintenanceWindow: "mon:00:00-mon:00:30",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-neptune-subnet-group",
  StorageEncrypted: true,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  EnableCloudwatchLogsExports: ["error", "query"],
  Tags: [
    { Key: "Application", Value: "NeptuneApp" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Scaling Configuration

Create a Neptune DBCluster with serverless scaling configuration.

```ts
const serverlessDbCluster = await AWS.Neptune.DBCluster("myServerlessDbCluster", {
  DBClusterIdentifier: "my-serverless-neptune-cluster",
  EngineVersion: "1.0.0.0",
  BackupRetentionPeriod: 7,
  DBSubnetGroupName: "my-neptune-subnet-group",
  StorageEncrypted: true,
  ServerlessScalingConfiguration: {
    MinCapacity: 2,
    MaxCapacity: 8
  },
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Restore from Snapshot

Restore a DBCluster from a specific snapshot.

```ts
const restoreDbCluster = await AWS.Neptune.DBCluster("myRestoreDbCluster", {
  DBClusterIdentifier: "my-restored-neptune-cluster",
  SnapshotIdentifier: "my-snapshot-id",
  DBSubnetGroupName: "my-neptune-subnet-group",
  StorageEncrypted: true,
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```
