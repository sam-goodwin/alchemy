---
title: EIPAssociation
description: Learn how to create, update, and manage AWS EC2 EIPAssociations using Alchemy Cloud Control.
---


The EIPAssociation resource allows you to associate an Elastic IP address with an EC2 instance or a network interface. This resource is essential for managing static IP addresses in your AWS environment. For more information, refer to the [AWS EC2 EIPAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic EIPAssociation by associating an Elastic IP address with an EC2 instance:

```ts
import AWS from "alchemy/aws/control";

const eipAssociation = await AWS.EC2.EIPAssociation("BasicEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with your EC2 instance ID
  AllocationId: "eipalloc-12345abcd", // Replace with your EIP allocation ID
  PrivateIpAddress: "192.168.1.10" // Optional: Specify the private IP address
});
```

## Advanced Configuration

Configure an EIPAssociation with additional options, such as binding to a specific network interface:

```ts
const advancedEipAssociation = await AWS.EC2.EIPAssociation("AdvancedEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with your EC2 instance ID
  AllocationId: "eipalloc-12345abcd", // Replace with your EIP allocation ID
  NetworkInterfaceId: "eni-0abcd1234efgh5678", // Optional: Specify the network interface ID
  adopt: true // Optional: Adopt existing resource instead of failing if it already exists
});
```

## Associating with a Network Interface

Create an EIPAssociation that specifically binds to a network interface instead of an instance:

```ts
const networkInterfaceEipAssociation = await AWS.EC2.EIPAssociation("NetworkInterfaceEIPAssociation", {
  AllocationId: "eipalloc-12345abcd", // Replace with your EIP allocation ID
  NetworkInterfaceId: "eni-0abcd1234efgh5678", // Replace with your network interface ID
  PrivateIpAddress: "192.168.1.20" // Optional: Specify the private IP address
});
```

## Error Handling with Adoption

This example demonstrates using the `adopt` property to handle existing EIPAssociations without failure:

```ts
const adoptEipAssociation = await AWS.EC2.EIPAssociation("AdoptEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with your EC2 instance ID
  AllocationId: "eipalloc-12345abcd", // Replace with your EIP allocation ID
  adopt: true // Enable adopting existing resource
});
```
