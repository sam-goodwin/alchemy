---
title: TransitGatewayMulticastGroupMember
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastGroupMembers using Alchemy Cloud Control.
---


The TransitGatewayMulticastGroupMember resource allows you to manage multicast group members associated with an AWS EC2 Transit Gateway Multicast Domain. This resource is essential for enabling multicast traffic across your AWS infrastructure. For more information, refer to the [AWS EC2 TransitGatewayMulticastGroupMembers documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Transit Gateway Multicast Group Member with required properties.

```ts
import AWS from "alchemy/aws/control";

const multicastGroupMember = await AWS.EC2.TransitGatewayMulticastGroupMember("basicMulticastGroupMember", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-12345678",
  NetworkInterfaceId: "eni-12345678",
  GroupIpAddress: "239.255.0.1",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Create a Transit Gateway Multicast Group Member with additional properties and settings.

```ts
const advancedMulticastGroupMember = await AWS.EC2.TransitGatewayMulticastGroupMember("advancedMulticastGroupMember", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-87654321",
  NetworkInterfaceId: "eni-87654321",
  GroupIpAddress: "239.255.0.2",
  adopt: false // Optional: Set to false to fail if the resource exists
});
```

## Example with Additional Context

Add a Transit Gateway Multicast Group Member to manage multicast traffic for a specific application.

```ts
const appMulticastGroupMember = await AWS.EC2.TransitGatewayMulticastGroupMember("appMulticastGroupMember", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-11223344",
  NetworkInterfaceId: "eni-11223344",
  GroupIpAddress: "239.255.0.3",
  adopt: true // Adopt existing resource for seamless integration
});
```

## Use Case: Multicast Traffic for Video Streaming

Create a Transit Gateway Multicast Group Member specifically for a video streaming service.

```ts
const videoStreamingMulticastGroupMember = await AWS.EC2.TransitGatewayMulticastGroupMember("videoStreamingMulticastGroupMember", {
  TransitGatewayMulticastDomainId: "tgw-multicast-domain-55667788",
  NetworkInterfaceId: "eni-55667788",
  GroupIpAddress: "239.255.0.4",
  adopt: true // Adopt existing multicast group member
});
```
