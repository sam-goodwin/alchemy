---
title: ClusterCapacityProviderAssociations
description: Learn how to create, update, and manage AWS ECS ClusterCapacityProviderAssociations using Alchemy Cloud Control.
---


The ClusterCapacityProviderAssociations resource allows you to manage [AWS ECS Cluster Capacity Provider Associations](https://docs.aws.amazon.com/ecs/latest/userguide/) for your Amazon ECS clusters. This resource enables you to define the default capacity provider strategy and associate capacity providers with clusters, facilitating the management of containerized applications.

## Minimal Example

In this example, we create a basic Cluster Capacity Provider Association with default properties and a single capacity provider.

```ts
import AWS from "alchemy/aws/control";

const basicCapacityProviderAssociation = await AWS.ECS.ClusterCapacityProviderAssociations("basic-association", {
  DefaultCapacityProviderStrategy: [
    {
      capacityProvider: "Fargate",
      weight: 1
    }
  ],
  CapacityProviders: ["Fargate"],
  Cluster: "my-ecs-cluster"
});
```

## Advanced Configuration

This example demonstrates how to configure multiple capacity providers and define a more complex default capacity provider strategy.

```ts
const advancedCapacityProviderAssociation = await AWS.ECS.ClusterCapacityProviderAssociations("advanced-association", {
  DefaultCapacityProviderStrategy: [
    {
      capacityProvider: "Fargate",
      weight: 2
    },
    {
      capacityProvider: "FargateSpot",
      weight: 1
    }
  ],
  CapacityProviders: ["Fargate", "FargateSpot"],
  Cluster: "my-ecs-cluster"
});
```

## Adoption of Existing Resource

In this example, we configure the association to adopt an existing capacity provider resource instead of failing if it already exists.

```ts
const adoptExistingAssociation = await AWS.ECS.ClusterCapacityProviderAssociations("adopt-existing-association", {
  DefaultCapacityProviderStrategy: [
    {
      capacityProvider: "FargateSpot",
      weight: 1
    }
  ],
  CapacityProviders: ["Fargate", "FargateSpot"],
  Cluster: "my-ecs-cluster",
  adopt: true
});
```

## Using with Multiple Clusters

This example illustrates how to associate capacity providers with multiple ECS clusters by creating separate associations.

```ts
const cluster1Association = await AWS.ECS.ClusterCapacityProviderAssociations("cluster1-association", {
  DefaultCapacityProviderStrategy: [
    {
      capacityProvider: "Fargate",
      weight: 1
    }
  ],
  CapacityProviders: ["Fargate"],
  Cluster: "my-first-ecs-cluster"
});

const cluster2Association = await AWS.ECS.ClusterCapacityProviderAssociations("cluster2-association", {
  DefaultCapacityProviderStrategy: [
    {
      capacityProvider: "FargateSpot",
      weight: 1
    }
  ],
  CapacityProviders: ["Fargate", "FargateSpot"],
  Cluster: "my-second-ecs-cluster"
});
```
