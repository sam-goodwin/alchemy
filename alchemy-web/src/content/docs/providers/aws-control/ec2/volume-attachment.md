---
title: VolumeAttachment
description: Learn how to create, update, and manage AWS EC2 VolumeAttachments using Alchemy Cloud Control.
---


The VolumeAttachment resource lets you manage the attachment of Amazon EC2 volumes to instances. For more detailed information, you can refer to the [AWS EC2 VolumeAttachments documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic volume attachment by specifying the required properties: `VolumeId` and `InstanceId`. Optionally, you can also specify the `Device` to be used.

```ts
import AWS from "alchemy/aws/control";

const volumeAttachment = await AWS.EC2.VolumeAttachment("myVolumeAttachment", {
  VolumeId: "vol-0abcd1234efgh5678", // Replace with your actual volume ID
  InstanceId: "i-0abcd1234efgh5678", // Replace with your actual instance ID
  Device: "/dev/sdf" // Optional device name
});
```

## Advanced Configuration

In addition to the basic properties, you can enable the adoption of an existing resource by setting the `adopt` property to `true`. This is useful when you want to attach a volume that already exists.

```ts
const adoptedVolumeAttachment = await AWS.EC2.VolumeAttachment("adoptedVolumeAttachment", {
  VolumeId: "vol-0abcd1234efgh5678",
  InstanceId: "i-0abcd1234efgh5678",
  Device: "/dev/sdg", // Optional device name
  adopt: true // Enable adoption of existing resource
});
```

## Error Handling Example

Handle potential errors by wrapping the resource creation in a try-catch block to manage exceptions gracefully.

```ts
try {
  const errorHandledVolumeAttachment = await AWS.EC2.VolumeAttachment("errorHandledVolumeAttachment", {
    VolumeId: "vol-0abcd1234efgh5678",
    InstanceId: "i-0abcd1234efgh5678",
    Device: "/dev/sdh"
  });
} catch (error) {
  console.error("Failed to attach volume:", error);
}
```

## Multiple Attachments Example

You can create multiple volume attachments for different instances by repeating the resource creation process with different parameters.

```ts
const volumeAttachment1 = await AWS.EC2.VolumeAttachment("volumeAttachment1", {
  VolumeId: "vol-0abcd1234efgh5678",
  InstanceId: "i-0abcd1234efgh5678",
  Device: "/dev/sdi"
});

const volumeAttachment2 = await AWS.EC2.VolumeAttachment("volumeAttachment2", {
  VolumeId: "vol-0abcd1234efgh5678",
  InstanceId: "i-1abcd2345efgh6789",
  Device: "/dev/sdj"
});
```
