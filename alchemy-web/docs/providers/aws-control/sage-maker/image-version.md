---
title: Managing AWS SageMaker ImageVersions with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ImageVersions using Alchemy Cloud Control.
---

# ImageVersion

The ImageVersion resource allows you to manage [AWS SageMaker ImageVersions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models in SageMaker. This resource enables you to specify the details of the image, including the base image and other configuration options.

## Minimal Example

Create a basic SageMaker ImageVersion with required properties and a couple of optional settings:

```ts
import AWS from "alchemy/aws/control";

const basicImageVersion = await AWS.SageMaker.ImageVersion("BasicImageVersion", {
  ImageName: "my-sagemaker-image",
  BaseImage: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-base-image:latest",
  Aliases: ["v1"],
  JobType: "Training"
});
```

## Advanced Configuration

Configure an ImageVersion with additional settings such as Horovod and ML Framework:

```ts
const advancedImageVersion = await AWS.SageMaker.ImageVersion("AdvancedImageVersion", {
  ImageName: "my-advanced-sagemaker-image",
  BaseImage: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-base-image:latest",
  Horovod: true,
  MLFramework: "TensorFlow",
  ProgrammingLang: "Python",
  ReleaseNotes: "Initial version with TensorFlow support."
});
```

## Using Aliases and Release Notes

Create an ImageVersion while specifying multiple aliases and detailed release notes:

```ts
const versionedImage = await AWS.SageMaker.ImageVersion("VersionedImage", {
  ImageName: "my-versioned-sagemaker-image",
  BaseImage: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-versioned-base-image:latest",
  Aliases: ["v1.0", "latest"],
  ReleaseNotes: "First stable release with support for multiple frameworks."
});
```

## Adoption of Existing Resources

Adopt an existing SageMaker ImageVersion instead of failing if it already exists:

```ts
const adoptedImageVersion = await AWS.SageMaker.ImageVersion("AdoptedImageVersion", {
  ImageName: "my-adopted-sagemaker-image",
  BaseImage: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-adopted-base-image:latest",
  adopt: true
});
```