---
title: Managing AWS DLM LifecyclePolicys with Alchemy
description: Learn how to create, update, and manage AWS DLM LifecyclePolicys using Alchemy Cloud Control.
---

# LifecyclePolicy

The LifecyclePolicy resource lets you create and manage [AWS DLM LifecyclePolicys](https://docs.aws.amazon.com/dlm/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dlm-lifecyclepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const lifecyclepolicy = await AWS.DLM.LifecyclePolicy("lifecyclepolicy-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A lifecyclepolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a lifecyclepolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLifecyclePolicy = await AWS.DLM.LifecyclePolicy("advanced-lifecyclepolicy", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A lifecyclepolicy resource managed by Alchemy",
});
```

