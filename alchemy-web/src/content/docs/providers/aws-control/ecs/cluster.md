---
title: Cluster
description: Learn how to create, update, and manage AWS ECS Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS ECS Clusters](https://docs.aws.amazon.com/ecs/latest/userguide/) which provide the infrastructure for running containerized applications.

## Minimal Example

Create a basic ECS cluster with a specified name.

```ts
import AWS from "alchemy/aws/control";

const myCluster = await AWS.ECS.Cluster("myEcsCluster", {
  clusterName: "MyEcsCluster",
  capacityProviders: ["FARGATE"],
  tags: [
    {
      key: "Environment",
      value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure an ECS cluster with custom settings, default capacity provider strategy, and service connect defaults.

```ts
const advancedCluster = await AWS.ECS.Cluster("advancedEcsCluster", {
  clusterName: "AdvancedEcsCluster",
  clusterSettings: [
    {
      name: "containerInsights",
      value: "enabled"
    }
  ],
  defaultCapacityProviderStrategy: [
    {
      capacityProvider: "FARGATE",
      weight: 1,
      base: 1
    }
  ],
  serviceConnectDefaults: {
    namespace: "my-service-connect-namespace"
  }
});
```

## Custom Configuration for Capacity Providers

Create a cluster with multiple capacity providers to manage different scaling strategies.

```ts
const customCapacityCluster = await AWS.ECS.Cluster("customCapacityCluster", {
  clusterName: "CustomCapacityCluster",
  capacityProviders: ["FARGATE", "FARGATE_SPOT"],
  tags: [
    {
      key: "Team",
      value: "Engineering"
    }
  ]
});
```

## Cluster with Configuration Settings

Set up a cluster with specific configuration settings for container insights and additional settings.

```ts
const configuredCluster = await AWS.ECS.Cluster("configuredEcsCluster", {
  clusterName: "ConfiguredEcsCluster",
  configuration: {
    executeCommandConfiguration: {
      kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
      logConfiguration: {
        cloudWatchLogGroupName: "my-log-group",
        cloudWatchEncryptionEnabled: true,
        s3BucketName: "my-log-bucket"
      }
    }
  },
  tags: [
    {
      key: "Project",
      value: "Migration"
    }
  ]
});
``` 

## Using Existing Resources

Create a cluster that adopts an existing ECS cluster if it already exists.

```ts
const adoptCluster = await AWS.ECS.Cluster("existingEcsCluster", {
  clusterName: "ExistingEcsCluster",
  adopt: true,
  tags: [
    {
      key: "Status",
      value: "Adopted"
    }
  ]
});
```
