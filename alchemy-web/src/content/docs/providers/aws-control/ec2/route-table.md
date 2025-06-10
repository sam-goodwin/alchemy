---
title: RouteTable
description: Learn how to create, update, and manage AWS EC2 RouteTables using Alchemy Cloud Control.
---


The RouteTable resource lets you manage [AWS EC2 RouteTables](https://docs.aws.amazon.com/ec2/latest/userguide/) and their routing configurations within your VPC.

## Minimal Example

This example demonstrates creating a basic RouteTable associated with a specific VPC, including a tag for identification.

```ts
import AWS from "alchemy/aws/control";

const routeTable = await AWS.EC2.RouteTable("mainRouteTable", {
  VpcId: "vpc-12345678",
  Tags: [
    {
      Key: "Name",
      Value: "Main Route Table"
    }
  ]
});
```

## Advanced Configuration

In this example, we create a RouteTable with additional tags and enable the adoption of an existing resource if it already exists.

```ts
const advancedRouteTable = await AWS.EC2.RouteTable("advancedRouteTable", {
  VpcId: "vpc-87654321",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Owner",
      Value: "Dev Team"
    }
  ],
  adopt: true
});
```

## Route Configuration Example

Here is an example demonstrating how to set up a RouteTable with routes to different destinations.

```ts
import AWS from "alchemy/aws/control";

const routeTableWithRoutes = await AWS.EC2.RouteTable("routeTableWithRoutes", {
  VpcId: "vpc-11223344",
  Tags: [
    {
      Key: "Name",
      Value: "Route Table with Routes"
    }
  ]
});

// Here you would typically include additional logic to add routes,
// for example, to an Internet Gateway or another VPC.
```

## Use Case: Private Subnet Routing

This example illustrates how to create a RouteTable for a private subnet, ensuring that traffic is routed correctly to a NAT Gateway.

```ts
const privateRouteTable = await AWS.EC2.RouteTable("privateRouteTable", {
  VpcId: "vpc-44556677",
  Tags: [
    {
      Key: "Name",
      Value: "Private Route Table"
    }
  ]
});

// Additional logic would be required to create routes towards the NAT Gateway.
```
