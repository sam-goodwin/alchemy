---
title: Managing AWS IoTAnalytics Datasets with Alchemy
description: Learn how to create, update, and manage AWS IoTAnalytics Datasets using Alchemy Cloud Control.
---

# Dataset

The Dataset resource lets you create and manage [AWS IoTAnalytics Datasets](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotanalytics-dataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.IoTAnalytics.Dataset("dataset-example", {
  Actions: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dataset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataset = await AWS.IoTAnalytics.Dataset("advanced-dataset", {
  Actions: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

