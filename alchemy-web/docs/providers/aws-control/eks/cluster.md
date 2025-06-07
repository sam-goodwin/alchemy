---
title: Managing AWS EKS Clusters with Alchemy
description: Learn how to create, update, and manage AWS EKS Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS EKS Clusters](https://docs.aws.amazon.com/eks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eks-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.EKS.Cluster("cluster-example", {
  RoleArn: "example-rolearn",
  ResourcesVpcConfig: "example-resourcesvpcconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.EKS.Cluster("advanced-cluster", {
  RoleArn: "example-rolearn",
  ResourcesVpcConfig: "example-resourcesvpcconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Logging: "example-logging",
});
```

