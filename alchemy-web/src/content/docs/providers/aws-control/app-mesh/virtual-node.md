---
title: VirtualNode
description: Learn how to create, update, and manage AWS AppMesh VirtualNodes using Alchemy Cloud Control.
---


The VirtualNode resource lets you manage [AWS AppMesh VirtualNodes](https://docs.aws.amazon.com/appmesh/latest/userguide/) that define the communication between your services in a mesh. VirtualNodes are key components that represent a logical pointer to a service and facilitate traffic routing.

## Minimal Example

This example demonstrates how to create a basic VirtualNode with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const virtualNode = await AWS.AppMesh.VirtualNode("basicVirtualNode", {
  MeshName: "myAppMesh",
  Spec: {
    ServiceDiscovery: {
      DNS: {
        Hostname: "my-service.local"
      }
    },
    Listeners: [
      {
        PortMapping: {
          Port: 8080,
          Protocol: "http"
        }
      }
    ]
  },
  VirtualNodeName: "myVirtualNode"
});
```

## Advanced Configuration

This example illustrates how to configure a VirtualNode with enhanced settings, such as health checks and additional listeners.

```ts
const advancedVirtualNode = await AWS.AppMesh.VirtualNode("advancedVirtualNode", {
  MeshName: "myAppMesh",
  Spec: {
    ServiceDiscovery: {
      DNS: {
        Hostname: "my-service.local"
      }
    },
    Listeners: [
      {
        PortMapping: {
          Port: 8080,
          Protocol: "http"
        },
        HealthCheck: {
          HealthyThreshold: 2,
          IntervalMillis: 5000,
          TimeoutMillis: 2000,
          UnhealthyThreshold: 2,
          Path: "/health",
          Protocol: "http"
        }
      },
      {
        PortMapping: {
          Port: 8443,
          Protocol: "http2"
        }
      }
    ]
  },
  VirtualNodeName: "myAdvancedVirtualNode",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Traffic Routing Example

This example shows how to define a VirtualNode with traffic routing to multiple services based on weights.

```ts
const trafficRoutingVirtualNode = await AWS.AppMesh.VirtualNode("trafficRoutingVirtualNode", {
  MeshName: "myAppMesh",
  Spec: {
    ServiceDiscovery: {
      DNS: {
        Hostname: "my-service.local"
      }
    },
    Listeners: [
      {
        PortMapping: {
          Port: 8080,
          Protocol: "http"
        }
      }
    ],
    BackendDefaults: {
      ClientPolicy: {
        TLS: {
          Enforce: true,
          Ports: [8080],
          Validation: {
            Trust: {
              CertificateAuthorityArns: ["arn:aws:acm:region:account-id:certificate/certificate-id"]
            }
          }
        }
      }
    }
  },
  VirtualNodeName: "myTrafficRoutingVirtualNode"
});
```
