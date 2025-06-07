---
title: Managing AWS IoTTwinMaker SyncJobs with Alchemy
description: Learn how to create, update, and manage AWS IoTTwinMaker SyncJobs using Alchemy Cloud Control.
---

# SyncJob

The SyncJob resource lets you create and manage [AWS IoTTwinMaker SyncJobs](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iottwinmaker-syncjob.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const syncjob = await AWS.IoTTwinMaker.SyncJob("syncjob-example", {
  SyncSource: "example-syncsource",
  SyncRole: "example-syncrole",
  WorkspaceId: "example-workspaceid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a syncjob with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSyncJob = await AWS.IoTTwinMaker.SyncJob("advanced-syncjob", {
  SyncSource: "example-syncsource",
  SyncRole: "example-syncrole",
  WorkspaceId: "example-workspaceid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

