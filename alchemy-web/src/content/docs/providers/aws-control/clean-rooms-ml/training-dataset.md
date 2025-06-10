---
title: TrainingDataset
description: Learn how to create, update, and manage AWS CleanRoomsML TrainingDatasets using Alchemy Cloud Control.
---


The TrainingDataset resource lets you manage [AWS CleanRoomsML TrainingDatasets](https://docs.aws.amazon.com/cleanroomsml/latest/userguide/) which are essential for training machine learning models in a secured environment.

## Minimal Example

Create a basic training dataset with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const trainingDataset = await AWS.CleanRoomsML.TrainingDataset("basicTrainingDataset", {
  name: "CustomerBehaviorDataset",
  description: "Dataset containing customer behavior data for model training.",
  trainingData: [
    {
      dataSource: "S3",
      path: "s3://my-bucket/customer-data/",
      format: "CSV"
    }
  ],
  roleArn: "arn:aws:iam::123456789012:role/CleanRoomsMLRole"
});
```

## Advanced Configuration

Configure a training dataset with multiple data sources and tagging for better organization:

```ts
const advancedTrainingDataset = await AWS.CleanRoomsML.TrainingDataset("advancedTrainingDataset", {
  name: "SalesForecastDataset",
  description: "Dataset for sales forecasting using multiple data sources.",
  trainingData: [
    {
      dataSource: "S3",
      path: "s3://my-bucket/sales-data/",
      format: "CSV"
    },
    {
      dataSource: "S3",
      path: "s3://my-bucket/external-sales-data/",
      format: "JSON"
    }
  ],
  roleArn: "arn:aws:iam::123456789012:role/CleanRoomsMLRole",
  tags: [
    { key: "Project", value: "SalesForecasting" },
    { key: "Environment", value: "Production" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing training dataset instead of failing when it already exists, you can set the `adopt` property:

```ts
const existingTrainingDataset = await AWS.CleanRoomsML.TrainingDataset("existingTrainingDataset", {
  name: "ExistingCustomerDataset",
  description: "Adopting an existing dataset for customer analysis.",
  trainingData: [
    {
      dataSource: "S3",
      path: "s3://my-bucket/existing-customer-data/",
      format: "CSV"
    }
  ],
  roleArn: "arn:aws:iam::123456789012:role/CleanRoomsMLRole",
  adopt: true
});
```
