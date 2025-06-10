---
title: InferenceComponent
description: Learn how to create, update, and manage AWS SageMaker InferenceComponents using Alchemy Cloud Control.
---


The InferenceComponent resource allows you to manage [AWS SageMaker InferenceComponents](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models and serving predictions.

## Minimal Example

Create a basic InferenceComponent with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const inferenceComponent = await AWS.SageMaker.InferenceComponent("basicInferenceComponent", {
  EndpointName: "my-endpoint",
  Specification: {
    ContentType: "application/json",
    InputPath: "/input",
    OutputPath: "/output"
  },
  VariantName: "AllTraffic" // Common optional property
});
```

## Advanced Configuration

Configure an InferenceComponent with additional options such as runtime configuration and deployment settings:

```ts
const advancedInferenceComponent = await AWS.SageMaker.InferenceComponent("advancedInferenceComponent", {
  EndpointName: "my-endpoint",
  Specification: {
    ContentType: "application/json",
    InputPath: "/input",
    OutputPath: "/output"
  },
  RuntimeConfig: {
    Environment: {
      LOG_LEVEL: "DEBUG"
    }
  },
  DeploymentConfig: {
    AutoRollbackConfiguration: {
      Alarms: [
        {
          AlarmName: "HighErrorRate",
          AlarmType: "CLOUDWATCH",
          Interval: 60
        }
      ]
    }
  }
});
```

## Example with Tags

Create an InferenceComponent and assign tags for better resource management:

```ts
const taggedInferenceComponent = await AWS.SageMaker.InferenceComponent("taggedInferenceComponent", {
  EndpointName: "my-endpoint",
  Specification: {
    ContentType: "application/json",
    InputPath: "/input",
    OutputPath: "/output"
  },
  Tags: [
    { Key: "Project", Value: "ImageRecognition" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Example with Existing Resource Adoption

If you want to adopt an existing InferenceComponent instead of creating a new one, you can set the `adopt` property to true:

```ts
const adoptedInferenceComponent = await AWS.SageMaker.InferenceComponent("adoptedInferenceComponent", {
  EndpointName: "existing-endpoint",
  Specification: {
    ContentType: "application/json",
    InputPath: "/input",
    OutputPath: "/output"
  },
  adopt: true // Adopt existing resource
});
```
