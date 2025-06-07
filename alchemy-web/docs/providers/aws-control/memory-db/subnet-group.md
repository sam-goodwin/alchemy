---
title: Managing AWS MemoryDB SubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB SubnetGroups using Alchemy Cloud Control.
---

# SubnetGroup

The SubnetGroup resource lets you manage [AWS MemoryDB SubnetGroups](https://docs.aws.amazon.com/memorydb/latest/userguide/) which define a collection of subnets from different Availability Zones for MemoryDB clusters.

## Minimal Example

Create a basic MemoryDB SubnetGroup with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicSubnetGroup = await AWS.MemoryDB.SubnetGroup("BasicSubnetGroup", {
  SubnetGroupName: "my-memorydb-subnet-group",
  Description: "A basic subnet group for MemoryDB",
  SubnetIds: ["10.0.1.0/24", "10.0.2.0/24"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a MemoryDB SubnetGroup with multiple subnets across different Availability Zones and additional tags.

```ts
const AdvancedSubnetGroup = await AWS.MemoryDB.SubnetGroup("AdvancedSubnetGroup", {
  SubnetGroupName: "advanced-memorydb-subnet-group",
  Description: "An advanced subnet group for MemoryDB with multiple AZs",
  SubnetIds: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "DevOps" },
    { Key: "Project", Value: "MemoryDBMigration" }
  ]
});
```

## Customizing for Performance

Create a MemoryDB SubnetGroup optimized for performance, including specific subnet IDs and tags.

```ts
const PerformanceOptimizedSubnetGroup = await AWS.MemoryDB.SubnetGroup("PerformanceOptimizedSubnetGroup", {
  SubnetGroupName: "performance-memorydb-subnet-group",
  Description: "A performance-optimized subnet group for MemoryDB",
  SubnetIds: ["10.0.10.0/24", "10.0.11.0/24"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Performance" }
  ]
});
```