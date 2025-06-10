---
title: TransitGatewayMulticastDomainAssociation
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastDomainAssociations using Alchemy Cloud Control.
---


The TransitGatewayMulticastDomainAssociation resource allows you to manage associations between a transit gateway multicast domain and a subnet. This enables multicast traffic routing within your AWS environment. For more details, refer to the [AWS EC2 TransitGatewayMulticastDomainAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway Multicast Domain Association with required properties.

```ts
import AWS from "alchemy/aws/control";

const multicastDomainAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("basicAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-12345678",
  SubnetId: "subnet-abcde123",
  TransitGatewayAttachmentId: "tgw-attach-87654321"
});
```

## Advanced Configuration

Configure an association with the option to adopt an existing resource if it already exists.

```ts
const advancedMulticastDomainAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("advancedAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-12345678",
  SubnetId: "subnet-abcde123",
  TransitGatewayAttachmentId: "tgw-attach-87654321",
  adopt: true // Allows adoption of the resource if it exists
});
```

## Additional Use Case: Updating an Association

Update an existing Transit Gateway Multicast Domain Association properties.

```ts
const updatedMulticastDomainAssociation = await AWS.EC2.TransitGatewayMulticastDomainAssociation("updateAssociation", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-12345678",
  SubnetId: "subnet-abcde123",
  TransitGatewayAttachmentId: "tgw-attach-87654321",
  adopt: true
});
```

This example demonstrates how to update the association while allowing for the adoption of an existing resource.
