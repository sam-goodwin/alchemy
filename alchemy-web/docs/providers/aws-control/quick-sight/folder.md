---
title: Managing AWS QuickSight Folders with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Folders using Alchemy Cloud Control.
---

# Folder

The Folder resource lets you manage [AWS QuickSight Folders](https://docs.aws.amazon.com/quicksight/latest/userguide/) for organizing your analyses, dashboards, and datasets within QuickSight.

## Minimal Example

Create a basic QuickSight folder with a name and specify the parent folder ARN.

```ts
import AWS from "alchemy/aws/control";

const QuickSightFolder = await AWS.QuickSight.Folder("MyQuickSightFolder", {
  Name: "Sales Reports",
  ParentFolderArn: "arn:aws:quicksight:us-east-1:123456789012:folder/ParentFolder",
  FolderType: "CUSTOM",
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Project", Value: "Quarterly Review" }
  ]
});
```

## Advanced Configuration

Configure a QuickSight folder with sharing model and permissions for team collaboration.

```ts
const TeamFolder = await AWS.QuickSight.Folder("TeamReportsFolder", {
  Name: "Team Reports",
  ParentFolderArn: "arn:aws:quicksight:us-east-1:123456789012:folder/ParentFolder",
  FolderType: "CUSTOM",
  SharingModel: "SHAREABLE",
  Permissions: [
    {
      Principal: "arn:aws:quicksight:us-east-1:123456789012:group/Analysts",
      Actions: ["quicksight:DescribeFolder", "quicksight:UpdateFolder"]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing QuickSight folder to manage it without creating a new one.

```ts
const ExistingFolder = await AWS.QuickSight.Folder("ExistingReportsFolder", {
  FolderId: "existing-folder-id",
  adopt: true
});
```