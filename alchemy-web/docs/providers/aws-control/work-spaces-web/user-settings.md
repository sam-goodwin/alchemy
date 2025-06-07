---
title: Managing AWS WorkSpacesWeb UserSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb UserSettingss using Alchemy Cloud Control.
---

# UserSettings

The UserSettings resource lets you create and manage [AWS WorkSpacesWeb UserSettingss](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspacesweb-usersettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const usersettings = await AWS.WorkSpacesWeb.UserSettings("usersettings-example", {
  PrintAllowed: "example-printallowed",
  CopyAllowed: "example-copyallowed",
  DownloadAllowed: "example-downloadallowed",
  UploadAllowed: "example-uploadallowed",
  PasteAllowed: "example-pasteallowed",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a usersettings with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedUserSettings = await AWS.WorkSpacesWeb.UserSettings("advanced-usersettings", {
  PrintAllowed: "example-printallowed",
  CopyAllowed: "example-copyallowed",
  DownloadAllowed: "example-downloadallowed",
  UploadAllowed: "example-uploadallowed",
  PasteAllowed: "example-pasteallowed",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

