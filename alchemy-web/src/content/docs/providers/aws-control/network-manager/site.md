---
title: Site
description: Learn how to create, update, and manage AWS NetworkManager Sites using Alchemy Cloud Control.
---


The Site resource lets you manage [AWS NetworkManager Sites](https://docs.aws.amazon.com/networkmanager/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic site with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const mySite = await AWS.NetworkManager.Site("mySite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Primary site for our corporate network"
});
```

## Advanced Configuration

Configure a site with location details and tags for better organization.

```ts
const advancedSite = await AWS.NetworkManager.Site("advancedSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Secondary site with detailed location",
  Location: {
    Address: "123 Corporate Blvd",
    Latitude: 37.7749,
    Longitude: -122.4194,
    Country: "US"
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
  ]
});
```

## Adoption of Existing Resource

Adopt an existing site resource instead of failing when the resource already exists.

```ts
const adoptedSite = await AWS.NetworkManager.Site("adoptedSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Adopting an existing site",
  adopt: true
});
```

## Multiple Tags and Location Configuration

Create a site with multiple tags and comprehensive location details.

```ts
const taggedSite = await AWS.NetworkManager.Site("taggedSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Site with multiple tags",
  Location: {
    Address: "456 Innovation Way",
    Latitude: 34.0522,
    Longitude: -118.2437,
    Country: "US"
  },
  Tags: [
    {
      Key: "Project",
      Value: "Network Upgrade"
    },
    {
      Key: "Owner",
      Value: "IT Department"
    },
    {
      Key: "Priority",
      Value: "High"
    }
  ]
});
```
