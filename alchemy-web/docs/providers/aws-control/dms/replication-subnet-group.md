---
title: Managing AWS DMS ReplicationSubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS DMS ReplicationSubnetGroups using Alchemy Cloud Control.
---

# ReplicationSubnetGroup

The ReplicationSubnetGroup resource lets you manage [AWS DMS Replication Subnet Groups](https://docs.aws.amazon.com/dms/latest/userguide/) which define a collection of subnets that can be used for replication tasks.

## Minimal Example

Create a basic replication subnet group with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("basicReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "My subnet group for replication",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  ReplicationSubnetGroupIdentifier: "my-replication-subnet-group"
});
```

## Advanced Configuration

Configure a replication subnet group with tags to help organize resources:

```ts
const taggedReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("taggedReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Subnet group with tags for better management",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Adoption of Existing Resources

Create a replication subnet group that adopts an existing resource instead of failing:

```ts
const adoptedReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("adoptedReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Adopting existing replication subnet group",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  adopt: true
});
```

## Using Multiple Subnets

Define a replication subnet group using multiple subnets across different availability zones for high availability:

```ts
const multiSubnetReplicationSubnetGroup = await AWS.DMS.ReplicationSubnetGroup("multiSubnetReplicationSubnetGroup", {
  ReplicationSubnetGroupDescription: "Replication subnet group with multiple subnets",
  SubnetIds: [
    "subnet-0123456789abcdef0", // Availability Zone 1
    "subnet-0abcdef0123456789", // Availability Zone 2
    "subnet-1234567890abcdef1"  // Availability Zone 3
  ]
});
```