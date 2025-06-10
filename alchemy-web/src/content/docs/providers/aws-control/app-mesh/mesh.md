---
title: Mesh
description: Learn how to create, update, and manage AWS AppMesh Meshs using Alchemy Cloud Control.
---


The Mesh resource lets you manage [AWS AppMesh Meshs](https://docs.aws.amazon.com/appmesh/latest/userguide/) for controlling microservices communication in your applications.

## Minimal Example

Create a basic AppMesh Mesh with a specified name:

```ts
import AWS from "alchemy/aws/control";

const appMesh = await AWS.AppMesh.Mesh("basicMesh", {
  MeshName: "my-app-mesh",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a Mesh with detailed specifications including routing and service discovery:

```ts
const advancedMesh = await AWS.AppMesh.Mesh("advancedMesh", {
  MeshName: "advanced-app-mesh",
  Spec: {
    // Define the specification for the mesh including routing details
    egressFilter: {
      type: "ALLOW_ALL"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevOps" }
  ]
});
```

## Custom Adoption

Create a Mesh that adopts existing resources if they already exist:

```ts
const adoptMesh = await AWS.AppMesh.Mesh("adoptExistingMesh", {
  MeshName: "existing-app-mesh",
  adopt: true // Will adopt the existing resource instead of failing
});
```

## Tagging for Organization

Create a Mesh with specific tags for better organization and resource management:

```ts
const taggedMesh = await AWS.AppMesh.Mesh("taggedMesh", {
  MeshName: "tagged-app-mesh",
  Tags: [
    { Key: "Project", Value: "Microservices" },
    { Key: "Version", Value: "v1.0" }
  ]
});
```
