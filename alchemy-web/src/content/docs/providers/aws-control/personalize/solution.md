---
title: Solution
description: Learn how to create, update, and manage AWS Personalize Solutions using Alchemy Cloud Control.
---


The Solution resource allows you to create and manage [AWS Personalize Solutions](https://docs.aws.amazon.com/personalize/latest/userguide/) that enable personalized recommendations using machine learning.

## Minimal Example

Create a basic Personalize Solution using default settings and a specified dataset group.

```ts
import AWS from "alchemy/aws/control";

const basicSolution = await AWS.Personalize.Solution("basic-solution", {
  name: "BasicPersonalizeSolution",
  datasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  performAutoML: true,
  performHPO: false
});
```

## Advanced Configuration

Configure a Personalize Solution with hyperparameter optimization and a specific recipe.

```ts
const advancedSolution = await AWS.Personalize.Solution("advanced-solution", {
  name: "AdvancedPersonalizeSolution",
  datasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  performAutoML: false,
  performHPO: true,
  recipeArn: "arn:aws:personalize:::recipe/aws-hrnn"
});
```

## Solution with Custom Event Type

Create a Personalize Solution that includes a custom event type for user interactions.

```ts
const eventTypeSolution = await AWS.Personalize.Solution("event-type-solution", {
  name: "EventTypePersonalizeSolution",
  datasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  eventType: "user-click",
  performAutoML: true
});
```

## Solution Using a Specific Configuration

Demonstrate how to create a Solution with a custom configuration.

```ts
const customConfigSolution = await AWS.Personalize.Solution("custom-config-solution", {
  name: "CustomConfigPersonalizeSolution",
  datasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  solutionConfig: {
    algorithmHyperParameters: {
      "numFactors": "64",
      "regularization": "0.1"
    },
    featureTransforms: [{
      featureName: "user-item-interactions",
      transformType: "normalization"
    }]
  }
});
```
