---
title: Managing AWS CodePipeline Pipelines with Alchemy
description: Learn how to create, update, and manage AWS CodePipeline Pipelines using Alchemy Cloud Control.
---

# Pipeline

The Pipeline resource lets you create and manage [AWS CodePipeline Pipelines](https://docs.aws.amazon.com/codepipeline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codepipeline-pipeline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pipeline = await AWS.CodePipeline.Pipeline("pipeline-example", {
  Stages: [],
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a pipeline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPipeline = await AWS.CodePipeline.Pipeline("advanced-pipeline", {
  Stages: [],
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

