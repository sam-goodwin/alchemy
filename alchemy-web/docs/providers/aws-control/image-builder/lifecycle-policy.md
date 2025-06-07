---
title: Managing AWS ImageBuilder LifecyclePolicys with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder LifecyclePolicys using Alchemy Cloud Control.
---

# LifecyclePolicy

The LifecyclePolicy resource lets you create and manage [AWS ImageBuilder LifecyclePolicys](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-lifecyclepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const lifecyclepolicy = await AWS.ImageBuilder.LifecyclePolicy("lifecyclepolicy-example", {
  ResourceType: "example-resourcetype",
  PolicyDetails: [],
  ExecutionRole: "example-executionrole",
  ResourceSelection: "example-resourceselection",
  Name: "lifecyclepolicy-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A lifecyclepolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a lifecyclepolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLifecyclePolicy = await AWS.ImageBuilder.LifecyclePolicy("advanced-lifecyclepolicy", {
  ResourceType: "example-resourcetype",
  PolicyDetails: [],
  ExecutionRole: "example-executionrole",
  ResourceSelection: "example-resourceselection",
  Name: "lifecyclepolicy-",
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

