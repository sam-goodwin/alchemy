---
title: Managing AWS GlobalAccelerator Accelerators with Alchemy
description: Learn how to create, update, and manage AWS GlobalAccelerator Accelerators using Alchemy Cloud Control.
---

# Accelerator

The Accelerator resource lets you manage [AWS GlobalAccelerator Accelerators](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) that improve the availability and performance of your applications by directing traffic to optimal endpoints.

## Minimal Example

Create a basic Global Accelerator with essential properties:

```ts
import AWS from "alchemy/aws/control";

const BasicAccelerator = await AWS.GlobalAccelerator.Accelerator("BasicAccelerator", {
  Name: "MyBasicAccelerator",
  IpAddressType: "IPV4",
  Enabled: true
});
```

## Advanced Configuration

Configure an accelerator with additional options, including specific IP addresses and tags:

```ts
const AdvancedAccelerator = await AWS.GlobalAccelerator.Accelerator("AdvancedAccelerator", {
  Name: "MyAdvancedAccelerator",
  IpAddressType: "IPV4",
  Enabled: true,
  IpAddresses: ["203.0.113.1", "203.0.113.2"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Using Existing IP Addresses

Set up an accelerator that adopts existing IP addresses instead of creating new ones:

```ts
const ExistingIpAccelerator = await AWS.GlobalAccelerator.Accelerator("ExistingIpAccelerator", {
  Name: "MyExistingIpAccelerator",
  IpAddressType: "IPV4",
  Enabled: true,
  IpAddresses: ["203.0.113.3", "203.0.113.4"],
  adopt: true
});
```

## Configuration for High Availability

Create an accelerator configured for high availability by utilizing multiple endpoints:

```ts
const HighAvailabilityAccelerator = await AWS.GlobalAccelerator.Accelerator("HighAvailabilityAccelerator", {
  Name: "MyHighAvailabilityAccelerator",
  IpAddressType: "IPV4",
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
  // Additional properties for endpoints could be configured here
});
```