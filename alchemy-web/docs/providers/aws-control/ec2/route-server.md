---
title: Managing AWS EC2 RouteServers with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteServers using Alchemy Cloud Control.
---

# RouteServer

The RouteServer resource lets you create and manage [AWS EC2 RouteServers](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-routeserver.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routeserver = await AWS.EC2.RouteServer("routeserver-example", {
  AmazonSideAsn: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a routeserver with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRouteServer = await AWS.EC2.RouteServer("advanced-routeserver", {
  AmazonSideAsn: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

