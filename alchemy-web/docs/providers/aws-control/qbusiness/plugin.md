---
title: Managing AWS QBusiness Plugins with Alchemy
description: Learn how to create, update, and manage AWS QBusiness Plugins using Alchemy Cloud Control.
---

# Plugin

The Plugin resource lets you create and manage [AWS QBusiness Plugins](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-plugin.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const plugin = await AWS.QBusiness.Plugin("plugin-example", {
  Type: "example-type",
  DisplayName: "plugin-display",
  AuthConfiguration: "example-authconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a plugin with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPlugin = await AWS.QBusiness.Plugin("advanced-plugin", {
  Type: "example-type",
  DisplayName: "plugin-display",
  AuthConfiguration: "example-authconfiguration",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

