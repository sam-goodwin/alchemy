---
title: ImagePipeline
description: Learn how to create, update, and manage AWS ImageBuilder ImagePipelines using Alchemy Cloud Control.
---


The ImagePipeline resource lets you manage [AWS ImageBuilder ImagePipelines](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) for automating the creation, updating, and management of images. This resource allows you to define how images are built and managed in your AWS environment.

## Minimal Example

Create a basic image pipeline with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const imagePipeline = await AWS.ImageBuilder.ImagePipeline("myImagePipeline", {
  name: "MyImagePipeline",
  infrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/myInfrastructureConfig",
  imageScanningConfiguration: {
    imageScanningEnabled: true,
    ecrConfiguration: {
      rescanDuration: 30 // Set to rescan every 30 days
    }
  },
  description: "An example image pipeline for creating AMIs"
});
```

## Advanced Configuration

Configure an image pipeline with advanced settings such as workflows and tags.

```ts
const advancedImagePipeline = await AWS.ImageBuilder.ImagePipeline("advancedImagePipeline", {
  name: "AdvancedImagePipeline",
  infrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/myAdvancedInfrastructureConfig",
  imageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/myImageRecipe",
  distributionConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:distribution-configuration/myDistributionConfig",
  schedule: {
    scheduleExpression: "cron(0 0 * * ? *)", // Daily at midnight UTC
    pipelineExecutionStartCondition: "ENABLE" // Enable automatic execution
  },
  workflows: [
    {
      workflowArn: "arn:aws:imagebuilder:us-west-2:123456789012:workflow/myWorkflow",
      workflowType: "BUILD" // Specify the type of workflow
    }
  ],
  tags: {
    Project: "ImageBuilderDemo",
    Environment: "Development"
  }
});
```

## Custom Image Tests Configuration

Set up an image pipeline with custom image tests configuration to validate the image after build.

```ts
const imageTestPipeline = await AWS.ImageBuilder.ImagePipeline("testImagePipeline", {
  name: "TestImagePipeline",
  infrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/myTestInfrastructureConfig",
  imageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/myTestImageRecipe",
  imageTestsConfiguration: {
    imageTestsEnabled: true,
    timeoutMinutes: 30 // Timeout for image tests
  },
  tags: {
    Purpose: "Image Testing",
    Status: "Active"
  }
});
```

## Image Metadata Enhancement

Enable enhanced image metadata for better tracking and management of images.

```ts
const enhancedMetadataPipeline = await AWS.ImageBuilder.ImagePipeline("enhancedMetadataPipeline", {
  name: "EnhancedMetadataPipeline",
  infrastructureConfigurationArn: "arn:aws:imagebuilder:us-west-2:123456789012:infrastructure-configuration/myMetadataInfrastructureConfig",
  imageRecipeArn: "arn:aws:imagebuilder:us-west-2:123456789012:image-recipe/myMetadataImageRecipe",
  enhancedImageMetadataEnabled: true, // Enable enhanced image metadata
  tags: {
    Feature: "EnhancedLogging",
    Owner: "DevTeam"
  }
});
```
