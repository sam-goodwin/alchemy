---
title: WirelessGateway
description: Learn how to create, update, and manage AWS IoTWireless WirelessGateways using Alchemy Cloud Control.
---


The WirelessGateway resource allows you to manage [AWS IoTWireless WirelessGateways](https://docs.aws.amazon.com/iotwireless/latest/userguide/) for connecting and managing LoRaWAN devices. 

## Minimal Example

Create a basic WirelessGateway with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicWirelessGateway = await AWS.IoTWireless.WirelessGateway("basicGateway", {
  LoRaWAN: {
    GatewayEui: "01AB23CD45EF67GH",
    NetId: "010203",
    // Additional LoRaWAN configuration can be added here
  },
  Name: "MyFirstWirelessGateway",
  Description: "A basic Wireless Gateway for testing"
});
```

## Advanced Configuration

Configure a WirelessGateway with advanced options, including tags and last uplink received time.

```ts
const advancedWirelessGateway = await AWS.IoTWireless.WirelessGateway("advancedGateway", {
  LoRaWAN: {
    GatewayEui: "01AB23CD45EF67GH",
    NetId: "010203",
    // Additional LoRaWAN configuration can be added here
  },
  Name: "MyAdvancedWirelessGateway",
  Description: "An advanced Wireless Gateway with additional configurations",
  LastUplinkReceivedAt: new Date().toISOString(),
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "IoTDeployment"
    }
  ]
});
```

## Updating an Existing Gateway

Adopt an existing WirelessGateway instead of failing if it already exists.

```ts
const existingGateway = await AWS.IoTWireless.WirelessGateway("existingGateway", {
  LoRaWAN: {
    GatewayEui: "01AB23CD45EF67GH",
    NetId: "010203",
    // Additional LoRaWAN configuration can be added here
  },
  Name: "ExistingWirelessGateway",
  adopt: true // Adopt existing resource if it exists
});
```

## Monitoring Last Uplink Received Time

Create a WirelessGateway which monitors the last uplink received time for maintaining device health.

```ts
const monitoredWirelessGateway = await AWS.IoTWireless.WirelessGateway("monitoredGateway", {
  LoRaWAN: {
    GatewayEui: "01AB23CD45EF67GH",
    NetId: "010203",
    // Additional LoRaWAN configuration can be added here
  },
  Name: "MonitoredWirelessGateway",
  LastUplinkReceivedAt: new Date().toISOString(),
  Description: "Wireless Gateway that tracks last uplink received time"
});
```
