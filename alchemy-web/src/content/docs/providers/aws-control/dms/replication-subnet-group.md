---
title: ReplicationSubnetGroup
description: Learn how to create, update, and manage AWS DMS ReplicationSubnetGroups using Alchemy Cloud Control.
---


The ReplicationSubnetGroup resource allows you to define a [Replication Subnet Group](https://docs.aws.amazon.com/dms/latest/userguide/) for AWS Database Migration Service (DMS) to specify which subnets to use for replication instances. This resource helps ensure that your replication instances can communicate with your data sources and targets in a secure manner.

## Minimal Example

Create a basic replication subnet group with required properties.

```ts
import AWS from "alchemy/aws/control";

const replicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("myReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "My Replication Subnet Group for DMS",
  SubnetIds: [
    "subnet-0abcdef1234567890",
    "subnet-1abcdef1234567890"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DatabaseMigration" }
  ]
});
```

## Advanced Configuration

Customize the replication subnet group with an identifier and additional tags.

```ts
const advancedReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("advancedReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Advanced Replication Subnet Group for DMS",
  ReplicationSubnetGroupIdentifier: "advanced-replication-subnet-group",
  SubnetIds: [
    "subnet-2abcdef1234567890",
    "subnet-3abcdef1234567890"
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Using Existing Resources

This example demonstrates how to adopt an existing replication subnet group if it already exists.

```ts
const adoptExistingReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("existingReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Adopting an existing Replication Subnet Group",
  SubnetIds: [
    "subnet-4abcdef1234567890",
    "subnet-5abcdef1234567890"
  ],
  adopt: true
});
```

## Tagging Best Practices

Demonstrate how to effectively use tags for organization and management.

```ts
const taggedReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("taggedReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Replication Subnet Group with best practices tagging",
  SubnetIds: [
    "subnet-6abcdef1234567890",
    "subnet-7abcdef1234567890"
  ],
  Tags: [
    { Key: "CostCenter", Value: "12345" },
    { Key: "Department", Value: "Engineering" },
    { Key: "Project", Value: "DataMigration2023" }
  ]
});
```
