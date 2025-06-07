---
title: Managing AWS WorkSpacesWeb IpAccessSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb IpAccessSettingss using Alchemy Cloud Control.
---

# IpAccessSettings

The IpAccessSettings resource lets you create and manage [AWS WorkSpacesWeb IpAccessSettingss](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspacesweb-ipaccesssettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ipaccesssettings = await AWS.WorkSpacesWeb.IpAccessSettings("ipaccesssettings-example", {
  IpRules: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A ipaccesssettings resource managed by Alchemy",
});
```

## Advanced Configuration

Create a ipaccesssettings with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIpAccessSettings = await AWS.WorkSpacesWeb.IpAccessSettings(
  "advanced-ipaccesssettings",
  {
    IpRules: [],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A ipaccesssettings resource managed by Alchemy",
  }
);
```

