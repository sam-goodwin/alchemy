---
title: Managing AWS EC2 LocalGatewayRoutes with Alchemy
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRoutes using Alchemy Cloud Control.
---

# LocalGatewayRoute

The LocalGatewayRoute resource lets you manage [AWS EC2 Local Gateway Routes](https://docs.aws.amazon.com/ec2/latest/userguide/), which are used to route traffic from your Local Gateway to a specified destination.

## Minimal Example

Create a basic Local Gateway Route with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicLocalGatewayRoute = await AWS.EC2.LocalGatewayRoute("BasicRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-12345678",
  DestinationCidrBlock: "10.0.0.0/16",
  NetworkInterfaceId: "eni-12345678" // Optional
});
```

## Advanced Configuration

Configure a Local Gateway Route with additional optional properties for enhanced routing.

```ts
const AdvancedLocalGatewayRoute = await AWS.EC2.LocalGatewayRoute("AdvancedRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-87654321",
  DestinationCidrBlock: "192.168.1.0/24",
  NetworkInterfaceId: "eni-87654321", // Optional
  LocalGatewayVirtualInterfaceGroupId: "lgw-vifg-12345678" // Optional
});
```

## Adoption of Existing Resource

Use the adopt property to take over an existing Local Gateway Route instead of failing if it already exists.

```ts
const AdoptExistingLocalGatewayRoute = await AWS.EC2.LocalGatewayRoute("AdoptedRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-12345678",
  DestinationCidrBlock: "172.16.0.0/12",
  adopt: true // Enables adoption of existing resource
});
```