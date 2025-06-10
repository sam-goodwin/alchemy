---
title: ImageVersion
description: Learn how to create, update, and manage AWS SageMaker ImageVersions using Alchemy Cloud Control.
---


The ImageVersion resource lets you manage [AWS SageMaker ImageVersions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models and algorithms.

## Minimal Example

This example demonstrates how to create a basic ImageVersion with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicImageVersion = await AWS.SageMaker.ImageVersion("basicImageVersion", {
  ImageName: "my-custom-image",
  BaseImage: "my-base-image:latest",
  Horovod: true // Enable Horovod support for distributed training
});
```

## Advanced Configuration

This example shows how to configure an ImageVersion with additional properties such as Processor, JobType, and ReleaseNotes.

```ts
const advancedImageVersion = await AWS.SageMaker.ImageVersion("advancedImageVersion", {
  ImageName: "my-advanced-image",
  BaseImage: "my-advanced-base-image:latest",
  Processor: "ml.g4dn.xlarge",
  JobType: "Training",
  ReleaseNotes: "Initial version with optimized model performance."
});
```

## Using Multiple Aliases

This example illustrates how to create an ImageVersion with multiple aliases for easier reference.

```ts
const versionWithAliases = await AWS.SageMaker.ImageVersion("versionWithAliases", {
  ImageName: "my-image-with-aliases",
  BaseImage: "my-base-image:latest",
  Aliases: ["v1.0", "stable", "latest"],
  ReleaseNotes: "Version 1.0 with significant improvements."
});
```

## Specifying Programming Language and Framework

This example showcases how to specify the programming language and ML framework for the ImageVersion.

```ts
const imageVersionWithFramework = await AWS.SageMaker.ImageVersion("imageVersionWithFramework", {
  ImageName: "my-ml-image",
  BaseImage: "my-ml-base-image:latest",
  ProgrammingLang: "Python",
  MLFramework: "TensorFlow",
  ReleaseNotes: "Updated to TensorFlow 2.4 with new features."
});
```
