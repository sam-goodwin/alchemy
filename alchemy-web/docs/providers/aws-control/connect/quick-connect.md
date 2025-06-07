---
title: Managing AWS Connect QuickConnects with Alchemy
description: Learn how to create, update, and manage AWS Connect QuickConnects using Alchemy Cloud Control.
---

# QuickConnect

The QuickConnect resource lets you create and manage [AWS Connect QuickConnects](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const quickconnect = await AWS.Connect.QuickConnect("quickconnect-example", {
  QuickConnectConfig: "example-quickconnectconfig",
  InstanceArn: "example-instancearn",
  Name: "quickconnect-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A quickconnect resource managed by Alchemy",
});
```

## Advanced Configuration

Create a quickconnect with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedQuickConnect = await AWS.Connect.QuickConnect("advanced-quickconnect", {
  QuickConnectConfig: "example-quickconnectconfig",
  InstanceArn: "example-instancearn",
  Name: "quickconnect-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A quickconnect resource managed by Alchemy",
});
```

