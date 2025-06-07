---
title: Managing AWS NetworkManager VpcAttachments with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager VpcAttachments using Alchemy Cloud Control.
---

# VpcAttachment

The VpcAttachment resource lets you create and manage [AWS NetworkManager VpcAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-vpcattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcattachment = await AWS.NetworkManager.VpcAttachment("vpcattachment-example", {
  SubnetArns: ["example-subnetarns-1"],
  CoreNetworkId: "example-corenetworkid",
  VpcArn: "example-vpcarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpcattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVpcAttachment = await AWS.NetworkManager.VpcAttachment("advanced-vpcattachment", {
  SubnetArns: ["example-subnetarns-1"],
  CoreNetworkId: "example-corenetworkid",
  VpcArn: "example-vpcarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

