---
title: Pipeline
description: Learn how to create, update, and manage AWS IoTAnalytics Pipelines using Alchemy Cloud Control.
---


The Pipeline resource lets you create and manage [AWS IoTAnalytics Pipelines](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) for processing and analyzing IoT data streams.

## Minimal Example

Create a basic IoTAnalytics Pipeline with a name and a single activity.

```ts
import AWS from "alchemy/aws/control";

const minimalPipeline = await AWS.IoTAnalytics.Pipeline("basicPipeline", {
  PipelineName: "BasicPipeline",
  PipelineActivities: [
    {
      Channel: {
        ChannelName: "myChannel",
        Next: "myActivity"
      }
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a pipeline with multiple activities and more advanced settings like tags.

```ts
const advancedPipeline = await AWS.IoTAnalytics.Pipeline("advancedPipeline", {
  PipelineName: "AdvancedPipeline",
  PipelineActivities: [
    {
      Channel: {
        ChannelName: "myChannel",
        Next: "dataProcessingActivity"
      }
    },
    {
      Math: {
        Name: "calculateAverage",
        Attribute: "temperature",
        Next: "storeInDatastore"
      }
    },
    {
      Datastore: {
        DatastoreName: "myDatastore",
        Next: null
      }
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "IoTAnalytics"
    },
    {
      Key: "Owner",
      Value: "DataTeam"
    }
  ]
});
```

## Real-time Data Processing

Set up a pipeline for real-time data processing with a filtering activity.

```ts
const realTimePipeline = await AWS.IoTAnalytics.Pipeline("realTimePipeline", {
  PipelineName: "RealTimeDataProcessing",
  PipelineActivities: [
    {
      Filter: {
        Name: "filterTemperature",
        Filter: "temperature > 20",
        Next: "storeFilteredData"
      }
    },
    {
      Datastore: {
        DatastoreName: "filteredDataStore",
        Next: null
      }
    }
  ]
});
```

## Complex Data Transformation

Create a pipeline that includes multiple transformation activities for complex data handling.

```ts
const complexPipeline = await AWS.IoTAnalytics.Pipeline("complexPipeline", {
  PipelineName: "ComplexDataTransformation",
  PipelineActivities: [
    {
      Math: {
        Name: "calculateHumidityIndex",
        Attribute: "humidity",
        Next: "aggregateData"
      }
    },
    {
      Aggregate: {
        Name: "aggregateTemperature",
        Attribute: "temperature",
        AggregationType: "AVG",
        Next: null
      }
    }
  ]
});
```
