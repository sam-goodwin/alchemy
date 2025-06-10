---
title: WirelessDevice
description: Learn how to create, update, and manage AWS IoTWireless WirelessDevices using Alchemy Cloud Control.
---


The WirelessDevice resource allows you to manage [AWS IoTWireless WirelessDevices](https://docs.aws.amazon.com/iotwireless/latest/userguide/) and their configurations in your AWS environment.

## Minimal Example

Create a basic WirelessDevice with required properties and some common optional fields.

```ts
import AWS from "alchemy/aws/control";

const wirelessDevice = await AWS.IoTWireless.WirelessDevice("basicWirelessDevice", {
  Type: "LoRaWAN",
  DestinationName: "myDeviceDestination",
  LoRaWAN: {
    DevEui: "00-00-00-00-00-00-00-01",
    AppEui: "00-00-00-00-00-00-00-02",
    AppKey: "00-00-00-00-00-00-00-03"
  },
  Description: "A basic LoRaWAN wireless device"
});
```

## Advanced Configuration

Configure a WirelessDevice with additional properties such as positioning and tags.

```ts
const advancedWirelessDevice = await AWS.IoTWireless.WirelessDevice("advancedWirelessDevice", {
  Type: "LoRaWAN",
  DestinationName: "myAdvancedDestination",
  LoRaWAN: {
    DevEui: "00-00-00-00-00-00-00-04",
    AppEui: "00-00-00-00-00-00-00-05",
    AppKey: "00-00-00-00-00-00-00-06"
  },
  Positioning: "GPS",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Region", Value: "us-west-2" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing WirelessDevice instead of failing when it already exists, you can set the `adopt` property.

```ts
const adoptedWirelessDevice = await AWS.IoTWireless.WirelessDevice("adoptedWirelessDevice", {
  Type: "LoRaWAN",
  DestinationName: "myAdoptedDestination",
  LoRaWAN: {
    DevEui: "00-00-00-00-00-00-00-07",
    AppEui: "00-00-00-00-00-00-00-08",
    AppKey: "00-00-00-00-00-00-00-09"
  },
  adopt: true
});
```

## Updating Device Information

You can update an existing WirelessDevice's description or add new tags as shown below.

```ts
const updatedWirelessDevice = await AWS.IoTWireless.WirelessDevice("updatedWirelessDevice", {
  Type: "LoRaWAN",
  DestinationName: "myUpdatedDestination",
  LoRaWAN: {
    DevEui: "00-00-00-00-00-00-00-10",
    AppEui: "00-00-00-00-00-00-00-11",
    AppKey: "00-00-00-00-00-00-00-12"
  },
  Description: "Updated description for the wireless device",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Version", Value: "1.0" }
  ]
});
```
