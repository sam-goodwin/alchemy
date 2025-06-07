---
title: Managing AWS ImageBuilder Images with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder Images using Alchemy Cloud Control.
---

# Image

The Image resource lets you create and manage [AWS ImageBuilder Images](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-image.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const image = await AWS.ImageBuilder.Image("image-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a image with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedImage = await AWS.ImageBuilder.Image("advanced-image", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

