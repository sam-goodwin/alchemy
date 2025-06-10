---
title: Accelerator
description: Learn how to create, update, and manage AWS GlobalAccelerator Accelerators using Alchemy Cloud Control.
---


The Accelerator resource lets you manage [AWS GlobalAccelerator Accelerators](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) which improve the availability and performance of your applications with dynamic routing and TCP/UDP support.

## Minimal Example

Create a basic accelerator with required properties and a common optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicAccelerator = await AWS.GlobalAccelerator.Accelerator("basic-accelerator", {
  name: "MyBasicAccelerator",
  enabled: true, // Enable the accelerator
  ipAddressType: "IPV4" // Choose the IP address type
});
```

## Advanced Configuration

Configure an accelerator with specific IP addresses and tags for better management.

```ts
const advancedAccelerator = await AWS.GlobalAccelerator.Accelerator("advanced-accelerator", {
  name: "MyAdvancedAccelerator",
  enabled: true,
  ipAddresses: ["203.0.113.25", "203.0.113.26"], // Specify custom IP addresses
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

Create an accelerator that adopts an existing resource if it already exists.

```ts
const adoptedAccelerator = await AWS.GlobalAccelerator.Accelerator("adopted-accelerator", {
  name: "MyAdoptedAccelerator",
  enabled: true,
  adopt: true // Adopt the existing resource instead of failing
});
```

## Enabling Features

Set up an accelerator with additional features like specific IP address types for enhanced routing capabilities.

```ts
const featureRichAccelerator = await AWS.GlobalAccelerator.Accelerator("feature-rich-accelerator", {
  name: "MyFeatureRichAccelerator",
  enabled: true,
  ipAddressType: "IPV6", // Use IPv6 addresses
  tags: [
    { key: "UseCase", value: "HighAvailability" }
  ]
});
```
