---
title: TransitGatewayRouteTablePropagation
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTablePropagations using Alchemy Cloud Control.
---


The TransitGatewayRouteTablePropagation resource allows you to manage the propagation of routes between transit gateway route tables and attachments in Amazon EC2. This resource is crucial for enabling communication between different VPCs and on-premises networks. For more information, refer to the [AWS EC2 TransitGatewayRouteTablePropagations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic transit gateway route table propagation with required properties.

```ts
import AWS from "alchemy/aws/control";

const routeTablePropagation = await AWS.EC2.TransitGatewayRouteTablePropagation("routeTablePropagation1", {
  TransitGatewayRouteTableId: "tgw-rtb-abc12345",
  TransitGatewayAttachmentId: "tgw-attach-abc12345",
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a transit gateway route table propagation with additional options.

```ts
const advancedRouteTablePropagation = await AWS.EC2.TransitGatewayRouteTablePropagation("advancedRouteTablePropagation", {
  TransitGatewayRouteTableId: "tgw-rtb-def67890",
  TransitGatewayAttachmentId: "tgw-attach-def67890",
  adopt: false // Optional: do not adopt if the resource already exists
});
```

## Use Case: Propagating Routes from a VPC Attachment

This example demonstrates how to set up route propagation for a transit gateway that connects to a specific VPC.

```ts
const vpcRouteTablePropagation = await AWS.EC2.TransitGatewayRouteTablePropagation("vpcRouteTablePropagation", {
  TransitGatewayRouteTableId: "tgw-rtb-ghi11223",
  TransitGatewayAttachmentId: "tgw-attach-ghi11223",
  adopt: true // Allows for seamless integration if the resource exists
});
```

## Use Case: Propagating Routes from a VPN Attachment

This example shows how to propagate routes from a VPN attachment to a transit gateway route table.

```ts
const vpnRouteTablePropagation = await AWS.EC2.TransitGatewayRouteTablePropagation("vpnRouteTablePropagation", {
  TransitGatewayRouteTableId: "tgw-rtb-jkl44556",
  TransitGatewayAttachmentId: "tgw-attach-jkl44556",
  adopt: false // Ensures that the existing resource is not adopted
});
```
