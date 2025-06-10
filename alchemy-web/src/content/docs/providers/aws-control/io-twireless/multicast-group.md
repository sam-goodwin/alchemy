---
title: MulticastGroup
description: Learn how to create, update, and manage AWS IoTWireless MulticastGroups using Alchemy Cloud Control.
---


The MulticastGroup resource allows you to manage [AWS IoTWireless MulticastGroups](https://docs.aws.amazon.com/iotwireless/latest/userguide/) to facilitate communication with multiple devices in a single operation.

## Minimal Example

Create a basic multicast group with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const multicastGroup = await AWS.IoTWireless.MulticastGroup("basicMulticastGroup", {
  LoRaWAN: {
    // Provide necessary LoRaWAN properties here
    RfRegion: "EU868",
    ChannelPlan: "EU868"
  },
  Description: "This is a basic multicast group for testing purposes.",
  Name: "TestMulticastGroup"
});
```

## Advanced Configuration

Set up a multicast group with additional device associations and tags.

```ts
const advancedMulticastGroup = await AWS.IoTWireless.MulticastGroup("advancedMulticastGroup", {
  LoRaWAN: {
    RfRegion: "US915",
    ChannelPlan: "US915"
  },
  AssociateWirelessDevice: "arn:aws:iotwireless:us-east-1:123456789012:wireless-device/test-device-id",
  DisassociateWirelessDevice: "arn:aws:iotwireless:us-east-1:123456789012:wireless-device/old-device-id",
  Description: "Advanced multicast group with device associations.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "IoT" }
  ],
  Name: "AdvancedMulticastGroup"
});
```

## Using Tags for Management

Create a multicast group while utilizing tags for better resource management.

```ts
const taggedMulticastGroup = await AWS.IoTWireless.MulticastGroup("taggedMulticastGroup", {
  LoRaWAN: {
    RfRegion: "EU868",
    ChannelPlan: "EU868"
  },
  Tags: [
    { Key: "Project", Value: "IoTDeployment" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  Name: "TaggedMulticastGroup"
});
```

## Adoption of Existing Resources

Create a multicast group that adopts an existing resource if it already exists.

```ts
const adoptiveMulticastGroup = await AWS.IoTWireless.MulticastGroup("adoptiveMulticastGroup", {
  LoRaWAN: {
    RfRegion: "EU868",
    ChannelPlan: "EU868"
  },
  Name: "AdoptiveMulticastGroup",
  adopt: true // This will adopt the existing multicast group if found
});
```
