---
title: SubnetGroup
description: Learn how to create, update, and manage AWS MemoryDB SubnetGroups using Alchemy Cloud Control.
---


The SubnetGroup resource lets you manage [AWS MemoryDB SubnetGroups](https://docs.aws.amazon.com/memorydb/latest/userguide/) for your MemoryDB clusters, allowing you to define the network configuration and ensure connectivity within your VPC.

## Minimal Example

Create a basic MemoryDB SubnetGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSubnetGroup = await AWS.MemoryDB.SubnetGroup("basicSubnetGroup", {
  SubnetGroupName: "my-memorydb-subnet-group",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  Description: "Subnet group for my MemoryDB instances"
});
```

## Advanced Configuration

Create a MemoryDB SubnetGroup with additional tags for better resource management.

```ts
const advancedSubnetGroup = await AWS.MemoryDB.SubnetGroup("advancedSubnetGroup", {
  SubnetGroupName: "advanced-memorydb-subnet-group",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Data" }
  ]
});
```

## Using with Multiple Subnets

Demonstrate creating a SubnetGroup that spans multiple availability zones.

```ts
const multiAzSubnetGroup = await AWS.MemoryDB.SubnetGroup("multiAzSubnetGroup", {
  SubnetGroupName: "multi-az-memorydb-subnet-group",
  SubnetIds: [
    "subnet-0123456789abcdef0", // Availability Zone A
    "subnet-abcdef0123456789",   // Availability Zone B
    "subnet-1234567890abcdef1"    // Availability Zone C
  ],
  Description: "Subnet group with multiple availability zones"
});
```
