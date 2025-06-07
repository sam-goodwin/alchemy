---
title: Managing AWS CodeStarConnections SyncConfigurations with Alchemy
description: Learn how to create, update, and manage AWS CodeStarConnections SyncConfigurations using Alchemy Cloud Control.
---

# SyncConfiguration

The SyncConfiguration resource lets you create and manage [AWS CodeStarConnections SyncConfigurations](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codestarconnections-syncconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const syncconfiguration = await AWS.CodeStarConnections.SyncConfiguration(
  "syncconfiguration-example",
  {
    ConfigFile: "example-configfile",
    ResourceName: "syncconfiguration-resource",
    Branch: "example-branch",
    SyncType: "example-synctype",
    RepositoryLinkId: "example-repositorylinkid",
    RoleArn: "example-rolearn",
  }
);
```

