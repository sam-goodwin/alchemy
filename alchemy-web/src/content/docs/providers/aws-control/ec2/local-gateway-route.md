---
title: LocalGatewayRoute
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRoutes using Alchemy Cloud Control.
---


The LocalGatewayRoute resource allows you to manage routing within an AWS EC2 Local Gateway, facilitating communication between your VPC and on-premises networks. For more details, refer to the [AWS EC2 LocalGatewayRoutes documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Local Gateway Route with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const localGatewayRoute = await AWS.EC2.LocalGatewayRoute("myLocalGatewayRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-12345678",
  DestinationCidrBlock: "10.0.0.0/16",
  NetworkInterfaceId: "eni-12345678" // Optional
});
```

## Advanced Configuration

Configure a Local Gateway Route with an additional optional property for a Virtual Interface Group ID.

```ts
const advancedLocalGatewayRoute = await AWS.EC2.LocalGatewayRoute("advancedLocalGatewayRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-87654321",
  DestinationCidrBlock: "192.168.1.0/24",
  LocalGatewayVirtualInterfaceGroupId: "vgw-12345678" // Optional
});
```

## Adoption of Existing Resource

If you want to adopt an existing Local Gateway Route instead of creating a new one, you can set the adopt property to true.

```ts
const adoptLocalGatewayRoute = await AWS.EC2.LocalGatewayRoute("adoptLocalGatewayRoute", {
  LocalGatewayRouteTableId: "lgw-rtb-12345678",
  DestinationCidrBlock: "172.16.0.0/12",
  adopt: true // Adopt existing resource
});
```
