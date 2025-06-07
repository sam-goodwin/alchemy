---
title: Managing AWS EC2 TransitGatewayMulticastGroupSources with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastGroupSources using Alchemy Cloud Control.
---

# TransitGatewayMulticastGroupSource

The TransitGatewayMulticastGroupSource resource lets you create and manage [AWS EC2 TransitGatewayMulticastGroupSources](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewaymulticastgroupsource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewaymulticastgroupsource = await AWS.EC2.TransitGatewayMulticastGroupSource(
  "transitgatewaymulticastgroupsource-example",
  {
    TransitGatewayMulticastDomainId: "example-transitgatewaymulticastdomainid",
    NetworkInterfaceId: "example-networkinterfaceid",
    GroupIpAddress: "example-groupipaddress",
  }
);
```

