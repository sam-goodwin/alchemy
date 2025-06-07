---
title: Managing AWS SageMaker Pipelines with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Pipelines using Alchemy Cloud Control.
---

# Pipeline

The Pipeline resource lets you create and manage [AWS SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pipeline = await AWS.SageMaker.Pipeline("pipeline-example", {
  PipelineName: "pipeline-pipeline",
  PipelineDefinition: "example-pipelinedefinition",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a pipeline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPipeline = await AWS.SageMaker.Pipeline("advanced-pipeline", {
  PipelineName: "pipeline-pipeline",
  PipelineDefinition: "example-pipelinedefinition",
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

