---
title: BackupVault
description: Learn how to create, update, and manage AWS Backup BackupVaults using Alchemy Cloud Control.
---


The BackupVault resource allows you to manage [AWS Backup BackupVaults](https://docs.aws.amazon.com/backup/latest/userguide/) for storing and organizing backup data securely.

## Minimal Example

Create a basic backup vault with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const backupVault = await AWS.Backup.BackupVault("myBackupVault", {
  BackupVaultName: "MyBackupVault",
  BackupVaultTags: {
    Environment: "Production",
    Project: "WebsiteMigration"
  }
});
```

## Advanced Configuration

Configure a backup vault with encryption and notifications.

```ts
const secureBackupVault = await AWS.Backup.BackupVault("secureBackupVault", {
  BackupVaultName: "SecureBackupVault",
  EncryptionKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Notifications: {
    BackupVaultEvents: ["BACKUP_JOB_FAILED", "BACKUP_JOB_COMPLETED"],
    SNSTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
  }
});
```

## Lock Configuration

Create a backup vault with lock configuration to prevent accidental deletion.

```ts
const lockedBackupVault = await AWS.Backup.BackupVault("lockedBackupVault", {
  BackupVaultName: "LockedBackupVault",
  LockConfiguration: {
    MinRetentionDays: 30,
    MaxRetentionDays: 365
  }
});
```

## Access Policy

Set an access policy for the backup vault to control permissions.

```ts
const policyBackupVault = await AWS.Backup.BackupVault("policyBackupVault", {
  BackupVaultName: "PolicyBackupVault",
  AccessPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/BackupUser"
        },
        Action: "backup:StartBackupJob",
        Resource: "*"
      }
    ]
  }
});
```
