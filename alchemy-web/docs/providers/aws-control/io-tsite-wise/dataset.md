---
title: Managing AWS IoTSiteWise Datasets with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Datasets using Alchemy Cloud Control.
---

# Dataset

The Dataset resource lets you create and manage [AWS IoTSiteWise Datasets](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-dataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.IoTSiteWise.Dataset("dataset-example", {
  DatasetName: "dataset-dataset",
  DatasetSource: "example-datasetsource",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dataset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataset = await AWS.IoTSiteWise.Dataset("advanced-dataset", {
  DatasetName: "dataset-dataset",
  DatasetSource: "example-datasetsource",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

