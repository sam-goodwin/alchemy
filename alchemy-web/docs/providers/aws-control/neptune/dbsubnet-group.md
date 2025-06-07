---
title: Managing AWS Neptune DBSubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS Neptune DBSubnetGroups using Alchemy Cloud Control.
---

# DBSubnetGroup

The DBSubnetGroup resource allows you to manage [AWS Neptune DBSubnetGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) which define a set of subnets in your Virtual Private Cloud (VPC) for your Neptune database.

## Minimal Example

Create a basic DBSubnetGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const dbSubnetGroup = await AWS.Neptune.DBSubnetGroup("MyDBSubnetGroup", {
  DBSubnetGroupDescription: "My Neptune DB Subnet Group for the production environment",
  SubnetIds: [
    "subnet-0123456789abcdef0",
    "subnet-abcdef0123456789"
  ],
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Define a DBSubnetGroup with a specific name and multiple tags for better organization.

```ts
const advancedDbSubnetGroup = await AWS.Neptune.DBSubnetGroup("AdvancedDBSubnetGroup", {
  DBSubnetGroupName: "AdvancedNeptuneGroup",
  DBSubnetGroupDescription: "Advanced Neptune DB Subnet Group for testing",
  SubnetIds: [
    "subnet-0fedcba9876543210",
    "subnet-1234567890abcdef"
  ],
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing DBSubnetGroup instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptedDbSubnetGroup = await AWS.Neptune.DBSubnetGroup("AdoptedDBSubnetGroup", {
  DBSubnetGroupDescription: "Adopting an existing DBSubnetGroup",
  SubnetIds: [
    "subnet-0123456789abcdef0",
    "subnet-abcdef0123456789"
  ],
  adopt: true
});
```