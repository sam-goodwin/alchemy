---
title: TransitGatewayRegistration
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayRegistrations using Alchemy Cloud Control.
---


The TransitGatewayRegistration resource allows you to manage [AWS NetworkManager TransitGatewayRegistrations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for integrating AWS Transit Gateways into your global network.

## Minimal Example

Create a basic Transit Gateway registration with the required properties:

```ts
import AWS from "alchemy/aws/control";

const transitGatewayRegistration = await AWS.NetworkManager.TransitGatewayRegistration("myTransitGatewayRegistration", {
  GlobalNetworkId: "gn-12345678",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway:tgw-0abcde1234567890",
});
```

## Advanced Configuration

Adopt an existing Transit Gateway registration if it already exists by setting the `adopt` property to true:

```ts
const existingTransitGatewayRegistration = await AWS.NetworkManager.TransitGatewayRegistration("existingTransitGatewayRegistration", {
  GlobalNetworkId: "gn-87654321",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway:tgw-0fedcba0987654321",
  adopt: true,
});
```

## Updating Transit Gateway Registration

Update an existing Transit Gateway registration by modifying the properties:

```ts
const updatedTransitGatewayRegistration = await AWS.NetworkManager.TransitGatewayRegistration("updatedTransitGatewayRegistration", {
  GlobalNetworkId: "gn-12345678",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway:tgw-0abcde1234567890",
  adopt: false, // This will ensure it does not adopt an existing resource
});
```

## Handling Creation Time and Last Update Time

Retrieve the ARN, creation time, and last update time of the Transit Gateway registration:

```ts
const transitGatewayDetails = await AWS.NetworkManager.TransitGatewayRegistration("transitGatewayDetails", {
  GlobalNetworkId: "gn-12345678",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway:tgw-0abcde1234567890",
});

// Access additional properties
const transitGatewayArn = transitGatewayDetails.Arn;
const creationTime = transitGatewayDetails.CreationTime;
const lastUpdateTime = transitGatewayDetails.LastUpdateTime;

console.log(`Transit Gateway ARN: ${transitGatewayArn}`);
console.log(`Creation Time: ${creationTime}`);
console.log(`Last Update Time: ${lastUpdateTime}`);
```
