---
title: Managing AWS ElastiCache SubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache SubnetGroups using Alchemy Cloud Control.
---

# SubnetGroup

The SubnetGroup resource allows you to manage [AWS ElastiCache SubnetGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) which define the subnets and their configurations for your ElastiCache clusters.

## Minimal Example

Create a basic ElastiCache SubnetGroup with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const DefaultSubnetGroup = await AWS.ElastiCache.SubnetGroup("DefaultSubnetGroup", {
  Description: "Default Subnet Group for ElastiCache",
  CacheSubnetGroupName: "default-subnet-group",
  SubnetIds: ["subnet-0bb1c79de3EXAMPLE", "subnet-0bb1c79de4EXAMPLE"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a SubnetGroup with more detailed properties, including adopting an existing resource.

```ts
const AdvancedSubnetGroup = await AWS.ElastiCache.SubnetGroup("AdvancedSubnetGroup", {
  Description: "Advanced Subnet Group with adoption",
  CacheSubnetGroupName: "advanced-subnet-group",
  SubnetIds: ["subnet-0bb1c79de3EXAMPLE", "subnet-0bb1c79de4EXAMPLE"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "DataTeam" }
  ],
  adopt: true // Adopt an existing resource if it exists
});
```

## Specific Use Case: Multi-AZ Deployment

Create a SubnetGroup designed for a Multi-AZ ElastiCache deployment, ensuring high availability.

```ts
const MultiAZSubnetGroup = await AWS.ElastiCache.SubnetGroup("MultiAZSubnetGroup", {
  Description: "Multi-AZ Subnet Group for ElastiCache",
  CacheSubnetGroupName: "multi-az-subnet-group",
  SubnetIds: [
    "subnet-0bb1c79de3EXAMPLE", // AZ 1
    "subnet-0bb1c79de4EXAMPLE", // AZ 2
    "subnet-0bb1c79de5EXAMPLE"  // AZ 3
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "HighAvailability", Value: "true" }
  ]
});
```