---
title: DeviceProfile
description: Learn how to create, update, and manage AWS IoTWireless DeviceProfiles using Alchemy Cloud Control.
---


The DeviceProfile resource allows you to manage [AWS IoTWireless DeviceProfiles](https://docs.aws.amazon.com/iotwireless/latest/userguide/) which define the configuration settings for devices that connect to AWS IoT services.

## Minimal Example

Create a basic DeviceProfile with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const deviceProfile = await AWS.IoTWireless.DeviceProfile("basicDeviceProfile", {
  Name: "BasicDeviceProfile",
  LoRaWAN: {
    ClassBTimeout: 30,
    PingSlotPeriod: "hourly",
    PingSlotDr: 0,
    PingSlotFreq: "923.3",
    MaxEirp: 30,
    SupportsClassB: true,
    SupportsJoin: true
  },
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a DeviceProfile with additional settings for LoRaWAN, including advanced parameters.

```ts
const advancedDeviceProfile = await AWS.IoTWireless.DeviceProfile("advancedDeviceProfile", {
  Name: "AdvancedDeviceProfile",
  LoRaWAN: {
    ClassBTimeout: 60,
    PingSlotPeriod: "every-2-hours",
    PingSlotDr: 1,
    PingSlotFreq: "923.5",
    MaxEirp: 27,
    SupportsClassB: true,
    SupportsJoin: true,
    ClassCTimeout: 30,
    ClassCDr: 3,
    ClassCFreq: "923.7"
  },
  Tags: [{ Key: "Environment", Value: "Production" }, { Key: "Owner", Value: "TeamA" }]
});
```

## Adoption of Existing DeviceProfile

If you want to adopt an existing DeviceProfile instead of failing when it already exists, set the `adopt` property to true.

```ts
const adoptedDeviceProfile = await AWS.IoTWireless.DeviceProfile("adoptedDeviceProfile", {
  Name: "ExistingDeviceProfile",
  LoRaWAN: {
    ClassBTimeout: 30,
    PingSlotPeriod: "hourly",
    PingSlotDr: 0,
    PingSlotFreq: "923.3",
    MaxEirp: 30,
    SupportsClassB: true,
    SupportsJoin: true
  },
  adopt: true
});
```
