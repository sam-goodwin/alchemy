---
title: DBInstance
description: Learn how to create, update, and manage AWS RDS DBInstances using Alchemy Cloud Control.
---


The DBInstance resource lets you manage [AWS RDS DBInstances](https://docs.aws.amazon.com/rds/latest/userguide/) for relational databases, providing a scalable and reliable way to store and retrieve your data.

## Minimal Example

Create a basic RDS DBInstance with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const dbInstance = await AWS.RDS.DBInstance("myDbInstance", {
  DBInstanceIdentifier: "my-database",
  DBInstanceClass: "db.t3.micro",
  Engine: "mysql",
  AllocatedStorage: "20",
  MasterUsername: "admin",
  MasterUserPassword: "password123",
  StorageEncrypted: true,
  VPCSecurityGroups: ["sg-0123456789abcdef0"]
});
```

## Advanced Configuration

Configure an RDS DBInstance with advanced options such as performance insights and automated backups.

```ts
const advancedDbInstance = await AWS.RDS.DBInstance("advancedDbInstance", {
  DBInstanceIdentifier: "my-advanced-database",
  DBInstanceClass: "db.t3.medium",
  Engine: "postgres",
  AllocatedStorage: "50",
  MasterUsername: "admin",
  MasterUserPassword: "securePassword",
  EnablePerformanceInsights: true,
  PerformanceInsightsRetentionPeriod: 7,
  BackupRetentionPeriod: 30,
  MultiAZ: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Read Replica Configuration

Create an RDS Read Replica to scale read operations for your database.

```ts
const readReplica = await AWS.RDS.DBInstance("myReadReplica", {
  DBInstanceIdentifier: "my-db-read-replica",
  SourceDBInstanceIdentifier: "my-database",
  DBInstanceClass: "db.t3.medium",
  AllocatedStorage: "20",
  Tags: [
    { Key: "Type", Value: "ReadReplica" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Snapshot Restore

Restore a DBInstance from an existing snapshot.

```ts
const restoredDbInstance = await AWS.RDS.DBInstance("restoredDbInstance", {
  DBInstanceIdentifier: "my-restored-database",
  DBSnapshotIdentifier: "my-database-snapshot",
  DBInstanceClass: "db.t3.medium",
  Tags: [
    { Key: "RestoredFrom", Value: "my-database-snapshot" }
  ]
});
``` 

## Security Group Configuration

Create a DBInstance with specific security group settings to control access.

```ts
const secureDbInstance = await AWS.RDS.DBInstance("secureDbInstance", {
  DBInstanceIdentifier: "my-secure-database",
  DBInstanceClass: "db.t3.micro",
  Engine: "mysql",
  AllocatedStorage: "20",
  MasterUsername: "admin",
  MasterUserPassword: "superSecretPassword",
  VPCSecurityGroups: ["sg-0a1b2c3d4e5f67890"], // Replace with your security group ID
  PubliclyAccessible: false,
  Tags: [
    { Key: "Access", Value: "Internal" },
    { Key: "Environment", Value: "Development" }
  ]
});
```
