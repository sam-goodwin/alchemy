---
title: Managing AWS IoTAnalytics Pipelines with Alchemy
description: Learn how to create, update, and manage AWS IoTAnalytics Pipelines using Alchemy Cloud Control.
---

# Pipeline

The Pipeline resource lets you create and manage [AWS IoTAnalytics Pipelines](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotanalytics-pipeline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pipeline = await AWS.IoTAnalytics.Pipeline("pipeline-example", {
  PipelineActivities: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a pipeline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPipeline = await AWS.IoTAnalytics.Pipeline("advanced-pipeline", {
  PipelineActivities: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

