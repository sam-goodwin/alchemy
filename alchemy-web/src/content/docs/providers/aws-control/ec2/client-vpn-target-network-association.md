---
title: ClientVpnTargetNetworkAssociation
description: Learn how to create, update, and manage AWS EC2 ClientVpnTargetNetworkAssociations using Alchemy Cloud Control.
---


The ClientVpnTargetNetworkAssociation resource allows you to associate a subnet with an AWS Client VPN endpoint, enabling access to resources within that subnet. For more details, refer to the [AWS EC2 ClientVpnTargetNetworkAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Client VPN target network association with required properties.

```ts
import AWS from "alchemy/aws/control";

const vpnTargetNetworkAssociation = await AWS.EC2.ClientVpnTargetNetworkAssociation("vpnAssociation", {
  ClientVpnEndpointId: "cvpn-endpoint-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef0"
});
```

## Advanced Configuration

Configure a target network association with an optional property to adopt an existing resource.

```ts
const existingVpnTargetNetworkAssociation = await AWS.EC2.ClientVpnTargetNetworkAssociation("existingVpnAssociation", {
  ClientVpnEndpointId: "cvpn-endpoint-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef0",
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Multiple Associations

Create multiple associations for different subnets to expand the Client VPN access.

```ts
const firstAssociation = await AWS.EC2.ClientVpnTargetNetworkAssociation("firstAssociation", {
  ClientVpnEndpointId: "cvpn-endpoint-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef1"
});

const secondAssociation = await AWS.EC2.ClientVpnTargetNetworkAssociation("secondAssociation", {
  ClientVpnEndpointId: "cvpn-endpoint-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef2"
});
```

## Example with Logging

Set up a target network association and include logging for monitoring purposes.

```ts
const monitoredVpnTargetNetworkAssociation = await AWS.EC2.ClientVpnTargetNetworkAssociation("monitoredVpnAssociation", {
  ClientVpnEndpointId: "cvpn-endpoint-0123456789abcdef0",
  SubnetId: "subnet-0123456789abcdef0",
  adopt: false // Do not adopt existing resource
});

// Assume logging setup is handled elsewhere
console.log(`Created VPN Target Network Association with ID: ${monitoredVpnTargetNetworkAssociation.id}`);
```
