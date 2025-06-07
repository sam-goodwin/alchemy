---
title: Managing AWS EC2 VPNConnections with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPNConnections using Alchemy Cloud Control.
---

# VPNConnection

The VPNConnection resource lets you create and manage [AWS EC2 VPNConnections](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpnconnection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpnconnection = await AWS.EC2.VPNConnection("vpnconnection-example", {
  CustomerGatewayId: "example-customergatewayid",
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpnconnection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVPNConnection = await AWS.EC2.VPNConnection("advanced-vpnconnection", {
  CustomerGatewayId: "example-customergatewayid",
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

