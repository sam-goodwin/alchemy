---
title: NetworkAnalyzerConfiguration
description: Learn how to create, update, and manage AWS IoTWireless NetworkAnalyzerConfigurations using Alchemy Cloud Control.
---


The NetworkAnalyzerConfiguration resource enables you to manage [AWS IoTWireless NetworkAnalyzerConfigurations](https://docs.aws.amazon.com/iotwireless/latest/userguide/) which are used for analyzing network performance and troubleshooting in IoT environments.

## Minimal Example

Create a basic network analyzer configuration with essential properties.

```ts
import AWS from "alchemy/aws/control";

const networkAnalyzerConfig = await AWS.IoTWireless.NetworkAnalyzerConfiguration("basicConfig", {
  name: "BasicNetworkAnalyzerConfig",
  description: "A basic configuration for network analysis",
  wirelessGateways: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-gateway/abcd1234"],
  wirelessDevices: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-device/xyz5678"],
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Project", value: "IoTAnalytics" }
  ]
});
```

## Advanced Configuration

Configure a network analyzer with specific trace content options for enhanced analysis.

```ts
const advancedNetworkAnalyzerConfig = await AWS.IoTWireless.NetworkAnalyzerConfiguration("advancedConfig", {
  name: "AdvancedNetworkAnalyzerConfig",
  description: "An advanced configuration for detailed network analysis",
  wirelessGateways: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-gateway/abcd1234"],
  wirelessDevices: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-device/xyz5678"],
  traceContent: {
    logLevel: "DEBUG",
    logDestination: "CloudWatch"
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "IoTAnalytics" }
  ]
});
```

## Use Case: Adopting Existing Configurations

This example demonstrates how to adopt an existing network analyzer configuration instead of failing if it already exists.

```ts
const adoptExistingConfig = await AWS.IoTWireless.NetworkAnalyzerConfiguration("adoptConfig", {
  name: "AdoptedNetworkAnalyzerConfig",
  description: "Adopting an existing network analyzer configuration",
  wirelessGateways: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-gateway/abcd1234"],
  wirelessDevices: ["arn:aws:iotwireless:us-west-2:123456789012:wireless-device/xyz5678"],
  adopt: true // Allow adoption of the existing resource
});
```
