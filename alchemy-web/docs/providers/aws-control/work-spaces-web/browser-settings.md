---
title: Managing AWS WorkSpacesWeb BrowserSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb BrowserSettingss using Alchemy Cloud Control.
---

# BrowserSettings

The BrowserSettings resource lets you create and manage [AWS WorkSpacesWeb BrowserSettingss](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspacesweb-browsersettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const browsersettings = await AWS.WorkSpacesWeb.BrowserSettings("browsersettings-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a browsersettings with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBrowserSettings = await AWS.WorkSpacesWeb.BrowserSettings(
  "advanced-browsersettings",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

