---
title: DatasetGroup
description: Learn how to create, update, and manage AWS Forecast DatasetGroups using Alchemy Cloud Control.
---


The DatasetGroup resource lets you manage [AWS Forecast DatasetGroups](https://docs.aws.amazon.com/forecast/latest/userguide/) for organizing and managing datasets used in forecasting models.

## Minimal Example

Create a basic DatasetGroup with the required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const datasetGroup = await AWS.Forecast.DatasetGroup("myDatasetGroup", {
  DatasetGroupName: "SalesForecastGroup",
  Domain: "RETAIL",
  DatasetArns: [
    "arn:aws:forecast:us-east-1:123456789012:dataset/myDataset"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a DatasetGroup with multiple datasets to enhance your forecasting capabilities.

```ts
const advancedDatasetGroup = await AWS.Forecast.DatasetGroup("advancedDatasetGroup", {
  DatasetGroupName: "AdvancedSalesForecastGroup",
  Domain: "RETAIL",
  DatasetArns: [
    "arn:aws:forecast:us-east-1:123456789012:dataset/salesData",
    "arn:aws:forecast:us-east-1:123456789012:dataset/seasonalityData"
  ],
  Tags: [
    { Key: "Project", Value: "SalesForecasting" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Adoption of Existing Resources

Create a DatasetGroup that adopts an existing resource if it already exists.

```ts
const adoptDatasetGroup = await AWS.Forecast.DatasetGroup("adoptDatasetGroup", {
  DatasetGroupName: "SalesForecastGroup",
  Domain: "RETAIL",
  DatasetArns: [
    "arn:aws:forecast:us-east-1:123456789012:dataset/myExistingDataset"
  ],
  adopt: true // This will adopt the existing DatasetGroup instead of failing
});
```
