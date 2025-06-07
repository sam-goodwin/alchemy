---
title: Managing AWS Personalize Datasets with Alchemy
description: Learn how to create, update, and manage AWS Personalize Datasets using Alchemy Cloud Control.
---

# Dataset

The Dataset resource lets you create and manage [AWS Personalize Datasets](https://docs.aws.amazon.com/personalize/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.Personalize.Dataset("dataset-example", {
  DatasetGroupArn: "example-datasetgrouparn",
  DatasetType: "example-datasettype",
  SchemaArn: "example-schemaarn",
  Name: "dataset-",
});
```

