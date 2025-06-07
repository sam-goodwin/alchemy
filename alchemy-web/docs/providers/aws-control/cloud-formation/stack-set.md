---
title: Managing AWS CloudFormation StackSets with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation StackSets using Alchemy Cloud Control.
---

# StackSet

The StackSet resource lets you create and manage [AWS CloudFormation StackSets](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-stackset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const stackset = await AWS.CloudFormation.StackSet("stackset-example", {
  StackSetName: "stackset-stackset",
  PermissionModel: "example-permissionmodel",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A stackset resource managed by Alchemy",
});
```

## Advanced Configuration

Create a stackset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStackSet = await AWS.CloudFormation.StackSet("advanced-stackset", {
  StackSetName: "stackset-stackset",
  PermissionModel: "example-permissionmodel",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A stackset resource managed by Alchemy",
});
```

