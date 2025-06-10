---
title: Image
description: Learn how to create, update, and manage AWS SageMaker Images using Alchemy Cloud Control.
---


The Image resource allows you to create and manage [AWS SageMaker Images](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for building machine learning models and workflows. 

## Minimal Example

Create a basic SageMaker Image with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const sageMakerImage = await AWS.SageMaker.Image("mySageMakerImage", {
  ImageName: "my-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ImageDisplayName: "My SageMaker Image"
});
```

## Advanced Configuration

Configure a SageMaker Image with an optional description and tags:

```ts
const advancedSageMakerImage = await AWS.SageMaker.Image("advancedSageMakerImage", {
  ImageName: "advanced-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ImageDescription: "An advanced SageMaker image for training models.",
  Tags: [
    { Key: "Project", Value: "AIModel" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing SageMaker Image instead of failing if it already exists:

```ts
const adoptSageMakerImage = await AWS.SageMaker.Image("existingSageMakerImage", {
  ImageName: "existing-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  adopt: true // Adopt existing resource if it exists
});
```

## Updating an Image

Update an existing SageMaker Image with a new display name and description:

```ts
const updatedSageMakerImage = await AWS.SageMaker.Image("updateSageMakerImage", {
  ImageName: "my-image",
  ImageRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ImageDisplayName: "Updated SageMaker Image",
  ImageDescription: "An updated description for the SageMaker image."
});
```
