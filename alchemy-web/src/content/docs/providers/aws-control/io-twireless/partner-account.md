---
title: PartnerAccount
description: Learn how to create, update, and manage AWS IoTWireless PartnerAccounts using Alchemy Cloud Control.
---


The PartnerAccount resource allows you to manage [AWS IoTWireless PartnerAccounts](https://docs.aws.amazon.com/iotwireless/latest/userguide/) for connecting and integrating with various IoT wireless partners.

## Minimal Example

Create a basic PartnerAccount with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const partnerAccount = await AWS.IoTWireless.PartnerAccount("myPartnerAccount", {
  PartnerAccountId: "1234567890abcdef",
  PartnerType: "Sidewalk",
  AccountLinked: true,
  Tags: [
    { Key: "Project", Value: "IoTDeployment" }
  ]
});
```

## Advanced Configuration

Configure a PartnerAccount with detailed Sidewalk settings and an update configuration.

```ts
import AWS from "alchemy/aws/control";

const advancedPartnerAccount = await AWS.IoTWireless.PartnerAccount("advancedPartnerAccount", {
  PartnerAccountId: "abcdef1234567890",
  PartnerType: "Sidewalk",
  Sidewalk: {
    AppServerPrivateKey: "myPrivateKey12345",
    ClientId: "myClientId",
  },
  SidewalkUpdate: {
    LastUpdated: "2023-10-01T12:00:00Z",
    UpdateToken: "updateToken12345"
  },
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Sidewalk Response Handling

Create a PartnerAccount that includes Sidewalk response information.

```ts
import AWS from "alchemy/aws/control";

const sidewalkResponseAccount = await AWS.IoTWireless.PartnerAccount("sidewalkResponseAccount", {
  PartnerAccountId: "abcdef1234567890",
  PartnerType: "Sidewalk",
  SidewalkResponse: {
    AppServerPublicKey: "publicKey12345",
    Fingerprint: "fingerprintValue"
  },
  AccountLinked: false
});
```

## Usage with Tags

Demonstrate how to create a PartnerAccount with multiple tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedPartnerAccount = await AWS.IoTWireless.PartnerAccount("taggedPartnerAccount", {
  PartnerAccountId: "tagged123456",
  PartnerType: "LoRaWAN",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Region", Value: "US-West" },
    { Key: "Application", Value: "SmartCity" }
  ]
});
```
