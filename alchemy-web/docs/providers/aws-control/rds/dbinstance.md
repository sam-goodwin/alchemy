---
title: Managing AWS RDS DBInstances with Alchemy
description: Learn how to create, update, and manage AWS RDS DBInstances using Alchemy Cloud Control.
---

# DBInstance

The DBInstance resource allows you to provision and manage [AWS RDS DBInstances](https://docs.aws.amazon.com/rds/latest/userguide/) in your AWS environment.

## Minimal Example

Create a basic RDS DBInstance with essential properties:

```ts
import AWS from "alchemy/aws/control";

const MyDBInstance = await AWS.RDS.DBInstance("MyDBInstance", {
  DBInstanceIdentifier: "mydbinstance",
  DBInstanceClass: "db.t3.micro",
  Engine: "mysql",
  AllocatedStorage: "20",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecretPassword123",
  VPCSecurityGroups: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure an RDS DBInstance with additional options like Multi-AZ deployment and performance insights:

```ts
const AdvancedDBInstance = await AWS.RDS.DBInstance("AdvancedDBInstance", {
  DBInstanceIdentifier: "advanced-db-instance",
  DBInstanceClass: "db.m5.large",
  Engine: "postgres",
  AllocatedStorage: "100",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecretPassword123",
  MultiAZ: true,
  EnablePerformanceInsights: true,
  PerformanceInsightsKMSKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Backup Configuration

Set up an RDS DBInstance with custom backup configurations:

```ts
const BackupDBInstance = await AWS.RDS.DBInstance("BackupDBInstance", {
  DBInstanceIdentifier: "backup-db-instance",
  DBInstanceClass: "db.t3.medium",
  Engine: "mysql",
  AllocatedStorage: "50",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecretPassword123",
  BackupRetentionPeriod: 7,
  PreferredBackupWindow: "02:00-02:30",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Backup" }
  ]
});
```

## Security Configuration

Create an RDS DBInstance with IAM database authentication and SSL settings:

```ts
const SecureDBInstance = await AWS.RDS.DBInstance("SecureDBInstance", {
  DBInstanceIdentifier: "secure-db-instance",
  DBInstanceClass: "db.t3.medium",
  Engine: "mysql",
  AllocatedStorage: "50",
  MasterUsername: "admin",
  MasterUserPassword: "SuperSecretPassword123",
  EnableIAMDatabaseAuthentication: true,
  VPCSecurityGroups: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "secure" },
    { Key: "Team", Value: "Security" }
  ]
});
```