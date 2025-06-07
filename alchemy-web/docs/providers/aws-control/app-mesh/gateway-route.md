---
title: Managing AWS AppMesh GatewayRoutes with Alchemy
description: Learn how to create, update, and manage AWS AppMesh GatewayRoutes using Alchemy Cloud Control.
---

# GatewayRoute

The GatewayRoute resource lets you create and manage [AWS AppMesh GatewayRoutes](https://docs.aws.amazon.com/appmesh/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appmesh-gatewayroute.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gatewayroute = await AWS.AppMesh.GatewayRoute("gatewayroute-example", {
  MeshName: "gatewayroute-mesh",
  VirtualGatewayName: "gatewayroute-virtualgateway",
  Spec: "example-spec",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a gatewayroute with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGatewayRoute = await AWS.AppMesh.GatewayRoute("advanced-gatewayroute", {
  MeshName: "gatewayroute-mesh",
  VirtualGatewayName: "gatewayroute-virtualgateway",
  Spec: "example-spec",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

