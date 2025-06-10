---
title: DBSubnetGroup
description: Learn how to create, update, and manage AWS DocDB DBSubnetGroups using Alchemy Cloud Control.
---


The DBSubnetGroup resource lets you manage [AWS DocumentDB DBSubnetGroups](https://docs.aws.amazon.com/docdb/latest/userguide/) to define a group of subnets for your DocumentDB clusters.

## Minimal Example

Create a basic DBSubnetGroup with a name, description, and a list of subnet IDs.

```ts
import AWS from "alchemy/aws/control";

const dbSubnetGroup = await AWS.DocDB.DBSubnetGroup("myDbSubnetGroup", {
  DBSubnetGroupName: "my-db-subnet-group",
  DBSubnetGroupDescription: "A subnet group for my DocumentDB cluster",
  SubnetIds: [
    "subnet-0123456789abcdef0",
    "subnet-0abcdef0123456789"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Advanced Configuration

Configure a DBSubnetGroup with additional parameters for resource adoption.

```ts
const advancedDbSubnetGroup = await AWS.DocDB.DBSubnetGroup("advancedDbSubnetGroup", {
  DBSubnetGroupName: "advanced-db-subnet-group",
  DBSubnetGroupDescription: "An advanced subnet group for my DocumentDB cluster",
  SubnetIds: [
    "subnet-abcdef0123456789",
    "subnet-0123456789abcdef"
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "AdvancedProject" }
  ],
  adopt: true // Adopt existing resource instead of failing
});
```

## Example with Existing Resources

Demonstrate how to use an existing DBSubnetGroup by adopting it into your configuration.

```ts
const existingDbSubnetGroup = await AWS.DocDB.DBSubnetGroup("existingDbSubnetGroup", {
  DBSubnetGroupName: "existing-db-subnet-group",
  DBSubnetGroupDescription: "Adopting an existing subnet group",
  SubnetIds: [
    "subnet-1234567890abcdef",
    "subnet-abcdef1234567890"
  ],
  adopt: true // Adopt the existing resource
});
```
