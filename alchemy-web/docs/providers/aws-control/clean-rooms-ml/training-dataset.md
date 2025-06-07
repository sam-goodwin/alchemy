---
title: Managing AWS CleanRoomsML TrainingDatasets with Alchemy
description: Learn how to create, update, and manage AWS CleanRoomsML TrainingDatasets using Alchemy Cloud Control.
---

# TrainingDataset

The TrainingDataset resource lets you create and manage [AWS CleanRoomsML TrainingDatasets](https://docs.aws.amazon.com/cleanroomsml/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanroomsml-trainingdataset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const trainingdataset = await AWS.CleanRoomsML.TrainingDataset("trainingdataset-example", {
  TrainingData: [],
  RoleArn: "example-rolearn",
  Name: "trainingdataset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A trainingdataset resource managed by Alchemy",
});
```

## Advanced Configuration

Create a trainingdataset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTrainingDataset = await AWS.CleanRoomsML.TrainingDataset("advanced-trainingdataset", {
  TrainingData: [],
  RoleArn: "example-rolearn",
  Name: "trainingdataset-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A trainingdataset resource managed by Alchemy",
});
```

