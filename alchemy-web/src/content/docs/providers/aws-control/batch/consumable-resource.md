---
title: ConsumableResource
description: Learn how to create, update, and manage AWS Batch ConsumableResources using Alchemy Cloud Control.
---


The ConsumableResource resource lets you manage [AWS Batch Consumable Resources](https://docs.aws.amazon.com/batch/latest/userguide/) which represent a finite quantity of resources available for job execution in AWS Batch.

## Minimal Example

Create a consumable resource with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const consumableResource = await AWS.Batch.ConsumableResource("myConsumableResource", {
  TotalQuantity: 100,
  ResourceType: "SLOTS",
  ConsumableResourceName: "compute-optimized-resources",
  Tags: {
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a consumable resource with additional properties such as tags.

```ts
const advancedConsumableResource = await AWS.Batch.ConsumableResource("advancedResource", {
  TotalQuantity: 200,
  ResourceType: "MEMORY",
  ConsumableResourceName: "high-memory-resources",
  Tags: {
    Department: "Engineering",
    CostCenter: "12345"
  },
  adopt: true // Will adopt existing resource if it already exists
});
```

## Resource Adoption

Demonstrate how to adopt an existing consumable resource rather than creating a new one.

```ts
const adoptedResource = await AWS.Batch.ConsumableResource("adoptedResource", {
  TotalQuantity: 150,
  ResourceType: "CPUS",
  ConsumableResourceName: "adopted-cpu-resources",
  adopt: true // Enables adoption of an existing resource
});
```

## Custom Resource Configuration

Create a consumable resource with a specific configuration for batch processing needs.

```ts
const customResource = await AWS.Batch.ConsumableResource("customBatchResource", {
  TotalQuantity: 75,
  ResourceType: "GPUS",
  ConsumableResourceName: "gpu-resources",
  Tags: {
    Project: "AI-Research",
    Owner: "DataScienceTeam"
  },
  adopt: false // Will fail if resource already exists
});
```
