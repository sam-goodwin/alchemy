---
title: Application
description: Learn how to create, update, and manage AWS KinesisAnalytics Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS KinesisAnalytics Applications](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/) for processing and analyzing streaming data in real time.

## Minimal Example

Create a basic KinesisAnalytics application with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const kinesisAnalyticsApp = await AWS.KinesisAnalytics.Application("basicKinesisApp", {
  ApplicationName: "RealTimeDataAnalytics",
  Inputs: [
    {
      NamePrefix: "InputStream",
      KinesisStreamsInput: {
        ResourceARN: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisStream",
        RoleARN: "arn:aws:iam::123456789012:role/KinesisAnalyticsRole"
      },
      InputSchema: {
        RecordFormat: {
          RecordFormatType: "JSON",
          MappingParameters: {
            JSONMappingParameters: {
              RecordRowPath: "$"
            }
          }
        },
        RecordColumns: [
          { Name: "timestamp", SqlType: "TIMESTAMP", Mapping: "$.timestamp" },
          { Name: "temperature", SqlType: "DOUBLE", Mapping: "$.temperature" }
        ]
      }
    }
  ]
});
```

## Advanced Configuration

Configure an application with additional properties like application description and application code.

```ts
const advancedKinesisAnalyticsApp = await AWS.KinesisAnalytics.Application("advancedKinesisApp", {
  ApplicationName: "AdvancedDataAnalytics",
  ApplicationDescription: "This application processes real-time temperature data from sensors.",
  ApplicationCode: `
    CREATE OR REPLACE STREAM "OutputStream" AS
    SELECT * FROM "InputStream" WHERE temperature > 30;
  `,
  Inputs: [
    {
      NamePrefix: "InputStream",
      KinesisStreamsInput: {
        ResourceARN: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisStream",
        RoleARN: "arn:aws:iam::123456789012:role/KinesisAnalyticsRole"
      },
      InputSchema: {
        RecordFormat: {
          RecordFormatType: "JSON",
          MappingParameters: {
            JSONMappingParameters: {
              RecordRowPath: "$"
            }
          }
        },
        RecordColumns: [
          { Name: "timestamp", SqlType: "TIMESTAMP", Mapping: "$.timestamp" },
          { Name: "temperature", SqlType: "DOUBLE", Mapping: "$.temperature" }
        ]
      }
    }
  ]
});
```

## Real-Time Data Processing

Create an application that processes streaming data and outputs the filtered results to another stream.

```ts
const realTimeDataApp = await AWS.KinesisAnalytics.Application("realTimeProcessingApp", {
  ApplicationName: "RealTimeTemperatureFilter",
  ApplicationDescription: "Filters out temperature readings above a threshold.",
  ApplicationCode: `
    CREATE OR REPLACE STREAM "FilteredOutput" AS
    SELECT timestamp, temperature FROM "InputStream" WHERE temperature > 30;
  `,
  Inputs: [
    {
      NamePrefix: "InputStream",
      KinesisStreamsInput: {
        ResourceARN: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisStream",
        RoleARN: "arn:aws:iam::123456789012:role/KinesisAnalyticsRole"
      },
      InputSchema: {
        RecordFormat: {
          RecordFormatType: "JSON",
          MappingParameters: {
            JSONMappingParameters: {
              RecordRowPath: "$"
            }
          }
        },
        RecordColumns: [
          { Name: "timestamp", SqlType: "TIMESTAMP", Mapping: "$.timestamp" },
          { Name: "temperature", SqlType: "DOUBLE", Mapping: "$.temperature" }
        ]
      }
    }
  ]
});
```
