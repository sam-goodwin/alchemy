---
title: Managing AWS EC2 GatewayRouteTableAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 GatewayRouteTableAssociations using Alchemy Cloud Control.
---

# GatewayRouteTableAssociation

The GatewayRouteTableAssociation resource lets you create and manage [AWS EC2 GatewayRouteTableAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-gatewayroutetableassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gatewayroutetableassociation = await AWS.EC2.GatewayRouteTableAssociation(
  "gatewayroutetableassociation-example",
  { RouteTableId: "example-routetableid", GatewayId: "example-gatewayid" }
);
```

