---
title: ReplicationSet
description: Learn how to create, update, and manage AWS SSMIncidents ReplicationSets using Alchemy Cloud Control.
---


The ReplicationSet resource lets you manage [AWS SSMIncidents ReplicationSets](https://docs.aws.amazon.com/ssmincidents/latest/userguide/) for incident response across multiple regions.

## Minimal Example

Create a basic replication set with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicReplicationSet = await AWS.SSMIncidents.ReplicationSet("basicReplicationSet", {
  Regions: [
    { Region: "us-east-1" },
    { Region: "us-west-2" }
  ],
  DeletionProtected: true
});
```

## Advanced Configuration

Configure a replication set with additional tags and multiple regions.

```ts
const advancedReplicationSet = await AWS.SSMIncidents.ReplicationSet("advancedReplicationSet", {
  Regions: [
    { Region: "eu-central-1" },
    { Region: "ap-southeast-1" }
  ],
  DeletionProtected: false,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IncidentResponse" }
  ]
});
```

## Adopting Existing Resources

Create a replication set that adopts existing resources if they are already present.

```ts
const adoptExistingReplicationSet = await AWS.SSMIncidents.ReplicationSet("adoptReplicationSet", {
  Regions: [
    { Region: "us-east-1" },
    { Region: "us-west-1" }
  ],
  adopt: true
});
```

## Setting Multiple Regions

Set up a replication set across several regions to enhance incident management.

```ts
const multiRegionReplicationSet = await AWS.SSMIncidents.ReplicationSet("multiRegionReplicationSet", {
  Regions: [
    { Region: "us-east-1" },
    { Region: "us-west-2" },
    { Region: "ap-northeast-1" }
  ],
  Tags: [
    { Key: "Project", Value: "GlobalIncidentManagement" }
  ]
});
```
