---
title: LogicallyAirGappedBackupVault
description: Learn how to create, update, and manage AWS Backup LogicallyAirGappedBackupVaults using Alchemy Cloud Control.
---


The LogicallyAirGappedBackupVault resource allows you to manage [AWS Backup Logically Air Gapped Backup Vaults](https://docs.aws.amazon.com/backup/latest/userguide/) for secure backup storage with enhanced protection against cyber threats.

## Minimal Example

Create a basic logically air gapped backup vault with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const backupVault = await AWS.Backup.LogicallyAirGappedBackupVault("myBackupVault", {
  BackupVaultName: "MyBackupVault",
  MaxRetentionDays: 30,
  MinRetentionDays: 7,
  BackupVaultTags: {
    Environment: "production",
    Project: "critical-backup"
  }
});
```

## Advanced Configuration

Configure a logically air gapped backup vault with an access policy and notifications settings.

```ts
const advancedBackupVault = await AWS.Backup.LogicallyAirGappedBackupVault("advancedBackupVault", {
  BackupVaultName: "AdvancedBackupVault",
  MaxRetentionDays: 60,
  MinRetentionDays: 14,
  AccessPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyBackupRole"
        },
        Action: "backup:StartBackupJob",
        Resource: "*"
      }
    ]
  },
  Notifications: {
    BackupVaultEvents: ["BACKUP_JOB_STARTED", "BACKUP_JOB_COMPLETED"],
    SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyNotificationTopic"
  }
});
```

## Adoption of Existing Resources

Use the adoption feature to manage an existing logically air gapped backup vault without failing.

```ts
const adoptBackupVault = await AWS.Backup.LogicallyAirGappedBackupVault("adoptBackupVault", {
  BackupVaultName: "ExistingBackupVault",
  MaxRetentionDays: 45,
  MinRetentionDays: 10,
  adopt: true // Adopt existing resource if it already exists
});
```
