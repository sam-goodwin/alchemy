---
title: TransitGatewayMulticastDomain
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastDomains using Alchemy Cloud Control.
---


The TransitGatewayMulticastDomain resource allows you to manage multicast domains within AWS EC2 Transit Gateways, enabling efficient multicast traffic routing across your VPCs. For more information, see the [AWS EC2 TransitGatewayMulticastDomains documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway Multicast Domain with required properties:

```ts
import AWS from "alchemy/aws/control";

const multicastDomain = await AWS.EC2.TransitGatewayMulticastDomain("myMulticastDomain", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  Options: {
    // Optional properties can be added here
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MulticastTraffic"
    }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway Multicast Domain with additional options for enhanced functionality:

```ts
const advancedMulticastDomain = await AWS.EC2.TransitGatewayMulticastDomain("advancedMulticastDomain", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  Options: {
    // Example of setting options - customize as needed
    DnsSupport: "enable",
    MulticastSupport: "enable"
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing Transit Gateway Multicast Domain instead of failing when it already exists, you can set the `adopt` property to true:

```ts
const adoptExistingDomain = await AWS.EC2.TransitGatewayMulticastDomain("adoptExistingDomain", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  adopt: true
});
```

## Resource with Custom Tags

Create a Transit Gateway Multicast Domain and specify custom tags for better resource management:

```ts
const taggedMulticastDomain = await AWS.EC2.TransitGatewayMulticastDomain("taggedMulticastDomain", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  Tags: [
    {
      Key: "Owner",
      Value: "DevTeam"
    },
    {
      Key: "CostCenter",
      Value: "12345"
    }
  ]
});
```
