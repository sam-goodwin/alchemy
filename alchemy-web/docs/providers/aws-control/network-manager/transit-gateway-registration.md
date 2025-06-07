---
title: Managing AWS NetworkManager TransitGatewayRegistrations with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayRegistrations using Alchemy Cloud Control.
---

# TransitGatewayRegistration

The TransitGatewayRegistration resource lets you manage [AWS NetworkManager TransitGatewayRegistrations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for connecting your Amazon VPCs and on-premises networks to a transit gateway.

## Minimal Example

This example demonstrates how to create a basic Transit Gateway Registration with required properties.

```ts
import AWS from "alchemy/aws/control";

const TransitGatewayRegistration = await AWS.NetworkManager.TransitGatewayRegistration("MyTransitGatewayRegistration", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  TransitGatewayArn: "arn:aws:ec2:us-east-1:123456789012:transit-gateway/tgw-0123456789abcdef0",
  adopt: true // Set to true to adopt existing resource if it exists
});
```

## Advanced Configuration

In this example, we show how to create a Transit Gateway Registration with additional properties for tracking creation and update times.

```ts
const AdvancedTransitGatewayRegistration = await AWS.NetworkManager.TransitGatewayRegistration("AdvancedTransitGatewayRegistration", {
  GlobalNetworkId: "gn-0abcdef1234567890",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway/tgw-0abcdef1234567890",
  adopt: false // Default is false, will fail if the resource already exists
});

// Accessing additional properties
console.log("ARN:", AdvancedTransitGatewayRegistration.Arn);
console.log("Creation Time:", AdvancedTransitGatewayRegistration.CreationTime);
console.log("Last Update Time:", AdvancedTransitGatewayRegistration.LastUpdateTime);
```

## Use Case: Registering Multiple Transit Gateways

This example illustrates how to register multiple Transit Gateways in a loop, which is useful for managing multiple network resources.

```ts
const transitGatewayArns = [
  "arn:aws:ec2:us-east-1:123456789012:transit-gateway/tgw-0123456789abcdef0",
  "arn:aws:ec2:us-east-1:123456789012:transit-gateway/tgw-0abcdef1234567890"
];

for (const transitGatewayArn of transitGatewayArns) {
  await AWS.NetworkManager.TransitGatewayRegistration(`TransitGatewayRegistration-${transitGatewayArn.split("/").pop()}`, {
    GlobalNetworkId: "gn-0123456789abcdef0",
    TransitGatewayArn: transitGatewayArn,
    adopt: true
  });
}
```