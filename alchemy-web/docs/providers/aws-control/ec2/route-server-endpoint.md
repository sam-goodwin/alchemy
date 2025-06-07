---
title: Managing AWS EC2 RouteServerEndpoints with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteServerEndpoints using Alchemy Cloud Control.
---

# RouteServerEndpoint

The RouteServerEndpoint resource allows you to manage [AWS EC2 RouteServerEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) for establishing peering with Amazon VPCs and other networks.

## Minimal Example

Create a basic RouteServerEndpoint with required properties:

```ts
import AWS from "alchemy/aws/control";

const BasicRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("BasicRouteServerEndpoint", {
  SubnetId: "subnet-0abc1234def567890", // Replace with your subnet ID
  RouteServerId: "rs-0abc1234def567890", // Replace with your Route Server ID
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a RouteServerEndpoint with additional properties including adoption of existing resources:

```ts
const AdvancedRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("AdvancedRouteServerEndpoint", {
  SubnetId: "subnet-1abc5678def123456", // Replace with your subnet ID
  RouteServerId: "rs-1abc5678def123456", // Replace with your Route Server ID
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Additional Tags

You can add more tags to categorize your RouteServerEndpoint for better resource management:

```ts
const TaggedRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("TaggedRouteServerEndpoint", {
  SubnetId: "subnet-2abc8765def432109", // Replace with your subnet ID
  RouteServerId: "rs-2abc8765def432109", // Replace with your Route Server ID
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Project", Value: "RouteOptimization" }
  ]
});
```