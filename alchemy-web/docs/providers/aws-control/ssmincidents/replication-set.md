---
title: Managing AWS SSMIncidents ReplicationSets with Alchemy
description: Learn how to create, update, and manage AWS SSMIncidents ReplicationSets using Alchemy Cloud Control.
---

# ReplicationSet

The ReplicationSet resource lets you create and manage [AWS SSMIncidents ReplicationSets](https://docs.aws.amazon.com/ssmincidents/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmincidents-replicationset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const replicationset = await AWS.SSMIncidents.ReplicationSet("replicationset-example", {
  Regions: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a replicationset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedReplicationSet = await AWS.SSMIncidents.ReplicationSet("advanced-replicationset", {
  Regions: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

