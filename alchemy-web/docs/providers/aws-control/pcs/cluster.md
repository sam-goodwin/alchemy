---
title: Managing AWS PCS Clusters with Alchemy
description: Learn how to create, update, and manage AWS PCS Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS PCS Clusters](https://docs.aws.amazon.com/pcs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcs-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.PCS.Cluster("cluster-example", {
  Networking: "example-networking",
  Scheduler: "example-scheduler",
  Size: "example-size",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.PCS.Cluster("advanced-cluster", {
  Networking: "example-networking",
  Scheduler: "example-scheduler",
  Size: "example-size",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

