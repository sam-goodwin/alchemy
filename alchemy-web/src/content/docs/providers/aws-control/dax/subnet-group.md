---
title: SubnetGroup
description: Learn how to create, update, and manage AWS DAX SubnetGroups using Alchemy Cloud Control.
---


The SubnetGroup resource allows you to manage [AWS DAX SubnetGroups](https://docs.aws.amazon.com/dax/latest/userguide/) for your Amazon DynamoDB Accelerator (DAX) clusters. A subnet group is a collection of subnets that you can use to define a DAX cluster's network configuration.

## Minimal Example

Create a basic SubnetGroup with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicSubnetGroup = await AWS.DAX.SubnetGroup("myBasicSubnetGroup", {
  SubnetIds: ["subnet-0a1b2c3d", "subnet-1a2b3c4d"],
  Description: "Basic subnet group for my DAX cluster"
});
```

## Advanced Configuration

Define a SubnetGroup with a specific name and multiple subnets.

```ts
const advancedSubnetGroup = await AWS.DAX.SubnetGroup("myAdvancedSubnetGroup", {
  SubnetIds: ["subnet-0a1b2c3d", "subnet-1a2b3c4d", "subnet-2a3b4c5d"],
  SubnetGroupName: "my-advanced-subnet-group",
  Description: "Advanced subnet group for my DAX cluster with multiple subnets"
});
```

## Adoption of Existing Resource

Create a SubnetGroup that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptedSubnetGroup = await AWS.DAX.SubnetGroup("myAdoptedSubnetGroup", {
  SubnetIds: ["subnet-0a1b2c3d", "subnet-1a2b3c4d"],
  Description: "Adopting an existing subnet group",
  adopt: true
});
```

## Multiple Subnet Use Case

Create a SubnetGroup specifically for a multi-AZ DAX cluster setup.

```ts
const multiAzSubnetGroup = await AWS.DAX.SubnetGroup("myMultiAZSubnetGroup", {
  SubnetIds: [
    "subnet-0a1b2c3d",
    "subnet-1a2b3c4d",
    "subnet-2a3b4c5d",
    "subnet-3b4c5d6e"
  ],
  SubnetGroupName: "multi-az-subnet-group",
  Description: "Subnet group for a multi-AZ DAX cluster"
});
```
