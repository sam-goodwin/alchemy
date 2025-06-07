---
title: Managing AWS Batch JobDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Batch JobDefinitions using Alchemy Cloud Control.
---

# JobDefinition

The JobDefinition resource lets you create and manage [AWS Batch JobDefinitions](https://docs.aws.amazon.com/batch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const jobdefinition = await AWS.Batch.JobDefinition("jobdefinition-example", {
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a jobdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedJobDefinition = await AWS.Batch.JobDefinition("advanced-jobdefinition", {
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

