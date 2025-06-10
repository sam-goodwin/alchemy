---
title: SyncConfiguration
description: Learn how to create, update, and manage AWS CodeStarConnections SyncConfigurations using Alchemy Cloud Control.
---


The SyncConfiguration resource lets you manage [AWS CodeStarConnections SyncConfigurations](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) for synchronizing resources between your source control and AWS services.

## Minimal Example

Create a basic SyncConfiguration with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicSyncConfig = await AWS.CodeStarConnections.SyncConfiguration("basicSyncConfig", {
  ConfigFile: "config.yml",
  ResourceName: "MySyncConfig",
  Branch: "main",
  SyncType: "manual",
  RepositoryLinkId: "abc123",
  RoleArn: "arn:aws:iam::123456789012:role/my-role"
});
```

## Advanced Configuration

Configure a SyncConfiguration with all optional properties for more control over the synchronization process:

```ts
const advancedSyncConfig = await AWS.CodeStarConnections.SyncConfiguration("advancedSyncConfig", {
  ConfigFile: "advanced-config.yml",
  ResourceName: "AdvancedSyncConfig",
  Branch: "develop",
  SyncType: "automatic",
  TriggerResourceUpdateOn: "commit",
  RepositoryLinkId: "xyz789",
  RoleArn: "arn:aws:iam::123456789012:role/my-advanced-role",
  PublishDeploymentStatus: "true"
});
```

## Using Triggers for Resource Updates

This example demonstrates how to set up a SyncConfiguration that updates resources based on commits to the repository:

```ts
const triggerSyncConfig = await AWS.CodeStarConnections.SyncConfiguration("triggerSyncConfig", {
  ConfigFile: "trigger-config.yml",
  ResourceName: "TriggerSyncConfig",
  Branch: "feature",
  SyncType: "manual",
  TriggerResourceUpdateOn: "commit",
  RepositoryLinkId: "def456",
  RoleArn: "arn:aws:iam::123456789012:role/my-trigger-role"
});
```

## Publishing Deployment Status

In this example, the SyncConfiguration is set up to publish deployment status after synchronization:

```ts
const publishStatusSyncConfig = await AWS.CodeStarConnections.SyncConfiguration("publishStatusSyncConfig", {
  ConfigFile: "publish-config.yml",
  ResourceName: "PublishStatusSyncConfig",
  Branch: "release",
  SyncType: "automatic",
  PublishDeploymentStatus: "true",
  RepositoryLinkId: "ghi012",
  RoleArn: "arn:aws:iam::123456789012:role/my-publish-role"
});
```
