---
title: Managing AWS ControlTower EnabledControls with Alchemy
description: Learn how to create, update, and manage AWS ControlTower EnabledControls using Alchemy Cloud Control.
---

# EnabledControl

The EnabledControl resource lets you create and manage [AWS ControlTower EnabledControls](https://docs.aws.amazon.com/controltower/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-controltower-enabledcontrol.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const enabledcontrol = await AWS.ControlTower.EnabledControl("enabledcontrol-example", {
  ControlIdentifier: "example-controlidentifier",
  TargetIdentifier: "example-targetidentifier",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a enabledcontrol with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnabledControl = await AWS.ControlTower.EnabledControl("advanced-enabledcontrol", {
  ControlIdentifier: "example-controlidentifier",
  TargetIdentifier: "example-targetidentifier",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

