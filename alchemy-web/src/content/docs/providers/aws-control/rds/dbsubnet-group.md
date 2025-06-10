---
title: DBSubnetGroup
description: Learn how to create, update, and manage AWS RDS DBSubnetGroups using Alchemy Cloud Control.
---


The DBSubnetGroup resource allows you to manage [AWS RDS DBSubnetGroups](https://docs.aws.amazon.com/rds/latest/userguide/) and their configuration settings, making it essential for defining the subnets that your RDS instances can use.

## Minimal Example

This example demonstrates how to create a basic DBSubnetGroup with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const dbSubnetGroup = await AWS.RDS.DBSubnetGroup("myDbSubnetGroup", {
  DBSubnetGroupName: "my-db-subnet-group",
  DBSubnetGroupDescription: "A DB subnet group for my RDS instances",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ]
});
```

## Advanced Configuration

In this example, we add tags to the DBSubnetGroup for better resource management and tracking.

```ts
const advancedDbSubnetGroup = await AWS.RDS.DBSubnetGroup("advancedDbSubnetGroup", {
  DBSubnetGroupName: "advanced-db-subnet-group",
  DBSubnetGroupDescription: "An advanced DB subnet group with tags",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Adoption of Existing Resources

This example shows how to adopt an existing DBSubnetGroup if it already exists, preventing failure on creation.

```ts
const existingDbSubnetGroup = await AWS.RDS.DBSubnetGroup("existingDbSubnetGroup", {
  DBSubnetGroupName: "existing-db-subnet-group",
  DBSubnetGroupDescription: "Adopting an existing DB subnet group",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  adopt: true
});
```
