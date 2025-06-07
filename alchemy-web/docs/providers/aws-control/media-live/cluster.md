---
title: Managing AWS MediaLive Clusters with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS MediaLive Clusters](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.MediaLive.Cluster("cluster-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.MediaLive.Cluster("advanced-cluster", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

