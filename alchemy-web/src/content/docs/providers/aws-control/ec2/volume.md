---
title: Volume
description: Learn how to create, update, and manage AWS EC2 Volumes using Alchemy Cloud Control.
---


The Volume resource allows you to create and manage [AWS EC2 Volumes](https://docs.aws.amazon.com/ec2/latest/userguide/) for your instances. These volumes provide persistent storage for your AWS EC2 instances.

## Minimal Example

Create a basic EC2 volume in a specified availability zone with a size and type.

```ts
import AWS from "alchemy/aws/control";

const ec2Volume = await AWS.EC2.Volume("myVolume", {
  AvailabilityZone: "us-east-1a",
  Size: 20, // Size in GiB
  VolumeType: "gp2" // General Purpose SSD
});
```

## Advanced Configuration

Configure an EC2 volume with encryption, multi-attach enabled, and a specific snapshot ID.

```ts
const secureEc2Volume = await AWS.EC2.Volume("secureVolume", {
  AvailabilityZone: "us-west-2b",
  Size: 50,
  VolumeType: "io1", // Provisioned IOPS SSD
  Iops: 1000, // IOPS for the volume
  Encrypted: true,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  MultiAttachEnabled: true,
  SnapshotId: "snap-0abcd1234efgh5678" // Example snapshot ID
});
```

## Creating an Outpost Volume

Create an EC2 volume that resides in an AWS Outpost.

```ts
const outpostVolume = await AWS.EC2.Volume("outpostVolume", {
  AvailabilityZone: "us-east-1a",
  Size: 100,
  VolumeType: "st1", // Throughput Optimized HDD
  OutpostArn: "arn:aws:outposts:us-east-1:123456789012:outpost/op-0abcde1234567890"
});
```

## Volume with Tags

Create an EC2 volume and assign tags for better resource management.

```ts
const taggedEc2Volume = await AWS.EC2.Volume("taggedVolume", {
  AvailabilityZone: "us-east-1a",
  Size: 80,
  VolumeType: "gp2",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Enabling IO Automatically

Create an EC2 volume with automatic I/O enabled.

```ts
const autoIoVolume = await AWS.EC2.Volume("autoIoVolume", {
  AvailabilityZone: "us-east-1a",
  Size: 30,
  VolumeType: "gp3",
  AutoEnableIO: true
});
```
