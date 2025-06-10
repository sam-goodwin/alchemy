---
title: Table
description: Learn how to create, update, and manage AWS Glue Tables using Alchemy Cloud Control.
---


The Table resource allows you to manage [AWS Glue Tables](https://docs.aws.amazon.com/glue/latest/userguide/) for organizing and accessing your data in AWS. Glue Tables are used in data lakes and can be queried with Amazon Athena or used in ETL processes with AWS Glue.

## Minimal Example

Create a basic Glue Table with essential properties, including a database name and catalog ID.

```ts
import AWS from "alchemy/aws/control";

const glueTable = await AWS.Glue.Table("myGlueTable", {
  TableInput: {
    Name: "sales_data",
    Description: "Table containing sales data",
    StorageDescriptor: {
      Columns: [
        { Name: "transaction_id", Type: "string" },
        { Name: "amount", Type: "double" },
        { Name: "date", Type: "timestamp" }
      ],
      Location: "s3://my-bucket/sales_data/",
      InputFormat: "org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat",
      OutputFormat: "org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat",
      SerdeInfo: {
        SerializationLibrary: "org.apache.hadoop.hive.ql.io.parquet.serde.ParquetSerDe"
      }
    }
  },
  DatabaseName: "sales_database",
  CatalogId: "123456789012"
});
```

## Advanced Configuration

Configure a Glue Table with Open Table Format input and additional metadata.

```ts
const advancedGlueTable = await AWS.Glue.Table("advancedGlueTable", {
  TableInput: {
    Name: "customer_data",
    Description: "Table containing customer information",
    StorageDescriptor: {
      Columns: [
        { Name: "customer_id", Type: "string" },
        { Name: "customer_name", Type: "string" },
        { Name: "signup_date", Type: "timestamp" }
      ],
      Location: "s3://my-bucket/customer_data/",
      InputFormat: "org.apache.parquet.hadoop.ParquetInputFormat",
      OutputFormat: "org.apache.parquet.hadoop.ParquetOutputFormat",
      SerdeInfo: {
        SerializationLibrary: "org.apache.parquet.hive.serde2.ParquetHiveSerDe"
      }
    },
    PartitionKeys: [
      { Name: "country", Type: "string" }
    ]
  },
  OpenTableFormatInput: {
    Format: "ORC",
    Parameters: {
      "orc.compress": "SNAPPY"
    }
  },
  DatabaseName: "customer_database",
  CatalogId: "123456789012"
});
```

## Use Case: Partitioned Table for Efficient Queries

Create a partitioned Glue Table to optimize query performance for large datasets.

```ts
const partitionedGlueTable = await AWS.Glue.Table("partitionedGlueTable", {
  TableInput: {
    Name: "web_logs",
    Description: "Table containing web server logs",
    StorageDescriptor: {
      Columns: [
        { Name: "log_id", Type: "string" },
        { Name: "ip_address", Type: "string" },
        { Name: "timestamp", Type: "timestamp" },
        { Name: "url", Type: "string" }
      ],
      Location: "s3://my-bucket/web_logs/",
      InputFormat: "org.apache.hadoop.mapred.TextInputFormat",
      OutputFormat: "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
      SerdeInfo: {
        SerializationLibrary: "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe",
        Parameters: {
          "field.delim": ","
        }
      }
    },
    PartitionKeys: [
      { Name: "year", Type: "int" },
      { Name: "month", Type: "int" },
      { Name: "day", Type: "int" }
    ]
  },
  DatabaseName: "logs_database",
  CatalogId: "123456789012"
});
``` 

This documentation provides you with the foundational knowledge to create, configure, and manage AWS Glue Tables effectively using Alchemy Cloud Control.
