---
title: VirtualService
description: Learn how to create, update, and manage AWS AppMesh VirtualServices using Alchemy Cloud Control.
---


The VirtualService resource allows you to manage [AWS AppMesh VirtualServices](https://docs.aws.amazon.com/appmesh/latest/userguide/) which provide a way to route traffic to your services. 

## Minimal Example

Create a basic VirtualService with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicVirtualService = await AWS.AppMesh.VirtualService("basicVirtualService", {
  MeshName: "myAppMesh",
  VirtualServiceName: "myService.local",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "myRouter"
      }
    }
  }
});
```

## Advanced Configuration

Configure a VirtualService with additional tags and mesh owner properties:

```ts
const advancedVirtualService = await AWS.AppMesh.VirtualService("advancedVirtualService", {
  MeshName: "myAppMesh",
  MeshOwner: "123456789012", // AWS Account ID
  VirtualServiceName: "myAdvancedService.local",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "myAdvancedRouter"
      }
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyApp"
    }
  ]
});
```

## Traffic Routing with Multiple Providers

Demonstrate traffic routing by configuring a VirtualService with multiple providers:

```ts
const multiProviderVirtualService = await AWS.AppMesh.VirtualService("multiProviderVirtualService", {
  MeshName: "myAppMesh",
  VirtualServiceName: "myMultiProviderService.local",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "myMultiRouter"
      },
      VirtualNode: {
        VirtualNodeName: "myServiceNode"
      }
    }
  }
});
```

## Custom Health Checks

Set up a VirtualService with health check configurations to ensure service reliability:

```ts
const healthCheckVirtualService = await AWS.AppMesh.VirtualService("healthCheckVirtualService", {
  MeshName: "myAppMesh",
  VirtualServiceName: "myHealthCheckService.local",
  Spec: {
    Provider: {
      VirtualRouter: {
        VirtualRouterName: "myHealthCheckRouter"
      }
    },
    HealthCheck: {
      HealthyThreshold: 2,
      IntervalMillis: 5000,
      TimeoutMillis: 2000,
      UnhealthyThreshold: 2,
      Path: "/health",
      Port: 8080,
      Protocol: "http"
    }
  }
});
``` 

These code examples illustrate how to create and manage AWS AppMesh VirtualServices using Alchemy, providing practical use cases for routing and service management.
