---
title: Managing AWS EC2 TransitGatewayVpcAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayVpcAttachments using Alchemy Cloud Control.
---

# TransitGatewayVpcAttachment

The TransitGatewayVpcAttachment resource lets you create and manage [AWS EC2 TransitGatewayVpcAttachments](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayvpcattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayvpcattachment = await AWS.EC2.TransitGatewayVpcAttachment(
  "transitgatewayvpcattachment-example",
  {
    TransitGatewayId: "example-transitgatewayid",
    VpcId: "example-vpcid",
    SubnetIds: ["example-subnetids-1"],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a transitgatewayvpcattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTransitGatewayVpcAttachment = await AWS.EC2.TransitGatewayVpcAttachment(
  "advanced-transitgatewayvpcattachment",
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

