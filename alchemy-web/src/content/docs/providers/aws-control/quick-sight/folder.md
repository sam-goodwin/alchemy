---
title: Folder
description: Learn how to create, update, and manage AWS QuickSight Folders using Alchemy Cloud Control.
---


The Folder resource lets you manage [AWS QuickSight Folders](https://docs.aws.amazon.com/quicksight/latest/userguide/) for organizing dashboards and analyses efficiently.

## Minimal Example

Create a basic QuickSight Folder with essential properties:

```ts
import AWS from "alchemy/aws/control";

const quickSightFolder = await AWS.QuickSight.Folder("myQuickSightFolder", {
  AwsAccountId: "123456789012",
  FolderId: "folder-1",
  Name: "Sales Dashboards",
  FolderType: "TOP_LEVEL",
  SharingModel: "OWNER_ONLY"
});
```

## Advanced Configuration

Configure a QuickSight Folder with permissions and tags for better management:

```ts
const advancedQuickSightFolder = await AWS.QuickSight.Folder("myAdvancedQuickSightFolder", {
  AwsAccountId: "123456789012",
  FolderId: "folder-2",
  Name: "Marketing Insights",
  FolderType: "TOP_LEVEL",
  SharingModel: "PUBLIC",
  Permissions: [
    {
      Principal: "arn:aws:quicksight:us-east-1:123456789012:user/default/user1",
      Actions: [
        "quicksight:DescribeFolder",
        "quicksight:UpdateFolder"
      ]
    }
  ],
  Tags: [
    {
      Key: "Department",
      Value: "Marketing"
    },
    {
      Key: "Project",
      Value: "Q4 Campaign"
    }
  ]
});
```

## Creating Subfolders

Demonstrate how to create a subfolder within an existing folder:

```ts
const subFolder = await AWS.QuickSight.Folder("mySubFolder", {
  AwsAccountId: "123456789012",
  FolderId: "subfolder-1",
  Name: "Q4 Campaign Analysis",
  ParentFolderArn: "arn:aws:quicksight:us-east-1:123456789012:folder/folder-2",
  FolderType: "SUB_FOLDER",
  SharingModel: "OWNER_ONLY"
});
```

## Adopting Existing Folders

Adopt an existing QuickSight Folder instead of failing if it already exists:

```ts
const adoptExistingFolder = await AWS.QuickSight.Folder("myAdoptedFolder", {
  AwsAccountId: "123456789012",
  FolderId: "folder-3",
  Name: "Adopted Folder",
  adopt: true
});
```
