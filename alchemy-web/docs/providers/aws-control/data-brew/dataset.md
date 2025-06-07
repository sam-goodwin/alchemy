---
title: Managing AWS DataBrew Datasets with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Datasets using Alchemy Cloud Control.
---

# Dataset

The Dataset resource lets you create and manage [AWS DataBrew Datasets](https://docs.aws.amazon.com/databrew/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.DataBrew.Dataset("dataset-example", {
  Input: "example-input",
  Name: "dataset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dataset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataset = await AWS.DataBrew.Dataset("advanced-dataset", {
  Input: "example-input",
  Name: "dataset-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

