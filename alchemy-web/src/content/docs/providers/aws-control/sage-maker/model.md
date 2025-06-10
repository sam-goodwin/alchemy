---
title: Model
description: Learn how to create, update, and manage AWS SageMaker Models using Alchemy Cloud Control.
---


The Model resource allows you to create and manage [AWS SageMaker Models](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning algorithms and workflows.

## Minimal Example

Create a basic SageMaker model with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleModel = await AWS.SageMaker.Model("simpleModel", {
  ModelName: "simple-model",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-image:latest",
    ModelDataUrl: "s3://my-bucket/model.tar.gz"
  }
});
```

## Advanced Configuration

Configure a SageMaker model with VPC settings and tags for better resource management.

```ts
const advancedModel = await AWS.SageMaker.Model("advancedModel", {
  ModelName: "advanced-model",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-advanced-image:latest",
    ModelDataUrl: "s3://my-bucket/advanced-model.tar.gz"
  },
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    Subnets: ["subnet-0123456789abcdef0"]
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MachineLearning"
    }
  ]
});
```

## Network Isolation

Create a SageMaker model with network isolation enabled for enhanced security during inference.

```ts
const isolatedModel = await AWS.SageMaker.Model("isolatedModel", {
  ModelName: "isolated-model",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-isolated-image:latest",
    ModelDataUrl: "s3://my-bucket/isolated-model.tar.gz"
  },
  EnableNetworkIsolation: true
});
```

## Custom Inference Execution Configuration

Define a custom inference execution configuration for a SageMaker model to specify execution settings.

```ts
const customInferenceModel = await AWS.SageMaker.Model("customInferenceModel", {
  ModelName: "custom-inference-model",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-custom-image:latest",
    ModelDataUrl: "s3://my-bucket/custom-inference-model.tar.gz"
  },
  InferenceExecutionConfig: {
    Mode: "SingleModel" // Options: "SingleModel", "MultiModel"
  }
});
```
