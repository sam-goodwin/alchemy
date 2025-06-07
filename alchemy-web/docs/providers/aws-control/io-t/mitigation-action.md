---
title: Managing AWS IoT MitigationActions with Alchemy
description: Learn how to create, update, and manage AWS IoT MitigationActions using Alchemy Cloud Control.
---

# MitigationAction

The MitigationAction resource lets you create and manage [AWS IoT MitigationActions](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mitigationaction = await AWS.IoT.MitigationAction("mitigationaction-example", {
  ActionParams: "example-actionparams",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a mitigationaction with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMitigationAction = await AWS.IoT.MitigationAction("advanced-mitigationaction", {
  ActionParams: "example-actionparams",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

