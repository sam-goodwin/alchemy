---
title: Managing AWS ImageBuilder ImagePipelines with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder ImagePipelines using Alchemy Cloud Control.
---

# ImagePipeline

The ImagePipeline resource lets you create and manage [AWS ImageBuilder ImagePipelines](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-imagepipeline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const imagepipeline = await AWS.ImageBuilder.ImagePipeline("imagepipeline-example", {
  Name: "imagepipeline-",
  InfrastructureConfigurationArn: "example-infrastructureconfigurationarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A imagepipeline resource managed by Alchemy",
});
```

## Advanced Configuration

Create a imagepipeline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedImagePipeline = await AWS.ImageBuilder.ImagePipeline("advanced-imagepipeline", {
  Name: "imagepipeline-",
  InfrastructureConfigurationArn: "example-infrastructureconfigurationarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A imagepipeline resource managed by Alchemy",
});
```

