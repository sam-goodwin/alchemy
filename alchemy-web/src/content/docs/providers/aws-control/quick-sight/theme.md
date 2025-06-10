---
title: Theme
description: Learn how to create, update, and manage AWS QuickSight Themes using Alchemy Cloud Control.
---


The Theme resource lets you manage [AWS QuickSight Themes](https://docs.aws.amazon.com/quicksight/latest/userguide/) for customizing the appearance of your dashboards and reports.

## Minimal Example

Create a basic QuickSight Theme with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const quickSightTheme = await AWS.QuickSight.Theme("default-theme", {
  ThemeId: "default-theme",
  BaseThemeId: "base-theme",
  AwsAccountId: "123456789012",
  Configuration: {
    ThemeColor: {
      Primary: "#FF5733",
      Secondary: "#33C1FF",
      Tertiary: "#FFC300"
    }
  },
  VersionDescription: "Initial theme version"
});
```

## Advanced Configuration

Configure a theme with detailed settings for colors and font styles.

```ts
const advancedTheme = await AWS.QuickSight.Theme("advanced-theme", {
  ThemeId: "advanced-theme",
  BaseThemeId: "base-theme",
  AwsAccountId: "123456789012",
  Configuration: {
    ThemeColor: {
      Primary: "#0073E6",
      Secondary: "#FFCC00",
      Tertiary: "#FF5733"
    },
    Font: {
      Family: "Arial",
      Size: "14px",
      Weight: "bold"
    }
  },
  VersionDescription: "Theme with advanced styling"
});
```

## Theme with Permissions

Create a theme and define permissions for specific users.

```ts
const themeWithPermissions = await AWS.QuickSight.Theme("secured-theme", {
  ThemeId: "secured-theme",
  BaseThemeId: "base-theme",
  AwsAccountId: "123456789012",
  Configuration: {
    ThemeColor: {
      Primary: "#28A745",
      Secondary: "#17A2B8"
    }
  },
  Permissions: [
    {
      Principal: "user@example.com",
      Actions: ["quicksight:UpdateTheme"]
    }
  ],
  VersionDescription: "Theme with permissions"
});
```

## Theme with Tags

Create a theme and associate tags for better resource organization.

```ts
const taggedTheme = await AWS.QuickSight.Theme("tagged-theme", {
  ThemeId: "tagged-theme",
  BaseThemeId: "base-theme",
  AwsAccountId: "123456789012",
  Configuration: {
    ThemeColor: {
      Primary: "#6F42C1",
      Secondary: "#E83E8C"
    }
  },
  Tags: [
    { Key: "Project", Value: "Dashboard" },
    { Key: "Environment", Value: "Production" }
  ],
  VersionDescription: "Theme with tags for organization"
});
```
