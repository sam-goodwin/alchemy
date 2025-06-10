---
title: TransitGatewayConnect
description: Learn how to create, update, and manage AWS EC2 TransitGatewayConnects using Alchemy Cloud Control.
---


The TransitGatewayConnect resource allows you to create and manage AWS EC2 Transit Gateway Connect attachments, facilitating seamless connectivity between your Virtual Private Clouds (VPCs) and on-premises networks. For more information, refer to the [AWS EC2 TransitGatewayConnects documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway Connect attachment with required properties.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayConnect = await AWS.EC2.TransitGatewayConnect("myTransitGatewayConnect", {
  Options: {
    // Define options for the Transit Gateway Connect
    ApplianceMode: "enable",
    Protocol: "gre"
  },
  TransportTransitGatewayAttachmentId: "tgw-attach-0abc12345def67890", // Example attachment ID
});
```

## Advanced Configuration

Configure a Transit Gateway Connect attachment with additional tags for better resource management.

```ts
const taggedTransitGatewayConnect = await AWS.EC2.TransitGatewayConnect("taggedTransitGatewayConnect", {
  Options: {
    ApplianceMode: "enable",
    Protocol: "gre"
  },
  TransportTransitGatewayAttachmentId: "tgw-attach-0abc12345def67890",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkOptimization" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing Transit Gateway Connect attachment instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptedTransitGatewayConnect = await AWS.EC2.TransitGatewayConnect("adoptedTransitGatewayConnect", {
  Options: {
    ApplianceMode: "enable",
    Protocol: "gre"
  },
  TransportTransitGatewayAttachmentId: "tgw-attach-0abc12345def67890",
  adopt: true // Adopt existing resource if it exists
});
```

## Using with Multiple Attachments

Create multiple Transit Gateway Connect attachments for different transit gateway attachments.

```ts
const firstTransitGatewayConnect = await AWS.EC2.TransitGatewayConnect("firstTransitGatewayConnect", {
  Options: {
    ApplianceMode: "enable",
    Protocol: "gre"
  },
  TransportTransitGatewayAttachmentId: "tgw-attach-0abc12345def67890"
});

const secondTransitGatewayConnect = await AWS.EC2.TransitGatewayConnect("secondTransitGatewayConnect", {
  Options: {
    ApplianceMode: "enable",
    Protocol: "gre"
  },
  TransportTransitGatewayAttachmentId: "tgw-attach-0def12345abc67890"
});
```
