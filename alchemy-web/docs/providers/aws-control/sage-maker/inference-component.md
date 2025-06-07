---
title: Managing AWS SageMaker InferenceComponents with Alchemy
description: Learn how to create, update, and manage AWS SageMaker InferenceComponents using Alchemy Cloud Control.
---

# InferenceComponent

The InferenceComponent resource lets you create and manage [AWS SageMaker InferenceComponents](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-inferencecomponent.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const inferencecomponent = await AWS.SageMaker.InferenceComponent("inferencecomponent-example", {
  EndpointName: "inferencecomponent-endpoint",
  Specification: "example-specification",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a inferencecomponent with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInferenceComponent = await AWS.SageMaker.InferenceComponent(
  "advanced-inferencecomponent",
  {
    EndpointName: "inferencecomponent-endpoint",
    Specification: "example-specification",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

