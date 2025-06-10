---
title: DataCatalog
description: Learn how to create, update, and manage AWS Athena DataCatalogs using Alchemy Cloud Control.
---


The DataCatalog resource lets you manage [AWS Athena DataCatalogs](https://docs.aws.amazon.com/athena/latest/userguide/) for organizing and storing metadata about your data sources.

## Minimal Example

Create a basic DataCatalog with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicDataCatalog = await AWS.Athena.DataCatalog("basicDataCatalog", {
  Name: "myDataCatalog",
  Type: "GLUE",  // Assuming usage of AWS Glue as the catalog type
  Description: "A catalog for storing metadata of my datasets"
});
```

## Advanced Configuration

Configure a DataCatalog with additional options for parameters and tags:

```ts
const advancedDataCatalog = await AWS.Athena.DataCatalog("advancedDataCatalog", {
  Name: "advancedDataCatalog",
  Type: "GLUE",
  Description: "A catalog with advanced configuration",
  Parameters: {
    "catalogId": "123456789012",
    "compressionType": "GZIP"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataAnalytics" }
  ]
});
```

## Connection Type Example

Create a DataCatalog with a specified connection type:

```ts
const connectionDataCatalog = await AWS.Athena.DataCatalog("connectionDataCatalog", {
  Name: "connectionDataCatalog",
  Type: "GLUE",
  Description: "Catalog with a connection type",
  ConnectionType: "JDBC"
});
```

## Error Handling Example

Manage error states for a DataCatalog:

```ts
const errorHandlingDataCatalog = await AWS.Athena.DataCatalog("errorHandlingDataCatalog", {
  Name: "errorHandlingDataCatalog",
  Type: "GLUE",
  Description: "Catalog with error handling",
  Error: "No connection available"
});
```
