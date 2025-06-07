---
title: Managing AWS Backup LogicallyAirGappedBackupVaults with Alchemy
description: Learn how to create, update, and manage AWS Backup LogicallyAirGappedBackupVaults using Alchemy Cloud Control.
---

# LogicallyAirGappedBackupVault

The LogicallyAirGappedBackupVault resource lets you manage AWS Backup Logically Air Gapped Backup Vaults, which provide a secure way to store backup data that is not accessible from the internet. For more information, visit the [AWS Backup LogicallyAirGappedBackupVaults documentation](https://docs.aws.amazon.com/backup/latest/userguide/).

## Minimal Example

Create a basic Logically Air Gapped Backup Vault with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const backupVault = await AWS.Backup.LogicallyAirGappedBackupVault("MyBackupVault", {
  BackupVaultName: "MyBackupVault",
  MaxRetentionDays: 30,
  MinRetentionDays: 7,
  BackupVaultTags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a Logically Air Gapped Backup Vault with an access policy and notifications.

```ts
const advancedBackupVault = await AWS.Backup.LogicallyAirGappedBackupVault("AdvancedBackupVault", {
  BackupVaultName: "AdvancedBackupVault",
  MaxRetentionDays: 60,
  MinRetentionDays: 14,
  AccessPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::123456789012:user/BackupUser" },
        Action: "backup:StartBackupJob",
        Resource: "*"
      }
    ]
  },
  Notifications: {
    BackupVaultEvents: ["BACKUP_JOB_FAILED", "BACKUP_JOB_COMPLETED"],
    SNSTopicArn: "arn:aws:sns:us-west-2:123456789012:BackupNotifications"
  }
});
```

## Use Case: Adoption of Existing Vault

If you need to adopt an existing Logically Air Gapped Backup Vault, set the `adopt` property to `true`.

```ts
const adoptedBackupVault = await AWS.Backup.LogicallyAirGappedBackupVault("AdoptedBackupVault", {
  BackupVaultName: "ExistingBackupVault",
  MaxRetentionDays: 90,
  MinRetentionDays: 30,
  adopt: true
});
```

## Use Case: Custom Notification Settings

Create a vault with customized notification settings for various backup events.

```ts
const customNotificationVault = await AWS.Backup.LogicallyAirGappedBackupVault("CustomNotificationVault", {
  BackupVaultName: "CustomNotificationVault",
  MaxRetentionDays: 45,
  MinRetentionDays: 10,
  Notifications: {
    BackupVaultEvents: ["BACKUP_JOB_STARTED", "BACKUP_JOB_FAILED"],
    SNSTopicArn: "arn:aws:sns:us-west-2:123456789012:CustomBackupNotifications"
  }
});
```