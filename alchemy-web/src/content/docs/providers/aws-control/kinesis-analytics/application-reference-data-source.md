---
title: ApplicationReferenceDataSource
description: Learn how to create, update, and manage AWS KinesisAnalytics ApplicationReferenceDataSources using Alchemy Cloud Control.
---


The ApplicationReferenceDataSource resource allows you to manage reference data sources for AWS Kinesis Analytics applications. This is essential for analytics applications that require static datasets for processing. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/).

## Minimal Example

Create a basic ApplicationReferenceDataSource linked to a Kinesis Analytics application.

```ts
import AWS from "alchemy/aws/control";

const referenceDataSource = await AWS.KinesisAnalytics.ApplicationReferenceDataSource("MyReferenceDataSource", {
  ApplicationName: "MyKinesisAnalyticsApp",
  ReferenceDataSource: {
    DataSourceSchema: {
      RecordFormat: {
        RecordFormatType: "CSV",
        MappingParameters: {
          CSVMappingParameters: {
            RecordDelimiter: "\n",
            FieldDelimiter: ","
          }
        }
      },
      RecordColumns: [
        { Name: "column1", SqlType: "VARCHAR(64)" },
        { Name: "column2", SqlType: "INTEGER" }
      ]
    },
    S3ReferenceDataSource: {
      BucketARN: "arn:aws:s3:::my-reference-data-bucket",
      FileKey: "path/to/reference-data.csv",
      ReferenceRoleARN: "arn:aws:iam::123456789012:role/service-role/MyKinesisAnalyticsRole"
    }
  },
  adopt: false // Default is false
});
```

## Advanced Configuration

Set up an ApplicationReferenceDataSource with additional configuration for handling updates.

```ts
const advancedReferenceDataSource = await AWS.KinesisAnalytics.ApplicationReferenceDataSource("AdvancedReferenceDataSource", {
  ApplicationName: "MyAdvancedKinesisAnalyticsApp",
  ReferenceDataSource: {
    DataSourceSchema: {
      RecordFormat: {
        RecordFormatType: "JSON",
        MappingParameters: {
          JSONMappingParameters: {
            RecordRowPath: "$"
          }
        }
      },
      RecordColumns: [
        { Name: "userId", SqlType: "VARCHAR(128)" },
        { Name: "eventTime", SqlType: "TIMESTAMP" },
        { Name: "eventType", SqlType: "VARCHAR(64)" }
      ]
    },
    S3ReferenceDataSource: {
      BucketARN: "arn:aws:s3:::my-advanced-reference-data-bucket",
      FileKey: "path/to/advanced-reference-data.json",
      ReferenceRoleARN: "arn:aws:iam::123456789012:role/service-role/MyAdvancedKinesisAnalyticsRole"
    }
  },
  adopt: true // Adopt existing resource if it exists
});
```

## Handling Multiple Data Sources

Manage multiple reference data sources for a Kinesis Analytics application.

```ts
const multiSourceReferenceDataSource = await AWS.KinesisAnalytics.ApplicationReferenceDataSource("MultiSourceReferenceDataSource", {
  ApplicationName: "MyMultiSourceKinesisAnalyticsApp",
  ReferenceDataSource: {
    DataSourceSchema: {
      RecordFormat: {
        RecordFormatType: "CSV",
        MappingParameters: {
          CSVMappingParameters: {
            RecordDelimiter: "\n",
            FieldDelimiter: ","
          }
        }
      },
      RecordColumns: [
        { Name: "transactionId", SqlType: "VARCHAR(64)" },
        { Name: "amount", SqlType: "FLOAT" },
        { Name: "currency", SqlType: "VARCHAR(3)" }
      ]
    },
    S3ReferenceDataSource: {
      BucketARN: "arn:aws:s3:::multi-source-bucket",
      FileKey: "path/to/multi-source-data.csv",
      ReferenceRoleARN: "arn:aws:iam::123456789012:role/service-role/MyMultiSourceKinesisAnalyticsRole"
    }
  }
});
```
