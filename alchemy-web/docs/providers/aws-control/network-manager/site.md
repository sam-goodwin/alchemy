---
title: Managing AWS NetworkManager Sites with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager Sites using Alchemy Cloud Control.
---

# Site

The Site resource lets you manage [AWS NetworkManager Sites](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for your global networks, allowing you to define the physical locations of your network resources.

## Minimal Example

Create a basic site under a global network with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicSite = await AWS.NetworkManager.Site("BasicSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Main office site in New York",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Location", Value: "New York" }
  ]
});
```

## Advanced Configuration

Configure a site with a specific location and additional properties for better identification.

```ts
const AdvancedSite = await AWS.NetworkManager.Site("AdvancedSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Secondary site in Los Angeles",
  Location: {
    Address: "123 Main St, Los Angeles, CA 90001",
    Latitude: "34.0522",
    Longitude: "-118.2437"
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Network Operations" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing site resource, ensuring it does not fail if the resource already exists.

```ts
const AdoptExistingSite = await AWS.NetworkManager.Site("AdoptExistingSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Adopting existing site resource",
  adopt: true
});
```

## Detailed Location Configuration

Create a site with detailed location information, including latitude and longitude.

```ts
const DetailedLocationSite = await AWS.NetworkManager.Site("DetailedLocationSite", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Site with detailed location",
  Location: {
    Address: "456 Another Ave, Seattle, WA 98101",
    Latitude: "47.6062",
    Longitude: "-122.3321"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "New Initiative" }
  ]
});
```