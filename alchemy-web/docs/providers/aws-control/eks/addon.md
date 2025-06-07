---
title: Managing AWS EKS Addons with Alchemy
description: Learn how to create, update, and manage AWS EKS Addons using Alchemy Cloud Control.
---

# Addon

The Addon resource lets you create and manage [AWS EKS Addons](https://docs.aws.amazon.com/eks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eks-addon.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const addon = await AWS.EKS.Addon("addon-example", {
  ClusterName: "addon-cluster",
  AddonName: "addon-addon",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a addon with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAddon = await AWS.EKS.Addon("advanced-addon", {
  ClusterName: "addon-cluster",
  AddonName: "addon-addon",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

