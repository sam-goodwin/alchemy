---
title: Managing AWS DocDB DBInstances with Alchemy
description: Learn how to create, update, and manage AWS DocDB DBInstances using Alchemy Cloud Control.
---

# DBInstance

The DBInstance resource allows you to manage [AWS DocumentDB DBInstances](https://docs.aws.amazon.com/docdb/latest/userguide/) for your database needs, providing options for configuration, scaling, and maintenance.

## Minimal Example

Create a basic AWS DocumentDB DBInstance with required properties and a couple of optional configurations.

```ts
import AWS from "alchemy/aws/control";

const BasicDBInstance = await AWS.DocDB.DBInstance("BasicDBInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "my-docdb-cluster",
  EnablePerformanceInsights: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure an AWS DocumentDB DBInstance with advanced settings such as maintenance window and certificate rotation.

```ts
const AdvancedDBInstance = await AWS.DocDB.DBInstance("AdvancedDBInstance", {
  DBInstanceClass: "db.r5.2xlarge",
  DBClusterIdentifier: "my-docdb-cluster",
  PreferredMaintenanceWindow: "sun:23:00-mon:01:00",
  CertificateRotationRestart: true,
  AutoMinorVersionUpgrade: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## High Availability Configuration

Create a DBInstance configured for high availability by specifying an Availability Zone.

```ts
const HighAvailabilityDBInstance = await AWS.DocDB.DBInstance("HighAvailabilityDBInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "my-docdb-cluster",
  AvailabilityZone: "us-west-2a",
  EnablePerformanceInsights: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "HighAvailability" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing DBInstance instead of failing if the resource already exists.

```ts
const AdoptExistingDBInstance = await AWS.DocDB.DBInstance("AdoptExistingDBInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "my-docdb-cluster",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Adoption" }
  ]
});
```