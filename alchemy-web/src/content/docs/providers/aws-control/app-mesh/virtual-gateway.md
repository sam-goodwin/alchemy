---
title: VirtualGateway
description: Learn how to create, update, and manage AWS AppMesh VirtualGateways using Alchemy Cloud Control.
---


The VirtualGateway resource allows you to manage [AWS AppMesh VirtualGateways](https://docs.aws.amazon.com/appmesh/latest/userguide/) that facilitate communication between services across multiple meshes.

## Minimal Example

Create a basic VirtualGateway with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const virtualGateway = await AWS.AppMesh.VirtualGateway("myVirtualGateway", {
  VirtualGatewayName: "my-gateway",
  MeshName: "my-mesh",
  Spec: {
    // Define the Virtual Gateway specifications here
    BackendDefaults: {
      ClientPolicy: {
        TLS: {
          Enforce: true,
          Ports: [443],
          Validation: {
            Trust: {
              CertificateAuthorityArns: ["arn:aws:acm:region:account-id:certificate/cert-id"]
            }
          }
        }
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a VirtualGateway with advanced settings including custom backend defaults and client policy configurations.

```ts
const advancedVirtualGateway = await AWS.AppMesh.VirtualGateway("advancedGateway", {
  VirtualGatewayName: "advanced-gateway",
  MeshName: "my-mesh",
  Spec: {
    BackendDefaults: {
      ClientPolicy: {
        TLS: {
          Enforce: true,
          Ports: [443],
          Validation: {
            Trust: {
              CertificateAuthorityArns: ["arn:aws:acm:region:account-id:certificate/cert-id"]
            }
          }
        }
      }
    },
    Listeners: [
      {
        PortMapping: {
          Port: 8080,
          Protocol: "http",
        }
      }
    ]
  },
  Tags: [
    { Key: "Project", Value: "MyProject" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Client Policy

Define a VirtualGateway with a custom client policy that uses mTLS for secure communication.

```ts
const secureVirtualGateway = await AWS.AppMesh.VirtualGateway("secureGateway", {
  VirtualGatewayName: "secure-gateway",
  MeshName: "my-mesh",
  Spec: {
    BackendDefaults: {
      ClientPolicy: {
        TLS: {
          Enforce: true,
          Ports: [443],
          Validation: {
            Trust: {
              CertificateAuthorityArns: ["arn:aws:acm:region:account-id:certificate/cert-id"]
            }
          }
        }
      }
    },
    Listeners: [
      {
        PortMapping: {
          Port: 8443,
          Protocol: "https",
        }
      }
    ]
  },
  Tags: [
    { Key: "Security", Value: "High" }
  ]
});
```
