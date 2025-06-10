---
title: VirtualRouter
description: Learn how to create, update, and manage AWS AppMesh VirtualRouters using Alchemy Cloud Control.
---


The VirtualRouter resource lets you manage [AWS AppMesh VirtualRouters](https://docs.aws.amazon.com/appmesh/latest/userguide/) which are used to route traffic between different services in your mesh.

## Minimal Example

Create a basic VirtualRouter with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const basicVirtualRouter = await AWS.AppMesh.VirtualRouter("basicVirtualRouter", {
  MeshName: "myAppMesh",
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }]
  },
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a VirtualRouter with additional properties such as multiple listeners and tags for better management:

```ts
const advancedVirtualRouter = await AWS.AppMesh.VirtualRouter("advancedVirtualRouter", {
  MeshName: "myAppMesh",
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
    }]
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Team",
    Value: "DevOps"
  }]
});
```

## Custom Mesh Owner

Create a VirtualRouter specifying a custom mesh owner if required:

```ts
const customOwnerVirtualRouter = await AWS.AppMesh.VirtualRouter("customOwnerVirtualRouter", {
  MeshName: "myAppMesh",
  MeshOwner: "123456789012", // Example AWS account ID
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }]
  }
});
```

## Adoption of Existing Resource

Configure a VirtualRouter that adopts an existing resource instead of failing:

```ts
const adoptExistingVirtualRouter = await AWS.AppMesh.VirtualRouter("adoptExistingVirtualRouter", {
  MeshName: "myAppMesh",
  Spec: {
    Listeners: [{
      PortMapping: {
        Port: 8080,
        Protocol: "http"
      }
    }]
  },
  adopt: true // Allows adoption of an existing resource
});
```
