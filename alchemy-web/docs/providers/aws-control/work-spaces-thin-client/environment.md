---
title: Managing AWS WorkSpacesThinClient Environments with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesThinClient Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you create and manage [AWS WorkSpacesThinClient Environments](https://docs.aws.amazon.com/workspacesthinclient/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspacesthinclient-environment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environment = await AWS.WorkSpacesThinClient.Environment("environment-example", {
  DesktopArn: "example-desktoparn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a environment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironment = await AWS.WorkSpacesThinClient.Environment("advanced-environment", {
  DesktopArn: "example-desktoparn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

