---
title: Host
description: Learn how to create, update, and manage AWS EC2 Hosts using Alchemy Cloud Control.
---


The Host resource allows you to manage [AWS EC2 Hosts](https://docs.aws.amazon.com/ec2/latest/userguide/) for your compute resources, providing options for instance family, auto placement, and recovery settings.

## Minimal Example

Create a basic EC2 Host with required properties and one optional property for instance family.

```ts
import AWS from "alchemy/aws/control";

const ec2Host = await AWS.EC2.Host("myEc2Host", {
  AvailabilityZone: "us-west-2a",
  InstanceFamily: "m5"
});
```

## Advanced Configuration

Configure an EC2 Host with auto placement and host recovery options.

```ts
const advancedEc2Host = await AWS.EC2.Host("advancedEc2Host", {
  AvailabilityZone: "us-east-1b",
  InstanceFamily: "c5",
  AutoPlacement: "on",
  HostRecovery: "on"
});
```

## Specific Use Case: Outpost Configuration

Create an EC2 Host that is associated with an Outpost to extend your on-premises infrastructure.

```ts
const outpostEc2Host = await AWS.EC2.Host("outpostEc2Host", {
  AvailabilityZone: "us-west-1a",
  InstanceFamily: "r5",
  OutpostArn: "arn:aws:outposts:us-west-1:123456789012:outpost/op-abcdefg123456789", 
  HostMaintenance: "on"
});
```

## Adopting Existing Resource

If you want to adopt an existing EC2 Host instead of failing if it already exists, set the adopt property to true.

```ts
const adoptEc2Host = await AWS.EC2.Host("adoptEc2Host", {
  AvailabilityZone: "eu-central-1a",
  InstanceFamily: "t3",
  adopt: true
});
```
