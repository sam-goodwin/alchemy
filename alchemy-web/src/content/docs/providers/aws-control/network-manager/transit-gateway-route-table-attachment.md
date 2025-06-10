---
title: TransitGatewayRouteTableAttachment
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayRouteTableAttachments using Alchemy Cloud Control.
---


The TransitGatewayRouteTableAttachment resource allows you to manage [AWS NetworkManager TransitGatewayRouteTableAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) and their configurations. This resource enables the attachment of a transit gateway route table to a specified peering connection, allowing for efficient routing of traffic.

## Minimal Example

Create a basic TransitGatewayRouteTableAttachment with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayAttachment = await AWS.NetworkManager.TransitGatewayRouteTableAttachment("myTransitGatewayAttachment", {
  TransitGatewayRouteTableArn: "arn:aws:networkmanager:us-east-1:123456789012:transit-gateway-route-table/rtb-1a2b3c4d",
  PeeringId: "peering-1a2b3c4d",
  ProposedSegmentChange: {
    SegmentName: "newSegment"
  }
});
```

## Advanced Configuration

Configure a TransitGatewayRouteTableAttachment with additional optional properties for more control over network function group changes.

```ts
const advancedAttachment = await AWS.NetworkManager.TransitGatewayRouteTableAttachment("advancedTransitGatewayAttachment", {
  TransitGatewayRouteTableArn: "arn:aws:networkmanager:us-east-1:123456789012:transit-gateway-route-table/rtb-1a2b3c4d",
  PeeringId: "peering-1a2b3c4d",
  ProposedNetworkFunctionGroupChange: {
    NetworkFunctionGroupName: "myNetworkFunctionGroup"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkUpgrade" }
  ]
});
```

## Using Tags for Resource Management

Create a TransitGatewayRouteTableAttachment with specific tags for better resource management.

```ts
const taggedAttachment = await AWS.NetworkManager.TransitGatewayRouteTableAttachment("taggedTransitGatewayAttachment", {
  TransitGatewayRouteTableArn: "arn:aws:networkmanager:us-east-1:123456789012:transit-gateway-route-table/rtb-1a2b3c4d",
  PeeringId: "peering-1a2b3c4d",
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "Purpose", Value: "Connectivity" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing TransitGatewayRouteTableAttachment without failing if it already exists, use the `adopt` property.

```ts
const adoptExistingAttachment = await AWS.NetworkManager.TransitGatewayRouteTableAttachment("adoptExistingTransitGatewayAttachment", {
  TransitGatewayRouteTableArn: "arn:aws:networkmanager:us-east-1:123456789012:transit-gateway-route-table/rtb-1a2b3c4d",
  PeeringId: "peering-1a2b3c4d",
  adopt: true
});
```
