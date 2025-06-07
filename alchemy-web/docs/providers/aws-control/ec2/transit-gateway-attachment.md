---
title: Managing AWS EC2 TransitGatewayAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayAttachments using Alchemy Cloud Control.
---

# TransitGatewayAttachment

The TransitGatewayAttachment resource lets you create and manage [AWS EC2 TransitGatewayAttachments](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayattachment = await AWS.EC2.TransitGatewayAttachment(
  "transitgatewayattachment-example",
  {
    TransitGatewayId: "example-transitgatewayid",
    VpcId: "example-vpcid",
    SubnetIds: ["example-subnetids-1"],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a transitgatewayattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTransitGatewayAttachment = await AWS.EC2.TransitGatewayAttachment(
  "advanced-transitgatewayattachment",
  {
    TransitGatewayId: "example-transitgatewayid",
    VpcId: "example-vpcid",
    SubnetIds: ["example-subnetids-1"],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

