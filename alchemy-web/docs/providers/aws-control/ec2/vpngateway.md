---
title: Managing AWS EC2 VPNGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPNGateways using Alchemy Cloud Control.
---

# VPNGateway

The VPNGateway resource lets you create and manage [AWS EC2 VPNGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpngateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpngateway = await AWS.EC2.VPNGateway("vpngateway-example", {
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpngateway with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVPNGateway = await AWS.EC2.VPNGateway("advanced-vpngateway", {
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

