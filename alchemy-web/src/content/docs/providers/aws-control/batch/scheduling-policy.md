---
title: SchedulingPolicy
description: Learn how to create, update, and manage AWS Batch SchedulingPolicys using Alchemy Cloud Control.
---


The SchedulingPolicy resource allows you to manage the scheduling policies for AWS Batch jobs, which define how jobs are scheduled and prioritized within the Batch environment. For more information, visit the [AWS Batch SchedulingPolicys documentation](https://docs.aws.amazon.com/batch/latest/userguide/).

## Minimal Example

Create a basic scheduling policy with a fair share policy:

```ts
import AWS from "alchemy/aws/control";

const minimalSchedulingPolicy = await AWS.Batch.SchedulingPolicy("minimalSchedulingPolicy", {
  Name: "MinimalSchedulingPolicy",
  FairsharePolicy: {
    ShareDecaySeconds: 86400,
    ComputeEnvironments: [
      {
        ComputeEnvironment: "exampleComputeEnv",
        Share: 100
      }
    ]
  },
  Tags: {
    Environment: "Development",
    Team: "Batch"
  }
});
```

## Advanced Configuration

Configure a scheduling policy with more complex fair share settings:

```ts
const advancedSchedulingPolicy = await AWS.Batch.SchedulingPolicy("advancedSchedulingPolicy", {
  Name: "AdvancedSchedulingPolicy",
  FairsharePolicy: {
    ShareDecaySeconds: 3600,
    ComputeEnvironments: [
      {
        ComputeEnvironment: "exampleComputeEnv1",
        Share: 70
      },
      {
        ComputeEnvironment: "exampleComputeEnv2",
        Share: 30
      }
    ]
  },
  Tags: {
    Environment: "Production",
    Team: "Batch"
  }
});
```

## Policy with Tags

Create a scheduling policy specifically for a team with detailed tags:

```ts
const teamSchedulingPolicy = await AWS.Batch.SchedulingPolicy("teamSchedulingPolicy", {
  Name: "TeamSchedulingPolicy",
  FairsharePolicy: {
    ShareDecaySeconds: 7200,
    ComputeEnvironments: [
      {
        ComputeEnvironment: "teamComputeEnv",
        Share: 50
      }
    ]
  },
  Tags: {
    Project: "DataProcessing",
    Owner: "DataTeam",
    Purpose: "BatchJobScheduling"
  }
});
```

## Adoption of Existing Resource

Create a scheduling policy that adopts an existing resource if it already exists:

```ts
const adoptSchedulingPolicy = await AWS.Batch.SchedulingPolicy("adoptSchedulingPolicy", {
  Name: "AdoptSchedulingPolicy",
  FairsharePolicy: {
    ShareDecaySeconds: 43200,
    ComputeEnvironments: [
      {
        ComputeEnvironment: "adoptComputeEnv",
        Share: 100
      }
    ]
  },
  Tags: {
    Environment: "Testing"
  },
  adopt: true // Enable adoption of existing resource
});
```
