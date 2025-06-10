---
title: Pipeline
description: Learn how to create, update, and manage AWS DataPipeline Pipelines using Alchemy Cloud Control.
---


The Pipeline resource lets you create and manage [AWS DataPipeline Pipelines](https://docs.aws.amazon.com/datapipeline/latest/userguide/) for orchestrating data workflows and managing data processing tasks.

## Resource Documentation

This resource allows you to define workflows that can include activities, data sources, and schedules for processing data in a flexible manner.

## Minimal Example

Create a basic pipeline with a name and description:

```ts
import AWS from "alchemy/aws/control";

const simplePipeline = await AWS.DataPipeline.Pipeline("simplePipeline", {
  Name: "SimpleDataProcessingPipeline",
  Description: "A simple pipeline for processing data from S3 to Redshift.",
  ParameterObjects: [{
    id: "MyParameter",
    attributes: [{
      key: "type",
      stringValue: "String"
    }]
  }],
  PipelineTags: [{
    key: "Environment",
    value: "Development"
  }]
});
```

## Advanced Configuration

Configure a pipeline with parameter values and activate it immediately:

```ts
const advancedPipeline = await AWS.DataPipeline.Pipeline("advancedPipeline", {
  Name: "AdvancedDataProcessingPipeline",
  Description: "An advanced pipeline that processes data with multiple parameters.",
  ParameterObjects: [{
    id: "InputData",
    attributes: [{
      key: "type",
      stringValue: "String"
    }]
  }],
  ParameterValues: [{
    id: "InputData",
    stringValue: "s3://my-bucket/input-data/"
  }],
  Activate: true,
  PipelineTags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Pipeline with Complex Objects

Create a pipeline that includes complex pipeline objects such as activities and schedules:

```ts
const complexPipeline = await AWS.DataPipeline.Pipeline("complexPipeline", {
  Name: "ComplexDataProcessingPipeline",
  Description: "A complex pipeline with activities and schedules.",
  ParameterObjects: [{
    id: "S3Input",
    attributes: [{
      key: "type",
      stringValue: "String"
    }]
  }],
  PipelineObjects: [{
    id: "CopyActivity",
    name: "CopyDataFromS3",
    type: "CopyActivity",
    runsOn: {
      ref: "Ec2Resource"
    },
    input: {
      ref: "S3Input"
    },
    output: {
      ref: "S3Output"
    }
  }, {
    id: "Schedule",
    name: "DailySchedule",
    type: "Schedule",
    startAt: "FIRST_ACTIVATION_DATE_TIME",
    period: "1 Day"
  }],
  Activate: true
});
```
