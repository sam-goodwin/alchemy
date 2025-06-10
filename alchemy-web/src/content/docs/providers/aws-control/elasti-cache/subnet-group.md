---
title: SubnetGroup
description: Learn how to create, update, and manage AWS ElastiCache SubnetGroups using Alchemy Cloud Control.
---


The SubnetGroup resource lets you manage [AWS ElastiCache SubnetGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for your caching clusters. A subnet group is a collection of subnets that you can use with ElastiCache clusters to ensure high availability and fault tolerance.

## Minimal Example

Create a basic ElastiCache SubnetGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const subnetGroup = await AWS.ElastiCache.SubnetGroup("mySubnetGroup", {
  Description: "My ElastiCache Subnet Group for caching",
  CacheSubnetGroupName: "my-subnet-group",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ]
});
```

## Advanced Configuration

Configure an ElastiCache SubnetGroup with tags for better resource management and identification.

```ts
const advancedSubnetGroup = await AWS.ElastiCache.SubnetGroup("advancedSubnetGroup", {
  Description: "Advanced ElastiCache Subnet Group with tags",
  CacheSubnetGroupName: "advanced-subnet-group",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CacheOptimization" }
  ]
});
```

## Adoption of Existing Resources

Use the adopt option to handle existing resources gracefully.

```ts
const adoptedSubnetGroup = await AWS.ElastiCache.SubnetGroup("adoptedSubnetGroup", {
  Description: "Adopting an existing ElastiCache Subnet Group",
  CacheSubnetGroupName: "existing-subnet-group",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  adopt: true
});
```

## Using Multiple Subnets for High Availability

Create a SubnetGroup that spans multiple availability zones to enhance fault tolerance.

```ts
const multiAzSubnetGroup = await AWS.ElastiCache.SubnetGroup("multiAzSubnetGroup", {
  Description: "Subnet Group spanning multiple Availability Zones",
  CacheSubnetGroupName: "multi-az-subnet-group",
  SubnetIds: [
    "subnet-12345678", // Availability Zone 1
    "subnet-23456789", // Availability Zone 2
    "subnet-34567890"  // Availability Zone 3
  ]
});
```
