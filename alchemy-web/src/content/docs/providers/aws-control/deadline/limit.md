---
title: Limit
description: Learn how to create, update, and manage AWS Deadline Limits using Alchemy Cloud Control.
---


The Limit resource allows you to manage [AWS Deadline Limits](https://docs.aws.amazon.com/deadline/latest/userguide/) for your Deadline rendering jobs and resources. This includes configuring limits on resource usage and providing descriptive metadata for better management.

## Minimal Example

Create a basic Deadline Limit with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const deadlineLimit = await AWS.Deadline.Limit("basicDeadlineLimit", {
  AmountRequirementName: "RenderSlotCount",
  DisplayName: "Render Slot Limit",
  MaxCount: 10,
  FarmId: "farm-12345",
  Description: "Limit for render slots in the main farm"
});
```

## Advanced Configuration

Configure a Deadline Limit with additional options including adopting an existing resource.

```ts
const advancedDeadlineLimit = await AWS.Deadline.Limit("advancedDeadlineLimit", {
  AmountRequirementName: "RenderSlotCount",
  DisplayName: "Advanced Render Slot Limit",
  MaxCount: 15,
  FarmId: "farm-67890",
  Description: "Advanced limit for render slots in the secondary farm",
  adopt: true
});
```

## Using Different Amount Requirement Names

You can create multiple limits with different amount requirement names for various resources.

```ts
const assetLimit = await AWS.Deadline.Limit("assetLimit", {
  AmountRequirementName: "AssetCount",
  DisplayName: "Asset Limit for Rendering",
  MaxCount: 5,
  FarmId: "farm-34567",
  Description: "Limit for assets available for rendering jobs"
});
```

## Updating an Existing Limit

Demonstrate how to update an existing Deadline Limit by adjusting the MaxCount.

```ts
const updatedDeadlineLimit = await AWS.Deadline.Limit("existingDeadlineLimit", {
  AmountRequirementName: "RenderSlotCount",
  DisplayName: "Updated Render Slot Limit",
  MaxCount: 20, // Updated limit
  FarmId: "farm-12345",
  Description: "Updated limit for render slots in the main farm"
});
```
