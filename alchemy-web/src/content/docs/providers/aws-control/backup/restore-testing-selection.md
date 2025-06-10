---
title: RestoreTestingSelection
description: Learn how to create, update, and manage AWS Backup RestoreTestingSelections using Alchemy Cloud Control.
---


The RestoreTestingSelection resource lets you manage [AWS Backup RestoreTestingSelections](https://docs.aws.amazon.com/backup/latest/userguide/) to facilitate the testing of restore plans. This resource allows you to specify the resources you want to include in a restore test, as well as the conditions and metadata overrides necessary for the restore operation.

## Minimal Example

Create a basic restore testing selection with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const restoreTestingSelection = await AWS.Backup.RestoreTestingSelection("basicRestoreTest", {
  ProtectedResourceType: "EBS",
  RestoreTestingSelectionName: "TestEBSRestore",
  RestoreTestingPlanName: "DailyBackupPlan",
  IamRoleArn: "arn:aws:iam::123456789012:role/BackupRole"
});
```

## Advanced Configuration

Configure a restore testing selection with additional optional properties like protected resource conditions and metadata overrides.

```ts
const advancedRestoreTestingSelection = await AWS.Backup.RestoreTestingSelection("advancedRestoreTest", {
  ProtectedResourceType: "EBS",
  RestoreTestingSelectionName: "AdvancedTestEBSRestore",
  RestoreTestingPlanName: "WeeklyBackupPlan",
  IamRoleArn: "arn:aws:iam::123456789012:role/BackupRole",
  ProtectedResourceConditions: {
    "BackupVaultName": "MyBackupVault",
    "ResourceTags": {
      "Environment": "Production"
    }
  },
  RestoreMetadataOverrides: {
    "TargetInstanceType": "t2.micro",
    "VolumeSize": 20
  }
});
```

## Resource ARN Example

Demonstrate how to retrieve the ARN of the created restore testing selection after creation.

```ts
const createdSelection = await AWS.Backup.RestoreTestingSelection("arnExample", {
  ProtectedResourceType: "RDS",
  RestoreTestingSelectionName: "TestRDSRestore",
  RestoreTestingPlanName: "MonthlyBackupPlan",
  IamRoleArn: "arn:aws:iam::123456789012:role/BackupRole"
});

console.log(`Created Restore Testing Selection ARN: ${createdSelection.Arn}`);
```

## Validation Window Configuration

Define a restore testing selection with a specific validation window period.

```ts
const validationWindowTest = await AWS.Backup.RestoreTestingSelection("validationWindowTest", {
  ProtectedResourceType: "DynamoDB",
  RestoreTestingSelectionName: "ValidationTestDynamoDBRestore",
  RestoreTestingPlanName: "DynamoDBBackupPlan",
  IamRoleArn: "arn:aws:iam::123456789012:role/BackupRole",
  ValidationWindowHours: 24
});
```
