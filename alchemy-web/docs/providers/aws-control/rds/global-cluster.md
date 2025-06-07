---
title: Managing AWS RDS GlobalClusters with Alchemy
description: Learn how to create, update, and manage AWS RDS GlobalClusters using Alchemy Cloud Control.
---

# GlobalCluster

The GlobalCluster resource allows you to create and manage [AWS RDS GlobalClusters](https://docs.aws.amazon.com/rds/latest/userguide/) which enable you to have a globally distributed database with cross-region read replicas.

## Minimal Example

This example demonstrates how to create a basic GlobalCluster with essential properties.

```ts
import AWS from "alchemy/aws/control";

const MyGlobalCluster = await AWS.RDS.GlobalCluster("MyGlobalCluster", {
  GlobalClusterIdentifier: "my-global-cluster",
  Engine: "aurora",
  EngineVersion: "5.6.10",
  StorageEncrypted: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

This example shows how to set up a GlobalCluster with additional configurations such as deletion protection and a source DB cluster.

```ts
const AdvancedGlobalCluster = await AWS.RDS.GlobalCluster("AdvancedGlobalCluster", {
  GlobalClusterIdentifier: "advanced-global-cluster",
  Engine: "aurora-postgresql",
  EngineVersion: "12.4",
  SourceDBClusterIdentifier: "arn:aws:rds:us-west-2:123456789012:cluster:source-db-cluster",
  DeletionProtection: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Cross-Region Read Replica Setup

This example illustrates how to create a GlobalCluster designed for cross-region read replicas.

```ts
const CrossRegionGlobalCluster = await AWS.RDS.GlobalCluster("CrossRegionGlobalCluster", {
  GlobalClusterIdentifier: "cross-region-global-cluster",
  Engine: "aurora",
  EngineVersion: "5.6.10",
  SourceDBClusterIdentifier: "arn:aws:rds:us-east-1:123456789012:cluster:source-db-cluster",
  StorageEncrypted: true,
  Tags: [
    { Key: "Purpose", Value: "read-replica" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```