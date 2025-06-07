---
title: Managing AWS NetworkManager Links with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager Links using Alchemy Cloud Control.
---

# Link

The Link resource allows you to manage [AWS NetworkManager Links](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for connecting your sites within a global network. This resource facilitates the configuration and management of links that connect sites in your AWS Network Manager.

## Minimal Example

Create a basic link with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicLink = await AWS.NetworkManager.Link("BasicLink", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-abc123",
  Bandwidth: {
    DownloadSpeed: 100,
    UploadSpeed: 50
  },
  Description: "A basic link connecting to site-123456"
});
```

## Advanced Configuration

Configure a link with additional optional settings such as tags and provider information.

```ts
const advancedLink = await AWS.NetworkManager.Link("AdvancedLink", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-abc123",
  Bandwidth: {
    DownloadSpeed: 100,
    UploadSpeed: 50
  },
  Description: "An advanced link with additional configuration",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ],
  Provider: "AWS"
});
```

## Using Different Link Types

Create a link with a specific type, such as MPLS.

```ts
const mplsLink = await AWS.NetworkManager.Link("MPLSLink", {
  SiteId: "site-654321",
  GlobalNetworkId: "global-xyz987",
  Bandwidth: {
    DownloadSpeed: 200,
    UploadSpeed: 100
  },
  Type: "MPLS",
  Description: "An MPLS link connecting to site-654321"
});
```

## Adopting Existing Resources

Use the adopt feature to manage an existing link without failing.

```ts
const adoptedLink = await AWS.NetworkManager.Link("AdoptedLink", {
  SiteId: "site-000000",
  GlobalNetworkId: "global-def456",
  Bandwidth: {
    DownloadSpeed: 150,
    UploadSpeed: 75
  },
  adopt: true,
  Description: "Adopting an existing link that is already configured"
});
```