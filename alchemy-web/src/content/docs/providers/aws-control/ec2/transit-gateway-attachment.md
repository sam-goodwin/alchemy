---
title: TransitGatewayAttachment
description: Learn how to create, update, and manage AWS EC2 TransitGatewayAttachments using Alchemy Cloud Control.
---


The TransitGatewayAttachment resource lets you manage [AWS EC2 Transit Gateway Attachments](https://docs.aws.amazon.com/ec2/latest/userguide/) for connecting VPCs and on-premises networks to a transit gateway.

## Minimal Example

Create a basic Transit Gateway Attachment with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayAttachment = await AWS.EC2.TransitGatewayAttachment("myTransitGatewayAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-1abcd1234efgh5678"],
  Tags: [
    {
      Key: "Name",
      Value: "MyTransitGatewayAttachment"
    }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway Attachment with specific options for routing.

```ts
const advancedTransitGatewayAttachment = await AWS.EC2.TransitGatewayAttachment("advancedTransitGatewayAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-1abcd1234efgh5678"],
  Options: {
    ApplianceMode: "enable",
    DnsSupport: "enable",
    IPv6Support: "disable"
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing Transit Gateway Attachment instead of failing if it already exists.

```ts
const adoptTransitGatewayAttachment = await AWS.EC2.TransitGatewayAttachment("adoptExistingTransitGatewayAttachment", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  adopt: true
});
```
