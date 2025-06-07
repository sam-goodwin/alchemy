---
title: Managing AWS SageMaker Clusters with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS SageMaker Clusters](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.SageMaker.Cluster("cluster-example", {
  InstanceGroups: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.SageMaker.Cluster("advanced-cluster", {
  InstanceGroups: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

