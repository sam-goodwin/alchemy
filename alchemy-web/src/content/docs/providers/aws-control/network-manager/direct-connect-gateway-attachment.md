---
title: DirectConnectGatewayAttachment
description: Learn how to create, update, and manage AWS NetworkManager DirectConnectGatewayAttachments using Alchemy Cloud Control.
---


The DirectConnectGatewayAttachment resource allows you to manage Direct Connect gateway attachments within AWS Network Manager. This resource facilitates the connection of your on-premises networks to AWS through Direct Connect. For more information, refer to the [AWS NetworkManager DirectConnectGatewayAttachments documentation](https://docs.aws.amazon.com/networkmanager/latest/userguide/).

## Minimal Example

Create a basic Direct Connect Gateway Attachment with required properties and a tag:

```ts
import AWS from "alchemy/aws/control";

const directConnectAttachment = await AWS.NetworkManager.DirectConnectGatewayAttachment("basicAttachment", {
  CoreNetworkId: "cn-12345678",
  EdgeLocations: ["us-west-2", "us-east-1"],
  DirectConnectGatewayArn: "arn:aws:directconnect:us-west-2:123456789012:direct-connect-gateway/my-gateway",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a Direct Connect Gateway Attachment with proposed segment changes and network functions:

```ts
import AWS from "alchemy/aws/control";

const advancedAttachment = await AWS.NetworkManager.DirectConnectGatewayAttachment("advancedAttachment", {
  CoreNetworkId: "cn-87654321",
  EdgeLocations: ["us-west-1", "us-east-1"],
  DirectConnectGatewayArn: "arn:aws:directconnect:us-west-1:123456789012:direct-connect-gateway/my-advanced-gateway",
  ProposedSegmentChange: {
    SegmentName: "new-segment",
    // Define additional properties as needed
  },
  ProposedNetworkFunctionGroupChange: {
    // Define properties for network function group changes
  },
  Tags: [{ Key: "Project", Value: "NetworkUpgrade" }]
});
```

## Adopt Existing Resource

Adopt an existing Direct Connect Gateway Attachment instead of failing if it already exists:

```ts
import AWS from "alchemy/aws/control";

const adoptExistingAttachment = await AWS.NetworkManager.DirectConnectGatewayAttachment("adoptAttachment", {
  CoreNetworkId: "cn-13579246",
  EdgeLocations: ["us-east-1"],
  DirectConnectGatewayArn: "arn:aws:directconnect:us-east-1:123456789012:direct-connect-gateway/my-existing-gateway",
  adopt: true
});
```
