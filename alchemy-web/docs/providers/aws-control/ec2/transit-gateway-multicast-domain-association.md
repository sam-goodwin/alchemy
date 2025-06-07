---
title: Managing AWS EC2 TransitGatewayMulticastDomainAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastDomainAssociations using Alchemy Cloud Control.
---

# TransitGatewayMulticastDomainAssociation

The `TransitGatewayMulticastDomainAssociation` resource allows you to associate an Amazon EC2 Transit Gateway multicast domain with a subnet in your VPC. This is essential for enabling multicast traffic over a transit gateway. For more information, refer to the [AWS EC2 TransitGatewayMulticastDomainAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic TransitGatewayMulticastDomainAssociation with the required properties.

```ts
import AWS from "alchemy/aws/control";

const MulticastAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("BasicMulticastAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-12345678",
  SubnetId: "subnet-0abcd1234efgh5678",
  TransitGatewayAttachmentId: "tgw-attach-abcdef1234567890"
});
```

## Advanced Configuration

Configure an association with additional options, including the adoption of an existing resource.

```ts
const AdvancedMulticastAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("AdvancedMulticastAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-87654321",
  SubnetId: "subnet-0ijkl9012mnop3456",
  TransitGatewayAttachmentId: "tgw-attach-ghijklmnopqrstuv",
  adopt: true // Adopt existing resource if it already exists
});
```

## Associating Multiple Subnets

Create multiple associations for different subnets within the same multicast domain.

```ts
const FirstMulticastAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("FirstMulticastAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-abcdef12",
  SubnetId: "subnet-0abcd1111efgh2222",
  TransitGatewayAttachmentId: "tgw-attach-zyxwvutsrqponmlk"
});

const SecondMulticastAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("SecondMulticastAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-abcdef12",
  SubnetId: "subnet-0abcd3333efgh4444",
  TransitGatewayAttachmentId: "tgw-attach-zyxwvutsrqponmlk",
  adopt: true
});
```