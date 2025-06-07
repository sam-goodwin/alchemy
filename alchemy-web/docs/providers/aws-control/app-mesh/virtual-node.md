---
title: Managing AWS AppMesh VirtualNodes with Alchemy
description: Learn how to create, update, and manage AWS AppMesh VirtualNodes using Alchemy Cloud Control.
---

# VirtualNode

The VirtualNode resource lets you create and manage [AWS AppMesh VirtualNodes](https://docs.aws.amazon.com/appmesh/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appmesh-virtualnode.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const virtualnode = await AWS.AppMesh.VirtualNode("virtualnode-example", {
  MeshName: "virtualnode-mesh",
  Spec: "example-spec",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a virtualnode with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVirtualNode = await AWS.AppMesh.VirtualNode("advanced-virtualnode", {
  MeshName: "virtualnode-mesh",
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

