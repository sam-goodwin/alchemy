---
title: Managing AWS AmplifyUIBuilder Themes with Alchemy
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Themes using Alchemy Cloud Control.
---

# Theme

The Theme resource lets you create and manage [AWS AmplifyUIBuilder Themes](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const theme = await AWS.AmplifyUIBuilder.Theme("theme-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a theme with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTheme = await AWS.AmplifyUIBuilder.Theme("advanced-theme", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

