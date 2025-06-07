---
title: Managing AWS DAX SubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS DAX SubnetGroups using Alchemy Cloud Control.
---

# SubnetGroup

The SubnetGroup resource lets you manage [AWS DAX SubnetGroups](https://docs.aws.amazon.com/dax/latest/userguide/) for your DynamoDB Accelerator (DAX) clusters. Subnet groups are collections of subnets that you can designate for your DAX clusters.

## Minimal Example

Create a basic DAX SubnetGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSubnetGroup = await AWS.DAX.SubnetGroup("BasicSubnetGroup", {
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef123456789"],
  Description: "Basic subnet group for DAX cluster"
});
```

## Advanced Configuration

Configure a DAX SubnetGroup with a specific name and multiple subnets.

```ts
const advancedSubnetGroup = await AWS.DAX.SubnetGroup("AdvancedSubnetGroup", {
  SubnetIds: ["subnet-0abcdef123456789", "subnet-0123456789abcdef0", "subnet-0abcdef0987654321"],
  SubnetGroupName: "MyDAXSubnetGroup",
  Description: "Advanced subnet group for DAX with multiple subnets"
});
```

## Using Existing Resources

Adopt an existing DAX SubnetGroup instead of failing if it already exists.

```ts
const existingSubnetGroup = await AWS.DAX.SubnetGroup("ExistingSubnetGroup", {
  SubnetIds: ["subnet-0abcdef123456789"],
  SubnetGroupName: "ExistingDAXSubnetGroup",
  adopt: true
});
```