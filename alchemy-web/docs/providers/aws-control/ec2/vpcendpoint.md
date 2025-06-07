---
title: Managing AWS EC2 VPCEndpoints with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCEndpoints using Alchemy Cloud Control.
---

# VPCEndpoint

The VPCEndpoint resource lets you create and manage [AWS EC2 VPCEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpcendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcendpoint = await AWS.EC2.VPCEndpoint("vpcendpoint-example", {
  VpcId: "example-vpcid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpcendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVPCEndpoint = await AWS.EC2.VPCEndpoint("advanced-vpcendpoint", {
  VpcId: "example-vpcid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

