---
title: DBInstance
description: Learn how to create, update, and manage AWS DocDB DBInstances using Alchemy Cloud Control.
---


The DBInstance resource lets you manage [AWS DocumentDB DBInstances](https://docs.aws.amazon.com/docdb/latest/userguide/) for your database applications.

## Minimal Example

Create a basic DocumentDB instance with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const docDbInstance = await AWS.DocDB.DBInstance("myDocDbInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "myDocDbCluster",
  EnablePerformanceInsights: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AlchemyDemo" }
  ]
});
```

## Advanced Configuration

Configure a DocumentDB instance with additional settings such as maintenance window and security options.

```ts
const advancedDocDbInstance = await AWS.DocDB.DBInstance("advancedDocDbInstance", {
  DBInstanceClass: "db.r5.2xlarge",
  DBClusterIdentifier: "myDocDbCluster",
  PreferredMaintenanceWindow: "Mon:00:00-Mon:00:30",
  AutoMinorVersionUpgrade: true,
  CertificateRotationRestart: true,
  CACertificateIdentifier: "rds-ca-2019",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "AlchemyDemo" }
  ]
});
```

## Creating an Instance in a Specific Availability Zone

This example demonstrates how to create a DocumentDB instance in a specific availability zone to optimize latency.

```ts
const azDocDbInstance = await AWS.DocDB.DBInstance("azDocDbInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "myDocDbCluster",
  AvailabilityZone: "us-east-1a", // Specify the availability zone
  EnablePerformanceInsights: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "AlchemyDemo" }
  ]
});
```

## Adoption of Existing Resource

This example illustrates how to adopt an existing DocumentDB instance rather than creating a new one.

```ts
const adoptDocDbInstance = await AWS.DocDB.DBInstance("existingDocDbInstance", {
  DBInstanceClass: "db.r5.large",
  DBClusterIdentifier: "myDocDbCluster",
  adopt: true // Adopt existing resource instead of failing
});
```
