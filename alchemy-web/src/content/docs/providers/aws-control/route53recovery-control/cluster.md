---
title: Cluster
description: Learn how to create, update, and manage AWS Route53RecoveryControl Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS Route53RecoveryControl Clusters](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) for routing traffic and controlling failover in your applications.

## Minimal Example

Create a basic Route53RecoveryControl Cluster with essential properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const route53Cluster = await AWS.Route53RecoveryControl.Cluster("basic-cluster", {
  name: "PrimaryCluster",
  networkType: "CLOUD",
  tags: [{ key: "Environment", value: "Production" }]
});
```

## Advanced Configuration

Configure a cluster with additional properties like adopting existing resources.

```ts
const advancedCluster = await AWS.Route53RecoveryControl.Cluster("advanced-cluster", {
  name: "SecondaryCluster",
  networkType: "CLOUD",
  adopt: true,
  tags: [
    { key: "Environment", value: "Staging" },
    { key: "Owner", value: "DevTeam" }
  ]
});
```

## Cluster with Detailed Properties

Create a cluster and access its additional properties after creation.

```ts
const detailedCluster = await AWS.Route53RecoveryControl.Cluster("detailed-cluster", {
  name: "DetailedCluster",
  networkType: "CLOUD"
});

// Accessing the ARN and Creation time of the cluster
console.log(`Cluster ARN: ${detailedCluster.arn}`);
console.log(`Cluster Created At: ${detailedCluster.creationTime}`);
```
