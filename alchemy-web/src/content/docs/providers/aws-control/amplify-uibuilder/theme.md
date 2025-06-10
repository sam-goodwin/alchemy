---
title: Theme
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Themes using Alchemy Cloud Control.
---


The Theme resource allows you to manage [AWS AmplifyUIBuilder Themes](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/) for your applications, enabling you to define the visual appearance and style of your UI components.

## Minimal Example

Create a basic theme with required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTheme = await AWS.AmplifyUIBuilder.Theme("basicTheme", {
  AppId: "my-app-id",
  Name: "Basic Theme",
  Values: [
    { key: "colorPrimary", value: "#ff5733" },
    { key: "fontSizeBase", value: "16px" }
  ]
});
```

## Advanced Configuration

Configure a theme with additional properties, including environment name and overrides.

```ts
const advancedTheme = await AWS.AmplifyUIBuilder.Theme("advancedTheme", {
  AppId: "my-app-id",
  EnvironmentName: "development",
  Name: "Advanced Theme",
  Values: [
    { key: "colorPrimary", value: "#007bff" },
    { key: "fontFamily", value: "'Helvetica Neue', Arial, sans-serif" }
  ],
  Overrides: [
    { key: "buttonBorderRadius", value: "5px" },
    { key: "inputBorderColor", value: "#ccc" }
  ],
  Tags: {
    project: "UIUpdate",
    version: "1.0"
  }
});
```

## Theme with Custom Properties

Create a theme that includes custom values for distinctive UI elements.

```ts
const customTheme = await AWS.AmplifyUIBuilder.Theme("customTheme", {
  AppId: "my-app-id",
  Name: "Custom Theme",
  Values: [
    { key: "colorBackground", value: "#f8f9fa" },
    { key: "colorText", value: "#212529" },
    { key: "buttonBackground", value: "#28a745" },
    { key: "buttonTextColor", value: "#ffffff" }
  ]
});
```

## Theme with Tags for Organization

Create a theme with tags for better organization and tracking.

```ts
const taggedTheme = await AWS.AmplifyUIBuilder.Theme("taggedTheme", {
  AppId: "my-app-id",
  Name: "Tagged Theme",
  Values: [
    { key: "colorLink", value: "#007bff" },
    { key: "fontWeightBold", value: "700" }
  ],
  Tags: {
    environment: "production",
    owner: "design-team"
  }
});
```
