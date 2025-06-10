---
title: Device
description: Learn how to create, update, and manage AWS NetworkManager Devices using Alchemy Cloud Control.
---


The Device resource lets you manage [AWS NetworkManager Devices](https://docs.aws.amazon.com/networkmanager/latest/userguide/) and their configurations within your global network. 

## Minimal Example

Create a basic device by specifying the required Global Network ID along with a Site ID.

```ts
import AWS from "alchemy/aws/control";

const networkDevice = await AWS.NetworkManager.Device("myDevice", {
  GlobalNetworkId: "gn-12345678",
  SiteId: "site-12345678",
  Type: "customer-gateway", // Optional: Type of the device
  Description: "Main office router" // Optional: Description of the device
});
```

## Advanced Configuration

Configure a device with additional properties such as location and vendor details for more comprehensive management.

```ts
const advancedDevice = await AWS.NetworkManager.Device("advancedDevice", {
  GlobalNetworkId: "gn-87654321",
  SiteId: "site-87654321",
  Type: "device", // Optional: Type of the device
  Description: "Branch office switch",
  AWSLocation: {
    Latitude: 37.7749,
    Longitude: -122.4194
  },
  Vendor: "Cisco", // Optional: Vendor of the device
  Model: "Catalyst 9200", // Optional: Model of the device
  SerialNumber: "ABC1234567", // Optional: Serial number of the device
});
```

## Device Tags

Add tags to your device for better organization and management.

```ts
const taggedDevice = await AWS.NetworkManager.Device("taggedDevice", {
  GlobalNetworkId: "gn-13579246",
  SiteId: "site-13579246",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Location Configuration

Define the physical location of a device to enhance network mapping.

```ts
const locationConfiguredDevice = await AWS.NetworkManager.Device("locationDevice", {
  GlobalNetworkId: "gn-24681357",
  SiteId: "site-24681357",
  Location: {
    Address: "123 Main St",
    Latitude: 40.7128,
    Longitude: -74.0060
  },
  Type: "device",
  Description: "New York office access point"
});
```
