---
title: LocalGatewayRouteTable
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTables using Alchemy Cloud Control.
---


The LocalGatewayRouteTable resource allows you to manage route tables associated with a local gateway in AWS EC2. For more details, visit the [AWS EC2 LocalGatewayRouteTables documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic LocalGatewayRouteTable with the required properties and a common optional property for tags.

```ts
import AWS from "alchemy/aws/control";

const localGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("myRouteTable", {
  LocalGatewayId: "lgw-12345678",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Advanced Configuration

Configure a LocalGatewayRouteTable with additional options including the mode.

```ts
const advancedLocalGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("myAdvancedRouteTable", {
  LocalGatewayId: "lgw-87654321",
  Mode: "static", // Options can include "static" or "dynamic"
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Adoption of Existing Resource

Create a LocalGatewayRouteTable while adopting an existing resource instead of failing if it already exists.

```ts
const adoptedLocalGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("myAdoptedRouteTable", {
  LocalGatewayId: "lgw-12345678",
  adopt: true // This will adopt the existing resource
});
```

## Example of Custom Route Management

Demonstrate how to manage routes in the LocalGatewayRouteTable for a specific CIDR block.

```ts
const customRouteTable = await AWS.EC2.LocalGatewayRouteTable("myCustomRouteTable", {
  LocalGatewayId: "lgw-11223344",
  Tags: [
    { Key: "Environment", Value: "Test" }
  ]
});

// Here you would typically add routes using another API call to associate routes with this table
// Example: AWS.EC2.LocalGatewayRoute("myRoute", { LocalGatewayRouteTableId: customRouteTable.id, DestinationCidrBlock: "192.168.1.0/24", LocalGatewayVirtualInterfaceId: "lvif-abcdefg" });
```
