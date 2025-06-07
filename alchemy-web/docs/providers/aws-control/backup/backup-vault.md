---
title: Managing AWS Backup BackupVaults with Alchemy
description: Learn how to create, update, and manage AWS Backup BackupVaults using Alchemy Cloud Control.
---

# BackupVault

The BackupVault resource allows you to manage [AWS Backup BackupVaults](https://docs.aws.amazon.com/backup/latest/userguide/) for storing and managing backups of your AWS resources.

## Minimal Example

Create a basic BackupVault with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const BackupVaultExample = await AWS.Backup.BackupVault("MyBackupVault", {
  BackupVaultName: "MyBackupVault",
  BackupVaultTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a BackupVault with encryption and a notification configuration.

```ts
const EncryptedBackupVault = await AWS.Backup.BackupVault("EncryptedVault", {
  BackupVaultName: "EncryptedVault",
  EncryptionKeyArn: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  Notifications: {
    BackupVaultEvents: ["BACKUP_JOB_FAILED", "BACKUP_JOB_COMPLETED"],
    SNSTopicArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic"
  }
});
```

## Lock Configuration

Create a BackupVault with a lock configuration to prevent accidental deletion of backups.

```ts
const LockedBackupVault = await AWS.Backup.BackupVault("LockedVault", {
  BackupVaultName: "LockedVault",
  LockConfiguration: {
    MinRetentionDays: 30,
    MaxRetentionDays: 365
  }
});
```

## Access Policy

Define an access policy for your BackupVault to control permissions.

```ts
const AccessControlledVault = await AWS.Backup.BackupVault("AccessControlledVault", {
  BackupVaultName: "AccessControlledVault",
  AccessPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::123456789012:role/MyBackupRole" },
        Action: "backup:StartBackupJob",
        Resource: "*"
      }
    ]
  }
});
```