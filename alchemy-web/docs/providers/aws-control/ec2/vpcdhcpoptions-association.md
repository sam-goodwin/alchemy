---
title: Managing AWS EC2 VPCDHCPOptionsAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCDHCPOptionsAssociations using Alchemy Cloud Control.
---

# VPCDHCPOptionsAssociation

The VPCDHCPOptionsAssociation resource lets you create and manage [AWS EC2 VPCDHCPOptionsAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpcdhcpoptionsassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcdhcpoptionsassociation = await AWS.EC2.VPCDHCPOptionsAssociation(
  "vpcdhcpoptionsassociation-example",
  { VpcId: "example-vpcid", DhcpOptionsId: "example-dhcpoptionsid" }
);
```

