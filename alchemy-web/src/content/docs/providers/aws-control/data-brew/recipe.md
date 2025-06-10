---
title: Recipe
description: Learn how to create, update, and manage AWS DataBrew Recipes using Alchemy Cloud Control.
---


The Recipe resource allows you to create, update, and manage [AWS DataBrew Recipes](https://docs.aws.amazon.com/databrew/latest/userguide/) that define a series of steps to transform your data for analysis.

## Minimal Example

Create a simple DataBrew recipe with a few transformation steps and a description.

```ts
import AWS from "alchemy/aws/control";

const basicRecipe = await AWS.DataBrew.Recipe("basic-recipe", {
  name: "Basic Recipe",
  description: "A simple recipe for transforming data.",
  steps: [
    {
      action: {
        operation: "RemoveColumn",
        parameters: {
          name: "unnecessary_column"
        }
      }
    },
    {
      action: {
        operation: "RenameColumn",
        parameters: {
          name: "old_name",
          newName: "new_name"
        }
      }
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a recipe with additional options, including more complex transformation steps.

```ts
const advancedRecipe = await AWS.DataBrew.Recipe("advanced-recipe", {
  name: "Advanced Recipe",
  description: "An advanced recipe for complex data transformations.",
  steps: [
    {
      action: {
        operation: "Filter",
        parameters: {
          condition: "column_name > 100"
        }
      }
    },
    {
      action: {
        operation: "CastColumnType",
        parameters: {
          name: "date_column",
          type: "date"
        }
      }
    },
    {
      action: {
        operation: "CreateMissingValues",
        parameters: {
          columnNames: ["column1", "column2"]
        }
      }
    }
  ],
  tags: [
    {
      key: "Project",
      value: "Data Analysis"
    }
  ]
});
```

## Using Tags for Organization

Create a recipe while categorizing it with specific tags for better organization and management.

```ts
const taggedRecipe = await AWS.DataBrew.Recipe("tagged-recipe", {
  name: "Tagged Recipe",
  description: "A recipe tagged for better organization.",
  steps: [
    {
      action: {
        operation: "DropDuplicate",
        parameters: {
          columnNames: ["id"]
        }
      }
    }
  ],
  tags: [
    {
      key: "Department",
      value: "Analytics"
    },
    {
      key: "Status",
      value: "Active"
    }
  ]
});
```

## Adopting Existing Resources

Create a recipe that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptedRecipe = await AWS.DataBrew.Recipe("existing-recipe", {
  name: "Existing Recipe",
  description: "Adopts an existing DataBrew recipe without creating a new one.",
  steps: [
    {
      action: {
        operation: "Sample",
        parameters: {
          size: 1000
        }
      }
    }
  ],
  adopt: true // Adopts the existing resource
});
```
