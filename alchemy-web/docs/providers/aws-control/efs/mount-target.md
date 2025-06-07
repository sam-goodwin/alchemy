---
title: Managing AWS EFS MountTargets with Alchemy
description: Learn how to create, update, and manage AWS EFS MountTargets using Alchemy Cloud Control.
---

# MountTarget

The MountTarget resource lets you create and manage [AWS EFS MountTargets](https://docs.aws.amazon.com/efs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-mounttarget.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mounttarget = await AWS.EFS.MountTarget("mounttarget-example", {
  SecurityGroups: ["example-securitygroups-1"],
  FileSystemId: "example-filesystemid",
  SubnetId: "example-subnetid",
});
```

