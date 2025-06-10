---
title: Dataset
description: Learn how to create, update, and manage AWS DataBrew Datasets using Alchemy Cloud Control.
---


The Dataset resource lets you manage [AWS DataBrew Datasets](https://docs.aws.amazon.com/databrew/latest/userguide/) for data preparation and transformation tasks.

## Minimal Example

Create a basic DataBrew Dataset with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicDataset = await AWS.DataBrew.Dataset("basic-dataset", {
  Name: "SalesData",
  Input: {
    S3Input: {
      Path: "s3://my-bucket/sales-data/",
      Format: "CSV"
    }
  },
  Format: "CSV" // Optional property
});
```

## Advanced Configuration

Configure a DataBrew Dataset with additional options such as format options and tags:

```ts
const advancedDataset = await AWS.DataBrew.Dataset("advanced-dataset", {
  Name: "CustomerFeedback",
  Input: {
    S3Input: {
      Path: "s3://my-bucket/customer-feedback/",
      Format: "JSON"
    }
  },
  Format: "JSON",
  FormatOptions: {
    Json: {
      MultiLine: true
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "CustomerInsights"
    }
  ]
});
```

## Using Path Options

Create a DataBrew Dataset with specific path options to refine data input:

```ts
const pathOptionsDataset = await AWS.DataBrew.Dataset("path-options-dataset", {
  Name: "InventoryData",
  Input: {
    S3Input: {
      Path: "s3://my-bucket/inventory-data/",
      Format: "CSV"
    }
  },
  PathOptions: {
    LastModified: "2023-01-01T00:00:00Z",
    MaxRecords: 100
  }
});
```

## Adopting Existing Resources

Adopt an existing DataBrew Dataset without failing if it already exists:

```ts
const adoptExistingDataset = await AWS.DataBrew.Dataset("adopt-existing-dataset", {
  Name: "ExistingSalesData",
  Input: {
    S3Input: {
      Path: "s3://my-bucket/existing-sales-data/",
      Format: "CSV"
    }
  },
  adopt: true // Allows adoption of an existing resource
});
```
