---
title: Managing AWS WorkSpacesWeb DataProtectionSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb DataProtectionSettingss using Alchemy Cloud Control.
---

# DataProtectionSettings

The DataProtectionSettings resource lets you create and manage [AWS WorkSpacesWeb DataProtectionSettingss](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspacesweb-dataprotectionsettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataprotectionsettings = await AWS.WorkSpacesWeb.DataProtectionSettings(
  "dataprotectionsettings-example",
  {
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A dataprotectionsettings resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a dataprotectionsettings with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataProtectionSettings = await AWS.WorkSpacesWeb.DataProtectionSettings(
  "advanced-dataprotectionsettings",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A dataprotectionsettings resource managed by Alchemy",
  }
);
```

