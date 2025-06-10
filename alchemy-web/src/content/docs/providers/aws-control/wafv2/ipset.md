---
title: IPSet
description: Learn how to create, update, and manage AWS WAFv2 IPSets using Alchemy Cloud Control.
---


The IPSet resource lets you manage [AWS WAFv2 IPSets](https://docs.aws.amazon.com/wafv2/latest/userguide/) for controlling access to your applications based on IP addresses.

## Minimal Example

Create a basic IPSet with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicIpSet = await AWS.WAFv2.IPSet("basicIpSet", {
  Addresses: ["192.0.2.0/24", "203.0.113.0/24"],
  Description: "Basic IP Set for allowing specific IP ranges.",
  Scope: "REGIONAL", // or "CLOUDFRONT"
  IPAddressVersion: "IPV4",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an IPSet with tags for better organization and a custom name.

```ts
const advancedIpSet = await AWS.WAFv2.IPSet("advancedIpSet", {
  Addresses: ["198.51.100.0/24"],
  Description: "Advanced IP Set for production access control.",
  Scope: "REGIONAL",
  IPAddressVersion: "IPV4",
  Tags: [
    { Key: "Project", Value: "MyApp" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  Name: "MyProductionIPSet"
});
```

## Adoption of Existing Resource

If you wish to adopt an existing IPSet without failing on conflict, you can set the `adopt` property to true.

```ts
const adoptedIpSet = await AWS.WAFv2.IPSet("adoptedIpSet", {
  Addresses: ["192.0.2.0/24"],
  Description: "Adopting an existing IP Set.",
  Scope: "REGIONAL",
  IPAddressVersion: "IPV4",
  adopt: true
});
```
