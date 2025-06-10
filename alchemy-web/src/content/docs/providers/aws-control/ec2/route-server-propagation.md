---
title: RouteServerPropagation
description: Learn how to create, update, and manage AWS EC2 RouteServerPropagations using Alchemy Cloud Control.
---


The RouteServerPropagation resource allows you to manage the propagation of routes from a route server to a specified route table in an AWS EC2 environment. For more details, refer to the [AWS EC2 RouteServerPropagations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic RouteServerPropagation with required properties for a specified route table and route server.

```ts
import AWS from "alchemy/aws/control";

const routeServerPropagation = await AWS.EC2.RouteServerPropagation("basicRouteServerPropagation", {
  RouteTableId: "rtb-0123456789abcdef0",
  RouteServerId: "rs-0123456789abcdef0",
  adopt: true // Optionally, adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a RouteServerPropagation with additional properties to customize behavior.

```ts
const advancedRouteServerPropagation = await AWS.EC2.RouteServerPropagation("advancedRouteServerPropagation", {
  RouteTableId: "rtb-0fedcba9876543210",
  RouteServerId: "rs-0fedcba9876543210",
  adopt: false // Set to false to fail if the resource already exists
});
```

## Use Case: Enabling Route Propagation for Multiple Route Tables

This example demonstrates how to create multiple RouteServerPropagations for different route tables and route servers.

```ts
const routePropagation1 = await AWS.EC2.RouteServerPropagation("routePropagation1", {
  RouteTableId: "rtb-11111111111111111",
  RouteServerId: "rs-11111111111111111",
  adopt: true
});

const routePropagation2 = await AWS.EC2.RouteServerPropagation("routePropagation2", {
  RouteTableId: "rtb-22222222222222222",
  RouteServerId: "rs-22222222222222222",
  adopt: false
});
```

## Use Case: Updating Route Server Propagation

This example shows how to update an existing RouteServerPropagation to change its route table.

```ts
const updatedRouteServerPropagation = await AWS.EC2.RouteServerPropagation("updateRouteServerPropagation", {
  RouteTableId: "rtb-33333333333333333", // New route table
  RouteServerId: "rs-33333333333333333",
  adopt: true
});
```
