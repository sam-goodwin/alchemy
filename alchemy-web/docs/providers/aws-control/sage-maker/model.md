---
title: Managing AWS SageMaker Models with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Models using Alchemy Cloud Control.
---

# Model

The Model resource lets you manage [AWS SageMaker Models](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models in a scalable manner.

## Minimal Example

Create a basic SageMaker model with required properties and one optional property for execution role:

```ts
import AWS from "alchemy/aws/control";

const SageMakerModel = await AWS.SageMaker.Model("mySageMakerModel", {
  ModelName: "MyModel",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MySageMakerRole",
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-model-image:latest",
    ModelDataUrl: "s3://my-bucket/model.tar.gz"
  }
});
```

## Advanced Configuration

Configure a SageMaker model with network isolation and VPC settings:

```ts
import AWS from "alchemy/aws/control";

const VpcSageMakerModel = await AWS.SageMaker.Model("vpcSageMakerModel", {
  ModelName: "VpcModel",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MySageMakerRole",
  EnableNetworkIsolation: true,
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    Subnets: ["subnet-0123456789abcdef0"]
  },
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-secure-model-image:latest",
    ModelDataUrl: "s3://my-secure-bucket/model.tar.gz"
  }
});
```

## Using Multiple Containers

Deploy a model that uses multiple containers for inference:

```ts
import AWS from "alchemy/aws/control";

const MultiContainerModel = await AWS.SageMaker.Model("multiContainerModel", {
  ModelName: "MultiContainerModel",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MySageMakerRole",
  Containers: [
    {
      Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-first-container:latest",
      ModelDataUrl: "s3://my-bucket/first-container-model.tar.gz"
    },
    {
      Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-second-container:latest",
      ModelDataUrl: "s3://my-bucket/second-container-model.tar.gz"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Inference Execution Configuration

Set up a model with specific inference execution configuration:

```ts
import AWS from "alchemy/aws/control";

const InferenceConfigModel = await AWS.SageMaker.Model("inferenceConfigModel", {
  ModelName: "InferenceConfigModel",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MySageMakerRole",
  InferenceExecutionConfig: {
    Mode: "MULTI_MODEL" // Use multi-model endpoint configuration
  },
  PrimaryContainer: {
    Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-inference-image:latest",
    ModelDataUrl: "s3://my-bucket/inference-model.tar.gz"
  }
});
```