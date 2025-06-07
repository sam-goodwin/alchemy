---
title: Managing AWS QuickSight DataSets with Alchemy
description: Learn how to create, update, and manage AWS QuickSight DataSets using Alchemy Cloud Control.
---

# DataSet

The DataSet resource lets you create and manage [AWS QuickSight DataSets](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-dataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.QuickSight.DataSet("dataset-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dataset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSet = await AWS.QuickSight.DataSet("advanced-dataset", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

