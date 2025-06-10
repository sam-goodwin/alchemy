---
title: Cluster
description: Learn how to create, update, and manage AWS DocDBElastic Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS DocDBElastic Clusters](https://docs.aws.amazon.com/docdbelastic/latest/userguide/) for scalable and flexible document database solutions.

## Minimal Example

Create a basic DocDBElastic Cluster with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const docDBCluster = await AWS.DocDBElastic.Cluster("myDocDBCluster", {
  clusterName: "my-cluster",
  shardCount: 2,
  shardCapacity: 256,
  adminUserName: "admin",
  adminUserPassword: "ComplexPassword123!",
  preferredBackupWindow: "03:00-03:30",
  preferredMaintenanceWindow: "sun:05:00-sun:06:00"
});
```

## Advanced Configuration

Configure a DocDBElastic Cluster with advanced settings including KMS key for encryption and VPC security groups.

```ts
const advancedDocDBCluster = await AWS.DocDBElastic.Cluster("advancedDocDBCluster", {
  clusterName: "advanced-cluster",
  shardCount: 3,
  shardCapacity: 512,
  adminUserName: "adminUser",
  adminUserPassword: "AnotherComplexPassword456!",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-5678-90ef-gh12-ijklmnopqrst",
  vpcSecurityGroupIds: ["sg-0abc12345def67890"],
  subnetIds: ["subnet-0abc12345def67890", "subnet-0def12345abc67890"],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "DocDBElastic" }
  ]
});
```

## Cluster with Custom Sharding

Create a cluster optimized with custom sharding settings for better performance.

```ts
const customShardDocDBCluster = await AWS.DocDBElastic.Cluster("customShardDocDBCluster", {
  clusterName: "custom-shard-cluster",
  shardCount: 4,
  shardCapacity: 128,
  adminUserName: "customAdmin",
  adminUserPassword: "HighlySecurePassword789!",
  shardInstanceCount: 4,
  preferredBackupWindow: "02:00-02:30",
  preferredMaintenanceWindow: "sat:04:00-sat:05:00"
});
```

## Adopt Existing Resource

Create a cluster while adopting an existing resource if one is already present.

```ts
const adoptedDocDBCluster = await AWS.DocDBElastic.Cluster("adoptedDocDBCluster", {
  clusterName: "existing-cluster",
  shardCount: 2,
  shardCapacity: 256,
  adminUserName: "adminUser",
  adminUserPassword: "PasswordForAdoption123!",
  adopt: true // Enables adopting an existing cluster
});
```
