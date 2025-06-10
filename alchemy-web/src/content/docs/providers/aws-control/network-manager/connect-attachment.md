---
title: ConnectAttachment
description: Learn how to create, update, and manage AWS NetworkManager ConnectAttachments using Alchemy Cloud Control.
---


The ConnectAttachment resource allows you to manage AWS NetworkManager ConnectAttachments, which enable connectivity between a core network and transport attachments. For more details, refer to the [AWS NetworkManager ConnectAttachments documentation](https://docs.aws.amazon.com/networkmanager/latest/userguide/).

## Minimal Example

Create a basic ConnectAttachment with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const connectAttachment = await AWS.NetworkManager.ConnectAttachment("myConnectAttachment", {
  CoreNetworkId: "cn-12345678",
  TransportAttachmentId: "ta-87654321",
  EdgeLocation: "us-west-2",
  Options: {
    Protocol: "GRE"
  }
});
```

## Advanced Configuration

Configure a ConnectAttachment with additional options such as proposed segment change and network function group name.

```ts
const advancedConnectAttachment = await AWS.NetworkManager.ConnectAttachment("myAdvancedConnectAttachment", {
  CoreNetworkId: "cn-12345678",
  TransportAttachmentId: "ta-87654321",
  EdgeLocation: "us-west-2",
  Options: {
    Protocol: "GRE",
    Bandwidth: "100Mbps"
  },
  ProposedSegmentChange: {
    SegmentName: "NewSegment",
    SegmentId: "seg-123456"
  },
  NetworkFunctionGroupName: "MyNetworkFunctionGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkUpgrade" }
  ]
});
```

## Adoption of Existing Resources

Use the adopt property to adopt an already existing ConnectAttachment instead of failing when the resource already exists.

```ts
const adoptConnectAttachment = await AWS.NetworkManager.ConnectAttachment("myAdoptConnectAttachment", {
  CoreNetworkId: "cn-12345678",
  TransportAttachmentId: "ta-87654321",
  EdgeLocation: "us-west-2",
  Options: {
    Protocol: "GRE"
  },
  adopt: true
});
```
