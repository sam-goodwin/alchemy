---
title: Table
description: Learn how to create, update, and manage AWS Cassandra Tables using Alchemy Cloud Control.
---


The Table resource allows you to create and manage [AWS Cassandra Tables](https://docs.aws.amazon.com/cassandra/latest/userguide/) within your keyspaces, enabling you to store and query data effectively.

## Minimal Example

Create a basic Cassandra table with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const cassandraTable = await AWS.Cassandra.Table("UserTable", {
  KeyspaceName: "UserKeyspace",
  TableName: "Users",
  PartitionKeyColumns: [
    { Name: "userId", Type: "uuid" }
  ],
  RegularColumns: [
    { Name: "userName", Type: "text" },
    { Name: "email", Type: "text" }
  ],
  BillingMode: "PROVISIONED",
  ReplicaSpecifications: [
    {
      RegionName: "us-east-1",
      ReplicaCount: 3
    }
  ]
});
```

## Advanced Configuration

Configure a table with clustering key columns and point-in-time recovery enabled.

```ts
const advancedCassandraTable = await AWS.Cassandra.Table("AdvancedUserTable", {
  KeyspaceName: "UserKeyspace",
  TableName: "AdvancedUsers",
  PartitionKeyColumns: [
    { Name: "userId", Type: "uuid" }
  ],
  ClusteringKeyColumns: [
    { Name: "lastName", Type: "text" }
  ],
  RegularColumns: [
    { Name: "firstName", Type: "text" },
    { Name: "email", Type: "text" }
  ],
  PointInTimeRecoveryEnabled: true,
  EncryptionSpecification: {
    EncryptionType: "SSE_KMS",
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd-1234-efgh-5678-ijkl"
  }
});
```

## Auto Scaling Configuration

Set up auto-scaling for read and write capacity to handle varying workloads.

```ts
const autoScalingCassandraTable = await AWS.Cassandra.Table("AutoScalingUserTable", {
  KeyspaceName: "UserKeyspace",
  TableName: "AutoScalingUsers",
  PartitionKeyColumns: [
    { Name: "userId", Type: "uuid" }
  ],
  RegularColumns: [
    { Name: "userName", Type: "text" },
    { Name: "email", Type: "text" }
  ],
  AutoScalingSpecifications: {
    ReadCapacity: {
      TargetUtilizationPercentage: 75,
      MinCapacity: 5,
      MaxCapacity: 50
    },
    WriteCapacity: {
      TargetUtilizationPercentage: 75,
      MinCapacity: 5,
      MaxCapacity: 50
    }
  }
});
```

## Table with Tags

Create a table while assigning tags for resource management.

```ts
const taggedCassandraTable = await AWS.Cassandra.Table("TaggedUserTable", {
  KeyspaceName: "UserKeyspace",
  TableName: "TaggedUsers",
  PartitionKeyColumns: [
    { Name: "userId", Type: "uuid" }
  ],
  RegularColumns: [
    { Name: "userName", Type: "text" },
    { Name: "email", Type: "text" }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "UserManagement" }
  ]
});
```
