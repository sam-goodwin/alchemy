---
title: Managing AWS ControlTower EnabledBaselines with Alchemy
description: Learn how to create, update, and manage AWS ControlTower EnabledBaselines using Alchemy Cloud Control.
---

# EnabledBaseline

The EnabledBaseline resource lets you create and manage [AWS ControlTower EnabledBaselines](https://docs.aws.amazon.com/controltower/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-controltower-enabledbaseline.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const enabledbaseline = await AWS.ControlTower.EnabledBaseline("enabledbaseline-example", {
  BaselineVersion: "example-baselineversion",
  BaselineIdentifier: "example-baselineidentifier",
  TargetIdentifier: "example-targetidentifier",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a enabledbaseline with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnabledBaseline = await AWS.ControlTower.EnabledBaseline("advanced-enabledbaseline", {
  BaselineVersion: "example-baselineversion",
  BaselineIdentifier: "example-baselineidentifier",
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

