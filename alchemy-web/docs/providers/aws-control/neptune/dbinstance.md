---
title: Managing AWS Neptune DBInstances with Alchemy
description: Learn how to create, update, and manage AWS Neptune DBInstances using Alchemy Cloud Control.
---

# DBInstance

The DBInstance resource lets you manage [AWS Neptune DBInstances](https://docs.aws.amazon.com/neptune/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Neptune DBInstance with required properties and common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicDBInstance = await AWS.Neptune.DBInstance("BasicDBInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "my-db-cluster",
  DBParameterGroupName: "default.neptune1",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a Neptune DBInstance with advanced settings such as maintenance window and auto-upgrade options.

```ts
import AWS from "alchemy/aws/control";

const advancedDBInstance = await AWS.Neptune.DBInstance("AdvancedDBInstance", {
  DBInstanceClass: "db.r5.xlarge",
  DBClusterIdentifier: "my-db-cluster",
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  AllowMajorVersionUpgrade: true,
  AutoMinorVersionUpgrade: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Example with Subnet Group

Create a Neptune DBInstance within a specific subnet group, ensuring network isolation.

```ts
import AWS from "alchemy/aws/control";

const subnetGroupDBInstance = await AWS.Neptune.DBInstance("SubnetGroupDBInstance", {
  DBInstanceClass: "db.r5.2xlarge",
  DBClusterIdentifier: "my-db-cluster",
  DBSubnetGroupName: "my-subnet-group",
  AvailabilityZone: "us-west-2a",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Example with Snapshot

Launch a Neptune DBInstance from an existing snapshot.

```ts
import AWS from "alchemy/aws/control";

const snapshotDBInstance = await AWS.Neptune.DBInstance("SnapshotDBInstance", {
  DBInstanceClass: "db.r5.large",
  DBSnapshotIdentifier: "my-db-snapshot",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```