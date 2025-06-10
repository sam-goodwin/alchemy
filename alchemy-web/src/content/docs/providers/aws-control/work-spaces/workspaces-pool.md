---
title: WorkspacesPool
description: Learn how to create, update, and manage AWS WorkSpaces WorkspacesPools using Alchemy Cloud Control.
---


The WorkspacesPool resource allows you to manage [AWS WorkSpaces WorkspacesPools](https://docs.aws.amazon.com/workspaces/latest/userguide/) for provisioning and managing virtual desktops in the cloud.

## Minimal Example

Create a basic WorkspacesPool with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const workspacesPool = await AWS.WorkSpaces.WorkspacesPool("basicWorkspacesPool", {
  bundleId: "wsb-abcdefgh", // Replace with a valid bundle ID
  directoryId: "d-1234567890", // Replace with a valid directory ID
  poolName: "MyWorkspacesPool",
  description: "A basic WorkspacesPool for development purposes"
});
```

## Advanced Configuration

Configure a WorkspacesPool with application settings and timeout settings to enhance management capabilities.

```ts
const advancedWorkspacesPool = await AWS.WorkSpaces.WorkspacesPool("advancedWorkspacesPool", {
  bundleId: "wsb-abcdefgh", // Replace with a valid bundle ID
  directoryId: "d-1234567890", // Replace with a valid directory ID
  poolName: "AdvancedWorkspacesPool",
  capacity: {
    minCapacity: 1,
    maxCapacity: 10
  },
  applicationSettings: {
    customRemoteAccess: {
      enabled: true,
      settings: {
        defaultBrowser: "chrome",
        enableClipboard: true
      }
    }
  },
  timeoutSettings: {
    idleTimeout: 60, // Minutes
    disconnectTimeout: 120 // Minutes
  }
});
```

## Capacity Configuration

Define a WorkspacesPool with specific capacity settings to control the number of available WorkSpaces.

```ts
const capacityConfiguredPool = await AWS.WorkSpaces.WorkspacesPool("capacityConfiguredPool", {
  bundleId: "wsb-abcdefgh", // Replace with a valid bundle ID
  directoryId: "d-1234567890", // Replace with a valid directory ID
  poolName: "CapacityConfiguredPool",
  capacity: {
    minCapacity: 2,
    maxCapacity: 20
  }
});
```

## Adoption of Existing Resource

Create a WorkspacesPool while adopting an existing resource if it already exists.

```ts
const existingWorkspacesPool = await AWS.WorkSpaces.WorkspacesPool("existingWorkspacesPool", {
  bundleId: "wsb-abcdefgh", // Replace with a valid bundle ID
  directoryId: "d-1234567890", // Replace with a valid directory ID
  poolName: "ExistingWorkspacesPool",
  adopt: true // Adopt existing resource if it already exists
});
```
