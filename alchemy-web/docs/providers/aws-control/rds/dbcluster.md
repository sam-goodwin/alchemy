---
title: Managing AWS RDS DBClusters with Alchemy
description: Learn how to create, update, and manage AWS RDS DBClusters using Alchemy Cloud Control.
---

# DBCluster

The DBCluster resource lets you manage [AWS RDS DBClusters](https://docs.aws.amazon.com/rds/latest/userguide/) for relational database services, enabling high availability and scalability.

## Minimal Example

Create a basic DBCluster with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const myDBCluster = await AWS.RDS.DBCluster("MyDBCluster", {
  DBClusterIdentifier: "my-db-cluster",
  Engine: "aurora",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecret123!",
  DBSubnetGroupName: "my-db-subnet-group",
  VpcSecurityGroupIds: ["sg-12345678"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DBCluster with advanced settings, including encryption and performance insights.

```ts
const advancedDBCluster = await AWS.RDS.DBCluster("AdvancedDBCluster", {
  DBClusterIdentifier: "advanced-db-cluster",
  Engine: "aurora",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecret123!",
  DBSubnetGroupName: "my-db-subnet-group",
  VpcSecurityGroupIds: ["sg-12345678"],
  StorageEncrypted: true,
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  PerformanceInsightsEnabled: true,
  PerformanceInsightsKmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Multi-AZ Configuration

Create a DBCluster that is configured for multi-AZ deployments for improved availability.

```ts
const multiAZDBCluster = await AWS.RDS.DBCluster("MultiAZDBCluster", {
  DBClusterIdentifier: "multi-az-db-cluster",
  Engine: "aurora",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecret123!",
  DBSubnetGroupName: "my-db-subnet-group",
  VpcSecurityGroupIds: ["sg-12345678"],
  AvailabilityZones: ["us-east-1a", "us-east-1b"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Serverless Configuration

Set up a serverless DBCluster with automatic scaling capabilities.

```ts
const serverlessDBCluster = await AWS.RDS.DBCluster("ServerlessDBCluster", {
  DBClusterIdentifier: "serverless-db-cluster",
  Engine: "aurora",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecret123!",
  DBSubnetGroupName: "my-db-subnet-group",
  VpcSecurityGroupIds: ["sg-12345678"],
  ServerlessV2ScalingConfiguration: {
    MinCapacity: 2,
    MaxCapacity: 8
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Development" }
  ]
});
```