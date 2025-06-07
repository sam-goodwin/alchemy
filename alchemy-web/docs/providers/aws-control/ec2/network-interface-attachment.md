---
title: Managing AWS EC2 NetworkInterfaceAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInterfaceAttachments using Alchemy Cloud Control.
---

# NetworkInterfaceAttachment

The NetworkInterfaceAttachment resource lets you create and manage [AWS EC2 NetworkInterfaceAttachments](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinterfaceattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkinterfaceattachment = await AWS.EC2.NetworkInterfaceAttachment(
  "networkinterfaceattachment-example",
  {
    InstanceId: "example-instanceid",
    DeviceIndex: "example-deviceindex",
    NetworkInterfaceId: "example-networkinterfaceid",
  }
);
```

