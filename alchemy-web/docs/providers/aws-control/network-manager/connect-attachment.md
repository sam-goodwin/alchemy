---
title: Managing AWS NetworkManager ConnectAttachments with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager ConnectAttachments using Alchemy Cloud Control.
---

# ConnectAttachment

The ConnectAttachment resource lets you create and manage [AWS NetworkManager ConnectAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-connectattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connectattachment = await AWS.NetworkManager.ConnectAttachment("connectattachment-example", {
  Options: "example-options",
  TransportAttachmentId: "example-transportattachmentid",
  CoreNetworkId: "example-corenetworkid",
  EdgeLocation: "example-edgelocation",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connectattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnectAttachment = await AWS.NetworkManager.ConnectAttachment(
  "advanced-connectattachment",
  {
    Options: "example-options",
    TransportAttachmentId: "example-transportattachmentid",
    CoreNetworkId: "example-corenetworkid",
    EdgeLocation: "example-edgelocation",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

