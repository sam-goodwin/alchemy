---
title: Managing AWS AppMesh Routes with Alchemy
description: Learn how to create, update, and manage AWS AppMesh Routes using Alchemy Cloud Control.
---

# Route

The Route resource lets you create and manage [AWS AppMesh Routes](https://docs.aws.amazon.com/appmesh/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appmesh-route.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const route = await AWS.AppMesh.Route("route-example", {
  MeshName: "route-mesh",
  VirtualRouterName: "route-virtualrouter",
  Spec: "example-spec",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a route with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRoute = await AWS.AppMesh.Route("advanced-route", {
  MeshName: "route-mesh",
  VirtualRouterName: "route-virtualrouter",
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

