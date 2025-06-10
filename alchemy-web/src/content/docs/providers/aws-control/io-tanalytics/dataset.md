---
title: Dataset
description: Learn how to create, update, and manage AWS IoTAnalytics Datasets using Alchemy Cloud Control.
---


The Dataset resource lets you manage [AWS IoTAnalytics Datasets](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) for analyzing and processing IoT data.

## Minimal Example

Create a basic IoTAnalytics dataset with required properties and a retention period.

```ts
import AWS from "alchemy/aws/control";

const basicDataset = await AWS.IoTAnalytics.Dataset("basicDataset", {
  Actions: [
    {
      ActionType: "SELECT",
      SqlQuery: "SELECT * FROM my_iot_data"
    }
  ],
  RetentionPeriod: {
    NumberOfDays: 30,
    Unlimited: false
  },
  DatasetName: "BasicDataset"
});
```

## Advanced Configuration

Configure a dataset with advanced options including content delivery rules and triggers.

```ts
const advancedDataset = await AWS.IoTAnalytics.Dataset("advancedDataset", {
  Actions: [
    {
      ActionType: "SELECT",
      SqlQuery: "SELECT * FROM my_iot_data WHERE temperature > 75"
    }
  ],
  ContentDeliveryRules: [
    {
      Destination: {
        S3DestinationConfiguration: {
          Bucket: "my-iot-data-bucket",
          Key: "advanced_dataset_output.json"
        }
      },
      RuleName: "S3DeliveryRule"
    }
  ],
  Triggers: [
    {
      Schedule: {
        Expression: "rate(1 hour)"
      },
      TriggerType: "SCHEDULED"
    }
  ],
  DatasetName: "AdvancedDataset"
});
```

## Using Late Data Rules

Create a dataset that applies late data rules to manage data arrival delays.

```ts
const lateDataDataset = await AWS.IoTAnalytics.Dataset("lateDataDataset", {
  Actions: [
    {
      ActionType: "SELECT",
      SqlQuery: "SELECT * FROM my_iot_data"
    }
  ],
  LateDataRules: [
    {
      RuleName: "LateDataRule",
      Timestamp: {
        ColumnName: "timestamp",
        TimeOffset: {
          OffsetSeconds: 3600 // 1 hour
        }
      },
      Limit: 1000
    }
  ],
  DatasetName: "LateDataDataset"
});
```

## Tags for Resource Management

Create a dataset with tags to facilitate resource management and cost tracking.

```ts
const taggedDataset = await AWS.IoTAnalytics.Dataset("taggedDataset", {
  Actions: [
    {
      ActionType: "SELECT",
      SqlQuery: "SELECT * FROM my_iot_data"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "DataScience"
    }
  ],
  DatasetName: "TaggedDataset"
});
```
