---
title: CustomerGatewayAssociation
description: Learn how to create, update, and manage AWS NetworkManager CustomerGatewayAssociations using Alchemy Cloud Control.
---


The CustomerGatewayAssociation resource allows you to manage [AWS NetworkManager Customer Gateway Associations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) within your AWS environment. This resource is essential for linking customer gateways with specific devices in your global network.

## Minimal Example

Create a basic Customer Gateway Association with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const customerGatewayAssociation = await AWS.NetworkManager.CustomerGatewayAssociation("myCustomerGatewayAssociation", {
  GlobalNetworkId: "gn-12345678",
  DeviceId: "device-123456",
  CustomerGatewayArn: "arn:aws:ec2:us-west-2:123456789012:customer-gateway:cgw-123456",
  LinkId: "link-123456" // Optional
});
```

## Advanced Configuration

Configure a Customer Gateway Association with the adopt flag to ensure it adopts an existing resource if present:

```ts
const advancedCustomerGatewayAssociation = await AWS.NetworkManager.CustomerGatewayAssociation("advancedCustomerGatewayAssociation", {
  GlobalNetworkId: "gn-87654321",
  DeviceId: "device-654321",
  CustomerGatewayArn: "arn:aws:ec2:us-west-2:123456789012:customer-gateway:cgw-654321",
  LinkId: "link-654321", // Optional
  adopt: true // Adopt existing resource if it exists
});
```

## Usage with Additional Attributes

Demonstrate how to access additional attributes like ARN and creation time after creating the resource:

```ts
const customerGatewayAssociation = await AWS.NetworkManager.CustomerGatewayAssociation("detailedCustomerGatewayAssociation", {
  GlobalNetworkId: "gn-11223344",
  DeviceId: "device-223344",
  CustomerGatewayArn: "arn:aws:ec2:us-west-2:123456789012:customer-gateway:cgw-223344"
});

// Access additional properties
console.log(`ARN: ${customerGatewayAssociation.Arn}`);
console.log(`Created At: ${customerGatewayAssociation.CreationTime}`);
```

## Integrating with Other AWS Resources

Show how to use the Customer Gateway Association in a context that involves other AWS resources, like a VPN connection:

```ts
import AWS from "alchemy/aws/control";

const customerGatewayAssociation = await AWS.NetworkManager.CustomerGatewayAssociation("vpnCustomerGatewayAssociation", {
  GlobalNetworkId: "gn-55667788",
  DeviceId: "device-778899",
  CustomerGatewayArn: "arn:aws:ec2:us-west-2:123456789012:customer-gateway:cgw-778899"
});

// Now you can use this association to create a VPN connection or other related resources
const vpnConnection = await AWS.NetworkManager.VpnConnection("myVpnConnection", {
  CustomerGatewayId: customerGatewayAssociation.CustomerGatewayArn,
  VpnGatewayId: "vgw-12345678",
  Type: "ipsec.1"
});
```
