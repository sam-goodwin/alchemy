---
title: Image
description: Learn how to create, update, and manage AWS ImageBuilder Images using Alchemy Cloud Control.
---


The Image resource allows you to create and manage [AWS ImageBuilder Images](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) for automating the creation, management, and deployment of virtual machine images.

## Minimal Example

Create a basic Image using the required properties along with a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicImage = await AWS.ImageBuilder.Image("basicImage", {
  InfrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/my-infrastructure-configuration",
  ImageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/my-image-recipe",
  DistributionConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:distribution-configuration/my-distribution-configuration",
  ImageScanningConfiguration: {
    imageScanningConfiguration: {
      imageScanOnCreate: true
    }
  }
});
```

## Advanced Configuration

Configure an Image with advanced settings such as workflows and enhanced image metadata.

```ts
const advancedImage = await AWS.ImageBuilder.Image("advancedImage", {
  InfrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/my-infrastructure-configuration",
  ImageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/my-image-recipe",
  DistributionConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:distribution-configuration/my-distribution-configuration",
  Workflows: [{
    name: "buildWorkflow",
    steps: [{
      name: "build",
      action: "build",
      parameters: {}
    }]
  }],
  EnhancedImageMetadataEnabled: true
});
```

## Image Tests Configuration

Create an Image with image tests configuration to validate the image during the build process.

```ts
const imageWithTests = await AWS.ImageBuilder.Image("imageWithTests", {
  InfrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/my-infrastructure-configuration",
  ImageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/my-image-recipe",
  ImageTestsConfiguration: {
    imageTestsEnabled: true,
    timeoutMinutes: 30
  }
});
```

## Tagging Images

Create an Image with custom tags for better resource management.

```ts
const taggedImage = await AWS.ImageBuilder.Image("taggedImage", {
  InfrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/my-infrastructure-configuration",
  ImageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/my-image-recipe",
  Tags: {
    Project: "WebApp",
    Environment: "Production"
  }
});
```
