---
title: Export
description: Learn how to create, update, and manage AWS BCMDataExports Exports using Alchemy Cloud Control.
---


The Export resource allows you to manage [AWS BCMDataExports Exports](https://docs.aws.amazon.com/bcmdataexports/latest/userguide/) for exporting data from your AWS account. This resource enables the definition of export settings, including data sources and output formats.

## Minimal Example

Create a basic Export resource with required properties and common optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicExport = await AWS.BCMDataExports.Export("basicExport", {
  Export: {
    // Define your export configurations here
    source: {
      type: "S3Bucket",
      bucketName: "my-data-bucket",
      prefix: "exports/"
    },
    destination: {
      type: "S3Bucket",
      bucketName: "my-exports-bucket",
      prefix: "exports/"
    },
    format: "CSV"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```

## Advanced Configuration

Configure an export with additional settings such as custom data formats and filtering options.

```ts
const advancedExport = await AWS.BCMDataExports.Export("advancedExport", {
  Export: {
    source: {
      type: "DynamoDB",
      tableName: "CustomerData"
    },
    destination: {
      type: "S3Bucket",
      bucketName: "my-advanced-exports-bucket",
      prefix: "customer-exports/"
    },
    format: "JSON",
    filters: {
      includeFields: ["CustomerID", "CustomerName", "OrderTotal"],
      excludeFields: ["SensitiveInfo"]
    }
  },
  Tags: [
    { Key: "Project", Value: "DataMigration" }
  ],
  adopt: false
});
```

## Scheduled Exports

Set up an export that runs on a schedule, enabling automated data extraction.

```ts
const scheduledExport = await AWS.BCMDataExports.Export("scheduledExport", {
  Export: {
    source: {
      type: "RDS",
      databaseName: "SalesDB"
    },
    destination: {
      type: "S3Bucket",
      bucketName: "my-scheduled-exports-bucket",
      prefix: "sales-exports/"
    },
    format: "Parquet",
    schedule: {
      frequency: "Daily",
      time: "02:00" // UTC
    }
  },
  Tags: [
    { Key: "Category", Value: "DailyReports" }
  ]
});
```

## Event-Driven Exports

Create an export that is triggered by specific events, such as data updates.

```ts
const eventDrivenExport = await AWS.BCMDataExports.Export("eventDrivenExport", {
  Export: {
    source: {
      type: "KinesisStream",
      streamName: "RealTimeDataStream"
    },
    destination: {
      type: "S3Bucket",
      bucketName: "my-event-driven-exports-bucket",
      prefix: "real-time-exports/"
    },
    format: "ORC",
    triggers: {
      eventType: "DataUpdate",
      sourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/RealTimeDataStream"
    }
  },
  Tags: [
    { Key: "UseCase", Value: "RealTimeAnalytics" }
  ],
  adopt: true
});
```
