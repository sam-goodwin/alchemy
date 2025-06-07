---
title: Managing AWS LookoutVision Projects with Alchemy
description: Learn how to create, update, and manage AWS LookoutVision Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you manage [AWS LookoutVision Projects](https://docs.aws.amazon.com/lookoutvision/latest/userguide/) for analyzing images and detecting anomalies in visual data.

## Minimal Example

Create a basic LookoutVision project with a specified project name.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.LookoutVision.Project("basic-project", {
  ProjectName: "RetailQualityInspection",
  adopt: false // Default is false: Fail if the resource already exists
});
```

## Advanced Configuration

Configure a LookoutVision project with additional optional properties.

```ts
import AWS from "alchemy/aws/control";

const advancedProject = await AWS.LookoutVision.Project("advanced-project", {
  ProjectName: "ManufacturingDefectDetection",
  adopt: false,
  // Additional properties could include tags, if supported in future
});
```

## Project Adoption

Create a project that adopts an existing resource instead of failing if the resource already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedProject = await AWS.LookoutVision.Project("adopted-project", {
  ProjectName: "ExistingQualityControlProject",
  adopt: true // This will adopt an existing project if it exists
});
```