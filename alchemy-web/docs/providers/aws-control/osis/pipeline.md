---
title: Managing AWS OSIS Pipelines with Alchemy
description: Learn how to create, update, and manage AWS OSIS Pipelines using Alchemy Cloud Control.
---

# Pipeline

The Pipeline resource lets you create and manage [AWS OSIS Pipelines](https://docs.aws.amazon.com/osis/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-osis-pipeline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pipeline = await AWS.OSIS.Pipeline("pipeline-example", {
  PipelineConfigurationBody: "example-pipelineconfigurationbody",
  MinUnits: 1,
  PipelineName: "pipeline-pipeline",
  MaxUnits: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a pipeline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPipeline = await AWS.OSIS.Pipeline("advanced-pipeline", {
  PipelineConfigurationBody: "example-pipelineconfigurationbody",
  MinUnits: 1,
  PipelineName: "pipeline-pipeline",
  MaxUnits: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

