---
title: Managing AWS RDS DBSubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBSubnetGroups using Alchemy Cloud Control.
---

# DBSubnetGroup

The DBSubnetGroup resource lets you manage [AWS RDS DBSubnetGroups](https://docs.aws.amazon.com/rds/latest/userguide/) which are used to group subnets for your RDS instances in a VPC.

## Minimal Example

Create a basic DBSubnetGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const dbSubnetGroup = await AWS.RDS.DBSubnetGroup("MyDBSubnetGroup", {
  DBSubnetGroupDescription: "My RDS DB Subnet Group",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-1abcd2345efgh6789"],
  DBSubnetGroupName: "MyCustomDBSubnetGroup",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a DBSubnetGroup with multiple subnets and additional tags for better resource management.

```ts
const advancedDbSubnetGroup = await AWS.RDS.DBSubnetGroup("AdvancedDBSubnetGroup", {
  DBSubnetGroupDescription: "Advanced configuration for RDS DB Subnet Group",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd2345efgh6789",
    "subnet-2abcd3456efgh7890"
  ],
  DBSubnetGroupName: "AdvancedDBSubnetGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DatabaseOps" }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing DBSubnetGroup instead of creating a new one, you can enable the `adopt` property.

```ts
const adoptDbSubnetGroup = await AWS.RDS.DBSubnetGroup("AdoptedDBSubnetGroup", {
  DBSubnetGroupDescription: "Adopting an existing DB Subnet Group",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  adopt: true
});
```

## Using Tags for Resource Management

Create a DBSubnetGroup with multiple tags for effective resource tracking and management.

```ts
const taggedDbSubnetGroup = await AWS.RDS.DBSubnetGroup("TaggedDBSubnetGroup", {
  DBSubnetGroupDescription: "DB Subnet Group with multiple tags",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  Tags: [
    { Key: "Project", Value: "DataWarehouse" },
    { Key: "Owner", Value: "DataTeam" },
    { Key: "CostCenter", Value: "CC123" }
  ]
});
```