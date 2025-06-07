---
title: Managing AWS Route53RecoveryReadiness RecoveryGroups with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness RecoveryGroups using Alchemy Cloud Control.
---

# RecoveryGroup

The RecoveryGroup resource allows you to manage [AWS Route53RecoveryReadiness RecoveryGroups](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) that help ensure your applications remain available during outages.

## Minimal Example

Create a basic RecoveryGroup with a name and a list of associated cells.

```ts
import AWS from "alchemy/aws/control";

const BasicRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("BasicRecoveryGroup", {
  RecoveryGroupName: "MyRecoveryGroup",
  Cells: ["CellA", "CellB"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a RecoveryGroup with additional tags and settings for adopting existing resources.

```ts
const AdvancedRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("AdvancedRecoveryGroup", {
  RecoveryGroupName: "AdvancedRecoveryGroup",
  Cells: ["CellX", "CellY", "CellZ"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" },
    { Key: "Project", Value: "Migration" }
  ],
  adopt: true // Adopt existing RecoveryGroup if it already exists
});
```

## Use Case: Disaster Recovery Planning

Create a RecoveryGroup specifically for disaster recovery planning, including multiple cells and tags for tracking.

```ts
const DisasterRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("DisasterRecoveryGroup", {
  RecoveryGroupName: "DisasterRecoveryGroup",
  Cells: ["PrimaryCell", "BackupCell", "DisasterCell"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Infrastructure" },
    { Key: "Purpose", Value: "Disaster Recovery" }
  ]
});
```

## Use Case: Multi-Region Setup

Set up a RecoveryGroup that spans multiple regions for high availability.

```ts
const MultiRegionRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("MultiRegionRecoveryGroup", {
  RecoveryGroupName: "MultiRegionRecovery",
  Cells: ["USWestCell", "USEastCell"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Region", Value: "Multi-Region" }
  ],
  adopt: false // Do not adopt existing resources
});
```