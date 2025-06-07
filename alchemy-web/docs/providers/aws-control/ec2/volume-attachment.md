---
title: Managing AWS EC2 VolumeAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 VolumeAttachments using Alchemy Cloud Control.
---

# VolumeAttachment

The VolumeAttachment resource allows you to manage the attachment of Amazon Elastic Block Store (EBS) volumes to EC2 instances. This is essential for configuring storage for your EC2 instances. For more details, refer to the [AWS EC2 VolumeAttachments documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to attach an EBS volume to an EC2 instance with the required properties and an optional device name.

```ts
import AWS from "alchemy/aws/control";

const volumeAttachment = await AWS.EC2.VolumeAttachment("MyVolumeAttachment", {
  VolumeId: "vol-0abcd1234efgh5678", // The ID of the volume to attach
  InstanceId: "i-0abcd1234efgh5678", // The ID of the instance to attach to
  Device: "/dev/sdf" // Optional: The device name
});
```

## Advanced Configuration

In this example, we demonstrate how to attach a volume to an instance while adopting an existing resource if it already exists.

```ts
const advancedVolumeAttachment = await AWS.EC2.VolumeAttachment("AdvancedVolumeAttachment", {
  VolumeId: "vol-0abcd1234efgh5678", // The ID of the volume to attach
  InstanceId: "i-0abcd1234efgh5678", // The ID of the instance to attach to
  Device: "/dev/sdf", // Optional: The device name
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Use Case: Attaching Multiple Volumes

Here’s how to attach multiple volumes to a single EC2 instance, demonstrating the flexibility of using multiple VolumeAttachment resources.

```ts
const volumeAttachment1 = await AWS.EC2.VolumeAttachment("VolumeAttachment1", {
  VolumeId: "vol-0abcd1234efgh5678",
  InstanceId: "i-0abcd1234efgh5678",
  Device: "/dev/sdf"
});

const volumeAttachment2 = await AWS.EC2.VolumeAttachment("VolumeAttachment2", {
  VolumeId: "vol-0ijklmnop1234qrst",
  InstanceId: "i-0abcd1234efgh5678",
  Device: "/dev/sdg" // Attaching another volume
});
```

## Use Case: Managing Volume Attachment Lifecycle

This example illustrates how to detach a volume from an EC2 instance by first creating an attachment and then simulating a detach operation.

```ts
const volumeAttachment = await AWS.EC2.VolumeAttachment("DetachVolumeAttachment", {
  VolumeId: "vol-0abcd1234efgh5678",
  InstanceId: "i-0abcd1234efgh5678",
  Device: "/dev/sdf"
});

// Simulate detaching the volume (this is a conceptual step; actual detach would require a different method)
console.log(`Volume ${volumeAttachment.VolumeId} attached to instance ${volumeAttachment.InstanceId} at device ${volumeAttachment.Device}.`);
// Code to detach the volume would be added here in practical applications
```