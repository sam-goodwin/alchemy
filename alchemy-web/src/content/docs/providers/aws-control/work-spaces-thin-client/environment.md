---
title: Environment
description: Learn how to create, update, and manage AWS WorkSpacesThinClient Environments using Alchemy Cloud Control.
---


The Environment resource lets you manage [AWS WorkSpacesThinClient Environments](https://docs.aws.amazon.com/workspacesthinclient/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic WorkSpacesThinClient Environment with required properties and a couple of common optional properties.

```ts
import AWS from "alchemy/aws/control";

const workspaceEnvironment = await AWS.WorkSpacesThinClient.Environment("myWorkspaceEnv", {
  desktopArn: "arn:aws:workspaces:us-east-1:123456789012:desktop/my-desktop",
  desiredSoftwareSetId: "software-set-id-1234",
  name: "My Workspace Environment"
});
```

## Advanced Configuration

Configure a WorkSpacesThinClient Environment with additional settings such as KMS key and maintenance window.

```ts
const advancedWorkspaceEnvironment = await AWS.WorkSpacesThinClient.Environment("advancedWorkspaceEnv", {
  desktopArn: "arn:aws:workspaces:us-east-1:123456789012:desktop/my-desktop",
  desiredSoftwareSetId: "software-set-id-1234",
  kmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key",
  maintenanceWindow: {
    startTime: "2023-10-01T00:00:00Z",
    endTime: "2023-10-01T02:00:00Z"
  },
  softwareSetUpdateMode: "AUTO",
  softwareSetUpdateSchedule: "DAILY"
});
```

## Device Creation Tags

Create a WorkSpacesThinClient Environment with device creation tags for better organization.

```ts
const taggedWorkspaceEnvironment = await AWS.WorkSpacesThinClient.Environment("taggedWorkspaceEnv", {
  desktopArn: "arn:aws:workspaces:us-east-1:123456789012:desktop/my-desktop",
  deviceCreationTags: [
    { key: "Department", value: "Engineering" },
    { key: "Project", value: "Project Alpha" }
  ]
});
```

## Custom Endpoint Configuration

Configure a custom desktop endpoint for the WorkSpacesThinClient Environment.

```ts
const customEndpointWorkspaceEnvironment = await AWS.WorkSpacesThinClient.Environment("customEndpointWorkspaceEnv", {
  desktopArn: "arn:aws:workspaces:us-east-1:123456789012:desktop/my-desktop",
  desktopEndpoint: "https://custom.endpoint.example.com",
  name: "Custom Endpoint Workspace Environment"
});
``` 

## Adoption of Existing Resources

If you want to adopt an existing WorkSpacesThinClient Environment, specify the `adopt` property.

```ts
const adoptedWorkspaceEnvironment = await AWS.WorkSpacesThinClient.Environment("adoptedWorkspaceEnv", {
  desktopArn: "arn:aws:workspaces:us-east-1:123456789012:desktop/my-desktop",
  adopt: true,
  name: "Adopted Workspace Environment"
});
```
