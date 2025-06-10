---
title: TransitGatewayRouteTableAssociation
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTableAssociations using Alchemy Cloud Control.
---


The TransitGatewayRouteTableAssociation resource allows you to associate a transit gateway route table with a specified transit gateway attachment in AWS. This association is essential for routing network traffic through the transit gateway. More information can be found in the [AWS EC2 TransitGatewayRouteTableAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway Route Table Association with required properties.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayAssociation = await AWS.EC2.TransitGatewayRouteTableAssociation("tgRouteTableAssociation", {
  TransitGatewayRouteTableId: "tgw-rtb-0123456789abcdef0",
  TransitGatewayAttachmentId: "tgw-attach-0123456789abcdef0"
});
```

## Advanced Configuration

Configure a Transit Gateway Route Table Association with the optional `adopt` property to enable adopting existing resources.

```ts
const transitGatewayAssociationWithAdopt = await AWS.EC2.TransitGatewayRouteTableAssociation("tgRouteTableAssociationWithAdopt", {
  TransitGatewayRouteTableId: "tgw-rtb-0123456789abcdef0",
  TransitGatewayAttachmentId: "tgw-attach-0123456789abcdef0",
  adopt: true // Enable adopting existing resource if it already exists
});
```

## Detailing the Resource

Here’s how to create a Transit Gateway Route Table Association while checking for the existence of the resource before attempting to create it.

```ts
const conditionalTransitGatewayAssociation = await AWS.EC2.TransitGatewayRouteTableAssociation("conditionalTgAssociation", {
  TransitGatewayRouteTableId: "tgw-rtb-0123456789abcdef0",
  TransitGatewayAttachmentId: "tgw-attach-0123456789abcdef0",
  adopt: true // Adopt if it already exists
});
```

## Leveraging the Resource ARN

When creating the Transit Gateway Route Table Association, you can access the ARN of the resource after creation.

```ts
const transitGatewayAssociationWithArn = await AWS.EC2.TransitGatewayRouteTableAssociation("tgAssociationWithArn", {
  TransitGatewayRouteTableId: "tgw-rtb-0123456789abcdef0",
  TransitGatewayAttachmentId: "tgw-attach-0123456789abcdef0"
});

// Access the ARN of the created resource
console.log(`Created Transit Gateway Route Table Association ARN: ${transitGatewayAssociationWithArn.Arn}`);
```
