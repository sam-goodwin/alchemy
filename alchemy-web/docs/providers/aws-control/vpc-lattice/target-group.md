---
title: Managing AWS VpcLattice TargetGroups with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice TargetGroups using Alchemy Cloud Control.
---

# TargetGroup

The TargetGroup resource lets you create and manage [AWS VpcLattice TargetGroups](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-targetgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const targetgroup = await AWS.VpcLattice.TargetGroup("targetgroup-example", {
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a targetgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTargetGroup = await AWS.VpcLattice.TargetGroup("advanced-targetgroup", {
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

