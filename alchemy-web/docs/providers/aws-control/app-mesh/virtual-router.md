---
title: Managing AWS AppMesh VirtualRouters with Alchemy
description: Learn how to create, update, and manage AWS AppMesh VirtualRouters using Alchemy Cloud Control.
---

# VirtualRouter

The VirtualRouter resource allows you to manage [AWS AppMesh VirtualRouters](https://docs.aws.amazon.com/appmesh/latest/userguide/) to facilitate service communication within your microservices architecture.

## Minimal Example

Create a basic VirtualRouter with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const basicVirtualRouter = await AWS.AppMesh.VirtualRouter("BasicVirtualRouter", {
  MeshName: "my-app-mesh",
  VirtualRouterName: "my-virtual-router",
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }],
  },
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure a VirtualRouter with multiple listeners for different protocols and ports:

```ts
const advancedVirtualRouter = await AWS.AppMesh.VirtualRouter("AdvancedVirtualRouter", {
  MeshName: "my-app-mesh",
  VirtualRouterName: "my-advanced-router",
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }, {
      PortMapping: {
        Port: 8443,
        Protocol: "https"
      }
    }],
  },
  Tags: [{ Key: "Environment", Value: "staging" }, { Key: "Team", Value: "DevOps" }]
});
```

## Multiple VirtualRouter Listeners

Set up a VirtualRouter with distinct listeners to handle different service traffic:

```ts
const multiListenerVirtualRouter = await AWS.AppMesh.VirtualRouter("MultiListenerVirtualRouter", {
  MeshName: "my-app-mesh",
  VirtualRouterName: "my-multi-listener-router",
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }, {
      PortMapping: {
        Port: 8443,
        Protocol: "https"
      }
    }],
  },
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

This example demonstrates how to create a VirtualRouter that can handle both HTTP and HTTPS traffic, allowing your services to communicate securely and efficiently.