---
title: Managing AWS Evidently Experiments with Alchemy
description: Learn how to create, update, and manage AWS Evidently Experiments using Alchemy Cloud Control.
---

# Experiment

The Experiment resource lets you create and manage [AWS Evidently Experiments](https://docs.aws.amazon.com/evidently/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const experiment = await AWS.Evidently.Experiment("experiment-example", {
  Project: "example-project",
  MetricGoals: [],
  OnlineAbConfig: "example-onlineabconfig",
  Treatments: [],
  Name: "experiment-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A experiment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a experiment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedExperiment = await AWS.Evidently.Experiment("advanced-experiment", {
  Project: "example-project",
  MetricGoals: [],
  OnlineAbConfig: "example-onlineabconfig",
  Treatments: [],
  Name: "experiment-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A experiment resource managed by Alchemy",
});
```

