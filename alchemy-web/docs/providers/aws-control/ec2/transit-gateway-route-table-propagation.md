---
title: Managing AWS EC2 TransitGatewayRouteTablePropagations with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTablePropagations using Alchemy Cloud Control.
---

# TransitGatewayRouteTablePropagation

The TransitGatewayRouteTablePropagation resource lets you create and manage [AWS EC2 TransitGatewayRouteTablePropagations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayroutetablepropagation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayroutetablepropagation = await AWS.EC2.TransitGatewayRouteTablePropagation(
  "transitgatewayroutetablepropagation-example",
  {
    TransitGatewayRouteTableId: "example-transitgatewayroutetableid",
    TransitGatewayAttachmentId: "example-transitgatewayattachmentid",
  }
);
```

