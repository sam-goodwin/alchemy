---
title: Managing AWS XRay SamplingRules with Alchemy
description: Learn how to create, update, and manage AWS XRay SamplingRules using Alchemy Cloud Control.
---

# SamplingRule

The SamplingRule resource lets you create and manage [AWS XRay SamplingRules](https://docs.aws.amazon.com/xray/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-xray-samplingrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const samplingrule = await AWS.XRay.SamplingRule("samplingrule-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a samplingrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSamplingRule = await AWS.XRay.SamplingRule("advanced-samplingrule", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

