---
title: VPNGateway
description: Learn how to create, update, and manage AWS EC2 VPNGateways using Alchemy Cloud Control.
---


The VPNGateway resource allows you to create and manage [AWS EC2 VPNGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) that enable secure VPN connections between your on-premises networks and your AWS VPCs.

## Minimal Example

Create a basic VPNGateway with a specified type and Amazon Side ASN.

```ts
import AWS from "alchemy/aws/control";

const basicVPNGateway = await AWS.EC2.VPNGateway("basic-vpn-gateway", {
  Type: "ipsec.1",
  AmazonSideAsn: 65000,
  Tags: [
    { Key: "Name", Value: "BasicVPNGateway" }
  ]
});
```

## Advanced Configuration

Configure a VPNGateway with advanced properties including tags and the option to adopt existing resources.

```ts
const advancedVPNGateway = await AWS.EC2.VPNGateway("advanced-vpn-gateway", {
  Type: "ipsec.1",
  AmazonSideAsn: 65001,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Networking" }
  ],
  adopt: true // Adopt an existing resource if it already exists
});
```

## Use Case: High Availability Setup

Create two VPNGateways for a high availability setup across multiple regions.

```ts
const primaryVPNGateway = await AWS.EC2.VPNGateway("primary-vpn-gateway", {
  Type: "ipsec.1",
  AmazonSideAsn: 65002,
  Tags: [
    { Key: "Environment", Value: "HighAvailability" },
    { Key: "Region", Value: "us-east-1" }
  ]
});

const secondaryVPNGateway = await AWS.EC2.VPNGateway("secondary-vpn-gateway", {
  Type: "ipsec.1",
  AmazonSideAsn: 65003,
  Tags: [
    { Key: "Environment", Value: "HighAvailability" },
    { Key: "Region", Value: "us-west-2" }
  ]
});
```

## Use Case: Multi-VPC Connectivity

Set up a VPNGateway to connect multiple VPCs for cross-region communication.

```ts
const multiVpcVPNGateway = await AWS.EC2.VPNGateway("multi-vpc-vpn-gateway", {
  Type: "ipsec.1",
  AmazonSideAsn: 65004,
  Tags: [
    { Key: "UseCase", Value: "MultiVPCConnectivity" },
    { Key: "Owner", Value: "DevOpsTeam" }
  ]
});
```
