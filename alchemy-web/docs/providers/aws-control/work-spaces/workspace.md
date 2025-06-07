---
title: Managing AWS WorkSpaces Workspaces with Alchemy
description: Learn how to create, update, and manage AWS WorkSpaces Workspaces using Alchemy Cloud Control.
---

# Workspace

The Workspace resource lets you manage [AWS WorkSpaces](https://docs.aws.amazon.com/workspaces/latest/userguide/) for providing virtual desktops to users. By using this resource, you can create, update, and configure WorkSpaces to meet your organization's needs.

## Minimal Example

Create a basic WorkSpace with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicWorkspace = await AWS.WorkSpaces.Workspace("BasicWorkSpace", {
  BundleId: "wsb-12345678", // Replace with your actual bundle ID
  DirectoryId: "d-1234567890", // Replace with your actual directory ID
  UserName: "john.doe", // The username for the WorkSpace
  RootVolumeEncryptionEnabled: true,
  UserVolumeEncryptionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a WorkSpace with additional properties such as workspace properties.

```ts
const advancedWorkspace = await AWS.WorkSpaces.Workspace("AdvancedWorkSpace", {
  BundleId: "wsb-87654321", // Replace with your actual bundle ID
  DirectoryId: "d-0987654321", // Replace with your actual directory ID
  UserName: "jane.doe", // The username for the WorkSpace
  WorkspaceProperties: {
    RunningMode: "AUTO_STOP", // Options: AUTO_STOP or ALWAYS_ON
    RootVolumeSizeGib: 100, // Size of the root volume in GiB
    UserVolumeSizeGib: 100, // Size of the user volume in GiB
    ComputeTypeName: "VALUE", // Options: VALUE or PERFORMANCE
  },
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Custom Encryption Settings

Create a WorkSpace with a specific volume encryption key for enhanced security.

```ts
const encryptedWorkspace = await AWS.WorkSpaces.Workspace("EncryptedWorkSpace", {
  BundleId: "wsb-13579246", // Replace with your actual bundle ID
  DirectoryId: "d-2468135790", // Replace with your actual directory ID
  UserName: "alex.smith", // The username for the WorkSpace
  VolumeEncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-7890-abcd-ef1234567890", // Replace with your actual KMS key ARN
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing WorkSpace instead of failing when the resource already exists, you can set the adopt property to true.

```ts
const adoptExistingWorkspace = await AWS.WorkSpaces.Workspace("AdoptWorkSpace", {
  BundleId: "wsb-12345678", // Replace with your actual bundle ID
  DirectoryId: "d-1234567890", // Replace with your actual directory ID
  UserName: "existing.user", // The username for the existing WorkSpace
  adopt: true // Set to true to adopt existing WorkSpace
});
```