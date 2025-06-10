---
title: SyncJob
description: Learn how to create, update, and manage AWS IoTTwinMaker SyncJobs using Alchemy Cloud Control.
---


The SyncJob resource allows you to manage synchronization jobs within AWS IoTTwinMaker, enabling the integration of real-time data with your digital twin applications. For more detailed information, refer to the [AWS IoTTwinMaker SyncJobs documentation](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/).

## Minimal Example

Create a basic SyncJob with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicSyncJob = await AWS.IoTTwinMaker.SyncJob("basicSyncJob", {
  SyncSource: "https://mydata.source.com",
  SyncRole: "arn:aws:iam::123456789012:role/MySyncRole",
  WorkspaceId: "myWorkspaceId",
  Tags: {
    Project: "SyncProject",
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a SyncJob with additional properties and a custom role.

```ts
const advancedSyncJob = await AWS.IoTTwinMaker.SyncJob("advancedSyncJob", {
  SyncSource: "https://mydata.source.com",
  SyncRole: "arn:aws:iam::123456789012:role/MyAdvancedSyncRole",
  WorkspaceId: "myWorkspaceId",
  Tags: {
    Project: "AdvancedSyncProject",
    Environment: "Staging"
  },
  adopt: true // Allows the job to adopt existing resources
});
```

## Using SyncJob for Data Integration

Create a SyncJob designed specifically for ingesting data from an external source into your digital twin model.

```ts
const dataIntegrationSyncJob = await AWS.IoTTwinMaker.SyncJob("dataIntegrationSyncJob", {
  SyncSource: "https://externaldata.source.com/api/data",
  SyncRole: "arn:aws:iam::123456789012:role/DataIntegrationRole",
  WorkspaceId: "dataWorkspaceId",
  Tags: {
    Project: "DataIntegration",
    Type: "RealTime"
  }
});
```

## Example of SyncJob with Monitoring

This example demonstrates how to set up a SyncJob with tags for monitoring purposes.

```ts
const monitoringSyncJob = await AWS.IoTTwinMaker.SyncJob("monitoringSyncJob", {
  SyncSource: "https://monitoring.source.com",
  SyncRole: "arn:aws:iam::123456789012:role/MonitoringRole",
  WorkspaceId: "monitoringWorkspaceId",
  Tags: {
    Project: "MonitoringProject",
    AlertLevel: "High"
  }
});
```
