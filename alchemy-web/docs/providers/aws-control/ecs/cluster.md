---
title: Managing AWS ECS Clusters with Alchemy
description: Learn how to create, update, and manage AWS ECS Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS ECS Clusters](https://docs.aws.amazon.com/ecs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.ECS.Cluster("cluster-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.ECS.Cluster("advanced-cluster", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Configuration: "example-configuration",
});
```

