---
title: Managing AWS EC2 TransitGatewayMulticastGroupMembers with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastGroupMembers using Alchemy Cloud Control.
---

# TransitGatewayMulticastGroupMember

The TransitGatewayMulticastGroupMember resource lets you create and manage [AWS EC2 TransitGatewayMulticastGroupMembers](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewaymulticastgroupmember.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewaymulticastgroupmember = await AWS.EC2.TransitGatewayMulticastGroupMember(
  "transitgatewaymulticastgroupmember-example",
  {
    TransitGatewayMulticastDomainId: "example-transitgatewaymulticastdomainid",
    NetworkInterfaceId: "example-networkinterfaceid",
    GroupIpAddress: "example-groupipaddress",
  }
);
```

