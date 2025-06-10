---
title: LocalGatewayRouteTableVPCAssociation
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTableVPCAssociations using Alchemy Cloud Control.
---


The LocalGatewayRouteTableVPCAssociation resource allows you to associate a VPC with a local gateway route table in AWS EC2. This association enables routing of traffic from the VPC to the local gateway. For more detailed information, refer to the [AWS EC2 LocalGatewayRouteTableVPCAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic LocalGatewayRouteTableVPCAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const localGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("basicAssociation", {
  VpcId: "vpc-12345678", // Replace with your actual VPC ID
  LocalGatewayRouteTableId: "lgw-rtb-87654321", // Replace with your actual local gateway route table ID
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Advanced Configuration

In this example, we demonstrate how to adopt an existing resource instead of failing if the resource already exists.

```ts
const existingAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("existingAssociation", {
  VpcId: "vpc-12345678", // Replace with your actual VPC ID
  LocalGatewayRouteTableId: "lgw-rtb-87654321", // Replace with your actual local gateway route table ID
  adopt: true, // Adopt existing resource
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Use Case Example: Routing from a VPC to Local Gateway

This example shows how to set up a LocalGatewayRouteTableVPCAssociation for routing traffic from a specific VPC to a local gateway route table.

```ts
const routingAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("routingAssociation", {
  VpcId: "vpc-abcdef12", // Replace with your actual VPC ID
  LocalGatewayRouteTableId: "lgw-rtb-fedcba21", // Replace with your actual local gateway route table ID
  Tags: [
    { Key: "Purpose", Value: "Data Transfer" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```
