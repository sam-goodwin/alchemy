---
title: Project
description: Learn how to create, update, and manage AWS IoTSiteWise Projects using Alchemy Cloud Control.
---


The Project resource lets you manage [AWS IoTSiteWise Projects](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic IoTSiteWise project with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const iotProject = await AWS.IoTSiteWise.Project("basic-iot-project", {
  ProjectName: "Manufacturing Overview",
  PortalId: "portal-123456",
  ProjectDescription: "A project to visualize manufacturing data.",
  AssetIds: ["asset-1", "asset-2"]
});
```

## Advanced Configuration

Configure an IoTSiteWise project with additional tags for better organization and management.

```ts
const advancedIotProject = await AWS.IoTSiteWise.Project("advanced-iot-project", {
  ProjectName: "Energy Management",
  PortalId: "portal-123456",
  ProjectDescription: "A project to monitor and manage energy consumption.",
  AssetIds: ["asset-3", "asset-4"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Energy" }
  ]
});
```

## Adoption of Existing Resources

Create a project that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptExistingProject = await AWS.IoTSiteWise.Project("adopt-iot-project", {
  ProjectName: "Water Treatment Monitoring",
  PortalId: "portal-123456",
  ProjectDescription: "A project to monitor water treatment processes.",
  AssetIds: ["asset-5"],
  adopt: true
});
```
