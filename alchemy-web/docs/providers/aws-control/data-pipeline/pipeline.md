---
title: Managing AWS DataPipeline Pipelines with Alchemy
description: Learn how to create, update, and manage AWS DataPipeline Pipelines using Alchemy Cloud Control.
---

# Pipeline

The Pipeline resource allows you to create and manage [AWS DataPipeline Pipelines](https://docs.aws.amazon.com/datapipeline/latest/userguide/) for orchestrating data workflows in the cloud.

## Minimal Example

Create a basic DataPipeline with essential properties for execution.

```ts
import AWS from "alchemy/aws/control";

const SimplePipeline = await AWS.DataPipeline.Pipeline("SimpleDataPipeline", {
  Name: "SimpleDataPipeline",
  Description: "A simple data pipeline for ETL operations",
  Activate: true,
  PipelineObjects: [
    {
      Id: "Default",
      Name: "Default",
      Fields: [
        {
          Key: "type",
          StringValue: "Cluster"
        }
      ]
    }
  ],
  ParameterObjects: [
    {
      Id: "MyParameter",
      Attributes: [
        {
          Key: "type",
          StringValue: "String"
        },
        {
          Key: "description",
          StringValue: "A parameter for the pipeline"
        }
      ]
    }
  ],
  PipelineTags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a DataPipeline with more complex settings including multiple pipeline objects and parameters.

```ts
const AdvancedPipeline = await AWS.DataPipeline.Pipeline("AdvancedDataPipeline", {
  Name: "AdvancedDataPipeline",
  Description: "An advanced data pipeline with multiple configurations",
  Activate: true,
  PipelineObjects: [
    {
      Id: "CopyActivity",
      Name: "Copy Data Activity",
      Fields: [
        {
          Key: "type",
          StringValue: "CopyActivity"
        },
        {
          Key: "input",
          StringValue: "s3://source-bucket/data"
        },
        {
          Key: "output",
          StringValue: "s3://destination-bucket/data"
        }
      ]
    },
    {
      Id: "Schedule",
      Name: "Schedule",
      Fields: [
        {
          Key: "type",
          StringValue: "Schedule"
        },
        {
          Key: "startAt",
          StringValue: "2023-10-01T00:00:00"
        },
        {
          Key: "endAt",
          StringValue: "2023-10-31T23:59:59"
        }
      ]
    }
  ],
  ParameterObjects: [
    {
      Id: "LogLevel",
      Attributes: [
        {
          Key: "type",
          StringValue: "String"
        },
        {
          Key: "description",
          StringValue: "Log level for the pipeline"
        }
      ]
    }
  ]
});
```

## Using Parameter Values

Demonstrate how to define and use parameter values within a DataPipeline.

```ts
const ParameterizedPipeline = await AWS.DataPipeline.Pipeline("ParameterizedDataPipeline", {
  Name: "ParameterizedDataPipeline",
  Description: "Pipeline utilizing parameter values for flexibility",
  Activate: true,
  PipelineObjects: [
    {
      Id: "ShellCommandActivity",
      Name: "Shell Command Activity",
      Fields: [
        {
          Key: "type",
          StringValue: "ShellCommandActivity"
        },
        {
          Key: "command",
          StringValue: "aws s3 cp s3://source-bucket/${LogFile} s3://destination-bucket/"
        }
      ]
    }
  ],
  ParameterValues: [
    {
      Id: "LogFile",
      StringValue: "logs/data-log.txt"
    }
  ]
});
``` 

This documentation provides a clear overview and practical examples for managing AWS DataPipeline Pipelines using Alchemy. Each example illustrates different configurations and use cases to help you effectively utilize this resource.