---
title: Managing AWS OpsWorks Layers with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks Layers using Alchemy Cloud Control.
---

# Layer

The Layer resource lets you create and manage [AWS OpsWorks Layers](https://docs.aws.amazon.com/opsworks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworks-layer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const layer = await AWS.OpsWorks.Layer("layer-example", {
  AutoAssignElasticIps: true,
  AutoAssignPublicIps: true,
  EnableAutoHealing: true,
  Name: "layer-",
  Shortname: "layer-short",
  StackId: "example-stackid",
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a layer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLayer = await AWS.OpsWorks.Layer("advanced-layer", {
  AutoAssignElasticIps: true,
  AutoAssignPublicIps: true,
  EnableAutoHealing: true,
  Name: "layer-",
  Shortname: "layer-short",
  StackId: "example-stackid",
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

