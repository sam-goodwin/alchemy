---
title: Managing AWS QuickSight Themes with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Themes using Alchemy Cloud Control.
---

# Theme

The Theme resource lets you create and manage [AWS QuickSight Themes](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-theme.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const theme = await AWS.QuickSight.Theme("theme-example", {
  ThemeId: "example-themeid",
  Configuration: "example-configuration",
  BaseThemeId: "example-basethemeid",
  AwsAccountId: "example-awsaccountid",
  Name: "theme-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a theme with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTheme = await AWS.QuickSight.Theme("advanced-theme", {
  ThemeId: "example-themeid",
  Configuration: "example-configuration",
  BaseThemeId: "example-basethemeid",
  AwsAccountId: "example-awsaccountid",
  Name: "theme-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

