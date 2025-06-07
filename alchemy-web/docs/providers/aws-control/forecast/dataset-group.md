---
title: Managing AWS Forecast DatasetGroups with Alchemy
description: Learn how to create, update, and manage AWS Forecast DatasetGroups using Alchemy Cloud Control.
---

# DatasetGroup

The DatasetGroup resource lets you manage [AWS Forecast DatasetGroups](https://docs.aws.amazon.com/forecast/latest/userguide/) for organizing datasets used in machine learning forecasting.

## Minimal Example

Create a basic DatasetGroup with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicDatasetGroup = await AWS.Forecast.DatasetGroup("BasicDatasetGroup", {
  DatasetGroupName: "RetailSalesDatasetGroup",
  Domain: "RETAIL",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure a DatasetGroup with multiple datasets and additional tags.

```ts
const AdvancedDatasetGroup = await AWS.Forecast.DatasetGroup("AdvancedDatasetGroup", {
  DatasetGroupName: "WeatherForecastDatasetGroup",
  Domain: "RETAIL",
  DatasetArns: [
    "arn:aws:forecast:us-east-1:123456789012:dataset/my-dataset-1",
    "arn:aws:forecast:us-east-1:123456789012:dataset/my-dataset-2"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Adding Existing Resources

If you need to adopt an existing DatasetGroup instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const AdoptExistingDatasetGroup = await AWS.Forecast.DatasetGroup("AdoptExistingDatasetGroup", {
  DatasetGroupName: "AdoptedDatasetGroup",
  Domain: "RETAIL",
  adopt: true
});
```

## Managing Multiple Datasets

Create a DatasetGroup that manages multiple datasets for a comprehensive forecasting model.

```ts
const MultiDatasetGroup = await AWS.Forecast.DatasetGroup("MultiDatasetGroup", {
  DatasetGroupName: "ComprehensiveForecastGroup",
  Domain: "CUSTOM",
  DatasetArns: [
    "arn:aws:forecast:us-east-1:123456789012:dataset/my-sales-dataset",
    "arn:aws:forecast:us-east-1:123456789012:dataset/my-inventory-dataset",
    "arn:aws:forecast:us-east-1:123456789012:dataset/my-promotion-dataset"
  ],
  Tags: [{ Key: "Project", Value: "Forecasting" }]
});
```