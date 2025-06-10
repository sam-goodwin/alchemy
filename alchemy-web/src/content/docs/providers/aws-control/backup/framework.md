---
title: Framework
description: Learn how to create, update, and manage AWS Backup Frameworks using Alchemy Cloud Control.
---


The Framework resource lets you manage [AWS Backup Frameworks](https://docs.aws.amazon.com/backup/latest/userguide/) to define backup policies and compliance for your AWS resources.

## Minimal Example

Create a basic AWS Backup Framework with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const backupFramework = await AWS.Backup.Framework("myBackupFramework", {
  FrameworkControls: [{
    ControlId: "myControlId",
    ControlName: "DailyBackup",
    ControlScope: {
      "Parameters": {
        "ResourceType": "AWS::EC2::Instance"
      }
    },
    ControlInputParameters: {
      "BackupVault": "myBackupVault",
      "Lifecycle": {
        "DeleteAfterDays": 30
      }
    }
  }],
  FrameworkName: "MyBackupFramework",
  FrameworkDescription: "This framework ensures daily backups of EC2 instances."
});
```

## Advanced Configuration

Configure an AWS Backup Framework with multiple control settings for enhanced backup strategies.

```ts
const advancedBackupFramework = await AWS.Backup.Framework("advancedBackupFramework", {
  FrameworkControls: [{
    ControlId: "weeklyBackupControl",
    ControlName: "WeeklyBackup",
    ControlScope: {
      "Parameters": {
        "ResourceType": "AWS::RDS::DBInstance"
      }
    },
    ControlInputParameters: {
      "BackupVault": "myBackupVault",
      "Lifecycle": {
        "DeleteAfterDays": 90
      }
    }
  }, {
    ControlId: "monthlyBackupControl",
    ControlName: "MonthlyBackup",
    ControlScope: {
      "Parameters": {
        "ResourceType": "AWS::S3::Bucket"
      }
    },
    ControlInputParameters: {
      "BackupVault": "myBackupVault",
      "Lifecycle": {
        "DeleteAfterDays": 180
      }
    }
  }],
  FrameworkName: "AdvancedBackupFramework",
  FrameworkDescription: "This framework manages weekly and monthly backups for RDS and S3 resources."
});
```

## Tagging for Compliance

Utilize tags to enhance compliance tracking within your AWS Backup Framework.

```ts
const taggedBackupFramework = await AWS.Backup.Framework("taggedBackupFramework", {
  FrameworkControls: [{
    ControlId: "taggingControl",
    ControlName: "TaggingCompliance",
    ControlScope: {
      "Parameters": {
        "ResourceType": "AWS::Lambda::Function"
      }
    },
    ControlInputParameters: {
      "BackupVault": "myBackupVault",
      "RequiredTags": ["Environment", "Owner"]
    }
  }],
  FrameworkName: "TaggedBackupFramework",
  FrameworkTags: [{
    Key: "Environment",
    Value: "Production"
  },{
    Key: "Owner",
    Value: "DevTeam"
  }],
  FrameworkDescription: "This framework ensures that all Lambda functions have the required tags for compliance."
});
