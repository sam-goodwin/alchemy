---
title: ApplicationReferenceDataSource
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationReferenceDataSources using Alchemy Cloud Control.
---


The ApplicationReferenceDataSource resource lets you manage the reference data sources for AWS Kinesis Analytics V2 applications. This allows you to define how your application interacts with reference data to enhance your analytics capabilities. For more details, see the [AWS KinesisAnalyticsV2 ApplicationReferenceDataSources documentation](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/).

## Minimal Example

Create a basic ApplicationReferenceDataSource with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const referenceDataSource = await AWS.KinesisAnalyticsV2.ApplicationReferenceDataSource("MyReferenceDataSource", {
  ApplicationName: "MyKinesisAnalyticsApp",
  ReferenceDataSource: {
    TableName: "ReferenceDataTable",
    S3ReferenceDataSource: {
      BucketArn: "arn:aws:s3:::my-reference-data-bucket",
      FileKey: "reference-data.csv"
    },
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
      RecordSchema: {
        RecordColumns: [
          { Name: "id", SqlType: "INTEGER" },
          { Name: "name", SqlType: "VARCHAR(50)" }
        ],
        RecordFormat: "CSV"
      }
    }
  },
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure an ApplicationReferenceDataSource with additional settings for the schema and data format.

```ts
const advancedReferenceDataSource = await AWS.KinesisAnalyticsV2.ApplicationReferenceDataSource("AdvancedReferenceDataSource", {
  ApplicationName: "MyAdvancedKinesisAnalyticsApp",
  ReferenceDataSource: {
    TableName: "AdvancedReferenceDataTable",
    S3ReferenceDataSource: {
      BucketArn: "arn:aws:s3:::advanced-reference-data-bucket",
      FileKey: "advanced-reference-data.json"
    },
    DataSourceSchema: {
      RecordFormat: {
        RecordFormatType: "JSON",
        MappingParameters: {
          JSONMappingParameters: {
            RecordRowPath: "$"
          }
        }
      },
      RecordSchema: {
        RecordColumns: [
          { Name: "userId", SqlType: "INTEGER" },
          { Name: "purchaseAmount", SqlType: "FLOAT" },
          { Name: "purchaseDate", SqlType: "TIMESTAMP" }
        ],
        RecordFormat: "JSON"
      }
    }
  }
});
```

## Using with Multiple Data Sources

Create an ApplicationReferenceDataSource that integrates multiple data sources for enhanced analytics.

```ts
const multiSourceReferenceDataSource = await AWS.KinesisAnalyticsV2.ApplicationReferenceDataSource("MultiSourceReferenceDataSource", {
  ApplicationName: "MyMultiSourceApp",
  ReferenceDataSource: {
    TableName: "MultiSourceDataTable",
    S3ReferenceDataSource: {
      BucketArn: "arn:aws:s3:::multi-source-data-bucket",
      FileKey: "data-set-1.csv"
    },
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
      RecordSchema: {
        RecordColumns: [
          { Name: "orderId", SqlType: "INTEGER" },
          { Name: "totalAmount", SqlType: "FLOAT" },
          { Name: "orderDate", SqlType: "TIMESTAMP" }
        ],
        RecordFormat: "CSV"
      }
    }
  }
});
```
