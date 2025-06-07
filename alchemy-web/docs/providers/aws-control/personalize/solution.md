---
title: Managing AWS Personalize Solutions with Alchemy
description: Learn how to create, update, and manage AWS Personalize Solutions using Alchemy Cloud Control.
---

# Solution

The Solution resource allows you to manage [AWS Personalize Solutions](https://docs.aws.amazon.com/personalize/latest/userguide/) which are essential for building personalized user experiences by training machine learning models.

## Minimal Example

Create a basic AWS Personalize Solution with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const BasicSolution = await AWS.Personalize.Solution("BasicSolution", {
  Name: "BasicRecommendationSolution",
  DatasetGroupArn: "arn:aws:personalize:us-west-2:123456789012:dataset-group/ExampleDatasetGroup",
  PerformAutoML: true,
  RecipeArn: "arn:aws:personalize:us-west-2:123456789012:recipe/ExampleRecipe"
});
```

## Advanced Configuration

Configure a more advanced solution with hyperparameter optimization and specific event types.

```ts
const AdvancedSolution = await AWS.Personalize.Solution("AdvancedSolution", {
  Name: "AdvancedRecommendationSolution",
  DatasetGroupArn: "arn:aws:personalize:us-west-2:123456789012:dataset-group/ExampleDatasetGroup",
  PerformHPO: true,
  EventType: "example_event_type",
  SolutionConfig: {
    AlgorithmHyperParameters: {
      numFactors: "64",
      regularization: "0.1"
    }
  }
});
```

## Custom Solution with AutoML

Create a solution that uses AutoML to automatically tune the model for optimal results.

```ts
const AutoMLSolution = await AWS.Personalize.Solution("AutoMLSolution", {
  Name: "AutoMLRecommendationSolution",
  DatasetGroupArn: "arn:aws:personalize:us-west-2:123456789012:dataset-group/ExampleDatasetGroup",
  PerformAutoML: true
});
```

## Solution with Recipe

Define a solution that specifies a custom recipe for model training.

```ts
const RecipeSolution = await AWS.Personalize.Solution("RecipeSolution", {
  Name: "RecipeBasedRecommendationSolution",
  DatasetGroupArn: "arn:aws:personalize:us-west-2:123456789012:dataset-group/ExampleDatasetGroup",
  RecipeArn: "arn:aws:personalize:us-west-2:123456789012:recipe/ExampleRecipe"
});
```