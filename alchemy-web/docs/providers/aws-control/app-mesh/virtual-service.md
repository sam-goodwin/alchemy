---
title: Managing AWS AppMesh VirtualServices with Alchemy
description: Learn how to create, update, and manage AWS AppMesh VirtualServices using Alchemy Cloud Control.
---

# VirtualService

The VirtualService resource allows you to manage [AWS AppMesh VirtualServices](https://docs.aws.amazon.com/appmesh/latest/userguide/) which define how to route traffic to your application services.

## Minimal Example

Create a basic VirtualService with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicVirtualService = await AWS.AppMesh.VirtualService("BasicVirtualService", {
  MeshName: "my-mesh",
  VirtualServiceName: "my-service.example.com",
  Spec: {
    Provider: {
      VirtualNode: {
        VirtualNodeName: "my-node"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AppMeshDemo" }
  ]
});
```

## Advanced Configuration

Configure a VirtualService with a specific mesh owner and an explicit provider type.

```ts
const advancedVirtualService = await AWS.AppMesh.VirtualService("AdvancedVirtualService", {
  MeshName: "my-mesh",
  MeshOwner: "123456789012", // Replace with your AWS account ID
  VirtualServiceName: "advanced-service.example.com",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "my-router"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Traffic Routing Example

Create a VirtualService that routes traffic to a VirtualNode with weighted routing.

```ts
const weightedRoutingVirtualService = await AWS.AppMesh.VirtualService("WeightedRoutingVirtualService", {
  MeshName: "my-mesh",
  VirtualServiceName: "weighted-service.example.com",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "my-weighted-router"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

This example demonstrates a VirtualService that can be configured to route traffic based on weights defined in the associated VirtualRouter, allowing for gradual traffic shifting to new versions of your service.