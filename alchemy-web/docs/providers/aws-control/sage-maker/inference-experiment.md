---
title: Managing AWS SageMaker InferenceExperiments with Alchemy
description: Learn how to create, update, and manage AWS SageMaker InferenceExperiments using Alchemy Cloud Control.
---

# InferenceExperiment

The InferenceExperiment resource lets you create and manage [AWS SageMaker InferenceExperiments](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-inferenceexperiment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const inferenceexperiment = await AWS.SageMaker.InferenceExperiment("inferenceexperiment-example", {
  ModelVariants: [],
  RoleArn: "example-rolearn",
  Name: "inferenceexperiment-",
  Type: "example-type",
  EndpointName: "inferenceexperiment-endpoint",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A inferenceexperiment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a inferenceexperiment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInferenceExperiment = await AWS.SageMaker.InferenceExperiment(
  "advanced-inferenceexperiment",
  {
    ModelVariants: [],
    RoleArn: "example-rolearn",
    Name: "inferenceexperiment-",
    Type: "example-type",
    EndpointName: "inferenceexperiment-endpoint",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A inferenceexperiment resource managed by Alchemy",
  }
);
```

