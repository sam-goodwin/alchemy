---
title: Managing AWS DocDBElastic Clusters with Alchemy
description: Learn how to create, update, and manage AWS DocDBElastic Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you manage [AWS DocDBElastic Clusters](https://docs.aws.amazon.com/docdbelastic/latest/userguide/) and their configuration settings.

## Resource Documentation

This resource enables you to create and configure scalable and managed document databases with Amazon DocumentDB (with MongoDB compatibility), allowing for seamless scaling and management of database clusters.

## Minimal Example

Create a basic DocDBElastic Cluster with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicCluster = await AWS.DocDBElastic.Cluster("basicCluster", {
  AdminUserName: "admin",
  AdminUserPassword: "securePassword123!",
  ShardCount: 2,
  ShardCapacity: 64,
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  BackupRetentionPeriod: 7,
  AuthType: "PASSWORD",
  ClusterName: "BasicCluster",
  SubnetIds: ["subnet-12345678", "subnet-87654321"],
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Advanced Configuration

Configure a DocDBElastic Cluster with additional security and advanced settings.

```ts
const advancedCluster = await AWS.DocDBElastic.Cluster("advancedCluster", {
  AdminUserName: "admin",
  AdminUserPassword: "strongPassword456!",
  ShardCount: 3,
  ShardCapacity: 128,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  PreferredMaintenanceWindow: "sat:03:00-sat:04:00",
  BackupRetentionPeriod: 14,
  AuthType: "PASSWORD",
  ClusterName: "AdvancedCluster",
  SubnetIds: ["subnet-11111111", "subnet-22222222"],
  VpcSecurityGroupIds: ["sg-abcdefabcdefabcd"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Multi-Region Deployment

Demonstrate how to create a cluster that spans multiple availability zones for high availability.

```ts
const multiRegionCluster = await AWS.DocDBElastic.Cluster("multiRegionCluster", {
  AdminUserName: "admin",
  AdminUserPassword: "veryStrongPassword789!",
  ShardCount: 4,
  ShardCapacity: 256,
  PreferredMaintenanceWindow: "mon:02:00-mon:03:00",
  BackupRetentionPeriod: 30,
  AuthType: "PASSWORD",
  ClusterName: "MultiRegionCluster",
  SubnetIds: [
    "subnet-abcde123",
    "subnet-abcde456",
    "subnet-abcde789"
  ],
  VpcSecurityGroupIds: ["sg-abcdef1234567890"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```