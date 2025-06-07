---
title: Managing AWS Forecast Datasets with Alchemy
description: Learn how to create, update, and manage AWS Forecast Datasets using Alchemy Cloud Control.
---

# Dataset

The Dataset resource allows you to manage [AWS Forecast Datasets](https://docs.aws.amazon.com/forecast/latest/userguide/) for time series forecasting and machine learning applications.

## Minimal Example

Create a basic forecast dataset with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicDataset = await AWS.Forecast.Dataset("BasicForecastDataset", {
  DatasetName: "SalesData",
  Domain: "RETAIL",
  DatasetType: "TARGET_TIME_SERIES",
  DataFrequency: "D",
  Schema: {
    Attributes: [
      { AttributeName: "timestamp", AttributeType: "timestamp" },
      { AttributeName: "item_id", AttributeType: "string" },
      { AttributeName: "demand", AttributeType: "float" }
    ]
  },
  Tags: [
    { Key: "Project", Value: "SalesForecast" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a dataset with encryption settings for added security.

```ts
const SecureDataset = await AWS.Forecast.Dataset("SecureForecastDataset", {
  DatasetName: "CustomerDemandData",
  Domain: "RETAIL",
  DatasetType: "TARGET_TIME_SERIES",
  DataFrequency: "H",
  Schema: {
    Attributes: [
      { AttributeName: "timestamp", AttributeType: "timestamp" },
      { AttributeName: "customer_id", AttributeType: "string" },
      { AttributeName: "purchase_amount", AttributeType: "float" }
    ]
  },
  EncryptionConfig: {
    KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
    RoleArn: "arn:aws:iam::123456789012:role/MyForecastRole"
  },
  Tags: [
    { Key: "Project", Value: "DemandForecast" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Adopting Existing Resources

Create a dataset and adopt an existing resource if it already exists.

```ts
const AdoptExistingDataset = await AWS.Forecast.Dataset("AdoptExistingForecastDataset", {
  DatasetName: "InventoryLevels",
  Domain: "RETAIL",
  DatasetType: "RELATED_TIME_SERIES",
  DataFrequency: "M",
  Schema: {
    Attributes: [
      { AttributeName: "timestamp", AttributeType: "timestamp" },
      { AttributeName: "product_id", AttributeType: "string" },
      { AttributeName: "stock_level", AttributeType: "float" }
    ]
  },
  adopt: true // Adopts existing resource if it already exists
});
```