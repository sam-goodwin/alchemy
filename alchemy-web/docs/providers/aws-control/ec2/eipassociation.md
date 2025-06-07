---
title: Managing AWS EC2 EIPAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 EIPAssociations using Alchemy Cloud Control.
---

# EIPAssociation

The EIPAssociation resource lets you manage [AWS EC2 Elastic IP Associations](https://docs.aws.amazon.com/ec2/latest/userguide/) to connect Elastic IP addresses to EC2 instances.

## Minimal Example

Create a basic EIPAssociation with required properties and one optional property for the private IP address.

```ts
import AWS from "alchemy/aws/control";

const basicEIPAssociation = await AWS.EC2.EIPAssociation("BasicEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with a valid EC2 instance ID
  AllocationId: "eipalloc-12345678", // Replace with a valid EIP allocation ID
  PrivateIpAddress: "10.0.0.25" // Optional: A specific private IP address in the subnet
});
```

## Advanced Configuration

Configure an EIPAssociation with a specific Network Interface ID.

```ts
const advancedEIPAssociation = await AWS.EC2.EIPAssociation("AdvancedEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with a valid EC2 instance ID
  AllocationId: "eipalloc-12345678", // Replace with a valid EIP allocation ID
  NetworkInterfaceId: "eni-0abcd1234efgh5678" // Optional: A specific network interface ID
});
```

## Using Adopt Option

Use the adopt option to associate an existing Elastic IP without failing if it already exists.

```ts
const adoptEIPAssociation = await AWS.EC2.EIPAssociation("AdoptEIPAssociation", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with a valid EC2 instance ID
  AllocationId: "eipalloc-12345678", // Replace with a valid EIP allocation ID
  adopt: true // This will adopt the existing EIPAssociation if it already exists
});
```