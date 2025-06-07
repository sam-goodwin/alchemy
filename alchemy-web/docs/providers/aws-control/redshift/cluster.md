---
title: Managing AWS Redshift Clusters with Alchemy
description: Learn how to create, update, and manage AWS Redshift Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you manage [AWS Redshift Clusters](https://docs.aws.amazon.com/redshift/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic AWS Redshift Cluster with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const redshiftCluster = await AWS.Redshift.Cluster("BasicRedshiftCluster", {
  NodeType: "dc2.large",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword123",
  DBName: "mydatabase",
  ClusterType: "single-node",
  Port: 5439,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure an AWS Redshift Cluster with advanced options such as multi-AZ deployment, encryption, and IAM roles.

```ts
const advancedRedshiftCluster = await AWS.Redshift.Cluster("AdvancedRedshiftCluster", {
  NodeType: "dc2.large",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword123",
  DBName: "mydatabase",
  ClusterType: "multi-node",
  NumberOfNodes: 2,
  Encrypted: true,
  IamRoles: ["arn:aws:iam::123456789012:role/MyRedshiftRole"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataAnalytics" }
  ]
});
```

## Snapshot Configuration

Create a cluster with snapshot settings to manage backups effectively.

```ts
const snapshotRedshiftCluster = await AWS.Redshift.Cluster("SnapshotRedshiftCluster", {
  NodeType: "dc2.large",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword123",
  DBName: "mydatabase",
  ClusterType: "single-node",
  AutomatedSnapshotRetentionPeriod: 7,
  SnapshotCopyRetentionPeriod: 30,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Network Configuration

Set up a Redshift Cluster with specific VPC security group IDs and subnet group for networking.

```ts
const networkConfiguredCluster = await AWS.Redshift.Cluster("NetworkConfiguredCluster", {
  NodeType: "dc2.large",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword123",
  DBName: "mydatabase",
  ClusterType: "single-node",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  ClusterSubnetGroupName: "my-subnet-group",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "NetworkOps" }
  ]
});
```