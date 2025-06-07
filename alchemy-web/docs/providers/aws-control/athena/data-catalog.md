---
title: Managing AWS Athena DataCatalogs with Alchemy
description: Learn how to create, update, and manage AWS Athena DataCatalogs using Alchemy Cloud Control.
---

# DataCatalog

The DataCatalog resource lets you manage [AWS Athena DataCatalogs](https://docs.aws.amazon.com/athena/latest/userguide/) for querying your data in Amazon S3 using SQL. This resource is essential for organizing and managing your datasets.

## Minimal Example

Create a basic DataCatalog with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const DefaultDataCatalog = await AWS.Athena.DataCatalog("DefaultDataCatalog", {
  Name: "MyDataCatalog",
  Type: "GLUE",
  Status: "ENABLED",
  Description: "A DataCatalog for storing my data assets."
});
```

## Advanced Configuration

Configure a DataCatalog with additional parameters and tags for better management.

```ts
const AdvancedDataCatalog = await AWS.Athena.DataCatalog("AdvancedDataCatalog", {
  Name: "AdvancedDataCatalog",
  Type: "GLUE",
  Status: "ENABLED",
  Description: "This DataCatalog contains advanced configurations.",
  Parameters: {
    "parquet.compression": "SNAPPY",
    "storage.location": "s3://my-bucket/data-catalog/"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Error Handling

Demonstrate how to handle errors when creating a DataCatalog.

```ts
try {
  const ErrorDataCatalog = await AWS.Athena.DataCatalog("ErrorDataCatalog", {
    Name: "ErrorDataCatalog",
    Type: "GLUE",
    Status: "INVALID_STATUS", // This will cause an error
  });
} catch (error) {
  console.error("Error creating DataCatalog:", error);
}
```

## Adoption of Existing Resource

Show how to adopt an existing DataCatalog instead of failing on creation.

```ts
const AdoptedDataCatalog = await AWS.Athena.DataCatalog("AdoptedDataCatalog", {
  Name: "ExistingDataCatalog",
  Type: "GLUE",
  adopt: true // Attempts to adopt an existing catalog if it already exists
});
```