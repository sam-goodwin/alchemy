---
title: Managing AWS EC2 LocalGatewayRouteTableVirtualInterfaceGroupAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTableVirtualInterfaceGroupAssociations using Alchemy Cloud Control.
---

# LocalGatewayRouteTableVirtualInterfaceGroupAssociation

The LocalGatewayRouteTableVirtualInterfaceGroupAssociation resource allows you to associate a virtual interface group with a local gateway route table in AWS EC2. This resource is essential for managing the routing of traffic in your VPC. For more details, refer to the [AWS EC2 LocalGatewayRouteTableVirtualInterfaceGroupAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic LocalGatewayRouteTableVirtualInterfaceGroupAssociation with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const localGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("BasicAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure a LocalGatewayRouteTableVirtualInterfaceGroupAssociation with additional options including multiple tags and enabling the adoption of an existing resource.

```ts
const advancedLocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("AdvancedAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Networking" }
  ],
  adopt: true
});
```

## Example with No Tags

Create a LocalGatewayRouteTableVirtualInterfaceGroupAssociation without any tags, emphasizing the required properties only.

```ts
const noTagLocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation("NoTagAssociation", {
  LocalGatewayRouteTableId: "ltb-12345678",
  LocalGatewayVirtualInterfaceGroupId: "lvig-87654321"
});
```