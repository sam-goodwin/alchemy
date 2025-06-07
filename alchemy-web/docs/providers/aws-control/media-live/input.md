---
title: Managing AWS MediaLive Inputs with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Inputs using Alchemy Cloud Control.
---

# Input

The Input resource lets you create and manage [AWS MediaLive Inputs](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-input.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const input = await AWS.MediaLive.Input("input-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a input with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInput = await AWS.MediaLive.Input("advanced-input", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

