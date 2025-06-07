---
title: Managing AWS EC2 LocalGatewayRouteTables with Alchemy
description: Learn how to create, update, and manage AWS EC2 LocalGatewayRouteTables using Alchemy Cloud Control.
---

# LocalGatewayRouteTable

The LocalGatewayRouteTable resource allows you to manage route tables for local gateways in your Amazon EC2 environment, facilitating routing for local network traffic. For more information, refer to the [AWS EC2 LocalGatewayRouteTables documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a LocalGatewayRouteTable with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const LocalGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("MyLocalGatewayRouteTable", {
  LocalGatewayId: "lgw-0123456789abcdef0",
  Mode: "active",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

In this example, we configure a LocalGatewayRouteTable with additional properties, including multiple tags.

```ts
const AdvancedLocalGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("AdvancedLocalGatewayRouteTable", {
  LocalGatewayId: "lgw-0123456789abcdef0",
  Mode: "active",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Networking" }
  ],
  adopt: true
});
```

## Route Table with Multiple Tags

This example illustrates how to create a LocalGatewayRouteTable with multiple tags for enhanced resource categorization.

```ts
const TaggedLocalGatewayRouteTable = await AWS.EC2.LocalGatewayRouteTable("TaggedLocalGatewayRouteTable", {
  LocalGatewayId: "lgw-0123456789abcdef0",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "Migration" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```