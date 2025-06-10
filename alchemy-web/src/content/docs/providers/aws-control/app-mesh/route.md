---
title: Route
description: Learn how to create, update, and manage AWS AppMesh Routes using Alchemy Cloud Control.
---


The Route resource allows you to manage [AWS AppMesh Routes](https://docs.aws.amazon.com/appmesh/latest/userguide/) that define how traffic is routed between services in your mesh.

## Minimal Example

Create a basic route with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.AppMesh.Route("basicRoute", {
  MeshName: "myMesh",
  VirtualRouterName: "myVirtualRouter",
  Spec: {
    // Define route specification here
    RouteType: "http",
    HttpRoute: {
      Match: {
        Path: {
          Exact: "/api"
        }
      },
      Action: {
        WeightedTargets: [{
          VirtualNode: "myVirtualNode",
          Weight: 1
        }]
      }
    }
  },
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a route with additional settings for traffic splitting and retry policies.

```ts
const advancedRoute = await AWS.AppMesh.Route("advancedRoute", {
  MeshName: "myMesh",
  VirtualRouterName: "myVirtualRouter",
  Spec: {
    RouteType: "http",
    HttpRoute: {
      Match: {
        Path: {
          Prefix: "/"
        }
      },
      Action: {
        WeightedTargets: [
          {
            VirtualNode: "myVirtualNodeA",
            Weight: 1
          },
          {
            VirtualNode: "myVirtualNodeB",
            Weight: 2
          }
        ]
      },
      RetryPolicy: {
        MaxRetries: 3,
        Timeout: {
          Value: 2,
          Unit: "s"
        },
        StatusCodes: ["429", "500", "503"]
      }
    }
  }
});
```

## Traffic Routing with Header Matching

Create a route that directs traffic based on specific HTTP headers.

```ts
const headerRoute = await AWS.AppMesh.Route("headerRoute", {
  MeshName: "myMesh",
  VirtualRouterName: "myVirtualRouter",
  Spec: {
    RouteType: "http",
    HttpRoute: {
      Match: {
        Headers: [{
          Name: "X-User-Type",
          Match: {
            Exact: "admin"
          }
        }]
      },
      Action: {
        WeightedTargets: [{
          VirtualNode: "adminVirtualNode",
          Weight: 1
        }]
      }
    }
  }
});
```

## Route for Different Paths

Define multiple routes to handle different API paths for the same virtual router.

```ts
const userRoute = await AWS.AppMesh.Route("userRoute", {
  MeshName: "myMesh",
  VirtualRouterName: "myVirtualRouter",
  Spec: {
    RouteType: "http",
    HttpRoute: {
      Match: {
        Path: {
          Exact: "/users"
        }
      },
      Action: {
        WeightedTargets: [{
          VirtualNode: "userVirtualNode",
          Weight: 1
        }]
      }
    }
  }
});

const orderRoute = await AWS.AppMesh.Route("orderRoute", {
  MeshName: "myMesh",
  VirtualRouterName: "myVirtualRouter",
  Spec: {
    RouteType: "http",
    HttpRoute: {
      Match: {
        Path: {
          Exact: "/orders"
        }
      },
      Action: {
        WeightedTargets: [{
          VirtualNode: "orderVirtualNode",
          Weight: 1
        }]
      }
    }
  }
});
