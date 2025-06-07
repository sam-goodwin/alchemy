---
title: Managing AWS WAFv2 IPSets with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 IPSets using Alchemy Cloud Control.
---

# IPSet

The IPSet resource allows you to manage [AWS WAFv2 IPSets](https://docs.aws.amazon.com/wafv2/latest/userguide/) which are used to define a set of IP addresses that can be referenced in your web ACL rules.

## Minimal Example

Create a basic IPSet with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicIPSet = await AWS.WAFv2.IPSet("BasicIPSet", {
  Addresses: ["192.0.2.0/24", "203.0.113.0/24"],
  Description: "Basic IP addresses set for blocking malicious traffic",
  Scope: "REGIONAL", // or "CLOUDFRONT"
  IPAddressVersion: "IPV4",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure an IPSet with additional optional properties like a custom name:

```ts
const AdvancedIPSet = await AWS.WAFv2.IPSet("AdvancedIPSet", {
  Addresses: ["10.0.0.0/16"],
  Description: "Advanced IP set with custom name",
  Scope: "REGIONAL",
  IPAddressVersion: "IPV4",
  Name: "CustomIPSetName",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Example with Multiple IP Ranges

Create an IPSet that includes multiple CIDR blocks for enhanced address management:

```ts
const MultiRangeIPSet = await AWS.WAFv2.IPSet("MultiRangeIPSet", {
  Addresses: [
    "192.0.2.0/24",
    "203.0.113.0/24",
    "198.51.100.0/24"
  ],
  Description: "IPSet containing multiple CIDR ranges for access control",
  Scope: "REGIONAL",
  IPAddressVersion: "IPV4"
});
```

## Example with CloudFront Scope

Create an IPSet specifically for CloudFront distribution:

```ts
const CloudFrontIPSet = await AWS.WAFv2.IPSet("CloudFrontIPSet", {
  Addresses: ["192.0.2.0/24", "203.0.113.0/24"],
  Description: "IPSet for CloudFront use",
  Scope: "CLOUDFRONT",
  IPAddressVersion: "IPV4",
  Name: "CloudFrontIPSet"
});
```