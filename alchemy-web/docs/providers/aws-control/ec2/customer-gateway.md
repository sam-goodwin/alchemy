---
title: Managing AWS EC2 CustomerGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 CustomerGateways using Alchemy Cloud Control.
---

# CustomerGateway

The CustomerGateway resource allows you to manage [AWS EC2 CustomerGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) which serve as a anchor point for your VPN connections.

## Minimal Example

Create a simple CustomerGateway with the required properties.

```ts
import AWS from "alchemy/aws/control";

const simpleCustomerGateway = await AWS.EC2.CustomerGateway("SimpleCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.1",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a CustomerGateway with additional properties like BGP ASN and a device name.

```ts
const advancedCustomerGateway = await AWS.EC2.CustomerGateway("AdvancedCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.2",
  BgpAsn: 65000,
  DeviceName: "MyVPNDevice",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## BGP ASN Extended Configuration

Create a CustomerGateway with an extended BGP ASN for advanced routing configurations.

```ts
const extendedBgpCustomerGateway = await AWS.EC2.CustomerGateway("ExtendedBgpCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "198.51.100.1",
  BgpAsn: 65001,
  BgpAsnExtended: 65001,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing CustomerGateway resource instead of failing if it already exists.

```ts
const adoptedCustomerGateway = await AWS.EC2.CustomerGateway("AdoptedCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "192.0.2.1",
  adopt: true
});
```