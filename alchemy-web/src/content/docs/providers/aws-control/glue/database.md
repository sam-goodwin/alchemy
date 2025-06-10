---
title: Database
description: Learn how to create, update, and manage AWS Glue Databases using Alchemy Cloud Control.
---


The Database resource lets you manage [AWS Glue Databases](https://docs.aws.amazon.com/glue/latest/userguide/) for organizing your data catalog. This resource enables you to define metadata for your datasets and facilitate ETL (Extract, Transform, Load) processes within AWS Glue.

## Minimal Example

Create a basic Glue Database with necessary properties.

```ts
import AWS from "alchemy/aws/control";

const glueDatabase = await AWS.Glue.Database("myGlueDatabase", {
  DatabaseName: "my_database",
  DatabaseInput: {
    Name: "my_database",
    Description: "This database contains ETL metadata for my application."
  },
  CatalogId: "123456789012" // Your AWS account ID
});
```

## Advanced Configuration

Configure a Glue Database with additional metadata and parameters.

```ts
const advancedGlueDatabase = await AWS.Glue.Database("advancedGlueDatabase", {
  DatabaseName: "advanced_database",
  DatabaseInput: {
    Name: "advanced_database",
    Description: "This database is used for advanced analytics.",
    LocationUri: "s3://my-data-bucket/advanced_data/",
    Parameters: {
      "param1": "value1",
      "param2": "value2"
    }
  },
  CatalogId: "123456789012", // Your AWS account ID
  adopt: true // Adopt existing resource if it already exists
});
```

## Database with Custom Parameters

Create a Glue Database with specific parameters for custom use cases.

```ts
const customParamsDatabase = await AWS.Glue.Database("customParamsDatabase", {
  DatabaseName: "custom_params_database",
  DatabaseInput: {
    Name: "custom_params_database",
    Description: "This database includes custom parameters for specific use cases.",
    Parameters: {
      "engine": "glue",
      "version": "1.0"
    }
  },
  CatalogId: "123456789012" // Your AWS account ID
});
```
