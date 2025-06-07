---
title: Managing AWS EC2 LocalGatewayRouteTableVPCAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTableVPCAssociations using Alchemy Cloud Control.
---

# LocalGatewayRouteTableVPCAssociation

The `LocalGatewayRouteTableVPCAssociation` resource allows you to associate a VPC with a local gateway route table in AWS EC2. This enables the routing of traffic from the VPC to the local gateway. For more information, visit the [AWS EC2 LocalGatewayRouteTableVPCAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic association between a local gateway route table and a VPC.

```ts
import AWS from "alchemy/aws/control";

const LocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("BasicAssociation", {
  VpcId: "vpc-1234abcd",
  LocalGatewayRouteTableId: "lt-5678efgh",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "NetworkSetup" }
  ]
});
```

## Advanced Configuration

This example shows how to adopt an existing resource instead of failing when it already exists.

```ts
const AdoptedLocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("AdoptedAssociation", {
  VpcId: "vpc-1234abcd",
  LocalGatewayRouteTableId: "lt-5678efgh",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkOptimization" }
  ]
});
```

## Specific Use Case: Multiple Tags

In this example, we create an association while applying multiple tags for better resource management.

```ts
const TaggedLocalGatewayAssociation = await AWS.EC2.LocalGatewayRouteTableVPCAssociation("TaggedAssociation", {
  VpcId: "vpc-9012ijkl",
  LocalGatewayRouteTableId: "lt-3456mnop",
  Tags: [
    { Key: "Owner", Value: "NetworkTeam" },
    { Key: "CostCenter", Value: "CC12345" },
    { Key: "Project", Value: "Infrastructure" }
  ]
});
```