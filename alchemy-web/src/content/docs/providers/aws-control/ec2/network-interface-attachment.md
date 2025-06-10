---
title: NetworkInterfaceAttachment
description: Learn how to create, update, and manage AWS EC2 NetworkInterfaceAttachments using Alchemy Cloud Control.
---


The NetworkInterfaceAttachment resource lets you manage [AWS EC2 NetworkInterfaceAttachments](https://docs.aws.amazon.com/ec2/latest/userguide/) for associating network interfaces with EC2 instances.

## Minimal Example

Create a basic NetworkInterfaceAttachment with required properties and an optional deleteOnTermination setting.

```ts
import AWS from "alchemy/aws/control";

const networkInterfaceAttachment = await AWS.EC2.NetworkInterfaceAttachment("myNetworkInterfaceAttachment", {
  InstanceId: "i-1234567890abcdef0",
  DeviceIndex: "0",
  NetworkInterfaceId: "eni-12345678",
  DeleteOnTermination: true
});
```

## Advanced Configuration

Configure a NetworkInterfaceAttachment with enhanced options, including EnaSrdSpecification for SR-IOV support.

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkInterfaceAttachment = await AWS.EC2.NetworkInterfaceAttachment("advancedNetworkInterfaceAttachment", {
  InstanceId: "i-0987654321abcdef0",
  DeviceIndex: "1",
  NetworkInterfaceId: "eni-87654321",
  EnaSrdSpecification: {
    // Enable enhanced networking
    SrdType: "ena"
  }
});
```

## Adoption of Existing Resource

If you need to adopt an existing NetworkInterfaceAttachment, you can do so by setting the adopt property.

```ts
import AWS from "alchemy/aws/control";

const adoptedNetworkInterfaceAttachment = await AWS.EC2.NetworkInterfaceAttachment("adoptedNetworkInterfaceAttachment", {
  InstanceId: "i-1122334455667788",
  DeviceIndex: "2",
  NetworkInterfaceId: "eni-11223344",
  adopt: true // Adopt existing resource instead of failing
});
```
