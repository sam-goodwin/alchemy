---
title: ReplicationTask
description: Learn how to create, update, and manage AWS DMS ReplicationTasks using Alchemy Cloud Control.
---


The ReplicationTask resource allows you to manage [AWS DMS ReplicationTasks](https://docs.aws.amazon.com/dms/latest/userguide/) for data migration and replication between different data sources.

## Minimal Example

Create a basic replication task with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const replicationTask = await AWS.DMS.ReplicationTask("myReplicationTask", {
  MigrationType: "full-load",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:EXAMPLE",
  ReplicationInstanceArn: "arn:aws:dms:us-west-2:123456789012:rep:EXAMPLE",
  TableMappings: JSON.stringify({
    "rules": [
      {
        "rule-type": "selection",
        "rule-id": "1",
        "rule-name": "includeAll",
        "rule-action": "include",
        "filters": []
      }
    ]
  }),
  ReplicationTaskSettings: JSON.stringify({
    "TargetMetadata": {
      "TargetSchema": "targetSchema"
    }
  })
});
```

## Advanced Configuration

Configure a replication task with additional settings including CDC start time and task identifier.

```ts
const advancedReplicationTask = await AWS.DMS.ReplicationTask("advancedReplicationTask", {
  MigrationType: "cdc",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:EXAMPLE",
  ReplicationInstanceArn: "arn:aws:dms:us-west-2:123456789012:rep:EXAMPLE",
  TableMappings: JSON.stringify({
    "rules": [
      {
        "rule-type": "selection",
        "rule-id": "1",
        "rule-name": "includeAll",
        "rule-action": "include",
        "filters": []
      }
    ]
  }),
  CdcStartTime: Date.now(),
  ReplicationTaskIdentifier: "cdcTask",
  CdcStartPosition: "2017-07-20T12:00:00Z"
});
```

## Custom Task Data

Create a replication task with custom task data settings to control specific behaviors.

```ts
const customTaskDataReplication = await AWS.DMS.ReplicationTask("customTaskDataReplication", {
  MigrationType: "full-load-and-cdc",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:EXAMPLE",
  ReplicationInstanceArn: "arn:aws:dms:us-west-2:123456789012:rep:EXAMPLE",
  TableMappings: JSON.stringify({
    "rules": [
      {
        "rule-type": "selection",
        "rule-id": "1",
        "rule-name": "includeAll",
        "rule-action": "include",
        "filters": []
      }
    ]
  }),
  TaskData: JSON.stringify({
    "FullLoadSettings": {
      "TargetTablePrepMode": "DROP_AND_CREATE"
    }
  })
});
```
