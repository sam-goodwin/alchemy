---
title: Managing AWS EC2 TransitGatewayRouteTableAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTableAssociations using Alchemy Cloud Control.
---

# TransitGatewayRouteTableAssociation

The TransitGatewayRouteTableAssociation resource lets you create and manage [AWS EC2 TransitGatewayRouteTableAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayroutetableassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayroutetableassociation = await AWS.EC2.TransitGatewayRouteTableAssociation(
  "transitgatewayroutetableassociation-example",
  {
    TransitGatewayRouteTableId: "example-transitgatewayroutetableid",
    TransitGatewayAttachmentId: "example-transitgatewayattachmentid",
  }
);
```

