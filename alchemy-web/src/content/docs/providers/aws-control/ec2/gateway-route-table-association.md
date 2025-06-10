---
title: GatewayRouteTableAssociation
description: Learn how to create, update, and manage AWS EC2 GatewayRouteTableAssociations using Alchemy Cloud Control.
---


The GatewayRouteTableAssociation resource allows you to associate a gateway with a route table in your AWS EC2 environment, enabling traffic routing configurations. For more details, refer to the [AWS EC2 GatewayRouteTableAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic GatewayRouteTableAssociation by specifying the required properties.

```ts
import AWS from "alchemy/aws/control";

const routeTableAssociation = await AWS.EC2.GatewayRouteTableAssociation("myRouteTableAssociation", {
  RouteTableId: "rtb-12345678",
  GatewayId: "igw-12345678",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure an association with additional properties such as adoption of existing resources.

```ts
const advancedRouteTableAssociation = await AWS.EC2.GatewayRouteTableAssociation("advancedRouteTableAssociation", {
  RouteTableId: "rtb-87654321",
  GatewayId: "igw-87654321",
  adopt: true // Optional: Allows for adopting existing resources without failure
});
```

## Example of Multiple Associations

Create multiple GatewayRouteTableAssociations for different gateways.

```ts
const association1 = await AWS.EC2.GatewayRouteTableAssociation("association1", {
  RouteTableId: "rtb-11111111",
  GatewayId: "igw-11111111"
});

const association2 = await AWS.EC2.GatewayRouteTableAssociation("association2", {
  RouteTableId: "rtb-22222222",
  GatewayId: "igw-22222222"
});
```

## Example with Error Handling

Demonstrate how to handle the potential existence of a resource during creation.

```ts
try {
  const routeTableAssociation = await AWS.EC2.GatewayRouteTableAssociation("safeAssociation", {
    RouteTableId: "rtb-33333333",
    GatewayId: "igw-33333333",
    adopt: true
  });
} catch (error) {
  console.error("Error creating GatewayRouteTableAssociation:", error);
}
```
