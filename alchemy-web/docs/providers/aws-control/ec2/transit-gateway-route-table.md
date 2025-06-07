---
title: Managing AWS EC2 TransitGatewayRouteTables with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTables using Alchemy Cloud Control.
---

# TransitGatewayRouteTable

The TransitGatewayRouteTable resource allows you to manage [AWS EC2 Transit Gateway Route Tables](https://docs.aws.amazon.com/ec2/latest/userguide/) which are used to control traffic routing between VPCs and on-premises networks.

## Minimal Example

Create a basic Transit Gateway Route Table with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const TransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("MyRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway Route Table with multiple tags for better resource management.

```ts
const AdvancedTransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("AdvancedRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "NetworkOps" }
  ],
  adopt: true // If true, adopts existing resource instead of failing when resource already exists
});
```

## Adoption of Existing Resources

Adopt an existing Transit Gateway Route Table instead of creating a new one.

```ts
const ExistingTransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("ExistingRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  adopt: true // Adopt existing resource
});
```

## Inspecting Route Table Properties

You can also access properties like ARN and creation time after creating a Transit Gateway Route Table.

```ts
const CreatedTransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("CreatedRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678"
});

// Accessing properties
console.log(`ARN: ${CreatedTransitGatewayRouteTable.Arn}`);
console.log(`Created At: ${CreatedTransitGatewayRouteTable.CreationTime}`);
```