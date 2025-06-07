---
title: Managing AWS DMS ReplicationTasks with Alchemy
description: Learn how to create, update, and manage AWS DMS ReplicationTasks using Alchemy Cloud Control.
---

# ReplicationTask

The ReplicationTask resource lets you create and manage [AWS DMS ReplicationTasks](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-replicationtask.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const replicationtask = await AWS.DMS.ReplicationTask("replicationtask-example", {
  MigrationType: "example-migrationtype",
  TargetEndpointArn: "example-targetendpointarn",
  ReplicationInstanceArn: "example-replicationinstancearn",
  TableMappings: "example-tablemappings",
  SourceEndpointArn: "example-sourceendpointarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a replicationtask with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedReplicationTask = await AWS.DMS.ReplicationTask("advanced-replicationtask", {
  MigrationType: "example-migrationtype",
  TargetEndpointArn: "example-targetendpointarn",
  ReplicationInstanceArn: "example-replicationinstancearn",
  TableMappings: "example-tablemappings",
  SourceEndpointArn: "example-sourceendpointarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

