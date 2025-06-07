---
title: Managing AWS EC2 EIPs with Alchemy
description: Learn how to create, update, and manage AWS EC2 EIPs using Alchemy Cloud Control.
---

# EIP

The EIP (Elastic IP) resource lets you manage [AWS EC2 EIPs](https://docs.aws.amazon.com/ec2/latest/userguide/) for your instances by allocating, associating, and disassociating public IPv4 addresses.

## Minimal Example

Create a basic Elastic IP with default settings and associate it with an EC2 instance.

```ts
import AWS from "alchemy/aws/control";

const ElasticIP = await AWS.EC2.EIP("MyElasticIP", {
  InstanceId: "i-0abcd1234efgh5678", // Replace with your EC2 instance ID
  Tags: [
    { Key: "Name", Value: "MyElasticIP" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Allocate an Elastic IP from a specific public IPv4 pool and set additional parameters.

```ts
const CustomElasticIP = await AWS.EC2.EIP("CustomElasticIP", {
  PublicIpv4Pool: "amazon", // Using a public IPv4 pool provided by AWS
  Domain: "vpc", // This specifies that the EIP is for instances in a VPC
  Tags: [
    { Key: "Name", Value: "CustomElasticIP" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using IPAM Pool

Allocate an Elastic IP from an IPAM pool for more controlled IP address management.

```ts
const IpamElasticIP = await AWS.EC2.EIP("IpamElasticIP", {
  IpamPoolId: "ipam-pool-1a2b3c4d", // Replace with your actual IPAM pool ID
  Tags: [
    { Key: "Name", Value: "IpamElasticIP" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Transfering an Elastic IP

Transfer an Elastic IP address to another AWS account.

```ts
const TransferElasticIP = await AWS.EC2.EIP("TransferElasticIP", {
  TransferAddress: "203.0.113.25", // Replace with the actual IP address to transfer
  Tags: [
    { Key: "Name", Value: "TransferElasticIP" },
    { Key: "Action", Value: "Transfer" }
  ]
});
```