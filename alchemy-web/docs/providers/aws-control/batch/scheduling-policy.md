---
title: Managing AWS Batch SchedulingPolicys with Alchemy
description: Learn how to create, update, and manage AWS Batch SchedulingPolicys using Alchemy Cloud Control.
---

# SchedulingPolicy

The SchedulingPolicy resource in AWS Batch allows you to manage scheduling policies that define how jobs are prioritized and scheduled in your Batch environment. For more information, refer to the [AWS Batch SchedulingPolicys documentation](https://docs.aws.amazon.com/batch/latest/userguide/).

## Minimal Example

Create a basic scheduling policy with a fair share policy and tags.

```ts
import AWS from "alchemy/aws/control";

const MinimalSchedulingPolicy = await AWS.Batch.SchedulingPolicy("BasicSchedulingPolicy", {
  FairsharePolicy: {
    ShareDecaySeconds: 86400,
    ShareDistribution: [
      {
        ShareIdentifier: "TeamA",
        WeightFactor: 1
      },
      {
        ShareIdentifier: "TeamB",
        WeightFactor: 2
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "TeamA" }
  ],
  Name: "BasicSchedulingPolicy"
});
```

## Advanced Configuration

Configure a scheduling policy with a more complex fair share policy and custom naming.

```ts
const AdvancedSchedulingPolicy = await AWS.Batch.SchedulingPolicy("AdvancedSchedulingPolicy", {
  FairsharePolicy: {
    ShareDecaySeconds: 7200,
    ShareDistribution: [
      {
        ShareIdentifier: "TeamX",
        WeightFactor: 3
      },
      {
        ShareIdentifier: "TeamY",
        WeightFactor: 1
      },
      {
        ShareIdentifier: "TeamZ",
        WeightFactor: 2
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "TeamB" }
  ],
  Name: "AdvancedSchedulingPolicy",
  adopt: true // Enables adoption of existing policy if it exists
});
```

## Custom Policy with No Tags

Create a scheduling policy without any tags, focusing solely on the fair share policy.

```ts
const NoTagSchedulingPolicy = await AWS.Batch.SchedulingPolicy("NoTagSchedulingPolicy", {
  FairsharePolicy: {
    ShareDecaySeconds: 1800,
    ShareDistribution: [
      {
        ShareIdentifier: "TeamAlpha",
        WeightFactor: 5
      },
      {
        ShareIdentifier: "TeamBeta",
        WeightFactor: 3
      }
    ]
  },
  Name: "NoTagSchedulingPolicy"
});
```