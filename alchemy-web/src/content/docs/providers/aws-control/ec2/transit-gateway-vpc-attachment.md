---
title: TransitGatewayVpcAttachment
description: Learn how to create, update, and manage AWS EC2 TransitGatewayVpcAttachments using Alchemy Cloud Control.
---


The TransitGatewayVpcAttachment resource allows you to manage VPC attachments to an AWS Transit Gateway. This resource facilitates the connection of multiple VPCs to a single transit gateway, enabling easier network management and routing. For more details, refer to the [AWS EC2 TransitGatewayVpcAttachments documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway VPC attachment with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayVpcAttachment = await AWS.EC2.TransitGatewayVpcAttachment("myVpcAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-12345678",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  Tags: [
    {
      Key: "Name",
      Value: "My VPC Attachment"
    }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway VPC attachment with additional subnets and specific options.

```ts
const advancedTransitGatewayVpcAttachment = await AWS.EC2.TransitGatewayVpcAttachment("advancedVpcAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-12345678",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  AddSubnetIds: [
    "subnet-13572468"
  ],
  RemoveSubnetIds: [
    "subnet-87654321"
  ],
  Options: {
    ApplianceMode: "enable"
  }
});
```

## Example with Adoption

If a Transit Gateway VPC attachment already exists, you can adopt it instead of failing.

```ts
const adoptedTransitGatewayVpcAttachment = await AWS.EC2.TransitGatewayVpcAttachment("adoptedVpcAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-12345678",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  adopt: true
});
```

## Example with Multiple Tags

Create a Transit Gateway VPC attachment with multiple tags for better organization and management.

```ts
const taggedTransitGatewayVpcAttachment = await AWS.EC2.TransitGatewayVpcAttachment("taggedVpcAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-12345678",
  SubnetIds: [
    "subnet-12345678",
    "subnet-87654321"
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "Project X"
    }
  ]
});
```
