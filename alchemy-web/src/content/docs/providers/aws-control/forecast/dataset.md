---
title: Dataset
description: Learn how to create, update, and manage AWS Forecast Datasets using Alchemy Cloud Control.
---


The Dataset resource lets you manage [AWS Forecast Datasets](https://docs.aws.amazon.com/forecast/latest/userguide/) for time series forecasting and analytics.

## Minimal Example

Create a basic dataset with required properties and a common optional property for data frequency.

```ts
import AWS from "alchemy/aws/control";

const forecastDataset = await AWS.Forecast.Dataset("salesDataset", {
  datasetName: "SalesData",
  datasetType: "TARGET_TIME_SERIES",
  domain: "RETAIL",
  schema: {
    attributes: [
      {
        attributeName: "timestamp",
        attributeType: "timestamp"
      },
      {
        attributeName: "sales",
        attributeType: "float"
      }
    ]
  },
  dataFrequency: "D" // Daily data frequency
});
```

## Advanced Configuration

Configure a dataset with encryption settings and tags for better organization.

```ts
const secureForecastDataset = await AWS.Forecast.Dataset("secureSalesDataset", {
  datasetName: "SecureSalesData",
  datasetType: "TARGET_TIME_SERIES",
  domain: "RETAIL",
  schema: {
    attributes: [
      {
        attributeName: "timestamp",
        attributeType: "timestamp"
      },
      {
        attributeName: "sales",
        attributeType: "float"
      },
      {
        attributeName: "store_id",
        attributeType: "string"
      }
    ]
  },
  encryptionConfig: {
    roleArn: "arn:aws:iam::123456789012:role/ForecastRole",
    kmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef"
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Project",
      value: "SalesForecasting"
    }
  ]
});
```

## Additional Use Case: Historical Data

Create a dataset specifically for historical sales data with weekly frequency.

```ts
const historicalSalesDataset = await AWS.Forecast.Dataset("historicalSalesDataset", {
  datasetName: "HistoricalSalesData",
  datasetType: "TARGET_TIME_SERIES",
  domain: "RETAIL",
  schema: {
    attributes: [
      {
        attributeName: "timestamp",
        attributeType: "timestamp"
      },
      {
        attributeName: "sales",
        attributeType: "float"
      },
      {
        attributeName: "region",
        attributeType: "string"
      }
    ]
  },
  dataFrequency: "W" // Weekly data frequency
});
```
