---
title: VPCDHCPOptionsAssociation
description: Learn how to create, update, and manage AWS EC2 VPCDHCPOptionsAssociations using Alchemy Cloud Control.
---


The VPCDHCPOptionsAssociation resource allows you to associate DHCP options with your Amazon Virtual Private Cloud (VPC). For more details, refer to the [AWS EC2 VPCDHCPOptionsAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic VPCDHCPOptionsAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const dhcpOptionsAssociation = await AWS.EC2.VPCDHCPOptionsAssociation("defaultDhcpOptionsAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  DhcpOptionsId: "dopt-0abcd1234efgh5678",
  adopt: false // Default is false; this will fail if the resource already exists
});
```

## Advanced Configuration

This example shows how to create a VPCDHCPOptionsAssociation while adopting an existing resource.

```ts
const existingDhcpOptionsAssociation = await AWS.EC2.VPCDHCPOptionsAssociation("existingDhcpOptionsAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  DhcpOptionsId: "dopt-0abcd1234efgh5678",
  adopt: true // Set to true to adopt if the resource already exists
});
```

## Use Case: Updating DHCP Options

In this example, you can see how to update the DHCP options associated with a VPC by creating a new association.

```ts
const updatedDhcpOptionsAssociation = await AWS.EC2.VPCDHCPOptionsAssociation("updatedDhcpOptionsAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  DhcpOptionsId: "dopt-0ijkl9012mnop3456",
  adopt: false // This will create a new association
});
```
