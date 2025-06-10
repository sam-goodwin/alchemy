---
title: Link
description: Learn how to create, update, and manage AWS NetworkManager Links using Alchemy Cloud Control.
---


The Link resource allows you to manage [AWS NetworkManager Links](https://docs.aws.amazon.com/networkmanager/latest/userguide/) which connect sites and enable communication between them.

## Minimal Example

Create a basic NetworkManager Link with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const networkLink = await AWS.NetworkManager.Link("primary-link", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-network-abcdef",
  Bandwidth: {
    UploadSpeed: 100,
    DownloadSpeed: 100
  },
  Description: "Primary connection between sites."
});
```

## Advanced Configuration

Configure a link with additional optional properties such as type and provider.

```ts
const advancedLink = await AWS.NetworkManager.Link("advanced-link", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-network-abcdef",
  Bandwidth: {
    UploadSpeed: 500,
    DownloadSpeed: 500
  },
  Type: "MPLS",
  Provider: "MyServiceProvider",
  Description: "High-speed MPLS connection."
});
```

## Using Tags

Create a NetworkManager Link with tags for better organization and management.

```ts
const taggedLink = await AWS.NetworkManager.Link("tagged-link", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-network-abcdef",
  Bandwidth: {
    UploadSpeed: 200,
    DownloadSpeed: 200
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "Networking"
    }
  ],
  Description: "Link tagged for production networking team."
});
```

## Adopting Existing Resources

Create a NetworkManager Link that adopts an existing resource if it already exists.

```ts
const adoptLink = await AWS.NetworkManager.Link("adopt-link", {
  SiteId: "site-123456",
  GlobalNetworkId: "global-network-abcdef",
  Bandwidth: {
    UploadSpeed: 300,
    DownloadSpeed: 300
  },
  adopt: true,
  Description: "Adopting existing link."
});
``` 

These examples demonstrate how to effectively create and manage AWS NetworkManager Links using Alchemy, catering to various use cases and configurations.
