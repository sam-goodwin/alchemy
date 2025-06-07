---
title: Managing AWS EC2 Hosts with Alchemy
description: Learn how to create, update, and manage AWS EC2 Hosts using Alchemy Cloud Control.
---

# Host

The Host resource lets you manage [AWS EC2 Hosts](https://docs.aws.amazon.com/ec2/latest/userguide/) for dedicated hosting of Amazon EC2 instances, providing control over the underlying hardware.

## Minimal Example

Create a basic EC2 Host with required properties and one optional configuration for tags.

```ts
import AWS from "alchemy/aws/control";

const MyEC2Host = await AWS.EC2.Host("MyHost", {
  AvailabilityZone: "us-east-1a",
  HostRecovery: "on",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a host with auto placement and instance family settings for improved resource management.

```ts
const AdvancedEC2Host = await AWS.EC2.Host("AdvancedHost", {
  AvailabilityZone: "us-west-2b",
  AutoPlacement: "on",
  InstanceFamily: "m5",
  HostMaintenance: "off",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "TeamAlpha" }
  ]
});
```

## Resource Adoption

Adopt an existing EC2 Host if it already exists, instead of failing the operation.

```ts
const AdoptedEC2Host = await AWS.EC2.Host("AdoptedHost", {
  AvailabilityZone: "eu-central-1a",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Outpost Configuration

Create a host configured to run on an Outpost for hybrid cloud scenarios.

```ts
const OutpostEC2Host = await AWS.EC2.Host("OutpostHost", {
  AvailabilityZone: "ap-south-1a",
  OutpostArn: "arn:aws:outposts:ap-south-1:123456789012:outpost/op-123abc",
  Tags: [
    { Key: "Environment", Value: "Hybrid" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```