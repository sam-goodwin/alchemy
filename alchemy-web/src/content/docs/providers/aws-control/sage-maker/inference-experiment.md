---
title: InferenceExperiment
description: Learn how to create, update, and manage AWS SageMaker InferenceExperiments using Alchemy Cloud Control.
---


The InferenceExperiment resource lets you create and manage [AWS SageMaker InferenceExperiments](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for evaluating different model variants in a production environment.

## Minimal Example

Create a basic InferenceExperiment with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicInferenceExperiment = await AWS.SageMaker.InferenceExperiment("basicInferenceExperiment", {
  Name: "BasicInferenceExperiment",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelVariants: [
    {
      ModelName: "MyModelVariantA",
      VariantName: "VariantA",
      InitialInstanceCount: 1,
      InstanceType: "ml.m5.large"
    },
    {
      ModelName: "MyModelVariantB",
      VariantName: "VariantB",
      InitialInstanceCount: 1,
      InstanceType: "ml.m5.large"
    }
  ],
  EndpointName: "MySageMakerEndpoint",
  Description: "A simple inference experiment to compare model variants."
});
```

## Advanced Configuration

Configure an InferenceExperiment with advanced settings, including data storage configuration and shadow mode.

```ts
const advancedInferenceExperiment = await AWS.SageMaker.InferenceExperiment("advancedInferenceExperiment", {
  Name: "AdvancedInferenceExperiment",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelVariants: [
    {
      ModelName: "MyModelVariantA",
      VariantName: "VariantA",
      InitialInstanceCount: 1,
      InstanceType: "ml.m5.large"
    },
    {
      ModelName: "MyModelVariantB",
      VariantName: "VariantB",
      InitialInstanceCount: 1,
      InstanceType: "ml.m5.large"
    }
  ],
  EndpointName: "MySageMakerEndpoint",
  DataStorageConfig: {
    S3Path: "s3://my-bucket/inference-data/",
    KmsKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef"
  },
  ShadowModeConfig: {
    ShadowModelVariants: [
      {
        ModelName: "MyModelVariantShadow",
        VariantName: "ShadowVariant",
        InitialInstanceCount: 1,
        InstanceType: "ml.m5.large"
      }
    ]
  },
  Description: "An advanced inference experiment to evaluate model performance."
});
```

## Scheduled Inference Experiment

Create an InferenceExperiment with a specific schedule for running the evaluation.

```ts
const scheduledInferenceExperiment = await AWS.SageMaker.InferenceExperiment("scheduledInferenceExperiment", {
  Name: "ScheduledInferenceExperiment",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelVariants: [
    {
      ModelName: "MyModelVariantA",
      VariantName: "VariantA",
      InitialInstanceCount: 1,
      InstanceType: "ml.m5.large"
    }
  ],
  EndpointName: "MySageMakerEndpoint",
  Schedule: {
    StartTime: new Date(Date.now() + 1000 * 60 * 60), // Start in 1 hour
    EndTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // End in 24 hours
    Frequency: "Daily" // Runs every day
  },
  Description: "A scheduled inference experiment to evaluate model performance daily."
});
```
