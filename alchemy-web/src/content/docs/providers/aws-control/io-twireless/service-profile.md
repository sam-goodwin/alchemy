---
title: ServiceProfile
description: Learn how to create, update, and manage AWS IoTWireless ServiceProfiles using Alchemy Cloud Control.
---


The ServiceProfile resource allows you to manage [AWS IoTWireless ServiceProfiles](https://docs.aws.amazon.com/iotwireless/latest/userguide/) for configuring LoRaWAN devices within your IoT setup.

## Minimal Example

Create a basic ServiceProfile with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const serviceProfile = await AWS.IoTWireless.ServiceProfile("basic-service-profile", {
  Name: "BasicServiceProfile",
  LoRaWAN: {
    Id: "example-lorawan-id",
    DevAddrPrefix: "2601",
    MaxEirp: 30,
    MinGwDiversity: 1
  },
  Tags: [{ Key: "Environment", Value: "Test" }]
});
```

## Advanced Configuration

Configure a ServiceProfile with advanced LoRaWAN settings for more control over device communication.

```ts
const advancedServiceProfile = await AWS.IoTWireless.ServiceProfile("advanced-service-profile", {
  Name: "AdvancedServiceProfile",
  LoRaWAN: {
    Id: "advanced-lorawan-id",
    DevAddrPrefix: "2602",
    MaxEirp: 20,
    MinGwDiversity: 2,
    ClassB: {
      PingSlotPeriod: "2",
      PingSlotDr: 0,
      PingSlotFreq: 868.1
    },
    ClassC: {
      ClassCDr: 3,
      ClassCFreq: 868.5
    }
  },
  Tags: [{ Key: "Project", Value: "IoTDeployment" }]
});
```

## Custom Adoption Scenario

Create a ServiceProfile that adopts an existing resource instead of failing if it already exists.

```ts
const serviceProfileWithAdoption = await AWS.IoTWireless.ServiceProfile("adopted-service-profile", {
  Name: "AdoptedServiceProfile",
  LoRaWAN: {
    Id: "adopted-lorawan-id",
    DevAddrPrefix: "2603",
    MaxEirp: 25
  },
  adopt: true
});
```
