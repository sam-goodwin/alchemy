---
title: Managing AWS IVS Stages with Alchemy
description: Learn how to create, update, and manage AWS IVS Stages using Alchemy Cloud Control.
---

# Stage

The Stage resource lets you create and manage [AWS IVS Stages](https://docs.aws.amazon.com/ivs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-stage.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const stage = await AWS.IVS.Stage("stage-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a stage with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStage = await AWS.IVS.Stage("advanced-stage", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

