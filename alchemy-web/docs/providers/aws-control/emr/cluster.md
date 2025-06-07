---
title: Managing AWS EMR Clusters with Alchemy
description: Learn how to create, update, and manage AWS EMR Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS EMR Clusters](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticmapreduce-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.EMR.Cluster("cluster-example", {
  Instances: "example-instances",
  JobFlowRole: "example-jobflowrole",
  Name: "cluster-",
  ServiceRole: "example-servicerole",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.EMR.Cluster("advanced-cluster", {
  Instances: "example-instances",
  JobFlowRole: "example-jobflowrole",
  Name: "cluster-",
  ServiceRole: "example-servicerole",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

