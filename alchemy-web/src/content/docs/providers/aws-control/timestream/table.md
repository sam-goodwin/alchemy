---
title: Table
description: Learn how to create, update, and manage AWS Timestream Tables using Alchemy Cloud Control.
---


The Table resource allows you to manage [AWS Timestream Tables](https://docs.aws.amazon.com/timestream/latest/userguide/) for time series data storage and analysis.

## Minimal Example

Create a basic Timestream table with required properties and a common optional property for retention settings:

```ts
import AWS from "alchemy/aws/control";

const timestreamTable = await AWS.Timestream.Table("myTimestreamTable", {
  DatabaseName: "myDatabase",
  TableName: "myTable",
  RetentionProperties: {
    MemoryStoreRetentionPeriodInHours: 24,
    MagneticStoreRetentionPeriodInDays: 30
  }
});
```

## Advanced Configuration

Configure a Timestream table with additional properties for schema and magnetic store write properties:

```ts
const advancedTimestreamTable = await AWS.Timestream.Table("advancedTimestreamTable", {
  DatabaseName: "myDatabase",
  TableName: "myAdvancedTable",
  RetentionProperties: {
    MemoryStoreRetentionPeriodInHours: 48,
    MagneticStoreRetentionPeriodInDays: 60
  },
  Schema: {
    Columns: [
      { Name: "temperature", Type: "DOUBLE" },
      { Name: "humidity", Type: "DOUBLE" },
      { Name: "device_id", Type: "VARCHAR" }
    ],
    PrimaryKey: {
      Time: { Name: "time", Type: "TIMESTAMP" },
      Dimension: [{ Name: "device_id" }]
    }
  },
  MagneticStoreWriteProperties: {
    EnableMagneticStoreWrites: true,
    MagneticStoreWriteBufferSize: 1024,
    MagneticStoreWriteBufferSizeInBytes: 1048576
  }
});
```

## Tags for Resource Management

Create a Timestream table with tags for better resource management:

```ts
const taggedTimestreamTable = await AWS.Timestream.Table("taggedTimestreamTable", {
  DatabaseName: "myDatabase",
  TableName: "myTaggedTable",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoT Monitoring" }
  ]
});
```

## Updating a Table

Example of updating an existing Timestream table to change retention properties:

```ts
const updateTimestreamTable = await AWS.Timestream.Table("updateTimestreamTable", {
  DatabaseName: "myDatabase",
  TableName: "myTable",
  RetentionProperties: {
    MemoryStoreRetentionPeriodInHours: 72,
    MagneticStoreRetentionPeriodInDays: 90
  },
  adopt: true // Specify to adopt an existing resource
});
```
