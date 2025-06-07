---
title: Managing AWS WorkSpaces WorkspacesPools with Alchemy
description: Learn how to create, update, and manage AWS WorkSpaces WorkspacesPools using Alchemy Cloud Control.
---

# WorkspacesPool

The WorkspacesPool resource lets you create and manage [AWS WorkSpaces WorkspacesPools](https://docs.aws.amazon.com/workspaces/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspaces-workspacespool.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workspacespool = await AWS.WorkSpaces.WorkspacesPool("workspacespool-example", {
  BundleId: "example-bundleid",
  DirectoryId: "example-directoryid",
  Capacity: "example-capacity",
  PoolName: "workspacespool-pool",
  Description: "A workspacespool resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workspacespool with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkspacesPool = await AWS.WorkSpaces.WorkspacesPool("advanced-workspacespool", {
  BundleId: "example-bundleid",
  DirectoryId: "example-directoryid",
  Capacity: "example-capacity",
  PoolName: "workspacespool-pool",
  Description: "A workspacespool resource managed by Alchemy",
});
```

