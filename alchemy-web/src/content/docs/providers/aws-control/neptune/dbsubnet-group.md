---
title: DBSubnetGroup
description: Learn how to create, update, and manage AWS Neptune DBSubnetGroups using Alchemy Cloud Control.
---


The DBSubnetGroup resource allows you to create and manage [AWS Neptune DBSubnetGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) for your database instances. A DBSubnetGroup is a collection of subnets that you can use to designate where your Neptune database can be deployed within your Amazon VPC.

## Minimal Example

Create a basic DBSubnetGroup with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const dbSubnetGroup = await AWS.Neptune.DBSubnetGroup("myDbSubnetGroup", {
  DBSubnetGroupDescription: "My DB Subnet Group for Neptune",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ]
});
```

## Advanced Configuration

Configure a DBSubnetGroup with an optional name and tags for better organization.

```ts
const advancedDbSubnetGroup = await AWS.Neptune.DBSubnetGroup("advancedDbSubnetGroup", {
  DBSubnetGroupName: "MyAdvancedDBSubnetGroup",
  DBSubnetGroupDescription: "Advanced DB Subnet Group for Neptune",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "DataScience" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing DBSubnetGroup instead of failing when the resource already exists, you can set the `adopt` property.

```ts
const existingDbSubnetGroup = await AWS.Neptune.DBSubnetGroup("existingDbSubnetGroup", {
  DBSubnetGroupDescription: "Existing DB Subnet Group",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ],
  adopt: true
});
```
