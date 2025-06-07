---
title: Managing AWS MSK Clusters with Alchemy
description: Learn how to create, update, and manage AWS MSK Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you create and manage [AWS MSK Clusters](https://docs.aws.amazon.com/msk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cluster = await AWS.MSK.Cluster("cluster-example", {
  KafkaVersion: "example-kafkaversion",
  NumberOfBrokerNodes: 1,
  BrokerNodeGroupInfo: "example-brokernodegroupinfo",
  ClusterName: "cluster-cluster",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCluster = await AWS.MSK.Cluster("advanced-cluster", {
  KafkaVersion: "example-kafkaversion",
  NumberOfBrokerNodes: 1,
  BrokerNodeGroupInfo: "example-brokernodegroupinfo",
  ClusterName: "cluster-cluster",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

