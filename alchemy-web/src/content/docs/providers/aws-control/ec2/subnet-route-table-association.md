---
title: SubnetRouteTableAssociation
description: Learn how to create, update, and manage AWS EC2 SubnetRouteTableAssociations using Alchemy Cloud Control.
---


The SubnetRouteTableAssociation resource allows you to associate a subnet with a specific route table in AWS EC2, enabling routing for the subnet's network traffic. For more details, refer to the [AWS EC2 SubnetRouteTableAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a simple subnet route table association with the required properties.

```ts
import AWS from "alchemy/aws/control";

const subnetRouteTableAssociation = await AWS.EC2.SubnetRouteTableAssociation("mySubnetAssociation", {
  RouteTableId: "rtb-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef0",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a subnet route table association with additional properties if necessary.

```ts
const advancedSubnetRouteTableAssociation = await AWS.EC2.SubnetRouteTableAssociation("advancedSubnetAssociation", {
  RouteTableId: "rtb-abcdef0123456789",
  SubnetId: "subnet-abcdef0123456789",
  adopt: false // Do not adopt existing resource
});
```

## Example with Multiple Associations

Create multiple subnet route table associations to manage various subnets within the same route table.

```ts
const firstSubnetAssociation = await AWS.EC2.SubnetRouteTableAssociation("firstSubnetAssociation", {
  RouteTableId: "rtb-abcdef0123456789",
  SubnetId: "subnet-abcdef0123456781"
});

const secondSubnetAssociation = await AWS.EC2.SubnetRouteTableAssociation("secondSubnetAssociation", {
  RouteTableId: "rtb-abcdef0123456789",
  SubnetId: "subnet-abcdef0123456782"
});
```

## Example with Error Handling

Create a subnet route table association with error handling for existing resources.

```ts
try {
  const subnetRouteTableAssociation = await AWS.EC2.SubnetRouteTableAssociation("errorHandledAssociation", {
    RouteTableId: "rtb-abcdef0123456789",
    SubnetId: "subnet-abcdef0123456783",
    adopt: true // Attempt to adopt existing resource
  });
} catch (error) {
  console.error("Error occurred while creating SubnetRouteTableAssociation:", error);
}
```
