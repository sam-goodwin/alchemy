---
title: Workspace
description: Learn how to create, update, and manage AWS WorkSpaces Workspaces using Alchemy Cloud Control.
---


The Workspace resource allows you to create and manage [AWS WorkSpaces](https://docs.aws.amazon.com/workspaces/latest/userguide/) effectively. AWS WorkSpaces is a cloud-based service that allows you to provision virtual desktops for your users.

## Minimal Example

Create a basic WorkSpace with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const userWorkspace = await AWS.WorkSpaces.Workspace("user-workspace", {
  BundleId: "wsb-12345678", // Example Bundle ID
  DirectoryId: "d-1234567890", // Example Directory ID
  UserName: "john.doe",
  RootVolumeEncryptionEnabled: true,
  UserVolumeEncryptionEnabled: true,
  VolumeEncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstuv",
});
```

## Advanced Configuration

Configure a WorkSpace with specific properties to enhance security and performance.

```ts
const advancedWorkspace = await AWS.WorkSpaces.Workspace("advanced-workspace", {
  BundleId: "wsb-87654321", // Another Example Bundle ID
  DirectoryId: "d-0987654321", // Another Example Directory ID
  UserName: "jane.smith",
  RootVolumeEncryptionEnabled: true,
  UserVolumeEncryptionEnabled: true,
  VolumeEncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/wxyz1234-abcd-ef56-78gh-ijklmnopqrstuv",
  Tags: [
    { Key: "Project", Value: "Development" },
    { Key: "Environment", Value: "Production" }
  ],
  WorkspaceProperties: {
    RunningMode: "AUTO_STOP", // Automatically stop when not in use
    RunningModeAutoStopTimeoutInMinutes: 60, // Auto-stop after 60 minutes
  }
});
```

## Using Tags for Organization

Create a WorkSpace and apply multiple tags for better resource organization.

```ts
const taggedWorkspace = await AWS.WorkSpaces.Workspace("tagged-workspace", {
  BundleId: "wsb-12341234", // Example Bundle ID
  DirectoryId: "d-1234987654", // Example Directory ID
  UserName: "alex.jones",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "CostCenter", Value: "12345" },
    { Key: "Owner", Value: "alex.jones@company.com" }
  ]
});
```

## Adoption of Existing Resources

If you're migrating existing resources, you can adopt them instead of failing on creation.

```ts
const existingWorkspace = await AWS.WorkSpaces.Workspace("existing-workspace", {
  BundleId: "wsb-12345678", // Existing Bundle ID
  DirectoryId: "d-1234567890", // Existing Directory ID
  UserName: "mike.wilson",
  adopt: true // Adopt existing resource if it already exists
});
```
