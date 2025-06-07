---
title: Managing AWS ImageBuilder ImageRecipes with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder ImageRecipes using Alchemy Cloud Control.
---

# ImageRecipe

The ImageRecipe resource lets you create and manage [AWS ImageBuilder ImageRecipes](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-imagerecipe.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const imagerecipe = await AWS.ImageBuilder.ImageRecipe("imagerecipe-example", {
  Components: [],
  ParentImage: "example-parentimage",
  Version: "example-version",
  Name: "imagerecipe-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A imagerecipe resource managed by Alchemy",
});
```

## Advanced Configuration

Create a imagerecipe with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedImageRecipe = await AWS.ImageBuilder.ImageRecipe("advanced-imagerecipe", {
  Components: [],
  ParentImage: "example-parentimage",
  Version: "example-version",
  Name: "imagerecipe-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A imagerecipe resource managed by Alchemy",
});
```

