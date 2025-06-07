---
title: Managing AWS DocDB DBSubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS DocDB DBSubnetGroups using Alchemy Cloud Control.
---

# DBSubnetGroup

The DBSubnetGroup resource allows you to define a group of subnets that can be used by your Amazon DocumentDB (with MongoDB compatibility) clusters. For more details, visit the [AWS DocDB DBSubnetGroups documentation](https://docs.aws.amazon.com/docdb/latest/userguide/).

## Minimal Example

Create a simple DBSubnetGroup with the required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const simpleDBSubnetGroup = await AWS.DocDB.DBSubnetGroup("SimpleDBSubnetGroup", {
  DBSubnetGroupDescription: "A simple DB Subnet Group for DocumentDB",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-0abcd1234efgh5679"],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DBSubnetGroup with an explicit name and additional tags.

```ts
const advancedDBSubnetGroup = await AWS.DocDB.DBSubnetGroup("AdvancedDBSubnetGroup", {
  DBSubnetGroupName: "MyCustomDBSubnetGroup",
  DBSubnetGroupDescription: "An advanced DB Subnet Group with specific settings",
  SubnetIds: ["subnet-0abcd1234efgh5670", "subnet-0abcd1234efgh5671"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevOps" }
  ]
});
```

## Using Existing Resources

Create a DBSubnetGroup that adopts existing resources instead of failing if they already exist.

```ts
const adoptExistingDBSubnetGroup = await AWS.DocDB.DBSubnetGroup("AdoptExistingDBSubnetGroup", {
  DBSubnetGroupName: "ExistingDBSubnetGroup",
  DBSubnetGroupDescription: "Adopting an existing DB Subnet Group",
  SubnetIds: ["subnet-0abcd1234efgh5672", "subnet-0abcd1234efgh5673"],
  adopt: true
});
```

## Example with Multiple Subnets

Define a DBSubnetGroup that includes multiple subnets across different availability zones.

```ts
const multiAZDBSubnetGroup = await AWS.DocDB.DBSubnetGroup("MultiAZDBSubnetGroup", {
  DBSubnetGroupDescription: "DB Subnet Group utilizing multiple AZs",
  SubnetIds: [
    "subnet-0abcd1234efgh5674", // AZ1
    "subnet-0abcd1234efgh5675", // AZ2
    "subnet-0abcd1234efgh5676"  // AZ3
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```