---
title: Managing AWS EC2 Volumes with Alchemy
description: Learn how to create, update, and manage AWS EC2 Volumes using Alchemy Cloud Control.
---

# Volume

The Volume resource lets you manage [AWS EC2 Volumes](https://docs.aws.amazon.com/ec2/latest/userguide/) which provide block storage for your EC2 instances.

## Minimal Example

Create a basic EC2 volume with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicVolume = await AWS.EC2.Volume("BasicVolume", {
  AvailabilityZone: "us-west-2a",
  Size: 100, // Size in GiB
  VolumeType: "gp2", // General Purpose SSD
  Tags: [
    { Key: "Name", Value: "MyBasicVolume" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an EC2 volume with encryption and multi-attach enabled for high availability.

```ts
const advancedVolume = await AWS.EC2.Volume("AdvancedVolume", {
  AvailabilityZone: "us-east-1b",
  Size: 200,
  VolumeType: "io1", // Provisioned IOPS SSD
  Iops: 1000,
  Encrypted: true,
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  MultiAttachEnabled: true,
  Tags: [
    { Key: "Name", Value: "MyAdvancedVolume" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Snapshot Restoration

Create a volume from an existing snapshot to restore previous data.

```ts
const snapshotVolume = await AWS.EC2.Volume("SnapshotVolume", {
  AvailabilityZone: "us-west-1a",
  SnapshotId: "snap-0abcdef1234567890",
  Size: 50, // Size can be equal to or greater than the snapshot
  Tags: [
    { Key: "Name", Value: "RestoredVolume" },
    { Key: "Environment", Value: "Backup" }
  ]
});
```

## Outpost Volume Configuration

Configure a volume specifically for AWS Outposts.

```ts
const outpostVolume = await AWS.EC2.Volume("OutpostVolume", {
  AvailabilityZone: "us-west-2a",
  Size: 300,
  VolumeType: "gp3", // General Purpose SSD with higher performance
  OutpostArn: "arn:aws:outposts:us-west-2:123456789012:outpost/op-abcdef1234567890",
  Tags: [
    { Key: "Name", Value: "OutpostVolume" },
    { Key: "Environment", Value: "Outpost" }
  ]
});
```