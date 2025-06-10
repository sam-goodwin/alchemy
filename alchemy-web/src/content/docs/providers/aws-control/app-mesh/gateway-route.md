---
title: GatewayRoute
description: Learn how to create, update, and manage AWS AppMesh GatewayRoutes using Alchemy Cloud Control.
---


The GatewayRoute resource allows you to manage [AWS AppMesh GatewayRoutes](https://docs.aws.amazon.com/appmesh/latest/userguide/) that define how requests are routed to virtual services. This resource helps you direct traffic based on specified criteria, enabling fine-grained control over your application’s traffic flow.

## Minimal Example

Create a basic GatewayRoute with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicGatewayRoute = await AWS.AppMesh.GatewayRoute("basicGatewayRoute", {
  MeshName: "myMesh",
  VirtualGatewayName: "myVirtualGateway",
  Spec: {
    Route: {
      HttpRoute: {
        Match: {
          Prefix: "/api"
        },
        Action: {
          WeightedTargets: [
            {
              VirtualService: "myService",
              Weight: 1
            }
          ]
        }
      }
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a GatewayRoute with additional options for routing traffic based on HTTP methods and conditions.

```ts
const advancedGatewayRoute = await AWS.AppMesh.GatewayRoute("advancedGatewayRoute", {
  MeshName: "myMesh",
  VirtualGatewayName: "myVirtualGateway",
  Spec: {
    Route: {
      HttpRoute: {
        Match: {
          Prefix: "/api",
          Method: "GET"
        },
        Action: {
          WeightedTargets: [
            {
              VirtualService: "myServiceA",
              Weight: 70
            },
            {
              VirtualService: "myServiceB",
              Weight: 30
            }
          ]
        }
      }
    }
  }
});
```

## Weighted Routing Example

Demonstrate weighted routing to distribute traffic between multiple services.

```ts
const weightedGatewayRoute = await AWS.AppMesh.GatewayRoute("weightedGatewayRoute", {
  MeshName: "myMesh",
  VirtualGatewayName: "myVirtualGateway",
  Spec: {
    Route: {
      HttpRoute: {
        Match: {
          Prefix: "/api"
        },
        Action: {
          WeightedTargets: [
            {
              VirtualService: "myServiceA",
              Weight: 60
            },
            {
              VirtualService: "myServiceB",
              Weight: 40
            }
          ]
        }
      }
    }
  }
});
```

## Path-Based Routing Example

Set up a GatewayRoute that routes traffic based on specific paths to different services.

```ts
const pathBasedGatewayRoute = await AWS.AppMesh.GatewayRoute("pathBasedGatewayRoute", {
  MeshName: "myMesh",
  VirtualGatewayName: "myVirtualGateway",
  Spec: {
    Route: {
      HttpRoute: {
        Match: {
          Prefix: "/api/v1",
          Method: "POST"
        },
        Action: {
          WeightedTargets: [
            {
              VirtualService: "myServiceV1",
              Weight: 100
            }
          ]
        }
      }
    }
  }
});
```
