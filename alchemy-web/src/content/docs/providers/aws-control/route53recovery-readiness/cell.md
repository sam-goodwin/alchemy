---
title: Cell
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness Cells using Alchemy Cloud Control.
---


The Cell resource allows you to manage [AWS Route53RecoveryReadiness Cells](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) that help ensure recovery readiness for your applications across multiple AWS Regions.

## Minimal Example

Create a basic Cell with a name and optional tags:

```ts
import AWS from "alchemy/aws/control";

const basicCell = await AWS.Route53RecoveryReadiness.Cell("myBasicCell", {
  cellName: "PrimaryCell",
  tags: [
    {
      key: "Environment",
      value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a Cell with nested Cells and additional properties:

```ts
const advancedCell = await AWS.Route53RecoveryReadiness.Cell("myAdvancedCell", {
  cellName: "AdvancedCell",
  cells: ["SecondaryCell1", "SecondaryCell2"],
  adopt: true,
  tags: [
    {
      key: "Project",
      value: "DisasterRecovery"
    },
    {
      key: "Owner",
      value: "TeamA"
    }
  ]
});
```

## Nested Cells Example

Create a Cell that contains multiple nested Cells for a multi-region setup:

```ts
const multiRegionCell = await AWS.Route53RecoveryReadiness.Cell("myMultiRegionCell", {
  cellName: "MultiRegionCell",
  cells: ["RegionA", "RegionB", "RegionC"],
  tags: [
    {
      key: "UseCase",
      value: "HighAvailability"
    }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing Cell without failing if it already exists:

```ts
const adoptExistingCell = await AWS.Route53RecoveryReadiness.Cell("myAdoptedCell", {
  cellName: "ExistingCell",
  adopt: true
});
```
