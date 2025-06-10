---
title: DBCluster
description: Learn how to create, update, and manage AWS RDS DBClusters using Alchemy Cloud Control.
---


The DBCluster resource allows you to manage [AWS RDS DBClusters](https://docs.aws.amazon.com/rds/latest/userguide/) and their associated configurations. This resource facilitates the creation and management of highly available and scalable database clusters.

## Minimal Example

Create a basic DBCluster with essential properties and common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const dbCluster = await AWS.RDS.DBCluster("myDbCluster", {
  Engine: "aurora",
  DBClusterIdentifier: "my-cluster-id",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword123",
  VpcSecurityGroupIds: ["sg-12345678"],
  DBSubnetGroupName: "my-subnet-group",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a DBCluster with advanced options such as performance insights and backup settings.

```ts
const advancedDbCluster = await AWS.RDS.DBCluster("advancedDbCluster", {
  Engine: "aurora",
  DBClusterIdentifier: "my-advanced-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword123",
  VpcSecurityGroupIds: ["sg-87654321"],
  DBSubnetGroupName: "my-subnet-group",
  PerformanceInsightsEnabled: true,
  PerformanceInsightsRetentionPeriod: 7,
  BackupRetentionPeriod: 30,
  EnableIAMDatabaseAuthentication: true,
  Tags: [{ Key: "Environment", Value: "Staging" }]
});
```

## Read Replica Configuration

Create a DBCluster configured as a read replica of an existing cluster.

```ts
const readReplicaDbCluster = await AWS.RDS.DBCluster("readReplicaDbCluster", {
  Engine: "aurora",
  DBClusterIdentifier: "my-read-replica-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword123",
  SourceDBClusterIdentifier: "my-cluster-id",
  VpcSecurityGroupIds: ["sg-12345678"],
  DBSubnetGroupName: "my-subnet-group",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Serverless Configuration

Set up a serverless DBCluster with scaling configurations.

```ts
const serverlessDbCluster = await AWS.RDS.DBCluster("serverlessDbCluster", {
  Engine: "aurora",
  DBClusterIdentifier: "my-serverless-cluster",
  MasterUsername: "adminUser",
  MasterUserPassword: "securePassword123",
  VpcSecurityGroupIds: ["sg-12345678"],
  DBSubnetGroupName: "my-subnet-group",
  ServerlessV2ScalingConfiguration: {
    MinCapacity: "ACU_4",
    MaxCapacity: "ACU_16"
  },
  Tags: [{ Key: "Environment", Value: "Testing" }]
});
```
