---
title: Schema
description: Learn how to create, update, and manage AWS Glue Schemas using Alchemy Cloud Control.
---


The Schema resource allows you to manage [AWS Glue Schemas](https://docs.aws.amazon.com/glue/latest/userguide/) for organizing and validating your data. This resource is essential for defining the structure of your data and ensuring compatibility across different data formats.

## Minimal Example

Create a basic Glue Schema with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSchema = await AWS.Glue.Schema("basicSchema", {
  Name: "CustomerData",
  DataFormat: "AVRO",
  Compatibility: "NONE",
  Description: "Schema for customer data in Avro format"
});
```

## Advanced Configuration

Configure a Glue Schema with additional options such as tags and schema definition.

```ts
const advancedSchema = await AWS.Glue.Schema("advancedSchema", {
  Name: "OrderData",
  DataFormat: "JSON",
  Compatibility: "BACKWARD",
  SchemaDefinition: JSON.stringify({
    type: "record",
    name: "Order",
    fields: [
      { name: "orderId", type: "string" },
      { name: "customerId", type: "string" },
      { name: "amount", type: "double" },
      { name: "timestamp", type: "long" }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Data" }
  ]
});
```

## Adopt Existing Schema

Use the adopt feature to manage an existing Glue Schema without failing if it already exists.

```ts
const adoptedSchema = await AWS.Glue.Schema("adoptedSchema", {
  Name: "UserData",
  DataFormat: "PARQUET",
  Compatibility: "FULL",
  adopt: true // Adopt existing resource if it exists
});
```
