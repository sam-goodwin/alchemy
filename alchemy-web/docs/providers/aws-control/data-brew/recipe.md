---
title: Managing AWS DataBrew Recipes with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Recipes using Alchemy Cloud Control.
---

# Recipe

The Recipe resource lets you create and manage [AWS DataBrew Recipes](https://docs.aws.amazon.com/databrew/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const recipe = await AWS.DataBrew.Recipe("recipe-example", {
  Steps: [],
  Name: "recipe-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A recipe resource managed by Alchemy",
});
```

## Advanced Configuration

Create a recipe with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRecipe = await AWS.DataBrew.Recipe("advanced-recipe", {
  Steps: [],
  Name: "recipe-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A recipe resource managed by Alchemy",
});
```

