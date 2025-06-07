---
title: Managing AWS Transfer Servers with Alchemy
description: Learn how to create, update, and manage AWS Transfer Servers using Alchemy Cloud Control.
---

# Server

The Server resource lets you create and manage [AWS Transfer Servers](https://docs.aws.amazon.com/transfer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const server = await AWS.Transfer.Server("server-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a server with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServer = await AWS.Transfer.Server("advanced-server", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

