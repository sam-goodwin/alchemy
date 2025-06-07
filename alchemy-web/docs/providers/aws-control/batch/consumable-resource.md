---
title: Managing AWS Batch ConsumableResources with Alchemy
description: Learn how to create, update, and manage AWS Batch ConsumableResources using Alchemy Cloud Control.
---

# ConsumableResource

The ConsumableResource resource lets you manage [AWS Batch ConsumableResources](https://docs.aws.amazon.com/batch/latest/userguide/) for defining consumable resources in your batch jobs.

## Minimal Example

Create a basic consumable resource with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicConsumableResource = await AWS.Batch.ConsumableResource("BasicConsumableResource", {
  TotalQuantity: 100,
  ResourceType: "VCPU",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure a consumable resource with additional properties such as a custom resource name and multiple tags.

```ts
const AdvancedConsumableResource = await AWS.Batch.ConsumableResource("AdvancedConsumableResource", {
  TotalQuantity: 200,
  ConsumableResourceName: "CustomVCPUResource",
  ResourceType: "VCPU",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataScience" }
  ],
  adopt: true
});
```

## Using Tags for Management

Create a consumable resource focused on resource organization using tags for easier management.

```ts
const TaggedConsumableResource = await AWS.Batch.ConsumableResource("TaggedConsumableResource", {
  TotalQuantity: 150,
  ResourceType: "Memory",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "MachineLearning" },
    { Key: "Owner", Value: "AI_Team" }
  ]
});
```