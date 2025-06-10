---
title: BackupSelection
description: Learn how to create, update, and manage AWS Backup BackupSelections using Alchemy Cloud Control.
---


The BackupSelection resource allows you to manage [AWS Backup BackupSelections](https://docs.aws.amazon.com/backup/latest/userguide/) for defining the resources to back up. This resource is essential for configuring backup plans and ensuring that your data is protected and recoverable.

## Minimal Example

Create a basic backup selection linked to a specific backup plan.

```ts
import AWS from "alchemy/aws/control";

const backupSelection = await AWS.Backup.BackupSelection("myBackupSelection", {
  BackupSelection: {
    SelectionName: "MyBackupSelection",
    IamRoleArn: "arn:aws:iam::123456789012:role/service-role/AWSBackupDefaultServiceRole",
    Resources: [
      "arn:aws:ec2:us-west-2:123456789012:volume/vol-12345678"
    ]
  },
  BackupPlanId: "myBackupPlanId"
});
```

## Advanced Configuration

Configure a backup selection with additional options like tags and resource filters.

```ts
const advancedBackupSelection = await AWS.Backup.BackupSelection("advancedBackupSelection", {
  BackupSelection: {
    SelectionName: "AdvancedBackupSelection",
    IamRoleArn: "arn:aws:iam::123456789012:role/service-role/AWSBackupDefaultServiceRole",
    Resources: [
      "arn:aws:s3:::my-bucket"
    ],
    Tags: {
      Environment: "Production",
      Project: "MyProject"
    },
    ListOfResourceArns: [
      "arn:aws:rds:us-west-2:123456789012:db:mydatabase"
    ]
  },
  BackupPlanId: "myAdvancedBackupPlanId",
  adopt: true
});
```

## Resource Filtering

Create a backup selection that filters resources based on tags.

```ts
const filteredBackupSelection = await AWS.Backup.BackupSelection("filteredBackupSelection", {
  BackupSelection: {
    SelectionName: "FilteredBackupSelection",
    IamRoleArn: "arn:aws:iam::123456789012:role/service-role/AWSBackupDefaultServiceRole",
    Resources: [],
    SelectionCriteria: {
      Tags: {
        Environment: "Production"
      }
    }
  },
  BackupPlanId: "myFilteredBackupPlanId"
});
```

## Adopting Existing Resources

Demonstrate how to adopt an existing backup selection resource without failing if it already exists.

```ts
const adoptBackupSelection = await AWS.Backup.BackupSelection("adoptBackupSelection", {
  BackupSelection: {
    SelectionName: "AdoptedBackupSelection",
    IamRoleArn: "arn:aws:iam::123456789012:role/service-role/AWSBackupDefaultServiceRole",
    Resources: [
      "arn:aws:ec2:us-west-2:123456789012:volume/vol-87654321"
    ]
  },
  BackupPlanId: "myAdoptBackupPlanId",
  adopt: true // Adopt existing resource if it exists
});
```
