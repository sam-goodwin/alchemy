---
title: Managing AWS AppSync ChannelNamespaces with Alchemy
description: Learn how to create, update, and manage AWS AppSync ChannelNamespaces using Alchemy Cloud Control.
---

# ChannelNamespace

The ChannelNamespace resource lets you create and manage [AWS AppSync ChannelNamespaces](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-channelnamespace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channelnamespace = await AWS.AppSync.ChannelNamespace("channelnamespace-example", {
  ApiId: "example-apiid",
  Name: "channelnamespace-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a channelnamespace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedChannelNamespace = await AWS.AppSync.ChannelNamespace("advanced-channelnamespace", {
  ApiId: "example-apiid",
  Name: "channelnamespace-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

