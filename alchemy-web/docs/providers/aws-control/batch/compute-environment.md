---
title: Managing AWS Batch ComputeEnvironments with Alchemy
description: Learn how to create, update, and manage AWS Batch ComputeEnvironments using Alchemy Cloud Control.
---

# ComputeEnvironment

The ComputeEnvironment resource lets you create and manage [AWS Batch ComputeEnvironments](https://docs.aws.amazon.com/batch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const computeenvironment = await AWS.Batch.ComputeEnvironment("computeenvironment-example", {
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a computeenvironment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedComputeEnvironment = await AWS.Batch.ComputeEnvironment(
  "advanced-computeenvironment",
  {
    Type: "example-type",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

