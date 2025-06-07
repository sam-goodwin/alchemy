---
title: Managing AWS DocDB DBClusters with Alchemy
description: Learn how to create, update, and manage AWS DocDB DBClusters using Alchemy Cloud Control.
---

# DBCluster

The DBCluster resource lets you manage [AWS DocumentDB (with MongoDB compatibility) DBClusters](https://docs.aws.amazon.com/docdb/latest/userguide/) including configurations for backup, security, and performance.

## Minimal Example

Create a basic DocumentDB cluster with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicDBCluster = await AWS.DocDB.DBCluster("BasicDBCluster", {
  DBClusterIdentifier: "my-docdb-cluster",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword123!",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group",
  EngineVersion: "4.0",
  StorageEncrypted: true,
  BackupRetentionPeriod: 7,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a DocumentDB cluster with additional options for scaling and security.

```ts
import AWS from "alchemy/aws/control";

const advancedDBCluster = await AWS.DocDB.DBCluster("AdvancedDBCluster", {
  DBClusterIdentifier: "my-advanced-docdb-cluster",
  MasterUsername: "admin",
  MasterUserPassword: "anotherSecurePassword456!",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group",
  EngineVersion: "4.0",
  StorageEncrypted: true,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  EnableCloudwatchLogsExports: ["audit", "profiler"],
  PreferredBackupWindow: "06:00-06:30",
  PreferredMaintenanceWindow: "sun:06:00-sun:06:30",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataTeam" }
  ]
});
```

## Restoring from a Snapshot

Create a DBCluster by restoring from a specific snapshot to recover data.

```ts
import AWS from "alchemy/aws/control";

const restoredDBCluster = await AWS.DocDB.DBCluster("RestoredDBCluster", {
  DBClusterIdentifier: "my-restored-docdb-cluster",
  SnapshotIdentifier: "my-snapshot-id",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "RecoveryTeam" }
  ]
});
```

## Serverless Configuration

Set up a serverless DocumentDB cluster with automatic scaling configurations.

```ts
import AWS from "alchemy/aws/control";

const serverlessDBCluster = await AWS.DocDB.DBCluster("ServerlessDBCluster", {
  DBClusterIdentifier: "my-serverless-docdb-cluster",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword789!",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  DBSubnetGroupName: "my-docdb-subnet-group",
  EngineVersion: "4.0",
  ServerlessV2ScalingConfiguration: {
    MinCapacity: 2,
    MaxCapacity: 8
  },
  Tags: [
    { Key: "Environment", Value: "test" },
    { Key: "Team", Value: "QA" }
  ]
});
``` 

This documentation provides essential configurations and examples for managing AWS DocumentDB DBClusters using Alchemy. Adjust parameters as needed to fit your specific use cases.