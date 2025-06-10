---
title: RouteServer
description: Learn how to create, update, and manage AWS EC2 RouteServers using Alchemy Cloud Control.
---


The RouteServer resource lets you manage [AWS EC2 RouteServers](https://docs.aws.amazon.com/ec2/latest/userguide/) for facilitating dynamic routing between your network and AWS. RouteServers help in managing BGP (Border Gateway Protocol) sessions and routing updates.

## Minimal Example

Create a basic RouteServer with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicRouteServer = await AWS.EC2.RouteServer("basicRouteServer", {
  AmazonSideAsn: 64512,
  PersistRoutes: "enabled",
  SnsNotificationsEnabled: true
});
```

## Advanced Configuration

Configure a RouteServer with additional settings for route persistence duration and custom tags.

```ts
const advancedRouteServer = await AWS.EC2.RouteServer("advancedRouteServer", {
  AmazonSideAsn: 64513,
  PersistRoutes: "enabled",
  PersistRoutesDuration: 3600, // Duration in seconds
  SnsNotificationsEnabled: false,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Networking" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing RouteServer resource instead of failing if it already exists.

```ts
const adoptedRouteServer = await AWS.EC2.RouteServer("adoptedRouteServer", {
  AmazonSideAsn: 64514,
  adopt: true
});
```

## Configuration with Custom Tags

Create a RouteServer focusing on tagging for better resource management and identification.

```ts
const taggedRouteServer = await AWS.EC2.RouteServer("taggedRouteServer", {
  AmazonSideAsn: 64515,
  Tags: [
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Purpose", Value: "Test" }
  ]
});
```
