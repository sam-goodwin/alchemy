---
title: TransitGatewayMulticastGroupSource
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastGroupSources using Alchemy Cloud Control.
---


The TransitGatewayMulticastGroupSource resource allows you to manage the multicast group sources for an Amazon EC2 Transit Gateway. This resource is essential for enabling multicast traffic in your AWS environment. For more details, refer to the [AWS EC2 TransitGatewayMulticastGroupSources documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates creating a basic TransitGatewayMulticastGroupSource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const multicastGroupSource = await AWS.EC2.TransitGatewayMulticastGroupSource("myMulticastGroupSource", {
  TransitGatewayMulticastDomainId: "tgw-mc-12345678",
  NetworkInterfaceId: "eni-0abcd1234efgh5678",
  GroupIpAddress: "239.255.0.1",
  adopt: true // Optional: Adopts the existing resource if it already exists
});
```

## Advanced Configuration

This example demonstrates how to configure a TransitGatewayMulticastGroupSource with additional settings, including handling specific network interface properties.

```ts
const advancedMulticastGroupSource = await AWS.EC2.TransitGatewayMulticastGroupSource("advancedMulticastGroupSource", {
  TransitGatewayMulticastDomainId: "tgw-mc-87654321",
  NetworkInterfaceId: "eni-0ijkl91011mnopqr12",
  GroupIpAddress: "239.255.0.2",
  adopt: false // Optional: Do not adopt existing resources
});
```

## Use Case: Integrating with Other AWS Services

In this example, we create a TransitGatewayMulticastGroupSource that integrates with an existing network setup for efficient multicast traffic handling.

```ts
const integrationMulticastGroupSource = await AWS.EC2.TransitGatewayMulticastGroupSource("integrationMulticastGroupSource", {
  TransitGatewayMulticastDomainId: "tgw-mc-55555555",
  NetworkInterfaceId: "eni-0stu1234vwxyz5678",
  GroupIpAddress: "239.255.0.3",
  adopt: true // Optional: Adopts the existing resource to avoid conflicts
});
```
