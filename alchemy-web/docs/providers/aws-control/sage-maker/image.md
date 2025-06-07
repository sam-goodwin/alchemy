---
title: Managing AWS SageMaker Images with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Images using Alchemy Cloud Control.
---

# Image

The Image resource lets you manage [AWS SageMaker Images](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which are used for deploying machine learning models and applications.

## Minimal Example

Create a basic SageMaker Image with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const sageMakerImage = await AWS.SageMaker.Image("MyImage", {
  ImageName: "my-sagemaker-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ImageDisplayName: "My SageMaker Image"
});
```

## Advanced Configuration

Configure a SageMaker Image with additional properties such as description and tags:

```ts
const advancedSageMakerImage = await AWS.SageMaker.Image("AdvancedImage", {
  ImageName: "my-advanced-sagemaker-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ImageDescription: "This is an advanced SageMaker image for model deployment.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Example with No Display Name

Create a SageMaker Image without a display name, focusing on essential properties:

```ts
const simpleImage = await AWS.SageMaker.Image("SimpleImage", {
  ImageName: "simple-sagemaker-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole"
});
```

## Adoption of Existing Resource

Adopt an existing SageMaker Image instead of failing if it already exists:

```ts
const adoptedImage = await AWS.SageMaker.Image("ExistingImage", {
  ImageName: "existing-sagemaker-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  adopt: true // Adopts the existing resource
});
```