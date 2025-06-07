---
title: Managing AWS Grafana Workspaces with Alchemy
description: Learn how to create, update, and manage AWS Grafana Workspaces using Alchemy Cloud Control.
---

# Workspace

The Workspace resource lets you create and manage [AWS Grafana Workspaces](https://docs.aws.amazon.com/grafana/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-grafana-workspace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workspace = await AWS.Grafana.Workspace("workspace-example", {
  PermissionType: "example-permissiontype",
  AccountAccessType: "example-accountaccesstype",
  AuthenticationProviders: ["example-authenticationproviders-1"],
  Description: "A workspace resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workspace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkspace = await AWS.Grafana.Workspace("advanced-workspace", {
  PermissionType: "example-permissiontype",
  AccountAccessType: "example-accountaccesstype",
  AuthenticationProviders: ["example-authenticationproviders-1"],
  Description: "A workspace resource managed by Alchemy",
});
```

