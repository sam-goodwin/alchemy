---
title: LocalGatewayRouteTableVirtualInterfaceGroupAssociation
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTableVirtualInterfaceGroupAssociations using Alchemy Cloud Control.
---


The `LocalGatewayRouteTableVirtualInterfaceGroupAssociation` resource lets you manage associations between local gateway route tables and virtual interface groups in AWS EC2. This resource is essential for routing traffic through local gateways in your AWS infrastructure. For more details, refer to the [AWS EC2 LocalGatewayRouteTableVirtualInterfaceGroupAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic `LocalGatewayRouteTableVirtualInterfaceGroupAssociation` with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const localGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("localGatewayAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Networking" }
  ]
});
```

## Advanced Configuration

In this example, we enable the adoption of existing resources by setting the `adopt` property to true.

```ts
const existingLocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("existingLocalGatewayAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321",
  Tags: [{ Key: "Environment", Value: "Production" }],
  adopt: true
});
```

## Use Case: Dynamic Tagging

This example shows how to create a `LocalGatewayRouteTableVirtualInterfaceGroupAssociation` with dynamic tags based on application needs.

```ts
const dynamicTaggingAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("dynamicTaggingAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321",
  Tags: [
    { Key: "Application", Value: "WebApp" },
    { Key: "Owner", Value: "TeamA" },
    { Key: "CostCenter", Value: "CC123" }
  ]
});
```
