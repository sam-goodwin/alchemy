---
title: Managing AWS IoTSiteWise Projects with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you manage [AWS IoTSiteWise Projects](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for organizing and visualizing your industrial data.

## Minimal Example

Create a basic IoTSiteWise Project with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.IoTSiteWise.Project("BasicProject", {
  ProjectName: "ProductionLineMonitoring",
  PortalId: "portal-123456",
  ProjectDescription: "A project to monitor the production line",
  AssetIds: ["asset-1", "asset-2"],
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Create a more complex IoTSiteWise Project with additional tags.

```ts
const advancedProject = await AWS.IoTSiteWise.Project("AdvancedProject", {
  ProjectName: "QualityControlMonitoring",
  PortalId: "portal-654321",
  ProjectDescription: "A project focused on quality control monitoring",
  AssetIds: ["asset-3", "asset-4"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Department", Value: "QualityAssurance" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Utilizing with Existing Assets

Demonstrate how to create a project that links to existing assets.

```ts
const projectWithExistingAssets = await AWS.IoTSiteWise.Project("ExistingAssetsProject", {
  ProjectName: "ExistingAssetsMonitoring",
  PortalId: "portal-789012",
  AssetIds: ["existing-asset-1", "existing-asset-2"], // Link to existing assets
  ProjectDescription: "A project that utilizes existing assets for monitoring",
  Tags: [{ Key: "UseCase", Value: "AssetMonitoring" }]
});
```