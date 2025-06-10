---
title: DBInstance
description: Learn how to create, update, and manage AWS Neptune DBInstances using Alchemy Cloud Control.
---


The DBInstance resource lets you manage [AWS Neptune DBInstances](https://docs.aws.amazon.com/neptune/latest/userguide/) for graph databases, providing high availability and scalability.

## Minimal Example

This example demonstrates how to create a basic Neptune DBInstance with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const neptuneInstance = await AWS.Neptune.DBInstance("myNeptuneInstance", {
  DBInstanceClass: "db.r5.large",
  DBParameterGroupName: "default.neptune1",
  DBSubnetGroupName: "myNeptuneSubnetGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GraphDatabase" }
  ]
});
```

## Advanced Configuration

Configure a Neptune DBInstance with advanced settings, including auto minor version upgrades and maintenance windows.

```ts
const advancedNeptuneInstance = await AWS.Neptune.DBInstance("advancedNeptuneInstance", {
  DBInstanceClass: "db.r5.xlarge",
  DBParameterGroupName: "default.neptune1",
  DBSubnetGroupName: "myNeptuneSubnetGroup",
  AllowMajorVersionUpgrade: true,
  AutoMinorVersionUpgrade: true,
  PreferredMaintenanceWindow: "sun:05:00-sun:05:30",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "GraphDatabase" }
  ]
});
```

## Creating with Snapshot

This example illustrates how to create a DBInstance from a specific snapshot.

```ts
const snapshotNeptuneInstance = await AWS.Neptune.DBInstance("snapshotNeptuneInstance", {
  DBInstanceClass: "db.r5.large",
  DBSnapshotIdentifier: "myNeptuneSnapshot",
  DBSubnetGroupName: "myNeptuneSubnetGroup",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "GraphDatabase" }
  ]
});
```

## Multi-AZ Deployment

This example demonstrates how to configure a Neptune DBInstance in a specific availability zone for high availability.

```ts
const multiAZNeptuneInstance = await AWS.Neptune.DBInstance("multiAZNeptuneInstance", {
  DBInstanceClass: "db.r5.2xlarge",
  DBParameterGroupName: "default.neptune1",
  DBSubnetGroupName: "myNeptuneSubnetGroup",
  AvailabilityZone: "us-west-2a",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GraphDatabase" }
  ]
});
```
