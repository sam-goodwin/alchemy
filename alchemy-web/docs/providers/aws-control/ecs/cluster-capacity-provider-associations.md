---
title: Managing AWS ECS ClusterCapacityProviderAssociationss with Alchemy
description: Learn how to create, update, and manage AWS ECS ClusterCapacityProviderAssociationss using Alchemy Cloud Control.
---

# ClusterCapacityProviderAssociations

The ClusterCapacityProviderAssociations resource lets you create and manage [AWS ECS ClusterCapacityProviderAssociationss](https://docs.aws.amazon.com/ecs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-clustercapacityproviderassociations.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const clustercapacityproviderassociations = await AWS.ECS.ClusterCapacityProviderAssociations(
  "clustercapacityproviderassociations-example",
  {
    DefaultCapacityProviderStrategy: [],
    CapacityProviders: ["example-capacityproviders-1"],
    Cluster: "example-cluster",
  }
);
```

