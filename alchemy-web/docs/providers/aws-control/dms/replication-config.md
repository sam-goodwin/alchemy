---
title: Managing AWS DMS ReplicationConfigs with Alchemy
description: Learn how to create, update, and manage AWS DMS ReplicationConfigs using Alchemy Cloud Control.
---

# ReplicationConfig

The ReplicationConfig resource lets you create and manage [AWS DMS ReplicationConfigs](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-replicationconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const replicationconfig = await AWS.DMS.ReplicationConfig("replicationconfig-example", {
  ReplicationConfigIdentifier: "example-replicationconfigidentifier",
  ComputeConfig: "example-computeconfig",
  ReplicationType: "example-replicationtype",
  TableMappings: {},
  SourceEndpointArn: "example-sourceendpointarn",
  TargetEndpointArn: "example-targetendpointarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a replicationconfig with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedReplicationConfig = await AWS.DMS.ReplicationConfig("advanced-replicationconfig", {
  ReplicationConfigIdentifier: "example-replicationconfigidentifier",
  ComputeConfig: "example-computeconfig",
  ReplicationType: "example-replicationtype",
  TableMappings: {},
  SourceEndpointArn: "example-sourceendpointarn",
  TargetEndpointArn: "example-targetendpointarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

