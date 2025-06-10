---
title: GlobalCluster
description: Learn how to create, update, and manage AWS RDS GlobalClusters using Alchemy Cloud Control.
---


The GlobalCluster resource lets you manage [AWS RDS GlobalClusters](https://docs.aws.amazon.com/rds/latest/userguide/) for horizontally scaling your database across multiple AWS Regions, enhancing availability and recovery capabilities.

## Minimal Example

Create a basic GlobalCluster with essential properties.

```ts
import AWS from "alchemy/aws/control";

const minimalGlobalCluster = await AWS.RDS.GlobalCluster("myGlobalCluster", {
  Engine: "aurora",
  GlobalClusterIdentifier: "my-global-cluster",
  SourceDBClusterIdentifier: "my-source-cluster",
  StorageEncrypted: true
});
```

## Advanced Configuration

Configure a GlobalCluster with additional options such as engine version and deletion protection.

```ts
const advancedGlobalCluster = await AWS.RDS.GlobalCluster("advancedGlobalCluster", {
  Engine: "aurora",
  EngineVersion: "5.6.mysql_aurora.1.22.1",
  GlobalClusterIdentifier: "my-advanced-global-cluster",
  SourceDBClusterIdentifier: "my-source-cluster",
  StorageEncrypted: true,
  DeletionProtection: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GlobalExpansion" }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing GlobalCluster without failing, use the `adopt` option.

```ts
const adoptGlobalCluster = await AWS.RDS.GlobalCluster("adoptGlobalCluster", {
  GlobalClusterIdentifier: "existing-global-cluster-id",
  adopt: true // This will adopt an existing resource instead of failing
});
```

## Custom Engine Lifecycle Support

Create a GlobalCluster that specifies engine lifecycle support.

```ts
const lifecycleSupportedGlobalCluster = await AWS.RDS.GlobalCluster("lifecycleGlobalCluster", {
  Engine: "aurora-postgresql",
  GlobalClusterIdentifier: "my-lifecycle-global-cluster",
  EngineLifecycleSupport: "available",
  SourceDBClusterIdentifier: "my-source-cluster",
  StorageEncrypted: true
});
```
