---
title: Managing AWS AppMesh VirtualGateways with Alchemy
description: Learn how to create, update, and manage AWS AppMesh VirtualGateways using Alchemy Cloud Control.
---

# VirtualGateway

The VirtualGateway resource lets you create and manage [AWS AppMesh VirtualGateways](https://docs.aws.amazon.com/appmesh/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appmesh-virtualgateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const virtualgateway = await AWS.AppMesh.VirtualGateway("virtualgateway-example", {
  MeshName: "virtualgateway-mesh",
  Spec: "example-spec",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a virtualgateway with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVirtualGateway = await AWS.AppMesh.VirtualGateway("advanced-virtualgateway", {
  MeshName: "virtualgateway-mesh",
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

