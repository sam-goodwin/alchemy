---
title: Fleet
description: Learn how to create, update, and manage AWS Deadline Fleets using Alchemy Cloud Control.
---


The Fleet resource lets you manage [AWS Deadline Fleets](https://docs.aws.amazon.com/deadline/latest/userguide/) for rendering and processing tasks in a scalable and efficient manner.

## Minimal Example

Create a basic Deadline Fleet with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicFleet = await AWS.Deadline.Fleet("basic-fleet", {
  Configuration: {
    // Add your fleet configuration here
    instanceTypes: ["t3.large"],
    spot: true
  },
  MaxWorkerCount: 10,
  DisplayName: "Basic Rendering Fleet",
  FarmId: "my-farm-id",
  RoleArn: "arn:aws:iam::123456789012:role/MyDeadlineRole",
  Description: "This is a basic fleet for rendering tasks"
});
```

## Advanced Configuration

Configure a Deadline Fleet with a minimum worker count and tags for better resource management.

```ts
const advancedFleet = await AWS.Deadline.Fleet("advanced-fleet", {
  Configuration: {
    // Define the fleet's configuration
    instanceTypes: ["t3.large", "t3.xlarge"],
    spot: false
  },
  MaxWorkerCount: 20,
  MinWorkerCount: 5,
  DisplayName: "Advanced Rendering Fleet",
  FarmId: "my-farm-id",
  RoleArn: "arn:aws:iam::123456789012:role/MyDeadlineRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Rendering" }
  ]
});
```

## Spot Instances Configuration

Create a fleet that uses spot instances for cost-effective rendering.

```ts
const spotFleet = await AWS.Deadline.Fleet("spot-fleet", {
  Configuration: {
    // Configuration for spot instances
    instanceTypes: ["c5.large"],
    spot: true
  },
  MaxWorkerCount: 15,
  DisplayName: "Spot Instance Rendering Fleet",
  FarmId: "my-farm-id",
  RoleArn: "arn:aws:iam::123456789012:role/MyDeadlineRole"
});
```

## Dynamic Scaling

Set up a fleet that dynamically scales based on workload.

```ts
const dynamicFleet = await AWS.Deadline.Fleet("dynamic-fleet", {
  Configuration: {
    // Configuration for a dynamic fleet
    instanceTypes: ["m5.large"],
    spot: false
  },
  MaxWorkerCount: 50,
  MinWorkerCount: 10,
  DisplayName: "Dynamic Rendering Fleet",
  FarmId: "my-farm-id",
  RoleArn: "arn:aws:iam::123456789012:role/MyDeadlineRole"
});
```
