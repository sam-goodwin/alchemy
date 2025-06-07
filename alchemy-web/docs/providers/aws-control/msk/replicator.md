---
title: Managing AWS MSK Replicators with Alchemy
description: Learn how to create, update, and manage AWS MSK Replicators using Alchemy Cloud Control.
---

# Replicator

The Replicator resource lets you create and manage [AWS MSK Replicators](https://docs.aws.amazon.com/msk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-replicator.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const replicator = await AWS.MSK.Replicator("replicator-example", {
  ServiceExecutionRoleArn: "example-serviceexecutionrolearn",
  ReplicatorName: "replicator-replicator",
  ReplicationInfoList: [],
  KafkaClusters: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A replicator resource managed by Alchemy",
});
```

## Advanced Configuration

Create a replicator with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedReplicator = await AWS.MSK.Replicator("advanced-replicator", {
  ServiceExecutionRoleArn: "example-serviceexecutionrolearn",
  ReplicatorName: "replicator-replicator",
  ReplicationInfoList: [],
  KafkaClusters: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A replicator resource managed by Alchemy",
});
```

